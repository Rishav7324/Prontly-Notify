// Delivery Cron Worker
// Runs every minute to send pending campaign notifications via FCM
// Called via Vercel CRON or a separate cron job service

import { executeQuery } from "@/lib/db";
import { sendNotification } from "@/lib/fcm/client";
import { incrementCampaignStat } from "@/lib/db/queries/campaigns";
import { incrementAnalytics } from "@/lib/db/queries/analytics";

interface PendingDelivery {
  id: string;
  campaign_id: string;
  subscriber_id: string;
  site_id: string;
  fcm_token: string;
  title: string;
  body: string;
  icon_url: string | null;
  click_url: string | null;
  action_buttons: string;
}

export async function processPendingDeliveries(batchSize = 50) {
  const pending = await executeQuery<PendingDelivery[]>(
    `SELECT cd.id, cd.campaign_id, cd.subscriber_id, c.site_id,
            sub.fcm_token,
            c.title, c.body, c.icon_url, c.click_url, c.action_buttons
     FROM campaign_deliveries cd
     JOIN campaigns c ON c.id = cd.campaign_id
     JOIN subscribers sub ON sub.id = cd.subscriber_id
     WHERE cd.status = 'pending'
     LIMIT ?`,
    [batchSize]
  );

  let delivered = 0;
  let failed = 0;

  for (const delivery of pending) {
    try {
      if (!delivery.fcm_token) {
        await executeQuery("UPDATE campaign_deliveries SET status = 'failed', error_code = 'no_fcm_token', delivered_at = datetime('now') WHERE id = ?", [delivery.id]);
        failed++;
        continue;
      }
      await sendNotification(
        {
          title: delivery.title,
          body: delivery.body,
          icon: delivery.icon_url ?? undefined,
          click_url: delivery.click_url ?? "",
          action_buttons: delivery.action_buttons ? JSON.parse(delivery.action_buttons) : [],
        },
        delivery.fcm_token
      );

      await executeQuery(
        "UPDATE campaign_deliveries SET status = 'delivered', delivered_at = datetime('now') WHERE id = ?",
        [delivery.id]
      );
      await incrementCampaignStat(delivery.campaign_id, "delivered_count");
      const today = new Date().toISOString().slice(0, 10);
      await incrementAnalytics(delivery.site_id, today, "delivered");
      delivered++;
    } catch (error: any) {
      await executeQuery(
        "UPDATE campaign_deliveries SET status = 'failed', error_code = ?, delivered_at = datetime('now') WHERE id = ?",
        [error.message ?? "unknown", delivery.id]
      );
      await incrementCampaignStat(delivery.campaign_id, "failed_count");
      failed++;
    }
  }

  return { delivered, failed, total: pending.length };
}

export async function processAutomationTriggers() {
  // Process new_subscriber automations
  const newSubscribers = await executeQuery<any>(
    `SELECT s.id as subscriber_id, a.id as automation_id, a.site_id
     FROM subscribers s
     JOIN automations a ON a.site_id = s.site_id AND a.trigger_type = 'new_subscriber' AND a.status = 'active'
     WHERE s.subscribed_at >= datetime('now', '-1 minute')
     AND NOT EXISTS (SELECT 1 FROM automation_runs ar WHERE ar.automation_id = a.id AND ar.subscriber_id = s.id)`
  );

  for (const ns of newSubscribers) {
    const steps = await executeQuery<any>(
      "SELECT id FROM automation_steps WHERE automation_id = ? ORDER BY step_order LIMIT 1",
      [ns.automation_id]
    );
    if (steps.length > 0) {
      const runId = crypto.randomUUID();
      await executeQuery(
        "INSERT INTO automation_runs (id, automation_id, subscriber_id, current_step_id, status) VALUES (?, ?, ?, ?, 'active')",
        [runId, ns.automation_id, ns.subscriber_id, steps[0].id]
      );
    }
  }

  // Process inactive_days automations
  const inactiveTriggers = await executeQuery<any>(
    `SELECT a.id as automation_id, a.trigger_config, a.site_id
     FROM automations a
     WHERE a.trigger_type = 'inactive_days' AND a.status = 'active'`
  );

  for (const trigger of inactiveTriggers) {
    const config = JSON.parse(trigger.trigger_config ?? "{}");
    const days = config.days ?? 7;
    const subscribers = await executeQuery<any>(
      `SELECT s.id FROM subscribers s
       WHERE s.site_id = ? AND s.is_active = true
       AND (s.last_seen_at IS NULL OR s.last_seen_at <= datetime('now', '-? days'))
       AND NOT EXISTS (SELECT 1 FROM automation_runs ar WHERE ar.automation_id = ? AND ar.subscriber_id = s.id AND ar.status = 'active')`,
      [trigger.site_id, days, trigger.automation_id]
    );
    // Start automation runs for these subscribers
    for (const sub of subscribers) {
      const steps = await executeQuery<any>(
        "SELECT id FROM automation_steps WHERE automation_id = ? ORDER BY step_order LIMIT 1",
        [trigger.automation_id]
      );
      if (steps.length > 0) {
        await executeQuery(
          "INSERT INTO automation_runs (id, automation_id, subscriber_id, current_step_id, status) VALUES (?, ?, ?, ?, 'active')",
          [crypto.randomUUID(), trigger.automation_id, sub.id, steps[0].id]
        );
      }
    }
  }
}

export async function runCronCycle() {
  const deliveryResult = await processPendingDeliveries();
  await processAutomationTriggers();
  return { deliveries: deliveryResult };
}
