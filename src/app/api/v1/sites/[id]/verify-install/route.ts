import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

async function getSite(auth: any, id: string) {
  await requireSiteAccess(auth, id);
  const sites = await executeQuery<any>(
    "SELECT id, domain, install_status, verification_token FROM sites WHERE id = ?",
    [id]
  );
  if (sites.length === 0) throw Object.assign(new Error("Site not found"), { statusCode: 404 });
  return sites[0];
}

async function buildChecklist(site: any, tokenFoundOnSite: boolean | null) {
  const subs = await executeQuery<any>(
    "SELECT COUNT(*) as count FROM subscribers WHERE site_id = ? AND status = 'active'",
    [site.id]
  );
  const hasSubscribers = (subs[0]?.count || 0) > 0;
  return [
    { label: "Site domain configured", done: !!site.domain },
    { label: "Verification meta tag added to your site", done: tokenFoundOnSite === true },
    { label: "At least one subscriber received", done: hasSubscribers },
  ];
}

async function verify(site: any): Promise<{ verified: boolean; tokenFound: boolean | null }> {
  if (!site.verification_token || !site.domain) return { verified: false, tokenFound: null };
  let html = "";
  try {
    const res = await fetch(`https://${site.domain}`, { signal: AbortSignal.timeout(8000) });
    html = await res.text();
  } catch {
    return { verified: false, tokenFound: null };
  }
  const tokenFound = html.includes(`prontly-verify`) && html.includes(site.verification_token);
  return { verified: tokenFound, tokenFound };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    const site = await getSite(auth, id);
    const tokenFound = site.install_status === "verified" ? true : null;
    const checklist = await buildChecklist(site, tokenFound);
    return ok({ installed: site.install_status === "verified", checklist });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    const site = await getSite(auth, id);

    const { verified, tokenFound } = await verify(site);

    if (verified && site.install_status !== "verified") {
      await executeQuery(
        "UPDATE sites SET install_status = 'verified', onboarding_step = 3, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [id]
      );
    }

    const checklist = await buildChecklist(site, tokenFound);
    return ok({ installed: verified || site.install_status === "verified", checklist });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
