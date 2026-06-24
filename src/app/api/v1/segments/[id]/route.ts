import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { segmentSchema } from "@/lib/validation";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;

    const segments = await executeQuery<any>(
      `SELECT s.*, u.name as created_by_name
       FROM segments s LEFT JOIN users u ON s.created_by_user_id = u.id
       WHERE s.id = ?`,
      [id]
    );
    if (segments.length === 0) return err("Segment not found", 404);

    const siteMembers = await executeQuery<any>(
      `SELECT wm.user_id FROM workspace_members wm
       JOIN sites s ON s.workspace_id = wm.workspace_id
       WHERE s.id = ? AND wm.user_id = ? AND wm.status = 'active'`,
      [segments[0].site_id, auth.userId]
    );
    if (siteMembers.length === 0 && !auth.isStaff) {
      return err("Access denied", 403);
    }

    return ok(segments[0]);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;

    const existing = await executeQuery<any>("SELECT * FROM segments WHERE id = ?", [id]);
    if (existing.length === 0) return err("Segment not found", 404);

    const body = await request.json();
    const parsed = segmentSchema.partial().safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.errors[0].message, 400);
    }

    const siteMembers = await executeQuery<any>(
      `SELECT wm.user_id FROM workspace_members wm
       JOIN sites s ON s.workspace_id = wm.workspace_id
       WHERE s.id = ? AND wm.user_id = ? AND wm.status = 'active'`,
      [existing[0].site_id, auth.userId]
    );
    if (siteMembers.length === 0 && !auth.isStaff) {
      return err("Access denied", 403);
    }

    const updates: string[] = ["updated_at = CURRENT_TIMESTAMP"];
    const values: any[] = [];
    if (parsed.data.name !== undefined) { updates.push("name = ?"); values.push(parsed.data.name); }
    if (parsed.data.type !== undefined) { updates.push("type = ?"); values.push(parsed.data.type); }
    if (parsed.data.rule_json !== undefined) {
      updates.push("rule_json = ?");
      values.push(JSON.stringify(parsed.data.rule_json));
    }
    values.push(id);

    await executeQuery(`UPDATE segments SET ${updates.join(", ")} WHERE id = ?`, values);

    const segment = (await executeQuery<any>("SELECT * FROM segments WHERE id = ?", [id]))[0];
    return ok(segment);
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
    const { id } = await params;

    const existing = await executeQuery<any>("SELECT * FROM segments WHERE id = ?", [id]);
    if (existing.length === 0) return err("Segment not found", 404);

    const campaignsUsing = await executeQuery<any>(
      "SELECT COUNT(*) as count FROM campaigns WHERE segment_id = ?",
      [id]
    );
    if (campaignsUsing[0]?.count > 0) {
      await executeQuery("UPDATE campaigns SET segment_id = NULL WHERE segment_id = ?", [id]);
    }

    await executeQuery("DELETE FROM segments WHERE id = ?", [id]);
    return ok({ deleted: true });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
