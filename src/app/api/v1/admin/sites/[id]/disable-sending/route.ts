import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();

    const users = await executeQuery<any>(
      "SELECT is_staff, staff_role FROM users WHERE id = ?", [auth.userId]
    );
    if (users.length === 0 || !users[0].is_staff) return err("Staff access required", 403);

    const { siteId } = await request.json();
    if (!siteId) return err("siteId required", 400);

    const sites = await executeQuery<any>("SELECT id, name, sending_enabled FROM sites WHERE id = ?", [siteId]);
    if (sites.length === 0) return err("Site not found", 404);

    await executeQuery("UPDATE sites SET sending_enabled = CASE WHEN sending_enabled = 1 THEN 0 ELSE 1 END WHERE id = ?", [siteId]);

    const updated = await executeQuery<any>("SELECT id, name, sending_enabled FROM sites WHERE id = ?", [siteId]);
    return ok(updated[0]);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
