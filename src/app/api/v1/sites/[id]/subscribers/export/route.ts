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
    const format = searchParams.get("format") ?? "csv";

    if (!siteId) return err("siteId is required", 400);

    const subscribers = await executeQuery<any>(
      "SELECT endpoint, browser, os, device, country, city, subscribed_at, last_seen_at, is_active FROM subscribers WHERE site_id = ?",
      [siteId]
    );

    if (format === "json") {
      return ok({ subscribers });
    }

    const header = "endpoint,browser,os,device,country,city,subscribed_at,last_seen_at,is_active\n";
    const rows = subscribers.map((r: any) =>
      [r.endpoint, r.browser, r.os, r.device, r.country, r.city, r.subscribed_at, r.last_seen_at, r.is_active]
        .map((v: any) => `"${v ?? ""}"`).join(",")
    ).join("\n");

    return new Response(header + rows, {
      headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="subscribers-${siteId}.csv"` },
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
