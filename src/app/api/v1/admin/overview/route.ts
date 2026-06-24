import { requireAuth, requireStaff } from "@/lib/auth/guards";
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
    await requireStaff(auth);

    const totalWorkspaces = await executeQuery<any>("SELECT COUNT(*) as count FROM workspaces");
    const totalUsers = await executeQuery<any>("SELECT COUNT(*) as count FROM users");
    const totalSites = await executeQuery<any>("SELECT COUNT(*) as count FROM sites");
    const totalSubscribers = await executeQuery<any>("SELECT COUNT(*) as count FROM subscribers WHERE status = 'active'");
    const totalCampaigns = await executeQuery<any>("SELECT COUNT(*) as count FROM campaigns WHERE status = 'sent'");

    const mrr = await executeQuery<any>(
      `SELECT COALESCE(SUM(p.price_monthly), 0) as mrr
       FROM subscriptions s JOIN plans p ON s.plan_id = p.id
       WHERE s.status = 'active'`
    );

    const failedPayments = await executeQuery<any>(
      "SELECT COUNT(*) as count FROM subscriptions WHERE status = 'past_due'"
    );

    const recentSignups = await executeQuery<any>(
      `SELECT DATE(created_at) as date, COUNT(*) as count
       FROM users WHERE created_at >= datetime('now', '-7 days')
       GROUP BY DATE(created_at) ORDER BY date`
    );

    const deliveryStats = await executeQuery<any>(
      `SELECT
        COALESCE(SUM(sent_count), 0) as total_sent,
        COALESCE(SUM(delivered_count), 0) as total_delivered,
        COALESCE(SUM(click_count), 0) as total_clicks
       FROM campaign_stats`
    );

    return ok({
      overview: {
        total_workspaces: totalWorkspaces[0]?.count || 0,
        total_users: totalUsers[0]?.count || 0,
        total_sites: totalSites[0]?.count || 0,
        total_subscribers: totalSubscribers[0]?.count || 0,
        total_campaigns_sent: totalCampaigns[0]?.count || 0,
        mrr: mrr[0]?.mrr || 0,
        failed_payments: failedPayments[0]?.count || 0,
      },
      delivery: deliveryStats[0] || { total_sent: 0, total_delivered: 0, total_clicks: 0 },
      recent_signups: recentSignups,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
