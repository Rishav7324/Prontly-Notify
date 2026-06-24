import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function GET() {
  try {
    const auth = await requireAuth();
    const user = await executeQuery<any>("SELECT is_staff FROM users WHERE id = ?", [auth.userId]);
    if (user.length === 0 || !user[0].is_staff) return err("Staff access required", 403);

    const coupons = await executeQuery<any>(
      "SELECT * FROM coupons ORDER BY created_at DESC"
    );
    return ok({ coupons });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const user = await executeQuery<any>("SELECT is_staff FROM users WHERE id = ?", [auth.userId]);
    if (user.length === 0 || !user[0].is_staff) return err("Staff access required", 403);

    const body = await request.json();
    if (!body.code || !body.type || !body.value) return err("code, type, and value are required", 400);

    const id = generateUUID();
    await executeQuery(
      "INSERT INTO coupons (id, code, type, value, max_redemptions, eligible_plan_ids, expires_at, status) VALUES (?, UPPER(?), ?, ?, ?, ?, ?, ?)",
      [id, body.code, body.type, body.value, body.max_redemptions ?? 1, JSON.stringify(body.eligible_plan_ids ?? []),
       body.expires_at ?? null, body.status ?? "active"]
    );

    return ok({ id, code: body.code.toUpperCase() });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
