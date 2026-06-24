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
    const status = url.searchParams.get("install_status");

    let where = "WHERE 1=1";
    const params: any[] = [];

    if (search) {
      where += " AND (s.name LIKE ? OR s.domain LIKE ? OR w.name LIKE ?)";
      const s = `%${search}%`;
      params.push(s, s, s);
    }
    if (status && ["pending", "verified", "broken"].includes(status)) {
      where += " AND s.install_status = ?";
      params.push(status);
    }

    const countResult = await executeQuery<any>(
      `SELECT COUNT(*) as total FROM sites s JOIN workspaces w ON s.workspace_id = w.id ${where}`,
      params
    );
    const total = countResult[0]?.total || 0;

    const sites = await executeQuery<any>(
      `SELECT s.*, w.name as workspace_name, w.owner_user_id,
        (SELECT COUNT(*) FROM subscribers WHERE site_id = s.id AND status = 'active') as subscriber_count,
        (SELECT COUNT(*) FROM campaigns WHERE site_id = s.id AND status = 'sent') as campaign_count
       FROM sites s JOIN workspaces w ON s.workspace_id = w.id
       ${where}
       ORDER BY s.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return ok(sites, { page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
