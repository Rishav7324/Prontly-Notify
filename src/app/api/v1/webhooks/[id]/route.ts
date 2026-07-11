import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

const VALID_EVENTS = [
  "campaign.sent",
  "campaign.delivered",
  "campaign.clicked",
  "subscriber.subscribed",
  "subscriber.unsubscribed",
];

async function ownedWebhook(auth: any, id: string) {
  const rows = await executeQuery<any>("SELECT * FROM webhooks WHERE id = ?", [id]);
  if (rows.length === 0) return null;
  if (rows[0].workspace_id !== auth.workspaceId) return undefined;
  return rows[0];
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    const webhook = await ownedWebhook(auth, id);
    if (!webhook) return err("Webhook not found", 404);
    if (webhook === undefined) return err("No access to this webhook", 403);

    const body = await request.json();
    const sets: string[] = [];
    const values: any[] = [];
    if (typeof body.name === "string" && body.name.trim()) {
      sets.push("name = ?");
      values.push(body.name.trim());
    }
    if (typeof body.url === "string" && body.url.trim()) {
      sets.push("url = ?");
      values.push(body.url.trim());
    }
    if (Array.isArray(body.events)) {
      const events = body.events.filter((e: string) => VALID_EVENTS.includes(e));
      sets.push("events = ?");
      values.push(JSON.stringify(events));
    }
    if (typeof body.is_active === "boolean") {
      sets.push("is_active = ?");
      values.push(body.is_active ? 1 : 0);
    }
    if (sets.length === 0) return err("No valid fields to update", 400);

    sets.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);
    await executeQuery(`UPDATE webhooks SET ${sets.join(", ")} WHERE id = ?`, values);

    const row = (await executeQuery<any>("SELECT * FROM webhooks WHERE id = ?", [id]))[0];
    let events: string[] = [];
    try {
      events = JSON.parse(row.events);
    } catch {
      events = [];
    }
    return ok({
      id: row.id,
      name: row.name,
      url: row.url,
      events,
      isActive: !!row.is_active,
      lastDeliveredAt: row.last_delivered_at,
      createdAt: row.created_at,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    const webhook = await ownedWebhook(auth, id);
    if (!webhook) return err("Webhook not found", 404);
    if (webhook === undefined) return err("No access to this webhook", 403);

    await executeQuery("DELETE FROM webhook_delivery_logs WHERE webhook_id = ?", [id]);
    await executeQuery("DELETE FROM webhooks WHERE id = ?", [id]);
    return ok({ id });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
