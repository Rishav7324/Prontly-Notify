import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { z } from "zod";

function ok(data: any, meta?: any) {
  return Response.json({ success: true, data, ...(meta ? { meta } : {}) });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

const automationSchema = z.object({
  site_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  trigger_type: z.enum(["new_subscriber", "tag_added", "page_visited", "inactive_days", "ai_suggested"]),
  trigger_config: z.record(z.string(), z.any()).optional(),
  steps: z
    .array(
      z.object({
        step_order: z.number().int().min(0),
        type: z.enum(["wait", "send", "condition"]),
        config: z.record(z.string(), z.any()),
      })
    )
    .optional(),
});

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const url = request.nextUrl;
    const siteId = url.searchParams.get("site_id");
    if (!siteId) return err("site_id query parameter is required", 400);

    await requireSiteAccess(auth, siteId);

    const automations = await executeQuery<any>(
      `SELECT a.*,
        (SELECT COUNT(*) FROM automation_steps WHERE automation_id = a.id) as step_count,
        (SELECT COUNT(*) FROM automation_runs WHERE automation_id = a.id AND status = 'active') as active_runs
       FROM automations a WHERE a.site_id = ? ORDER BY a.created_at DESC`,
      [siteId]
    );
    return ok(automations);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const body = await request.json();

    const parsed = automationSchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    await requireSiteAccess(auth, parsed.data.site_id);

    const id = generateUUID();
    await executeQuery(
      "INSERT INTO automations (id, site_id, name, trigger_type, trigger_config) VALUES (?, ?, ?, ?, ?)",
      [
        id,
        parsed.data.site_id,
        parsed.data.name,
        parsed.data.trigger_type,
        parsed.data.trigger_config ? JSON.stringify(parsed.data.trigger_config) : "{}",
      ]
    );

    if (parsed.data.steps) {
      for (const step of parsed.data.steps) {
        const stepId = generateUUID();
        await executeQuery(
          "INSERT INTO automation_steps (id, automation_id, step_order, type, config) VALUES (?, ?, ?, ?, ?)",
          [stepId, id, step.step_order, step.type, JSON.stringify(step.config)]
        );
      }
    }

    const automation = (await executeQuery<any>("SELECT * FROM automations WHERE id = ?", [id]))[0];
    const steps = await executeQuery<any>(
      "SELECT * FROM automation_steps WHERE automation_id = ? ORDER BY step_order",
      [id]
    );

    return Response.json({ success: true, data: { ...automation, steps } }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
