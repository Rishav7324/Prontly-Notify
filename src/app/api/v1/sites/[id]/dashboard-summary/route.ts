import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const subscriberStats = await executeQuery<any>(
      `SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN status = 'unsubscribed' THEN 1 ELSE 0 END) as unsubscribed,
        SUM(CASE WHEN subscribed_at >= datetime('now', '-7 days') THEN 1 ELSE 0 END) as new_7d
       FROM subscribers WHERE site_id = ?`,
      [id]
    );

    const campaignStats = await executeQuery<any>(
      `SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as drafts,
        SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) as sent,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
        SUM(CASE WHEN created_at >= datetime('now', '-30 days') THEN 1 ELSE 0 END) as last_30d
       FROM campaigns WHERE site_id = ?`,
      [id]
    );

    const recentCampaigns = await executeQuery<any>(
      `SELECT c.*, COALESCE(cs.sent_count, 0) as sent_count,
        COALESCE(cs.delivered_count, 0) as delivered_count,
        COALESCE(cs.click_count, 0) as click_count
       FROM campaigns c
       LEFT JOIN campaign_stats cs ON cs.campaign_id = c.id
       WHERE c.site_id = ? AND c.status IN ('sent', 'sending')
       ORDER BY c.updated_at DESC LIMIT 5`,
      [id]
    );

    const deliveryRate = await executeQuery<any>(
      `SELECT
        COALESCE(SUM(sent_count), 0) as total_sent,
        COALESCE(SUM(delivered_count), 0) as total_delivered,
        COALESCE(SUM(click_count), 0) as total_clicks
       FROM campaign_stats cs
       JOIN campaigns c ON cs.campaign_id = c.id
       WHERE c.site_id = ?`,
      [id]
    );

    const totals = deliveryRate[0] || {};
    const ctr = totals.total_delivered > 0
      ? ((totals.total_clicks / totals.total_delivered) * 100).toFixed(1)
      : "0.0";
    const deliverySuccess = totals.total_sent > 0
      ? ((totals.total_delivered / totals.total_sent) * 100).toFixed(1)
      : "0.0";

    // -- subscriber growth trend (daily cumulative over range) --
    const subscriberTrend = await executeQuery<any>(
      `SELECT date(subscribed_at) as label, COUNT(*) as value
       FROM subscribers
       WHERE site_id = ? AND subscribed_at >= datetime('now', '-30 days')
       GROUP BY date(subscribed_at)
       ORDER BY label ASC`,
      [id]
    );

    // -- recent activity (union of subscribers + campaigns) --
    const recentActivity = await executeQuery<any>(
      `SELECT id, 'subscriber' as type, 'New subscriber' as text, subscribed_at as timestamp
       FROM subscribers WHERE site_id = ? AND subscribed_at >= datetime('now', '-7 days')
       UNION ALL
       SELECT id, 'campaign' as type, 'Campaign sent: ' || title as text, sent_at as timestamp
       FROM campaigns WHERE site_id = ? AND status = 'sent' AND sent_at >= datetime('now', '-7 days')
       UNION ALL
       SELECT id, 'scheduled' as type, 'Campaign scheduled: ' || title as text, scheduled_at as timestamp
       FROM campaigns WHERE site_id = ? AND status = 'scheduled' AND scheduled_at >= datetime('now', '-7 days')
       ORDER BY timestamp DESC LIMIT 10`,
      [id, id, id]
    );

    return ok({
      subscribers: subscriberStats[0] || { total: 0, active: 0, unsubscribed: 0, new_7d: 0 },
      campaigns: campaignStats[0] || { total: 0, drafts: 0, sent: 0, scheduled: 0, last_30d: 0 },
      recent_campaigns: recentCampaigns,
      subscriber_trend: subscriberTrend,
      recent_activity: recentActivity,
      delivery: {
        total_sent: totals.total_sent || 0,
        total_delivered: totals.total_delivered || 0,
        total_clicks: totals.total_clicks || 0,
        ctr: parseFloat(ctr),
        delivery_rate: parseFloat(deliverySuccess),
      },
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
