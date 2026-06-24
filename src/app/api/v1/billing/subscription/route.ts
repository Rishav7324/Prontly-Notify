import { requireAuth, requireRole } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET() {
  try {
    const auth = await requireAuth();
    await requireRole(auth, ["owner", "admin"]);

    const subscriptions = await executeQuery<any>(
      `SELECT s.*, p.name as plan_name, p.price_monthly, p.price_annual,
        p.subscriber_limit, p.site_limit, p.ai_credit_limit, p.team_seat_limit, p.features
       FROM subscriptions s
       JOIN plans p ON s.plan_id = p.id
       WHERE s.workspace_id = ?`,
      [auth.workspaceId]
    );

    const currentSub = subscriptions[0] || null;

    const aiUsage = await executeQuery<any>(
      "SELECT COALESCE(SUM(credits_used), 0) as used FROM ai_usage WHERE workspace_id = ? AND month = ?",
      [auth.workspaceId, new Date().toISOString().slice(0, 7)]
    );

    const siteCount = await executeQuery<any>(
      "SELECT COUNT(*) as count FROM sites WHERE workspace_id = ?",
      [auth.workspaceId]
    );

    const subscriberCount = await executeQuery<any>(
      `SELECT COUNT(*) as count FROM subscribers s
       JOIN sites st ON s.site_id = st.id
       WHERE st.workspace_id = ? AND s.status = 'active'`,
      [auth.workspaceId]
    );

    return ok({
      subscription: currentSub,
      usage: {
        sites: siteCount[0]?.count || 0,
        subscribers: subscriberCount[0]?.count || 0,
        ai_credits: aiUsage[0]?.used || 0,
      },
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
