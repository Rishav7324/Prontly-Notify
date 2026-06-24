"use server";

import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const auth = await requireAuth();
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) return Response.json({ error: "siteId is required" }, { status: 400 });

    const sites = await executeQuery(
      "SELECT id FROM sites WHERE id = ? AND workspace_id = ?",
      [siteId, auth.workspaceId]
    );
    if (!sites || sites.length === 0) return Response.json({ error: "Site not found" }, { status: 404 });

    const campaigns = await executeQuery(
      "SELECT id, title, status, stats, sent_at FROM campaigns WHERE site_id = ? AND status = 'sent' ORDER BY sent_at DESC LIMIT 10",
      [siteId]
    );

    const sentCount = (campaigns as Record<string, unknown>[]).length;
    const highPerforming = (campaigns as Record<string, unknown>[]).filter((c: Record<string, unknown>) => {
      const stats = typeof c.stats === "string" ? JSON.parse(c.stats as string) : c.stats as Record<string, unknown>;
      return (stats?.clickRate as number ?? 0) > 10;
    });

    const recommendations = [];

    if (sentCount === 0) {
      recommendations.push({
        type: "first_campaign",
        title: "Send your first campaign",
        message: "Start engaging with your subscribers by sending a welcome notification campaign.",
      });
    }

    if (highPerforming.length > 2) {
      recommendations.push({
        type: "repeat_success",
        title: "Your campaigns are performing well",
        message: `Your last ${highPerforming.length} campaigns have above-average click rates. Consider increasing send frequency.`,
      });
    }

    if (sentCount > 5) {
      recommendations.push({
        type: "a_b_test",
        title: "Try A/B testing",
        message: "Experiment with different message formats and timings to optimize engagement.",
      });
    }

    recommendations.push({
      type: "best_time",
      title: "Best sending time",
      message: "Based on industry benchmarks, Tuesday and Thursday mornings typically see the highest engagement.",
    });

    return Response.json({ recommendations });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
