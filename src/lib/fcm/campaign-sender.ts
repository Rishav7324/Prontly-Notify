import "server-only";
import { sendBatch, type FcmPayload } from "./client";
import { executeQuery } from "@/lib/db";

interface SubscriberFcm {
  id: string;
  fcm_token: string;
}

export interface SendResult {
  total: number;
  sent: number;
  failed: number;
  unregistered: number;
}

export async function sendCampaign(
  campaignId: string,
  siteId: string
): Promise<SendResult> {
  const campaign = await executeQuery<any>(
    `SELECT * FROM campaigns WHERE id = ? AND site_id = ?`,
    [campaignId, siteId]
  );
  if (!campaign[0]) throw new Error("Campaign not found");
  const c = campaign[0];

  const subscribers = await executeQuery<SubscriberFcm[]>(
    `SELECT id, fcm_token FROM subscribers WHERE site_id = ? AND status = 'active' AND fcm_token IS NOT NULL`,
    [siteId]
  );

  if (subscribers.length === 0) {
    await executeQuery(
      `UPDATE campaigns SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [campaignId]
    );
    return { total: 0, sent: 0, failed: 0, unregistered: 0 };
  }

  const payload: FcmPayload = {
    title: c.title,
    body: c.body,
    icon: c.icon_url ?? undefined,
    image: c.image_url ?? undefined,
    click_url: c.click_url || `${process.env.NEXT_PUBLIC_SITE_URL || "https://prontly.com"}/`,
    action_buttons: c.action_buttons ? JSON.parse(c.action_buttons) : undefined,
  };

  const tokens = subscribers.map((s) => s.fcm_token);
  const results = await sendBatch(payload, tokens);

  const sent = results.filter((r) => r.success).length;
  const unregistered = results.filter((r) => r.error === "UNREGISTERED").length;
  const failed = results.filter((r) => !r.success && r.error !== "UNREGISTERED").length;

  const failedTokens: string[] = [];
  results.forEach((r, i) => {
    if (!r.success) failedTokens.push(subscribers[i].fcm_token);
  });

  await executeQuery(
    `UPDATE campaigns SET status = ?, sent_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [failed === 0 ? "sent" : "failed", campaignId]
  );

  await executeQuery(
    `INSERT INTO campaign_stats (campaign_id, sent_count, delivered_count, failed_count, updated_at)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(campaign_id) DO UPDATE SET
       sent_count = sent_count + ?,
       delivered_count = delivered_count + ?,
       failed_count = failed_count + ?,
       updated_at = CURRENT_TIMESTAMP`,
    [campaignId, tokens.length, sent, failed, tokens.length, sent, failed]
  );

  if (unregistered > 0) {
    await executeQuery(
      `UPDATE subscribers SET status = 'unsubscribed' WHERE fcm_token IN (${failedTokens.map(() => "?").join(",")})`,
      failedTokens
    );
  }

  for (const r of results) {
    await executeQuery(
      `INSERT INTO campaign_deliveries (id, campaign_id, subscriber_id, status, error, sent_at)
       VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [campaignId, r.success ? "unknown" : "unknown", r.success ? "sent" : "failed", r.error ?? null]
    );
  }

  return { total: tokens.length, sent, failed, unregistered };
}
