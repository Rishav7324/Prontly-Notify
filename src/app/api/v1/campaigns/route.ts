import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { campaignSchema } from "@/lib/validation";

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

    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
    const offset = (page - 1) * limit;
    const status = url.searchParams.get("status");

    let where = "WHERE c.site_id = ?";
    const params: any[] = [siteId];

    if (status && ["draft", "scheduled", "sending", "sent", "failed"].includes(status)) {
      where += " AND c.status = ?";
      params.push(status);
    }

    const countResult = await executeQuery<any>(
      `SELECT COUNT(*) as total FROM campaigns c ${where}`,
      params
    );
    const total = countResult[0]?.total || 0;

    const campaigns = await executeQuery<any>(
      `SELECT c.*, u.name as created_by_name,
        COALESCE(cs.sent_count, 0) as sent_count,
        COALESCE(cs.delivered_count, 0) as delivered_count,
        COALESCE(cs.failed_count, 0) as failed_count,
        COALESCE(cs.click_count, 0) as click_count
       FROM campaigns c
       LEFT JOIN campaign_stats cs ON cs.campaign_id = c.id
       LEFT JOIN users u ON c.created_by_user_id = u.id
       ${where}
       ORDER BY c.created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return ok(campaigns, { page, limit, total, totalPages: Math.ceil(total / limit) });
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

    const parsed = campaignSchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.errors[0].message, 400);
    }

    const site = await executeQuery<any>(
      "SELECT sending_enabled FROM sites WHERE id = ?",
      [body.site_id]
    );
    if (site.length === 0) return err("Site not found", 404);

    const id = generateUUID();
    const actionButtons = parsed.data.action_buttons
      ? JSON.stringify(parsed.data.action_buttons)
      : "[]";

    await executeQuery(
      `INSERT INTO campaigns (id, site_id, title, body, icon_url, image_url, click_url, action_buttons, segment_id, status, scheduled_at, created_by_user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.site_id,
        parsed.data.title,
        parsed.data.body,
        parsed.data.icon_url || null,
        parsed.data.image_url || null,
        parsed.data.click_url,
        actionButtons,
        parsed.data.segment_id || null,
        parsed.data.scheduled_at ? "scheduled" : "draft",
        parsed.data.scheduled_at || null,
        auth.userId,
      ]
    );

    await executeQuery(
      "INSERT INTO campaign_stats (campaign_id) VALUES (?)",
      [id]
    );

    const campaign = (await executeQuery<any>(
      `SELECT c.*, u.name as created_by_name
       FROM campaigns c LEFT JOIN users u ON c.created_by_user_id = u.id
       WHERE c.id = ?`,
      [id]
    ))[0];

    return Response.json({ success: true, data: campaign }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
