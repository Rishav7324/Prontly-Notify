"use server";

import { auth } from "@/lib/firebase/admin";

export async function GET(request: Request) {
  const session = await auth.verifyRequest(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("siteId");
  const format = searchParams.get("format") ?? "json";

  if (!siteId) return Response.json({ error: "siteId is required" }, { status: 400 });

  const site = await session.env.DB.prepare("SELECT id FROM sites WHERE id = ? AND workspace_id = ?")
    .bind(siteId, session.workspaceId).first();
  if (!site) return Response.json({ error: "Site not found" }, { status: 404 });

  const { results } = await session.env.DB.prepare(
    `SELECT date, sent, delivered, clicked, dismissed
     FROM analytics_daily
     WHERE site_id = ?
     ORDER BY date DESC
     LIMIT 90`
  ).bind(siteId).all();

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
}
