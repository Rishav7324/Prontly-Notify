import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;

    const campaigns = await executeQuery<any>(
      "SELECT * FROM campaigns WHERE id = ?",
      [id]
    );
    if (campaigns.length === 0) return err("Campaign not found", 404);

    const original = campaigns[0];
    const newId = generateUUID();

    await executeQuery(
      `INSERT INTO campaigns (id, site_id, title, body, icon_url, image_url, click_url, action_buttons, segment_id, status, created_by_user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?)`,
      [
        newId,
        original.site_id,
        `${original.title} (Copy)`,
        original.body,
        original.icon_url,
        original.image_url,
        original.click_url,
        original.action_buttons,
        original.segment_id,
        auth.userId,
      ]
    );

    await executeQuery(
      "INSERT INTO campaign_stats (campaign_id) VALUES (?)",
      [newId]
    );

    const campaign = (await executeQuery<any>("SELECT * FROM campaigns WHERE id = ?", [newId]))[0];
    return Response.json({ success: true, data: campaign }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
