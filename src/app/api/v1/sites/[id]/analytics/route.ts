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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const url = request.nextUrl;
    const startDate = url.searchParams.get("start") || "30";
    const endDate = url.searchParams.get("end") || "0";

    let startClause: string;
    let endClause: string;

    if (startDate.match(/^\d+$/)) {
      startClause = `datetime('now', '-${startDate} days')`;
    } else {
      startClause = `'${startDate}'`;
    }
    if (endDate.match(/^\d+$/)) {
      endClause = endDate === "0" ? "datetime('now')" : `datetime('now', '-${endDate} days')`;
    } else {
      endClause = `'${endDate}'`;
    }

    const subscriberGrowth = await executeQuery<any>(
      `SELECT DATE(subscribed_at) as date, COUNT(*) as count
       FROM subscribers WHERE site_id = ? AND subscribed_at >= ${startClause}
       GROUP BY DATE(subscribed_at) ORDER BY date`,
      [id]
    );

    const sendsByDay = await executeQuery<any>(
      `SELECT DATE(c.sent_at) as date,
        COUNT(*) as campaign_count,
        COALESCE(SUM(cs.sent_count), 0) as sent,
        COALESCE(SUM(cs.delivered_count), 0) as delivered,
        COALESCE(SUM(cs.click_count), 0) as clicks
       FROM campaigns c
       LEFT JOIN campaign_stats cs ON cs.campaign_id = c.id
       WHERE c.site_id = ? AND c.sent_at >= ${startClause}
       GROUP BY DATE(c.sent_at) ORDER BY date`,
      [id]
    );

    const browserBreakdown = await executeQuery<any>(
      `SELECT browser, COUNT(*) as count
       FROM subscribers WHERE site_id = ? AND status = 'active'
       GROUP BY browser ORDER BY count DESC`,
      [id]
    );

    const osBreakdown = await executeQuery<any>(
      `SELECT os, COUNT(*) as count
       FROM subscribers WHERE site_id = ? AND status = 'active'
       GROUP BY os ORDER BY count DESC`,
      [id]
    );

    const countryBreakdown = await executeQuery<any>(
      `SELECT country, COUNT(*) as count
       FROM subscribers WHERE site_id = ? AND status = 'active' AND country IS NOT NULL
       GROUP BY country ORDER BY count DESC LIMIT 10`,
      [id]
    );

    const totalDelivery = await executeQuery<any>(
      `SELECT
        COALESCE(SUM(cs.sent_count), 0) as total_sent,
        COALESCE(SUM(cs.delivered_count), 0) as total_delivered,
        COALESCE(SUM(cs.click_count), 0) as total_clicks,
        COUNT(DISTINCT c.id) as total_campaigns
       FROM campaigns c
       LEFT JOIN campaign_stats cs ON cs.campaign_id = c.id
       WHERE c.site_id = ? AND c.sent_at >= ${startClause}`,
      [id]
    );

    const td = totalDelivery[0] || {};
    const ctr = td.total_delivered > 0
      ? ((td.total_clicks / td.total_delivered) * 100).toFixed(1)
      : "0.0";

    return ok({
      summary: {
        total_sent: td.total_sent || 0,
        total_delivered: td.total_delivered || 0,
        total_clicks: td.total_clicks || 0,
        total_campaigns: td.total_campaigns || 0,
        ctr: parseFloat(ctr),
      },
      subscriber_growth: subscriberGrowth,
      sends_by_day: sendsByDay,
      breakdowns: {
        browsers: browserBreakdown,
        os: osBreakdown,
        countries: countryBreakdown,
      },
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
