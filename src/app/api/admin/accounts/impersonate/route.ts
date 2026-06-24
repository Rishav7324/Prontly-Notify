"use server";

import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const auth = await requireAuth();

    const members = await executeQuery<{ role: string }[]>(
      "SELECT role FROM workspace_members WHERE workspace_id = ? AND user_id = ?",
      [auth.workspaceId, auth.userId]
    );

    if (!members || members.length === 0 || members[0].role !== "owner") {
      return Response.json({ error: "Only workspace owners can impersonate users" }, { status: 403 });
    }

    const { accountId } = await request.json();
    if (!accountId) return Response.json({ error: "accountId is required" }, { status: 400 });

    const targetUsers = await executeQuery<{ id: string; email: string; name: string }[]>(
      "SELECT id, email, name FROM users WHERE id = ?",
      [accountId]
    );

    if (!targetUsers || targetUsers.length === 0) {
      return Response.json({ error: "Account not found" }, { status: 404 });
    }

    const targetUser = targetUsers[0] as { id: string; email: string; name: string };

    const targetMemberships = await executeQuery<{ workspace_id: string; role: string }[]>(
      "SELECT workspace_id, role FROM workspace_members WHERE user_id = ?",
      [accountId]
    );

    if (!targetMemberships || targetMemberships.length === 0) {
      return Response.json({ error: "Target user has no workspace memberships" }, { status: 404 });
    }

    const impersonationToken = Buffer.from(
      JSON.stringify({
        originalUser: auth.userId,
        targetUser: accountId,
        workspaceId: (targetMemberships[0] as { workspace_id: string }).workspace_id,
        exp: Math.floor(Date.now() / 1000) + 3600,
      })
    ).toString("base64");

    return Response.json({
      success: true,
      token: impersonationToken,
      targetUser: { id: targetUser.id, email: targetUser.email, name: targetUser.name },
      workspaceId: (targetMemberships[0] as { workspace_id: string }).workspace_id,
      expiresIn: 3600,
    });
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
