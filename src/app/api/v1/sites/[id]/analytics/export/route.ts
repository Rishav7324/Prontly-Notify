import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

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
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    if (!startDate || !endDate) {
      return err("startDate and endDate query parameters are required", 400);
    }

    const campaigns = await executeQuery<any>(
      `SELECT c.title, c.status, c.sent_at,
        COALESCE(cs.sent_count, 0) as sent,
        COALESCE(cs.delivered_count, 0) as delivered,
        COALESCE(cs.click_count, 0) as clicks,
        COALESCE(cs.dismissed_count, 0) as dismissed
       FROM campaigns c
       LEFT JOIN campaign_stats cs ON cs.campaign_id = c.id
       WHERE c.site_id = ?
        AND c.sent_at IS NOT NULL
        AND c.sent_at >= ? AND c.sent_at <= ?
       ORDER BY c.sent_at DESC`,
      [id, startDate, endDate]
    );

    const header = "title,status,sent_at,sent,delivered,clicks,dismissed\n";
    const rows = campaigns.map((r: any) =>
      [
        `"${(r.title || "").replace(/"/g, '""')}"`,
        r.status,
        r.sent_at || "",
        r.sent,
        r.delivered,
        r.clicks,
        r.dismissed,
      ].join(",")
    ).join("\n");

    const csv = "\uFEFF" + header + rows;

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="analytics-${id}-${startDate}-to-${endDate}.csv"`,
      },
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
