import { executeQuery, generateUUID } from "@/lib/db";

export interface WorkspaceRow {
  id: string;
  owner_user_id: string;
  name: string;
  plan_id: string;
  razorpay_customer_id: string | null;
  default_timezone: string;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMemberRow {
  id: string;
  workspace_id: string;
  user_id: string | null;
  invited_email: string;
  role: "owner" | "admin" | "member";
  site_access: string;
  status: "active" | "pending";
  invited_at: string;
  joined_at: string | null;
}

export async function getWorkspaceById(id: string) {
  const rows = await executeQuery<WorkspaceRow[]>("SELECT * FROM workspaces WHERE id = ?", [id]);
  return rows[0] ?? null;
}

export async function getWorkspaceByOwner(userId: string) {
  const rows = await executeQuery<WorkspaceRow[]>("SELECT * FROM workspaces WHERE owner_user_id = ?", [userId]);
  return rows[0] ?? null;
}

export async function createWorkspace(data: { owner_user_id: string; name: string; plan_id?: string }) {
  const id = generateUUID();
  await executeQuery(
    "INSERT INTO workspaces (id, owner_user_id, name, plan_id) VALUES (?, ?, ?, ?)",
    [id, data.owner_user_id, data.name, data.plan_id ?? "free"]
  );
  await executeQuery(
    "INSERT INTO workspace_members (id, workspace_id, user_id, invited_email, role, status) VALUES (?, ?, ?, ?, 'owner', 'active')",
    [generateUUID(), id, data.owner_user_id, "", "owner"]
  );
  return getWorkspaceById(id);
}

export async function getWorkspaceMembers(workspaceId: string) {
  return executeQuery<WorkspaceMemberRow[]>(
    `SELECT wm.*, u.name, u.email, u.avatar_url FROM workspace_members wm
     LEFT JOIN users u ON u.id = wm.user_id
     WHERE wm.workspace_id = ? ORDER BY wm.joined_at DESC`,
    [workspaceId]
  );
}

export async function inviteMember(data: { workspace_id: string; invited_email: string; role: "admin" | "member"; site_access?: string }) {
  const id = generateUUID();
  await executeQuery(
    "INSERT INTO workspace_members (id, workspace_id, invited_email, role, site_access, status) VALUES (?, ?, ?, ?, ?, 'pending')",
    [id, data.workspace_id, data.invited_email, data.role, data.site_access ?? "all"]
  );
  return id;
}

export async function updateMemberRole(id: string, role: "admin" | "member") {
  await executeQuery("UPDATE workspace_members SET role = ? WHERE id = ?", [role, id]);
}

export async function removeMember(id: string) {
  await executeQuery("DELETE FROM workspace_members WHERE id = ? AND role != 'owner'", [id]);
}

export async function acceptInvite(token: string, userId: string) {
  await executeQuery(
    "UPDATE workspace_members SET user_id = ?, status = 'active', joined_at = datetime('now') WHERE id = ? AND status = 'pending'",
    [userId, token]
  );
}
