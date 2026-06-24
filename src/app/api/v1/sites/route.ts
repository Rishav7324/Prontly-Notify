import { NextRequest } from "next/server";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { siteSchema } from "@/lib/validation";

function ok(data: any, meta?: any) {
  return Response.json({ success: true, data, ...(meta ? { meta } : {}) });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET() {
  try {
    const auth = await requireAuth();
    const sites = await executeQuery<any>(
      `SELECT s.*,
        (SELECT COUNT(*) FROM subscribers WHERE site_id = s.id AND status = 'active') as subscriber_count
       FROM sites s
       JOIN workspace_members wm ON wm.workspace_id = s.workspace_id AND wm.user_id = ?
       WHERE wm.status = 'active'
       ORDER BY s.created_at DESC`,
      [auth.userId]
    );
    return ok(sites);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    await requireRole(auth, ["owner", "admin"]);

    const body = await request.json();
    const parsed = siteSchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    const workspace = await executeQuery<any>(
      "SELECT w.plan_id, p.site_limit FROM workspaces w JOIN plans p ON w.plan_id = p.id WHERE w.id = ?",
      [auth.workspaceId]
    );
    if (workspace.length === 0) return err("Workspace not found", 404);

    const currentSites = await executeQuery<any>(
      "SELECT COUNT(*) as count FROM sites WHERE workspace_id = ?",
      [auth.workspaceId]
    );

    const limit = workspace[0].site_limit;
    if (limit !== -1 && currentSites[0].count >= limit) {
      return err(
        `Site limit reached (${limit}). Upgrade your plan to add more sites.`,
        403
      );
    }

    const existing = await executeQuery<any>(
      "SELECT id FROM sites WHERE domain = ? AND workspace_id = ?",
      [parsed.data.domain, auth.workspaceId]
    );
    if (existing.length > 0) {
      return err("A site with this domain already exists in your workspace", 409);
    }

    const id = generateUUID();
    await executeQuery(
      "INSERT INTO sites (id, workspace_id, name, domain, category, platform) VALUES (?, ?, ?, ?, ?, ?)",
      [
        id,
        auth.workspaceId,
        parsed.data.name,
        parsed.data.domain,
        parsed.data.category || null,
        parsed.data.platform || null,
      ]
    );

    const site = (await executeQuery<any>("SELECT * FROM sites WHERE id = ?", [id]))[0];
    return Response.json({ success: true, data: site }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
