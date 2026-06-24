import { executeQuery, generateUUID } from "@/lib/db";

export interface SubscriberRow {
  id: string;
  site_id: string;
  endpoint: string | null;
  fcm_token: string | null;
  auth_key: string | null;
  p256dh_key: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  country: string | null;
  city: string | null;
  tags: string;
  status: "active" | "unsubscribed";
  subscribed_at: string;
  last_seen_at: string | null;
  unsubscribed_at: string | null;
  is_active: boolean;
}

export async function getSubscriberById(id: string) {
  const rows = await executeQuery<SubscriberRow[]>("SELECT * FROM subscribers WHERE id = ?", [id]);
  return rows[0] ?? null;
}

export async function getSubscribersBySite(siteId: string, options?: { status?: string; offset?: number; limit?: number }) {
  const conditions = ["site_id = ?"];
  const params: unknown[] = [siteId];
  if (options?.status) { conditions.push("status = ?"); params.push(options.status); }
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;
  return executeQuery<SubscriberRow[]>(
    `SELECT * FROM subscribers WHERE ${conditions.join(" AND ")} ORDER BY subscribed_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
}

export async function getSubscriberCount(siteId: string) {
  const rows = await executeQuery<{ count: number }[]>("SELECT COUNT(*) as count FROM subscribers WHERE site_id = ? AND is_active = true", [siteId]);
  return rows[0]?.count ?? 0;
}

export async function createSubscriber(data: {
  site_id: string; endpoint: string; fcm_token?: string; auth_key?: string; p256dh_key?: string;
  browser?: string; os?: string; country?: string; city?: string;
}) {
  const id = generateUUID();
  await executeQuery(
    `INSERT INTO subscribers (id, site_id, endpoint, fcm_token, auth_key, p256dh_key, browser, os, country, city)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, data.site_id, data.endpoint, data.fcm_token ?? null, data.auth_key ?? null, data.p256dh_key ?? null,
     data.browser ?? null, data.os ?? null, data.country ?? null, data.city ?? null]
  );
  return getSubscriberById(id);
}

export async function updateSubscriberStatus(id: string, status: "active" | "unsubscribed") {
  await executeQuery(
    "UPDATE subscribers SET status = ?, unsubscribed_at = CASE WHEN ? = 'unsubscribed' THEN datetime('now') ELSE unsubscribed_at END, is_active = CASE WHEN ? = 'active' THEN 1 ELSE 0 END WHERE id = ?",
    [status, status, status, id]
  );
}

export async function getSubscriberBrowserBreakdown(siteId: string) {
  return executeQuery<{ browser: string; count: number }[]>(
    "SELECT browser, COUNT(*) as count FROM subscribers WHERE site_id = ? AND is_active = true GROUP BY browser ORDER BY count DESC",
    [siteId]
  );
}

export async function getSubscriberCountryBreakdown(siteId: string) {
  return executeQuery<{ country: string; count: number }[]>(
    "SELECT country, COUNT(*) as count FROM subscribers WHERE site_id = ? AND is_active = true AND country IS NOT NULL GROUP BY country ORDER BY count DESC LIMIT 10",
    [siteId]
  );
}
