import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("siteId");
    const format = searchParams.get("format") ?? "json";
    const days = parseInt(searchParams.get("days") ?? "30");

    if (!siteId) return err("siteId is required", 400);

    const analytics = await executeQuery<any>(
      "SELECT * FROM analytics_daily WHERE site_id = ? ORDER BY date DESC LIMIT ?",
      [siteId, days]
    );

    if (format === "csv") {
      const header = "date,sent,delivered,clicked,dismissed\n";
      const rows = analytics.map((r: any) => [r.date, r.sent, r.delivered, r.clicked, r.dismissed].join(",")).join("\n");
      return new Response(header + rows, {
        headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="analytics-${siteId}.csv"` },
      });
    }

    return ok({ analytics });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
