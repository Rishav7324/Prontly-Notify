import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function GET() {
  try {
    const auth = await requireAuth();
    const user = await executeQuery<any>("SELECT is_staff FROM users WHERE id = ?", [auth.userId]);
    if (user.length === 0 || !user[0].is_staff) return err("Staff access required", 403);

    const [totalUsers, totalWorkspaces, totalSites, totalSubscribers, totalCampaigns] = await Promise.all([
      executeQuery<any>("SELECT COUNT(*) as count FROM users"),
      executeQuery<any>("SELECT COUNT(*) as count FROM workspaces"),
      executeQuery<any>("SELECT COUNT(*) as count FROM sites"),
      executeQuery<any>("SELECT COUNT(*) as count FROM subscribers WHERE is_active = true"),
      executeQuery<any>("SELECT COUNT(*) as count FROM campaigns"),
    ]);

    const recentErrors = await executeQuery<any>(
      "SELECT id, action, target_type, created_at FROM audit_logs WHERE action LIKE '%error%' OR action LIKE '%fail%' ORDER BY created_at DESC LIMIT 20"
    );

    return ok({
      stats: {
        totalUsers: totalUsers[0]?.count ?? 0,
        totalWorkspaces: totalWorkspaces[0]?.count ?? 0,
        totalSites: totalSites[0]?.count ?? 0,
        totalSubscribers: totalSubscribers[0]?.count ?? 0,
        totalCampaigns: totalCampaigns[0]?.count ?? 0,
      },
      recentErrors,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
