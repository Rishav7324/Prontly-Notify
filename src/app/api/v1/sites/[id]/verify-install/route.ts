import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const sites = await executeQuery<any>(
      "SELECT id, install_status FROM sites WHERE id = ?",
      [id]
    );
    if (sites.length === 0) return err("Site not found", 404);

    const site = sites[0];

    const recentSubscribers = await executeQuery<any>(
      `SELECT COUNT(*) as count FROM subscribers
       WHERE site_id = ? AND subscribed_at >= datetime('now', '-5 minutes')`,
      [id]
    );
    const verified = (recentSubscribers[0]?.count || 0) > 0;

    if (verified && site.install_status !== "verified") {
      await executeQuery(
        "UPDATE sites SET install_status = 'verified', onboarding_step = 3, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [id]
      );
    }

    return ok({ verified });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
