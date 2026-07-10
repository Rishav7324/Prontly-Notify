import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { generatePrivateDownloadUrl } from "@/lib/storage/generate-download-url";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(msg: string, status: number) { return Response.json({ success: false, error: msg }, { status }); }

export async function GET(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  try {
    const auth = await requireAuth();
    const { jobId } = await params;

    const jobs = await executeQuery<any[]>(
      "SELECT * FROM export_jobs WHERE id = ?",
      [jobId]
    );
    if (!jobs[0]) return err("Export job not found", 404);

    const job = jobs[0];

    if (job.workspace_id !== auth.workspaceId) {
      return err("Access denied", 403);
    }

    if (job.status !== "completed") {
      return err("Export is not yet complete", 400);
    }

    const signedUrl = await generatePrivateDownloadUrl(job.r2_key, 900);

    return ok({
      download_url: signedUrl,
      expires_in: 900,
      filename: `subscribers-export-${job.created_at?.replace(" ", "_") || job.id}.csv`,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
