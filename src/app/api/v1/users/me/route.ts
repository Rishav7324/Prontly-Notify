import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function GET() {
  try {
    const auth = await requireAuth();
    const users = await executeQuery<any>(
      "SELECT id, email, name, avatar_url, email_verified, is_staff, staff_role, notification_prefs, last_login_at, created_at FROM users WHERE id = ?",
      [auth.userId]
    );
    if (users.length === 0) return err("User not found", 404);

    const workspaces = await executeQuery<any>(
      `SELECT w.*, p.name as plan_name, p.subscriber_limit, p.site_limit, p.ai_credit_limit, p.team_seat_limit
       FROM workspaces w JOIN plans p ON w.plan_id = p.id
       JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = ?
       WHERE wm.status = 'active'`,
      [auth.userId]
    );

    const unreadCounts = await executeQuery<any>(
      "SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND read_at IS NULL", [auth.userId]
    );

    return ok({ user: users[0], workspaces, unreadNotifications: unreadCounts[0]?.count ?? 0 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const body = await request.json();
    const allowedFields = ["name", "avatar_url", "notification_prefs"];
    const sets: string[] = [];
    const params: any[] = [];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        sets.push(`${field} = ?`);
        params.push(typeof body[field] === "object" ? JSON.stringify(body[field]) : body[field]);
      }
    }

    if (sets.length === 0) return err("No valid fields to update", 400);

    sets.push("updated_at = CURRENT_TIMESTAMP");
    params.push(auth.userId);
    await executeQuery(`UPDATE users SET ${sets.join(", ")} WHERE id = ?`, params);

    const users = await executeQuery<any>("SELECT id, email, name, avatar_url, email_verified, notification_prefs FROM users WHERE id = ?", [auth.userId]);
    return ok(users[0]);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
