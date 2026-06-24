"use server";

import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const auth = await requireAuth();
    const { siteId } = await request.json();

    if (!siteId) return Response.json({ error: "siteId is required" }, { status: 400 });

    const sites = await executeQuery(
      "SELECT id FROM sites WHERE id = ? AND workspace_id = ?",
      [siteId, auth.workspaceId]
    );
    if (!sites || sites.length === 0) return Response.json({ error: "Site not found" }, { status: 404 });

    const subscribers = await executeQuery<{ browser: string; os: string; country: string; tags: string; is_active: number; subscribed_at: string }[]>(
      "SELECT browser, os, country, tags, is_active, subscribed_at FROM subscribers WHERE site_id = ?",
      [siteId]
    );

    const rows = subscribers as { browser: string; os: string; country: string; tags: string; is_active: number; subscribed_at: string }[];
    const activeCount = rows.filter(r => r.is_active).length;

    const tagFrequency: Record<string, number> = {};
    for (const r of rows) {
      let tags: string[] = [];
      try { tags = JSON.parse(r.tags ?? "[]"); } catch { tags = []; }
      for (const tag of tags) {
        tagFrequency[tag] = (tagFrequency[tag] ?? 0) + 1;
      }
    }
    const topTags = Object.entries(tagFrequency).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([tag]) => tag);

    const suggestions = [
      {
        name: "Active subscribers",
        description: "Subscribers who have been active in the last 30 days",
        estimatedCount: activeCount,
        rules: [{ id: "1", attribute: "last_seen_days", operator: "less_than", value: "30" }],
      },
      {
        name: "New subscribers (last 7 days)",
        description: "Subscribers who joined in the past week",
        estimatedCount: rows.filter(r => {
          return r.subscribed_at && (Date.now() - new Date(r.subscribed_at).getTime()) < 7 * 86400000;
        }).length,
        rules: [{ id: "2", attribute: "subscribed_days", operator: "less_than", value: "7" }],
      },
    ];

    if (topTags.length > 0) {
      suggestions.push({
        name: `Tag: ${topTags[0]}`,
        description: `Subscribers tagged with "${topTags[0]}"`,
        estimatedCount: rows.filter(r => {
          let tags: string[] = [];
          try { tags = JSON.parse(r.tags ?? "[]"); } catch { tags = []; }
          return tags.includes(topTags[0]);
        }).length,
        rules: [{ id: "3", attribute: "tag", operator: "contains", value: topTags[0] }],
      });
    }

    return Response.json({ suggestions });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
