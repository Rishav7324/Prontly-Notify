import { NextRequest } from "next/server";
import { requireAuth, requireStaff } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    await requireStaff(auth);

    const { id } = await params;
    const body = await _req.json();

    if (!body.reason || body.reason.trim().length === 0) {
      return err("Reason is required for suspension", 400);
    }

    const workspace = await executeQuery<any>(
      "SELECT * FROM workspaces WHERE id = ?",
      [id]
    );
    if (workspace.length === 0) return err("Workspace not found", 404);

    const sites = await executeQuery<any>(
      "SELECT id FROM sites WHERE workspace_id = ?",
      [id]
    );

    for (const site of sites) {
      await executeQuery(
        "UPDATE sites SET sending_enabled = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [site.id]
      );
    }

    await executeQuery(
      "UPDATE subscriptions SET status = 'canceled', updated_at = CURRENT_TIMESTAMP WHERE workspace_id = ?",
      [id]
    );

    await executeQuery(
      "INSERT INTO audit_logs (id, actor_user_id, action, target_type, target_id, reason, metadata) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        generateUUID(),
        auth.userId,
        "account.suspend",
        "workspace",
        id,
        body.reason,
        JSON.stringify({ site_count: sites.length }),
      ]
    );

    return ok({ suspended: true, site_count: sites.length });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
