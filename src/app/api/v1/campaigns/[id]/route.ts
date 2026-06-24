import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { campaignSchema } from "@/lib/validation";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;

    const campaigns = await executeQuery<any>(
      `SELECT c.*, u.name as created_by_name, s.name as site_name,
        COALESCE(cs.sent_count, 0) as sent_count,
        COALESCE(cs.delivered_count, 0) as delivered_count,
        COALESCE(cs.failed_count, 0) as failed_count,
        COALESCE(cs.click_count, 0) as click_count,
        sg.name as segment_name
       FROM campaigns c
       LEFT JOIN campaign_stats cs ON cs.campaign_id = c.id
       LEFT JOIN users u ON c.created_by_user_id = u.id
       LEFT JOIN sites s ON c.site_id = s.id
       LEFT JOIN segments sg ON c.segment_id = sg.id
       WHERE c.id = ?`,
      [id]
    );
    if (campaigns.length === 0) return err("Campaign not found", 404);

    return ok(campaigns[0]);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;

    const existing = await executeQuery<any>("SELECT * FROM campaigns WHERE id = ?", [id]);
    if (existing.length === 0) return err("Campaign not found", 404);
    if (existing[0].status !== "draft") {
      return err("Only draft campaigns can be edited", 400);
    }

    const body = await request.json();
    const parsed = campaignSchema.partial().safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.errors[0].message, 400);
    }

    const updates: string[] = ["updated_at = CURRENT_TIMESTAMP"];
    const values: any[] = [];

    const fields = ["title", "body", "icon_url", "image_url", "click_url", "segment_id", "scheduled_at"];
    for (const field of fields) {
      if ((parsed.data as any)[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push((parsed.data as any)[field] || null);
      }
    }
    if (parsed.data.action_buttons !== undefined) {
      updates.push("action_buttons = ?");
      values.push(JSON.stringify(parsed.data.action_buttons));
    }
    if (parsed.data.scheduled_at) {
      updates.push("status = 'scheduled'");
    }

    values.push(id);
    await executeQuery(
      `UPDATE campaigns SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    const campaign = (await executeQuery<any>("SELECT * FROM campaigns WHERE id = ?", [id]))[0];
    return ok(campaign);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;

    const existing = await executeQuery<any>("SELECT * FROM campaigns WHERE id = ?", [id]);
    if (existing.length === 0) return err("Campaign not found", 404);
    if (!["draft", "failed"].includes(existing[0].status)) {
      return err("Only draft or failed campaigns can be deleted", 400);
    }

    await executeQuery("DELETE FROM campaign_stats WHERE campaign_id = ?", [id]);
    await executeQuery("DELETE FROM campaign_deliveries WHERE campaign_id = ?", [id]);
    await executeQuery("DELETE FROM campaigns WHERE id = ?", [id]);

    return ok({ deleted: true });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
