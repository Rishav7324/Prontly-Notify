import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import sender from "@/lib/email";
import { renderEmail } from "@/lib/email/render-template";
import { TeamInviteEmail } from "@/emails/team-invite";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const { email, role, siteAccess } = await request.json();

    if (!email) return err("Email is required", 400);
    if (!["admin", "member"].includes(role)) return err("Role must be 'admin' or 'member'", 400);

    const existing = await executeQuery<any>(
      "SELECT id, status FROM workspace_members WHERE workspace_id = ? AND invited_email = ?",
      [auth.workspaceId, email]
    );

    if (existing.length > 0) {
      if (existing[0].status === "pending") return err("Invite already sent to this email", 409);
      return err("User is already a member", 409);
    }

    const workspace = (await executeQuery<any>(
      "SELECT name FROM workspaces WHERE id = ?", [auth.workspaceId]
    ))[0];
    const inviter = (await executeQuery<any>(
      "SELECT name FROM users WHERE id = ?", [auth.userId]
    ))[0];

    const inviteId = generateUUID();
    await executeQuery(
      "INSERT INTO workspace_members (id, workspace_id, invited_email, role, site_access, status) VALUES (?, ?, ?, ?, ?, 'pending')",
      [inviteId, auth.workspaceId, email, role, siteAccess ?? "all"]
    );

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://notify.prontly.in";
    const inviteLink = `${baseUrl}/login?redirect=/dashboard&invite=${inviteId}`;
    const html = await renderEmail(TeamInviteEmail, {
      inviterName: inviter?.name || "A team member",
      workspaceName: workspace?.name || "a workspace",
      inviteLink,
    });
    await sender({ to: email, subject: `You're invited to join ${workspace?.name || "a workspace"} on Prontly Notify`, html }).catch(() => {});

    return ok({ id: inviteId, email, role, status: "pending" });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
