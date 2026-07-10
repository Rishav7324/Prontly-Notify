import "server-only";
import { headers, cookies } from "next/headers";
import { verifyIdToken } from "@/lib/auth/firebase-admin";
import { executeQuery } from "@/lib/db";

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

  const users = await executeQuery<any>(
    "SELECT id, firebase_uid, email, name, is_staff, staff_role FROM users WHERE firebase_uid = ?",
    [decoded.uid]
  );

  if (users.length === 0) {
    throw new AuthError("User not found", 401);
  }

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
