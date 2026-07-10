import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { verifyIdToken } from "@/lib/auth/firebase-admin";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any, meta?: any) {
  return Response.json({ success: true, data, ...(meta ? { meta } : {}) });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET() {
  try {
    const auth = await requireAuth();
    const users = await executeQuery<any>(
      "SELECT id, email, name, avatar_url, email_verified, is_staff, notification_prefs, last_login_at, created_at FROM users WHERE id = ?",
      [auth.userId]
    );
    if (users.length === 0) return err("User not found", 404);

    const workspaces = await executeQuery<any>(
      `SELECT w.*, p.name as plan_name, p.subscriber_limit, p.site_limit
       FROM workspaces w
       JOIN plans p ON w.plan_id = p.id
       JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = ?
       WHERE wm.status = 'active'`,
      [auth.userId]
    );

    return ok({ user: users[0], workspaces });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return err("Unauthorized", 401);
    }
    const decoded = await verifyIdToken(authHeader.slice(7));
    const firebaseUid = decoded.uid;

    const body = await request.json();

    if (!body.name || !body.email) {
      return err("Name and email are required", 400);
    }

    const existing = await executeQuery<any>(
      "SELECT id FROM users WHERE firebase_uid = ?",
      [firebaseUid]
    );

    if (existing.length > 0) {
      await executeQuery(
        "UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [body.name, body.email, existing[0].id]
      );
      return ok({ id: existing[0].id });
    }

    const id = generateUUID();
    await executeQuery(
      "INSERT INTO users (id, firebase_uid, email, name) VALUES (?, ?, ?, ?)",
      [id, firebaseUid, body.email, body.name]
    );

    const planId = body.plan || "free";

    const workspaceId = generateUUID();
    await executeQuery(
      "INSERT INTO workspaces (id, owner_user_id, name, plan_id) VALUES (?, ?, ?, ?)",
      [workspaceId, id, `${body.name}'s Workspace`, planId]
    );

    await executeQuery(
      "INSERT INTO workspace_members (id, workspace_id, user_id, invited_email, role, status) VALUES (?, ?, ?, ?, 'owner', 'active')",
      [generateUUID(), workspaceId, id, body.email]
    );

    return Response.json({ success: true, data: { id, workspaceId } }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
