"use server";

import { auth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  const session = await auth.verifyRequest(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = await session.env.DB.prepare("SELECT role FROM workspace_members WHERE workspace_id = ? AND user_id = ?")
    .bind(session.workspaceId, session.uid).first();
  if (!user || user.role !== "owner") {
    return Response.json({ error: "Only workspace owners can impersonate users" }, { status: 403 });
  }

  const { accountId } = await request.json();
  if (!accountId) return Response.json({ error: "accountId is required" }, { status: 400 });

  const targetUser = await session.env.DB.prepare(
    "SELECT id, email, name FROM users WHERE id = ?"
  ).bind(accountId).first();
  if (!targetUser) return Response.json({ error: "Account not found" }, { status: 404 });

  const targetMembership = await session.env.DB.prepare(
    "SELECT workspace_id, role FROM workspace_members WHERE user_id = ?"
  ).bind(accountId).all();
  if (!targetMembership.results || (targetMembership.results as Record<string, unknown>[]).length === 0) {
    return Response.json({ error: "Target user has no workspace memberships" }, { status: 404 });
  }

  const impersonationToken = Buffer.from(
    JSON.stringify({
      originalUser: session.uid,
      targetUser: accountId,
      workspaceId: (targetMembership.results as Record<string, unknown>[])[0].workspace_id,
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
  ).toString("base64");

  return Response.json({
    success: true,
    token: impersonationToken,
    targetUser: { id: targetUser.id, email: targetUser.email, name: targetUser.name },
    workspaceId: (targetMembership.results as Record<string, unknown>[])[0].workspace_id,
    expiresIn: 3600,
  });
}
