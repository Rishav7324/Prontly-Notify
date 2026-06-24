import { NextRequest } from "next/server";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { teamInviteSchema } from "@/lib/validation";

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

    const members = await executeQuery<any>(
      `SELECT wm.id, wm.role, wm.site_access, wm.status, wm.invited_at, wm.joined_at,
        u.id as user_id, u.email, u.name, u.avatar_url
       FROM workspace_members wm
       LEFT JOIN users u ON wm.user_id = u.id
       WHERE wm.workspace_id = ? AND wm.status IN ('active', 'pending')
       ORDER BY wm.joined_at DESC NULLS LAST, wm.invited_at DESC`,
      [auth.workspaceId]
    );

    return ok(members);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    await requireRole(auth, ["owner", "admin"]);

    const body = await request.json();
    const parsed = teamInviteSchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    const workspace = await executeQuery<any>(
      "SELECT p.team_seat_limit FROM workspaces w JOIN plans p ON w.plan_id = p.id WHERE w.id = ?",
      [auth.workspaceId]
    );
    if (workspace.length === 0) return err("Workspace not found", 404);

    const currentMembers = await executeQuery<any>(
      "SELECT COUNT(*) as count FROM workspace_members WHERE workspace_id = ? AND status = 'active'",
      [auth.workspaceId]
    );

    const limit = workspace[0].team_seat_limit;
    if (limit !== -1 && currentMembers[0].count >= limit) {
      return err(`Team seat limit reached (${limit}). Upgrade your plan to add more team members.`, 403);
    }

    const existingUser = await executeQuery<any>(
      "SELECT id FROM users WHERE email = ?",
      [parsed.data.email.toLowerCase()]
    );

    const existingMember = await executeQuery<any>(
      "SELECT id FROM workspace_members WHERE workspace_id = ? AND invited_email = ?",
      [auth.workspaceId, parsed.data.email.toLowerCase()]
    );
    if (existingMember.length > 0) {
      return err("This email has already been invited", 409);
    }

    const id = generateUUID();
    const siteAccess = parsed.data.site_access
      ? JSON.stringify(parsed.data.site_access)
      : '"all"';

    await executeQuery(
      "INSERT INTO workspace_members (id, workspace_id, user_id, invited_email, role, site_access, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        auth.workspaceId,
        existingUser[0]?.id || null,
        parsed.data.email.toLowerCase(),
        parsed.data.role,
        siteAccess,
        existingUser[0] ? "active" : "pending",
      ]
    );

    const member = (await executeQuery<any>(
      "SELECT * FROM workspace_members WHERE id = ?",
      [id]
    ))[0];

    return Response.json({ success: true, data: member }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
