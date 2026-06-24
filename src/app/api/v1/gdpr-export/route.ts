import { requireAuth } from "@/lib/auth/guards";
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

    const user = await executeQuery<any>(
      "SELECT id, firebase_uid, email, name, avatar_url, created_at FROM users WHERE id = ?",
      [auth.userId]
    );
    if (!user[0]) return err("User not found", 404);

    const workspace = await executeQuery<any>(
      "SELECT * FROM workspaces WHERE id = ?",
      [auth.workspaceId]
    );

    const sites = await executeQuery<any>(
      "SELECT id, name, domain, created_at FROM sites WHERE workspace_id = ?",
      [auth.workspaceId]
    );

    const subscribers = await executeQuery<any>(
      `SELECT id, endpoint, user_agent, subscribed_at, status, created_at
       FROM subscribers WHERE site_id IN (SELECT id FROM sites WHERE workspace_id = ?)`,
      [auth.workspaceId]
    );

    const campaigns = await executeQuery<any>(
      `SELECT id, title, status, sent_at, created_at
       FROM campaigns WHERE site_id IN (SELECT id FROM sites WHERE workspace_id = ?)`,
      [auth.workspaceId]
    );

    const auditLogs = await executeQuery<any>(
      "SELECT * FROM audit_logs WHERE workspace_id = ? ORDER BY created_at DESC LIMIT 100",
      [auth.workspaceId]
    );

    const data = {
      exported_at: new Date().toISOString(),
      user: user[0],
      workspace: workspace[0] || null,
      sites,
      subscribers,
      campaigns,
      audit_logs: auditLogs,
    };

    return ok(data);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
