"use server";

import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth();
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("siteId");
    const format = searchParams.get("format") ?? "json";

    if (!siteId) return Response.json({ error: "siteId is required" }, { status: 400 });

    const sites = await executeQuery(
      "SELECT id FROM sites WHERE id = ? AND workspace_id = ?",
      [siteId, auth.workspaceId]
    );
    if (!sites || sites.length === 0) return Response.json({ error: "Site not found" }, { status: 404 });

    const results = await executeQuery(
      "SELECT date, sent, delivered, clicked, dismissed FROM analytics_daily WHERE site_id = ? ORDER BY date DESC LIMIT 90",
      [siteId]
    );

    if (format === "csv") {
      const header = "date,sent,delivered,clicked,dismissed\n";
      const rows = (results as Record<string, unknown>[]).map((r: Record<string, unknown>) =>
        [r.date, r.sent, r.delivered, r.clicked, r.dismissed].join(",")
      ).join("\n");
      return new Response(header + rows, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="analytics-${siteId}.csv"`,
        },
      });
    }

    return Response.json({ analytics: results });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
