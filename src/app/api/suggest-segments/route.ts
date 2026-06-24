"use server";

import { auth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  const session = await auth.verifyRequest(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { siteId, description } = await request.json();
  if (!siteId) return Response.json({ error: "siteId is required" }, { status: 400 });

  const site = await session.env.DB.prepare("SELECT id FROM sites WHERE id = ? AND workspace_id = ?")
    .bind(siteId, session.workspaceId).first();
  if (!site) return Response.json({ error: "Site not found" }, { status: 404 });

  const { results: subscribers } = await session.env.DB.prepare(
    "SELECT browser, os, country, tags, is_active FROM subscribers WHERE site_id = ?"
  ).bind(siteId).all();

  const rows = subscribers as Record<string, unknown>[];
  const activeCount = rows.filter(r => r.is_active).length;
  const tagFrequency: Record<string, number> = {};
  for (const r of rows) {
    const tags = r.tags as string[];
    if (Array.isArray(tags)) {
      for (const tag of tags) {
        tagFrequency[tag] = (tagFrequency[tag] ?? 0) + 1;
      }
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
        const d = r.subscribed_at as string;
        return d && (Date.now() - new Date(d).getTime()) < 7 * 86400000;
      }).length,
      rules: [{ id: "2", attribute: "subscribed_days", operator: "less_than", value: "7" }],
    },
  ];

  if (topTags.length > 0) {
    suggestions.push({
      name: `Tag: ${topTags[0]}`,
      description: `Subscribers tagged with "${topTags[0]}"`,
      estimatedCount: rows.filter(r => (r.tags as string[])?.includes(topTags[0])).length,
      rules: [{ id: "3", attribute: "tag", operator: "contains", value: topTags[0] }],
    });
  }

  return Response.json({ suggestions });
}
