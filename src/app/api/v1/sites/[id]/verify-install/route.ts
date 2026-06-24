import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const sites = await executeQuery<any>(
      "SELECT id, domain, install_status FROM sites WHERE id = ?",
      [id]
    );
    if (sites.length === 0) return err("Site not found", 404);

    const site = sites[0];
    let verified = false;

    try {
      const swUrl = `https://${site.domain}/sw.js`;
      const swRes = await fetch(swUrl, { method: "HEAD", signal: AbortSignal.timeout(5000) });
      verified = swRes.ok;
    } catch {
      verified = false;
    }

    const subscriberCheck = await executeQuery<any>(
      "SELECT COUNT(*) as count FROM subscribers WHERE site_id = ? AND status = 'active'",
      [id]
    );
    const hasSubscribers = (subscriberCheck[0]?.count || 0) > 0;

    if (verified && site.install_status !== "verified") {
      await executeQuery(
        "UPDATE sites SET install_status = 'verified', onboarding_step = 3, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [id]
      );
    }

    return ok({
      verified,
      install_status: verified ? "verified" : site.install_status,
      has_subscribers: hasSubscribers,
      subscriber_count: subscriberCheck[0]?.count || 0,
      check_url: `https://${site.domain}/sw.js`,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
