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
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
    const offset = (page - 1) * limit;
    const search = url.searchParams.get("search");
    const planFilter = url.searchParams.get("plan");

    let where = "WHERE 1=1";
    const params: any[] = [];

    if (search) {
      where += " AND (u.name LIKE ? OR u.email LIKE ? OR w.name LIKE ?)";
      const s = `%${search}%`;
      params.push(s, s, s);
    }
    if (planFilter) {
      where += " AND w.plan_id = ?";
      params.push(planFilter);
    }

    const countResult = await executeQuery<any>(
      `SELECT COUNT(*) as total FROM workspaces w
       JOIN users u ON w.owner_user_id = u.id ${where}`,
      params
    );
    const total = countResult[0]?.total || 0;

    const accounts = await executeQuery<any>(
      `SELECT w.id, w.name, w.plan_id, w.default_timezone, w.created_at,
        u.id as owner_id, u.email as owner_email, u.name as owner_name,
        p.name as plan_name, p.subscriber_limit, p.site_limit,
        p.price_monthly as mrr,
        s.status as subscription_status,
        (SELECT COUNT(*) FROM sites WHERE workspace_id = w.id) as site_count,
        (SELECT COUNT(*) FROM workspace_members WHERE workspace_id = w.id AND status = 'active') as member_count
       FROM workspaces w
       JOIN users u ON w.owner_user_id = u.id
       JOIN plans p ON w.plan_id = p.id
       LEFT JOIN subscriptions s ON s.workspace_id = w.id
       ${where}
       ORDER BY w.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return ok(accounts, { page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
