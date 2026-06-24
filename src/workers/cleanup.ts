// Data retention and cleanup worker
// Runs daily to:
// 1. Prune campaign_deliveries older than 90 days
// 2. Expire stale sessions
// 3. Clean up unsubscribed subscriber data

import { executeQuery } from "@/lib/db";

export async function runCleanupCycle() {
  const results: Record<string, number> = {};

  // Prune old delivery records (90-day retention)
  const prunedDeliveries = await executeQuery<{ changes: number }[]>(
    "DELETE FROM campaign_deliveries WHERE sent_at IS NOT NULL AND sent_at <= datetime('now', '-90 days')"
  );
  results.prunedDeliveries = prunedDeliveries[0]?.changes ?? 0;

  // Expire stale sessions
  const expiredSessions = await executeQuery<{ changes: number }[]>(
    "DELETE FROM sessions WHERE expires_at <= datetime('now')"
  );
  results.expiredSessions = expiredSessions[0]?.changes ?? 0;

  // Clean up unsubscribed subscriber attributes after 30 days
  const cleanedAttrs = await executeQuery<{ changes: number }[]>(
    "DELETE FROM subscriber_attributes WHERE subscriber_id IN (SELECT id FROM subscribers WHERE status = 'unsubscribed' AND unsubscribed_at <= datetime('now', '-30 days'))"
  );
  results.cleanedAttributes = cleanedAttrs[0]?.changes ?? 0;

  // Soft-delete old unsubscribed subscriber records (mark as inactive, remove PII)
  await executeQuery(
    `UPDATE subscribers SET endpoint = NULL, fcm_token = NULL, auth_key = NULL, p256dh_key = NULL,
            browser = NULL, os = NULL, device = NULL, country = NULL, city = NULL,
            is_active = false
     WHERE status = 'unsubscribed' AND unsubscribed_at <= datetime('now', '-30 days')`
  );

  return results;
}
