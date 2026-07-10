import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { z } from "zod";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

const bodySchema = z.object({
  segment_id: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();

    const body = await request.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    const segments = await executeQuery<any>(
      "SELECT * FROM segments WHERE id = ?",
      [parsed.data.segment_id]
    );
    if (segments.length === 0) return err("Segment not found", 404);

    const segment = segments[0];

    let ruleJson: any;
    try {
      ruleJson = JSON.parse(segment.rule_json);
    } catch {
      ruleJson = null;
    }

    let count = 0;

    if (!ruleJson || !ruleJson.conditions || ruleJson.conditions.length === 0) {
      count = (await executeQuery<any>(
        "SELECT COUNT(*) as count FROM subscribers WHERE site_id = ? AND status = 'active'",
        [segment.site_id]
      ))[0]?.count || 0;
    } else {
      count = (await executeQuery<any>(
        "SELECT COUNT(*) as count FROM subscribers WHERE site_id = ? AND status = 'active'",
        [segment.site_id]
      ))[0]?.count || 0;
    }

    return ok({ count });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
