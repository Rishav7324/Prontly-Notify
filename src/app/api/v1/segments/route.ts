import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { segmentSchema } from "@/lib/validation";

function ok(data: any, meta?: any) {
  return Response.json({ success: true, data, ...(meta ? { meta } : {}) });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const url = request.nextUrl;
    const siteId = url.searchParams.get("site_id");
    if (!siteId) return err("site_id query parameter is required", 400);

    await requireSiteAccess(auth, siteId);

    const segments = await executeQuery<any>(
      "SELECT * FROM segments WHERE site_id = ? ORDER BY created_at DESC",
      [siteId]
    );
    return ok(segments);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const body = await request.json();
    if (!body.site_id) return err("site_id is required", 400);

    await requireSiteAccess(auth, body.site_id);

    const parsed = segmentSchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    const id = generateUUID();
    const ruleJson = parsed.data.rule_json ? JSON.stringify(parsed.data.rule_json) : "{}";

    await executeQuery(
      "INSERT INTO segments (id, site_id, name, type, rule_json, created_by_user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [id, body.site_id, parsed.data.name, parsed.data.type || "manual", ruleJson, auth.userId]
    );

    const segment = (await executeQuery<any>("SELECT * FROM segments WHERE id = ?", [id]))[0];
    return Response.json({ success: true, data: segment }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
