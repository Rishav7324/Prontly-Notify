import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;

    const webhooks = await executeQuery<any>("SELECT workspace_id FROM webhooks WHERE id = ?", [id]);
    if (webhooks.length === 0) return err("Webhook not found", 404);
    if (webhooks[0].workspace_id !== auth.workspaceId) return err("No access to this webhook", 403);

    const rows = await executeQuery<any>(
      "SELECT * FROM webhook_delivery_logs WHERE webhook_id = ? ORDER BY attempted_at DESC LIMIT 50",
      [id]
    );
    const logs = rows.map((r: any) => ({
      id: r.id,
      webhookId: r.webhook_id,
      event: r.event,
      status: r.status,
      statusCode: r.status_code,
      responseBody: r.response_body,
      attemptedAt: r.attempted_at,
    }));
    return ok(logs);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
