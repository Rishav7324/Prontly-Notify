import { NextRequest } from "next/server";
import { requireAuth, requireStaff } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET() {
  try {
    const auth = await requireAuth();
    await requireStaff(auth);

    const flags = await executeQuery<any>(
      "SELECT * FROM feature_flags ORDER BY key"
    );
    return ok(flags);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await requireAuth();
    await requireStaff(auth);

    const body = await request.json();
    if (!body.id) return err("Flag id is required", 400);

    const existing = await executeQuery<any>(
      "SELECT * FROM feature_flags WHERE id = ?",
      [body.id]
    );
    if (existing.length === 0) return err("Feature flag not found", 404);

    const updates: string[] = ["updated_at = CURRENT_TIMESTAMP"];
    const values: any[] = [];

    if (body.status !== undefined) {
      if (!["on", "off", "rollout"].includes(body.status)) {
        return err("Invalid status", 400);
      }
      updates.push("status = ?");
      values.push(body.status);
    }
    if (body.rollout_percentage !== undefined) {
      const pct = parseInt(body.rollout_percentage);
      if (isNaN(pct) || pct < 0 || pct > 100) {
        return err("rollout_percentage must be 0-100", 400);
      }
      updates.push("rollout_percentage = ?");
      values.push(pct);
    }
    if (body.eligible_plan_ids !== undefined) {
      updates.push("eligible_plan_ids = ?");
      values.push(JSON.stringify(body.eligible_plan_ids));
    }

    values.push(body.id);
    await executeQuery(
      "UPDATE feature_flags SET " + updates.join(", ") + " WHERE id = ?",
      values
    );

    await executeQuery(
      "INSERT INTO audit_logs (id, actor_user_id, action, target_type, target_id, metadata) VALUES (?, ?, ?, ?, ?, ?)",
      [
        generateUUID(),
        auth.userId,
        "feature_flag.update",
        "feature_flag",
        body.id,
        JSON.stringify({ before: existing[0], after: body }),
      ]
    );

    const flag = (await executeQuery<any>("SELECT * FROM feature_flags WHERE id = ?", [body.id]))[0];
    return ok(flag);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
