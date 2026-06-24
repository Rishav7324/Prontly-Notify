"use server";

import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { z } from "zod";

const SessionSchema = z.object({
  userAgent: z.string().optional(),
  ip: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const auth = await requireAuth();
    const body = await request.json();
    const { userAgent, ip } = SessionSchema.parse(body);

    const token = generateUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await executeQuery(
      "INSERT INTO sessions (id, workspace_id, user_id, token, user_agent, ip, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [generateUUID(), auth.workspaceId, auth.userId, token, userAgent ?? null, ip ?? null, expiresAt]
    );

    return Response.json({ token, expiresAt });
  } catch (err) {
    if (err instanceof z.ZodError) return Response.json({ error: err.issues }, { status: 400 });
    if (err instanceof Error && err.message.includes("Missing or invalid")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const auth = await requireAuth();
    const results = await executeQuery(
      "SELECT id, token, user_agent, ip, created_at, expires_at FROM sessions WHERE workspace_id = ? AND user_id = ? AND expires_at > datetime('now') ORDER BY created_at DESC",
      [auth.workspaceId, auth.userId]
    );
    return Response.json({ sessions: results });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requireAuth();
    const { id } = await request.json();
    if (!id) return Response.json({ error: "Session ID required" }, { status: 400 });

    await executeQuery(
      "DELETE FROM sessions WHERE id = ? AND workspace_id = ? AND user_id = ?",
      [id, auth.workspaceId, auth.userId]
    );
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
