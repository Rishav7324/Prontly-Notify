import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const { siteId } = await request.json();
    if (!siteId) return err("siteId is required", 400);

    const subscribers = await executeQuery<any>(
      "SELECT browser, os, country, tags, is_active, subscribed_at FROM subscribers WHERE site_id = ?",
      [siteId]
    );

    const activeCount = subscribers.filter((s: any) => s.is_active).length;
    const tagFreq: Record<string, number> = {};
    for (const s of subscribers) {
      let tags: string[] = [];
      try { tags = JSON.parse(s.tags ?? "[]"); } catch { tags = []; }
      for (const t of tags) tagFreq[t] = (tagFreq[t] ?? 0) + 1;
    }
    const topTags = Object.entries(tagFreq).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([t]) => t);

    const suggestions = [
      { name: "Active subscribers", description: "Active in the last 30 days", estimatedCount: activeCount, rules: [] },
      { name: "New subscribers (7 days)", description: "Joined in the past week", estimatedCount: 0, rules: [] },
    ];

    if (topTags.length > 0) {
      suggestions.push({ name: `Tag: ${topTags[0]}`, description: `Tagged with "${topTags[0]}"`, estimatedCount: 0, rules: [] });
    }

    return ok({ suggestions });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
