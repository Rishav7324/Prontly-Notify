"use server";

import { auth } from "@/lib/firebase/admin";
import { z } from "zod";
import { v4 } from "uuid";

const SessionSchema = z.object({
  userAgent: z.string().optional(),
  ip: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await auth.verifyRequest(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { userAgent, ip } = SessionSchema.parse(body);

    const token = v4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const stmt = session.env.DB.prepare(
      "INSERT INTO sessions (id, workspace_id, user_id, token, user_agent, ip, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    await stmt.bind(v4(), session.workspaceId, session.uid, token, userAgent ?? null, ip ?? null, expiresAt).run();

    return Response.json({ token, expiresAt });
  } catch (err) {
    if (err instanceof z.ZodError) return Response.json({ error: err.issues }, { status: 400 });
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await auth.verifyRequest(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { results } = await session.env.DB.prepare(
    "SELECT id, token, user_agent, ip, created_at, expires_at FROM sessions WHERE workspace_id = ? AND user_id = ? AND expires_at > datetime('now') ORDER BY created_at DESC"
  ).bind(session.workspaceId, session.uid).all();

  return Response.json({ sessions: results });
}

export async function DELETE(request: Request) {
  const session = await auth.verifyRequest(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  if (!id) return Response.json({ error: "Session ID required" }, { status: 400 });

  await session.env.DB.prepare("DELETE FROM sessions WHERE id = ? AND workspace_id = ? AND user_id = ?")
    .bind(id, session.workspaceId, session.uid).run();

  return Response.json({ success: true });
}
