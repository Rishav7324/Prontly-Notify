import "server-only";
import { headers, cookies } from "next/headers";
import { verifyIdToken } from "@/lib/auth/firebase-admin";
import { executeQuery, generateUUID } from "@/lib/db";

export interface AuthContext {
  userId: string;
  firebaseUid: string;
  email: string;
  name: string;
  isStaff: boolean;
  staffRole: string | null;
  workspaceId: string | null;
  workspaceRole: string | null;
  siteAccess: string | string[];
}

// Ensure a DB user (and default workspace) exists for an authenticated Firebase
// principal. Login/OAuth paths don't provision the DB row, so provision lazily
// here — one place, all callers benefit.
async function ensureUserRecord(decoded: {
  uid: string;
  email?: string | null;
  name?: string | null;
}): Promise<string> {
  const existing = await executeQuery<any>(
    "SELECT id FROM users WHERE firebase_uid = ?",
    [decoded.uid]
  );
  if (existing.length > 0) return existing[0].id;

  const id = generateUUID();
  const email = decoded.email || "";
  const name = decoded.name || email.split("@")[0] || "User";
  try {
    await executeQuery(
      "INSERT INTO users (id, firebase_uid, email, name) VALUES (?, ?, ?, ?)",
      [id, decoded.uid, email, name]
    );
    const workspaceId = generateUUID();
    await executeQuery(
      "INSERT INTO workspaces (id, owner_user_id, name, plan_id) VALUES (?, ?, ?, ?)",
      [workspaceId, id, `${name}'s Workspace`, "free"]
    );
    await executeQuery(
      "INSERT INTO workspace_members (id, workspace_id, user_id, invited_email, role, status) VALUES (?, ?, ?, ?, 'owner', 'active')",
      [generateUUID(), workspaceId, id, email]
    );
  } catch {
    // Race: another request provisioned the user first. Re-fetch.
    const retry = await executeQuery<any>(
      "SELECT id FROM users WHERE firebase_uid = ?",
      [decoded.uid]
    );
    if (retry.length > 0) return retry[0].id;
    throw new AuthError("Failed to provision user", 401);
  }
  return id;
}

export async function requireAuth(): Promise<AuthContext> {
  const headersList = await headers();
  let token: string | null = null;

  const authHeader = headersList.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else {
    const cookieStore = await cookies();
    token = cookieStore.get("__session")?.value ?? null;
  }

  if (!token) {
    throw new AuthError("Missing or invalid authorization header", 401);
  }
  const decoded = await verifyIdToken(token);

  const userId = await ensureUserRecord(decoded);

  const users = await executeQuery<any>(
    "SELECT id, firebase_uid, email, name, is_staff, staff_role FROM users WHERE id = ?",
    [userId]
  );

  const user = users[0];

  const members = await executeQuery<any>(
    `SELECT wm.role, wm.site_access, wm.workspace_id
     FROM workspace_members wm
     WHERE wm.user_id = ? AND wm.status = 'active'
     LIMIT 1`,
    [user.id]
  );

  let workspaceId: string | null = null;
  let workspaceRole: string | null = null;
  let siteAccess: string | string[] = [];

  if (members.length > 0) {
    workspaceId = members[0].workspace_id;
    workspaceRole = members[0].role;
    try {
      siteAccess = JSON.parse(members[0].site_access);
    } catch {
      siteAccess = members[0].site_access;
    }
  }

  return {
    userId: user.id,
    firebaseUid: user.firebase_uid,
    email: user.email,
    name: user.name,
    isStaff: !!user.is_staff,
    staffRole: user.staff_role,
    workspaceId,
    workspaceRole,
    siteAccess,
  };
}

export async function requireRole(
  auth: AuthContext,
  allowedRoles: string[]
): Promise<void> {
  if (!auth.workspaceRole || !allowedRoles.includes(auth.workspaceRole)) {
    throw new AuthError("Insufficient permissions", 403);
  }
}

export async function requireStaff(auth: AuthContext): Promise<void> {
  if (!auth.isStaff) {
    throw new AuthError("Staff access required", 403);
  }
}

export async function requireSiteAccess(
  auth: AuthContext,
  siteId: string
): Promise<void> {
  if (auth.isStaff) return;
  if (
    auth.siteAccess !== "all" &&
    Array.isArray(auth.siteAccess) &&
    !auth.siteAccess.includes(siteId)
  ) {
    throw new AuthError("No access to this site", 403);
  }
}

export class AuthError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number = 401) {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
  }
}
