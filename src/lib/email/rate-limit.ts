import "server-only";
import { executeQuery } from "@/lib/db";

const MAX_PER_EMAIL_PER_HOUR = 3;
const MAX_PER_IP_PER_15M = 5;
const DAILY_LIMIT = parseInt(process.env.BREVO_DAILY_SEND_LIMIT || "300", 10);
const DAILY_WARN_THRESHOLD = Math.floor(DAILY_LIMIT * 0.9);

export async function checkRateLimit(opts: {
  email: string;
  type: string;
  ip?: string;
}): Promise<{ allowed: boolean; reason?: string }> {
  const since = new Date(Date.now() - 3600000).toISOString();
  const recentCount: any[] = await executeQuery(
    `SELECT COUNT(*) as cnt FROM email_send_log
     WHERE email = ? AND type = ? AND sent_at >= ?`,
    [opts.email, opts.type, since]
  );

  if (recentCount[0]?.cnt >= MAX_PER_EMAIL_PER_HOUR) {
    return { allowed: false, reason: `Rate limit: max ${MAX_PER_EMAIL_PER_HOUR} per hour` };
  }

  if (opts.ip) {
    const ipSince = new Date(Date.now() - 900000).toISOString();
    const ipCount: any[] = await executeQuery(
      `SELECT COUNT(*) as cnt FROM email_send_log
       WHERE ip_address = ? AND sent_at >= ?`,
      [opts.ip, ipSince]
    );
    if (ipCount[0]?.cnt >= MAX_PER_IP_PER_15M) {
      return { allowed: false, reason: `Rate limit: max ${MAX_PER_IP_PER_15M} requests per 15 minutes` };
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const daily: any[] = await executeQuery(
    "SELECT count FROM email_daily_counter WHERE date = ?",
    [today]
  );
  const currentCount = daily[0]?.count || 0;

  if (currentCount >= DAILY_LIMIT) {
    return { allowed: false, reason: "Daily send limit reached" };
  }

  return { allowed: true };
}

export async function logEmailSend(opts: {
  email: string;
  type: string;
  ip?: string;
  messageId?: string;
  error?: string;
}) {
  const crypto = await import("crypto");
  const id = crypto.randomUUID();

  await executeQuery(
    `INSERT INTO email_send_log (id, email, type, ip_address, message_id, error)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, opts.email, opts.type, opts.ip || null, opts.messageId || null, opts.error || null]
  );

  const today = new Date().toISOString().slice(0, 10);
  await executeQuery(
    `INSERT INTO email_daily_counter (date, count) VALUES (?, 1)
     ON CONFLICT(date) DO UPDATE SET count = count + 1`,
    [today]
  );
}

export async function checkDailyWarning(): Promise<number | null> {
  const today = new Date().toISOString().slice(0, 10);
  const rows: any[] = await executeQuery(
    "SELECT count FROM email_daily_counter WHERE date = ?",
    [today]
  );
  const count = rows[0]?.count || 0;
  if (count >= DAILY_WARN_THRESHOLD) {
    return count;
  }
  return null;
}
