import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { uploadPrivateFile } from "@/lib/storage/generate-download-url";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(msg: string, status: number) { return Response.json({ success: false, error: msg }, { status }); }

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const body = await request.json();
    const { site_id } = body;
    if (!site_id) return err("site_id is required", 400);
    await requireSiteAccess(auth, site_id);

    const jobId = generateUUID();
    const workspaceId = auth.workspaceId;
    if (!workspaceId) return err("No workspace found", 400);
    const r2Key = `exports/${workspaceId}/${jobId}.csv`;

    await executeQuery(
      "INSERT INTO export_jobs (id, workspace_id, site_id, r2_key, status, created_by_user_id, created_at) VALUES (?, ?, ?, ?, 'processing', ?, datetime('now'))",
      [jobId, workspaceId, site_id, r2Key, auth.userId]
    );

    runExport(jobId, site_id, workspaceId, r2Key).catch((err) => {
      console.error(`Export ${jobId} failed:`, err);
      executeQuery(
        "UPDATE export_jobs SET status = 'failed', error = ?, completed_at = datetime('now') WHERE id = ?",
        [err.message, jobId]
      ).catch(() => {});
    });

    return ok({ job_id: jobId, status: "processing" });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

async function runExport(jobId: string, siteId: string, workspaceId: string, r2Key: string) {
  const BATCH_SIZE = 1000;
  let cursor: string | null = null;
  const allRows: string[] = [];
  let isFirstBatch = true;

  while (true) {
    const rows: any[] = await executeQuery(
      `SELECT s.id, s.fcm_token, s.browser, s.os, s.country, s.city, s.status, s.subscribed_at, s.last_seen_at
       FROM subscribers s WHERE s.site_id = ? AND s.id > ?
       ORDER BY s.id LIMIT ?`,
      isFirstBatch ? [siteId, "", BATCH_SIZE] : [siteId, cursor, BATCH_SIZE]
    );
    if (rows.length === 0) break;

    const csvRows = rows.map((r: any) =>
      [r.id, r.fcm_token, r.browser, r.os, r.country, r.city, r.status, r.subscribed_at, r.last_seen_at]
        .map((v) => `"${(v ?? "").toString().replace(/"/g, '""')}"`)
        .join(",")
    );

    if (isFirstBatch) {
      allRows.push("id,fcm_token,browser,os,country,city,status,subscribed_at,last_seen_at");
      isFirstBatch = false;
    }
    allRows.push(...csvRows);
    cursor = rows[rows.length - 1].id;
  }

  const csvContent = allRows.join("\n");
  await uploadPrivateFile(r2Key, csvContent, "text/csv");

  await executeQuery(
    "UPDATE export_jobs SET status = 'completed', row_count = ?, completed_at = datetime('now') WHERE id = ?",
    [allRows.length - 1, jobId]
  );
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const url = new URL(request.url);
    const siteId = url.searchParams.get("site_id");
    const jobId = url.searchParams.get("job_id");
    if (!siteId) return err("site_id is required", 400);

    await requireSiteAccess(auth, siteId);

    if (jobId) {
      const jobs = await executeQuery<any[]>(
        "SELECT * FROM export_jobs WHERE id = ? AND site_id = ? ORDER BY created_at DESC",
        [jobId, siteId]
      );
      return ok({ jobs });
    }

    const jobs = await executeQuery<any[]>(
      "SELECT * FROM export_jobs WHERE site_id = ? ORDER BY created_at DESC LIMIT 20",
      [siteId]
    );
    return ok({ jobs });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
