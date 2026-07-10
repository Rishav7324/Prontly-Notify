import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { sendNotification } from "@/lib/fcm/client";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const body = await request.json();
    if (!body.title || !body.body) {
      return err("Title and body are required", 400);
    }

    const subscribers = await executeQuery<any>(
      "SELECT fcm_token FROM subscribers WHERE site_id = ? AND status = 'active' ORDER BY last_seen_at DESC LIMIT 1",
      [id]
    );
    if (subscribers.length === 0) {
      return err("No active subscribers found. Ask a visitor to subscribe first.", 400);
    }

    const result = await sendNotification(
      {
        title: body.title,
        body: body.body,
        click_url: body.click_url || "https://notify.prontly.in",
        icon: body.icon_url,
      },
      subscribers[0].fcm_token
    );

    if (!result.success) {
      return err(result.error || "Failed to send test notification", 500);
    }

    return ok({ sent: true, to: "most recent subscriber" });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
