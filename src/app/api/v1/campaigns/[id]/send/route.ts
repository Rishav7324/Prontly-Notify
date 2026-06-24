import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

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

    const subscribers = await executeQuery<any>(
      `SELECT id, fcm_token FROM subscribers
       WHERE site_id = ? AND status = 'active'
       ${campaign.segment_id ? `AND id IN (SELECT subscriber_id FROM segment_subscribers WHERE segment_id = ?)` : ""}`,
      campaign.segment_id ? [campaign.site_id, campaign.segment_id] : [campaign.site_id]
    );

    if (subscribers.length === 0) {
      return err("No subscribers to send to", 400);
    }

    await executeQuery(
      "UPDATE campaigns SET status = 'sending', sent_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [id]
    );

    await executeQuery(
      "UPDATE campaign_stats SET sent_count = ?, updated_at = CURRENT_TIMESTAMP WHERE campaign_id = ?",
      [subscribers.length, id]
    );

    return ok({
      sent: true,
      subscriber_count: subscribers.length,
      message: `Campaign queued for delivery to ${subscribers.length} subscribers`,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
