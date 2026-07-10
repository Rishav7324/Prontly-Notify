import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { verifyUploadComplete } from "@/lib/storage/generate-upload-url";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(msg: string, status: number) { return Response.json({ success: false, error: msg }, { status }); }

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const body = await request.json();
    const { key, publicUrl } = body;
    if (!key || !publicUrl) return err("key and publicUrl are required", 400);

    const exists = await verifyUploadComplete(key);
    if (!exists) return err("Upload not found at the specified key. Upload may have failed.", 400);

    await executeQuery(
      "UPDATE sites SET icon_url = ?, updated_at = datetime('now') WHERE id = ?",
      [publicUrl, id]
    );

    return ok({ public_url: publicUrl });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
