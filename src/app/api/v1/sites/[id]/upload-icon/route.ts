import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { generatePublicUploadUrl, validateUploadRequest, buildPublicKey, verifyUploadComplete } from "@/lib/storage/generate-upload-url";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(msg: string, status: number) { return Response.json({ success: false, error: msg }, { status }); }

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const body = await request.json();
    const { contentType, contentLength, filename } = body;

    if (!contentType || !filename) {
      return err("contentType and filename are required", 400);
    }

    const validationError = validateUploadRequest(contentType, contentLength);
    if (validationError) return err(validationError, 400);

    const key = buildPublicKey("sites", id, filename);
    const { presignedUrl, publicUrl } = await generatePublicUploadUrl(key, contentType, contentLength);

    return ok({ presigned_url: presignedUrl, public_url: publicUrl, key });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
