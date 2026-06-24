import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { analyticsSummary } from "@/lib/ai/client";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const url = request.nextUrl;
    const siteId = url.searchParams.get("site_id");
    if (!siteId) return err("site_id is required", 400);
    await requireSiteAccess(auth, siteId);

    const days = parseInt(url.searchParams.get("days") || "30");
    const startDate = `datetime('now', '-${days} days')`;

    const stats = await executeQuery<any>(
      `SELECT
        COALESCE(SUM(cs.sent_count), 0) as sent,
        COALESCE(SUM(cs.delivered_count), 0) as delivered,
        COALESCE(SUM(cs.click_count), 0) as clicked
       FROM campaigns c
       LEFT JOIN campaign_stats cs ON cs.campaign_id = c.id
       WHERE c.site_id = ? AND c.sent_at >= ${startDate}`,
      [siteId]
    );

    const subscribers = await executeQuery<any>(
      `SELECT
        COUNT(*) as total,
        SUM(CASE WHEN subscribed_at >= ${startDate} THEN 1 ELSE 0 END) as new,
        SUM(CASE WHEN unsubscribed_at >= ${startDate} THEN 1 ELSE 0 END) as unsubscribed
       FROM subscribers WHERE site_id = ?`,
      [siteId]
    );

    const s = stats[0] || { sent: 0, delivered: 0, clicked: 0 };
    const sub = subscribers[0] || { total: 0, new: 0, unsubscribed: 0 };
    const ctr = s.delivered > 0 ? s.clicked / s.delivered : 0;

    const summary = await analyticsSummary({
      sent: s.sent,
      delivered: s.delivered,
      clicked: s.clicked,
      ctr,
      subscribers: { total: sub.total, new: sub.new, unsubscribed: sub.unsubscribed },
      period: {
        start: new Date(Date.now() - days * 86400000).toISOString(),
        end: new Date().toISOString(),
      },
    });

    return ok({
      summary: summary || "Analytics summary unavailable at this time.",
      metrics: {
        sent: s.sent,
        delivered: s.delivered,
        clicked: s.clicked,
        ctr: parseFloat((ctr * 100).toFixed(1)),
        subscribers: sub,
      },
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
