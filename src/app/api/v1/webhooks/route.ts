import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

function mapWebhook(row: any) {
  let events: string[] = [];
  try {
    events = JSON.parse(row.events);
  } catch {
    events = [];
  }
  return {
    id: row.id,
    name: row.name,
    url: row.url,
    events,
    isActive: !!row.is_active,
    lastDeliveredAt: row.last_delivered_at,
    createdAt: row.created_at,
  };
}

const VALID_EVENTS = [
  "campaign.sent",
  "campaign.delivered",
  "campaign.clicked",
  "subscriber.subscribed",
  "subscriber.unsubscribed",
];

export async function GET() {
  try {
    const auth = await requireAuth();
    if (!auth.workspaceId) return err("No workspace found", 403);

    const rows = await executeQuery<any>(
      "SELECT * FROM webhooks WHERE workspace_id = ? ORDER BY created_at DESC",
      [auth.workspaceId]
    );
    return ok(rows.map(mapWebhook));
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (!auth.workspaceId) return err("No workspace found", 403);

    const body = await request.json();
    if (!body.name || !body.url) return err("name and url are required", 400);
    const events = Array.isArray(body.events) ? body.events.filter((e: string) => VALID_EVENTS.includes(e)) : [];

    const id = generateUUID();
    await executeQuery(
      `INSERT INTO webhooks (id, workspace_id, name, url, events, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, auth.workspaceId, body.name, body.url, JSON.stringify(events), body.is_active === false ? 0 : 1]
    );

    const row = (await executeQuery<any>("SELECT * FROM webhooks WHERE id = ?", [id]))[0];
    return Response.json({ success: true, data: mapWebhook(row) }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
