import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function GET() {
  try {
    const auth = await requireAuth();
    const sessions = await executeQuery<any>(
      "SELECT id, token, user_agent, ip, created_at, expires_at FROM sessions WHERE user_id = ? AND workspace_id = ? AND expires_at > datetime('now') ORDER BY created_at DESC",
      [auth.userId, auth.workspaceId]
    );
    return ok({ sessions });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST() {
  try {
    const auth = await requireAuth();
    const token = generateUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    await executeQuery(
      "INSERT INTO sessions (id, workspace_id, user_id, token, expires_at) VALUES (?, ?, ?, ?, ?)",
      [generateUUID(), auth.workspaceId, auth.userId, token, expiresAt]
    );
    return ok({ token, expiresAt });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requireAuth();
    const { id } = await request.json();
    if (!id) return err("Session ID required", 400);
    await executeQuery("DELETE FROM sessions WHERE id = ? AND user_id = ?", [id, auth.userId]);
    return ok({ revoked: true });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
