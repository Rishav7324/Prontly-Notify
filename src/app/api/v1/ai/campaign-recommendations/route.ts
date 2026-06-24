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
    if (!siteId) return err("siteId is required", 400);

    const campaigns = await executeQuery<any>(
      "SELECT id, title, status, stats, sent_at FROM campaigns WHERE site_id = ? AND status = 'sent' ORDER BY sent_at DESC LIMIT 10",
      [siteId]
    );

    const reco: any[] = [];
    if (campaigns.length === 0) {
      reco.push({ type: "first_campaign", title: "Send your first campaign", message: "Start engaging with your subscribers." });
    }
    if (campaigns.length > 3) {
      reco.push({ type: "a_b_test", title: "Try A/B testing", message: "Experiment with different message formats and timings." });
    }
    reco.push({ type: "best_time", title: "Best sending time", message: "Tuesday and Thursday mornings see highest engagement." });

    return ok({ recommendations: reco });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
