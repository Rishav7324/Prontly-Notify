import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const body = await request.json();
    const webhookId = body.webhookId;
    if (!webhookId) return err("webhookId is required", 400);

    const rows = await executeQuery<any>("SELECT * FROM webhooks WHERE id = ?", [webhookId]);
    if (rows.length === 0) return err("Webhook not found", 404);
    if (rows[0].workspace_id !== auth.workspaceId) return err("No access to this webhook", 403);

    const webhook = rows[0];
    const payload = {
      event: "campaign.sent",
      test: true,
      timestamp: new Date().toISOString(),
      data: { campaignId: "test", title: "Test Campaign", delivered: 0 },
    };

    let status = "failed";
    let statusCode: number | null = null;
    let responseBody: string | null = null;
    try {
      const res = await fetch(webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      statusCode = res.status;
      status = res.ok ? "success" : "failed";
      try {
        responseBody = (await res.text()).slice(0, 1000);
      } catch {
        responseBody = null;
      }
    } catch (e: any) {
      responseBody = e?.message || "Request failed";
    }

    const logId = generateUUID();
    await executeQuery(
      `INSERT INTO webhook_delivery_logs (id, webhook_id, event, status, status_code, response_body)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [logId, webhookId, "campaign.sent", status, statusCode, responseBody]
    );
    await executeQuery(
      "UPDATE webhooks SET last_delivered_at = CURRENT_TIMESTAMP WHERE id = ?",
      [webhookId]
    );

    if (status !== "success") {
      return err(`Delivery failed with status ${statusCode ?? "n/a"}`, 502);
    }
    return Response.json({ success: true, data: { statusCode } });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
