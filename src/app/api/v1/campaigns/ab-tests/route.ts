import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

function mapRow(row: any) {
  let variants: any[] = [];
  try {
    variants = JSON.parse(row.variants);
  } catch {
    variants = [];
  }
  return {
    id: row.id,
    title: row.title,
    variants,
    status: row.status,
    winnerId: row.winner_variant_index != null ? String(row.winner_variant_index) : null,
    durationHours: row.duration_hours,
    sentAt: row.sent_at,
    createdAt: row.created_at,
  };
}

export async function GET() {
  try {
    const auth = await requireAuth();
    if (!auth.workspaceId) return err("No workspace found", 403);

    const rows = await executeQuery<any>(
      "SELECT * FROM ab_tests WHERE workspace_id = ? ORDER BY created_at DESC",
      [auth.workspaceId]
    );
    return ok(rows.map(mapRow));
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    if (!auth.workspaceId) return err("No workspace found", 403);

    const body = await request.json();
    if (!body.title || !Array.isArray(body.variants) || body.variants.length < 2) {
      return err("title and at least two variants are required", 400);
    }

    const id = generateUUID();
    await executeQuery(
      `INSERT INTO ab_tests (id, workspace_id, title, variants, status, duration_hours)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        auth.workspaceId,
        body.title,
        JSON.stringify(body.variants),
        "draft",
        body.duration_hours || 24,
      ]
    );

    const row = (await executeQuery<any>("SELECT * FROM ab_tests WHERE id = ?", [id]))[0];
    return Response.json({ success: true, data: mapRow(row) }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
