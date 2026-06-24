"use server";

import { auth } from "@/lib/firebase/admin";

export async function GET(request: Request) {
  const session = await auth.verifyRequest(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("siteId");
  const format = searchParams.get("format") ?? "csv";

  if (!siteId) return Response.json({ error: "siteId is required" }, { status: 400 });

  const site = await session.env.DB.prepare("SELECT id FROM sites WHERE id = ? AND workspace_id = ?")
    .bind(siteId, session.workspaceId).first();
  if (!site) return Response.json({ error: "Site not found" }, { status: 404 });

  const { results } = await session.env.DB.prepare(
    "SELECT endpoint, browser, os, device, country, city, subscribed_at, last_seen_at, is_active FROM subscribers WHERE site_id = ?"
  ).bind(siteId).all();

  if (format === "json") {
    return Response.json({ subscribers: results });
  }

  const header = "endpoint,browser,os,device,country,city,subscribed_at,last_seen_at,is_active\n";
  const rows = (results as Record<string, unknown>[]).map((r: Record<string, unknown>) =>
    [r.endpoint, r.browser, r.os, r.device, r.country, r.city, r.subscribed_at, r.last_seen_at, r.is_active]
      .map((v) => `"${String(v ?? "")}"`).join(",")
  ).join("\n");

  return new Response(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="subscribers-${siteId}.csv"`,
    },
  });
}
