import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { sendCampaign } from "@/lib/fcm/campaign-sender";

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
  const { id } = await params;
  try {
    const auth = await requireAuth();

    const campaigns = await executeQuery<any>(
      `SELECT c.*, s.sending_enabled, s.id as site_id
       FROM campaigns c JOIN sites s ON c.site_id = s.id
       WHERE c.id = ?`,
      [id]
    );
    if (campaigns.length === 0) return err("Campaign not found", 404);

    const campaign = campaigns[0];

    if (!["draft", "failed"].includes(campaign.status)) {
      return err(`Campaign is already ${campaign.status}`, 400);
    }

    if (!campaign.sending_enabled) {
      return err("Sending is disabled for this site", 403);
    }

    await executeQuery(
      "UPDATE campaigns SET status = 'sending', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [id]
    );

    const result = await sendCampaign(id, campaign.site_id);

    return ok({
      sent: result.sent,
      failed: result.failed,
      unregistered: result.unregistered,
      total: result.total,
      message: `Campaign sent to ${result.total} subscribers (${result.sent} delivered, ${result.failed} failed, ${result.unregistered} unregistered)`,
    });
  } catch (error: any) {
    await executeQuery(
      "UPDATE campaigns SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [id]
    ).catch(() => {});
    return err(error.message, error.statusCode || 500);
  }
}
