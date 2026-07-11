import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;

    const membership = await executeQuery<any>(
      "SELECT role FROM workspace_members WHERE workspace_id = ? AND user_id = ? AND status = 'active'",
      [id, auth.userId]
    );
    if (membership.length === 0) {
      return err("No access to this workspace", 403);
    }

    const body = await request.json();
    const sets: string[] = [];
    const values: any[] = [];

    if (typeof body.name === "string" && body.name.trim()) {
      sets.push("name = ?");
      values.push(body.name.trim());
    }
    if (typeof body.default_timezone === "string" && body.default_timezone.trim()) {
      sets.push("default_timezone = ?");
      values.push(body.default_timezone.trim());
    }

    if (sets.length === 0) return err("No valid fields to update", 400);

    sets.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);
    await executeQuery(`UPDATE workspaces SET ${sets.join(", ")} WHERE id = ?`, values);

    const updated = await executeQuery<any>(
      "SELECT id, name, default_timezone, plan_id, created_at FROM workspaces WHERE id = ?",
      [id]
    );
    return ok(updated[0]);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
