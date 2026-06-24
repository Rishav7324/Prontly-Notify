import { NextRequest } from "next/server";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { teamInviteSchema } from "@/lib/validation";

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
    await requireRole(auth, ["owner", "admin"]);
    const { id } = await params;

    const existing = await executeQuery<any>(
      "SELECT * FROM workspace_members WHERE id = ? AND workspace_id = ?",
      [id, auth.workspaceId]
    );
    if (existing.length === 0) return err("Member not found", 404);
    if (existing[0].role === "owner") return err("Cannot modify the owner", 403);

    const body = await request.json();
    const parsed = teamInviteSchema.partial().safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.errors[0].message, 400);
    }

    const updates: string[] = [];
    const values: any[] = [];
    if (parsed.data.role) { updates.push("role = ?"); values.push(parsed.data.role); }
    if (parsed.data.site_access) {
      updates.push("site_access = ?");
      values.push(JSON.stringify(parsed.data.site_access));
    }
    if (parsed.data.email) {
      updates.push("invited_email = ?");
      values.push(parsed.data.email.toLowerCase());
    }

    if (updates.length > 0) {
      values.push(id);
      await executeQuery(`UPDATE workspace_members SET ${updates.join(", ")} WHERE id = ?`, values);
    }

    const member = (await executeQuery<any>("SELECT * FROM workspace_members WHERE id = ?", [id]))[0];
    return ok(member);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    await requireRole(auth, ["owner", "admin"]);
    const { id } = await params;

    const existing = await executeQuery<any>(
      "SELECT * FROM workspace_members WHERE id = ? AND workspace_id = ?",
      [id, auth.workspaceId]
    );
    if (existing.length === 0) return err("Member not found", 404);
    if (existing[0].role === "owner") return err("Cannot remove the owner", 403);

    await executeQuery("DELETE FROM workspace_members WHERE id = ?", [id]);
    return ok({ deleted: true });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
