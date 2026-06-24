import { NextRequest } from "next/server";
import { requireAuth, requireStaff } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any, meta?: any) {
  return Response.json({ success: true, data, ...(meta ? { meta } : {}) });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth();
    await requireStaff(auth);

    const url = request.nextUrl;
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);
    const offset = (page - 1) * limit;
    const action = url.searchParams.get("action");
    const targetType = url.searchParams.get("target_type");

    let where = "WHERE 1=1";
    const params: any[] = [];

    if (action) { where += " AND al.action = ?"; params.push(action); }
    if (targetType) { where += " AND al.target_type = ?"; params.push(targetType); }

    const countResult = await executeQuery<any>(
      "SELECT COUNT(*) as total FROM audit_logs al " + where, params
    );
    const total = countResult[0]?.total || 0;

    const logs = await executeQuery<any>(
      `SELECT al.*, u.name as actor_name, u.email as actor_email
       FROM audit_logs al LEFT JOIN users u ON al.actor_user_id = u.id
       ${where}
       ORDER BY al.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return ok(logs, { page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
