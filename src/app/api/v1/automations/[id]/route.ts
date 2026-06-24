import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

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

    const existing = await executeQuery<any>("SELECT * FROM automations WHERE id = ?", [id]);
    if (existing.length === 0) return err("Automation not found", 404);

    const body = await request.json();
    const updates: string[] = ["updated_at = CURRENT_TIMESTAMP"];
    const values: any[] = [];

    if (body.name !== undefined) { updates.push("name = ?"); values.push(body.name); }
    if (body.trigger_type !== undefined) { updates.push("trigger_type = ?"); values.push(body.trigger_type); }
    if (body.trigger_config !== undefined) { updates.push("trigger_config = ?"); values.push(JSON.stringify(body.trigger_config)); }
    if (body.status !== undefined) {
      if (!["active", "paused", "draft"].includes(body.status)) {
        return err("Invalid status", 400);
      }
      updates.push("status = ?");
      values.push(body.status);
    }

    if (body.steps) {
      await executeQuery("DELETE FROM automation_steps WHERE automation_id = ?", [id]);
      for (const step of body.steps) {
        const stepId = generateUUID();
        await executeQuery(
          "INSERT INTO automation_steps (id, automation_id, step_order, type, config) VALUES (?, ?, ?, ?, ?)",
          [stepId, id, step.step_order, step.type, JSON.stringify(step.config)]
        );
      }
    }

    if (updates.length > 1) {
      values.push(id);
      await executeQuery(`UPDATE automations SET ${updates.join(", ")} WHERE id = ?`, values);
    }

    const automation = (await executeQuery<any>("SELECT * FROM automations WHERE id = ?", [id]))[0];
    const steps = await executeQuery<any>(
      "SELECT * FROM automation_steps WHERE automation_id = ? ORDER BY step_order",
      [id]
    );

    return ok({ ...automation, steps });
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

    const existing = await executeQuery<any>("SELECT * FROM automations WHERE id = ?", [id]);
    if (existing.length === 0) return err("Automation not found", 404);

    await executeQuery("DELETE FROM automation_runs WHERE automation_id = ?", [id]);
    await executeQuery("DELETE FROM automation_steps WHERE automation_id = ?", [id]);
    await executeQuery("DELETE FROM automations WHERE id = ?", [id]);

    return ok({ deleted: true });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
