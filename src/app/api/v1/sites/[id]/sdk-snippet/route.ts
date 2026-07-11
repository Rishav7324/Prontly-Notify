import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

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
      "SELECT id, domain, verification_token FROM sites WHERE id = ?",
      [id]
    );
    if (sites.length === 0) return err("Site not found", 404);

    let token = sites[0].verification_token;
    if (!token) {
      token = generateUUID();
      await executeQuery("UPDATE sites SET verification_token = ? WHERE id = ?", [token, id]);
    }

    const snippet = `<!-- Prontly Notify -->
<meta name="prontly-verify" content="${token}" />
<script>
  (function (s, i, t, e) {
    s.prontly = s.prontly || function () { (s.prontly.q = s.prontly.q || []).push(arguments); };
    t = i.createElement("script"); t.async = 1; t.src = e;
    i.head.appendChild(t);
  })(window, document, 0, "https://cdn.prontly.com/sdk/v1.js");
  prontly("init", { siteId: "${id}" });
</script>`;

    return ok({ snippet, verification_token: token });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
