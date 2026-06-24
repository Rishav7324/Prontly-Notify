import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { suggestSendTime } from "@/lib/ai/client";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const body = await request.json();
    const siteId = body.site_id;

    const history = await executeQuery<any>(
      `SELECT CAST(strftime('%H', c.sent_at) AS INTEGER) as hour,
        CASE WHEN SUM(cs.delivered_count) > 0
          THEN CAST(SUM(cs.click_count) AS REAL) / SUM(cs.delivered_count)
          ELSE 0 END as ctr
       FROM campaigns c
       JOIN campaign_stats cs ON cs.campaign_id = c.id
       WHERE c.site_id = ? AND c.sent_at IS NOT NULL
       GROUP BY hour ORDER BY hour`,
      [siteId]
    );

    const suggestion = await suggestSendTime(
      history.map((h: any) => ({ hour: h.hour, ctr: h.ctr }))
    );

    return ok({ suggestion, based_on: history.length > 0 ? "historical_data" : "default" });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
