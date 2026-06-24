"use server";

import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth();
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("siteId");
    const format = searchParams.get("format") ?? "csv";

    if (!siteId) return Response.json({ error: "siteId is required" }, { status: 400 });

    const sites = await executeQuery(
      "SELECT id FROM sites WHERE id = ? AND workspace_id = ?",
      [siteId, auth.workspaceId]
    );
    if (!sites || sites.length === 0) return Response.json({ error: "Site not found" }, { status: 404 });

    const results = await executeQuery(
      "SELECT endpoint, browser, os, device, country, city, subscribed_at, last_seen_at, is_active FROM subscribers WHERE site_id = ?",
      [siteId]
    );

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
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
