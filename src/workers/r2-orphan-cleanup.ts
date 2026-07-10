/**
 * R2 Orphan Cleanup Worker
 *
 * Runs weekly via Cron trigger. Finds every R2 object that has no corresponding
 * D1 reference and deletes it. Logs every deletion to audit_logs.
 *
 * Deployment:
 *   wrangler deploy src/workers/r2-orphan-cleanup.ts --name r2-orphan-cleanup
 *   wrangler cron create r2-orphan-cleanup "0 2 * * 0"  # Sundays 2am
 */

import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";

interface Env {
  DB: D1Database;
  PUBLIC_BUCKET: R2Bucket;
  PRIVATE_BUCKET: R2Bucket;
}

const PUBLIC_PREFIXES = ["sites/", "blog/", "avatars/", "og/"];
const PRIVATE_PREFIXES = ["exports/", "invoices/"];

async function collectReferencedKeys(db: D1Database): Promise<Set<string>> {
  const keys = new Set<string>();

  // Query all D1 columns that store R2 URLs (public bucket)
  const iconResults = await db.prepare(
    `SELECT id, icon_url FROM campaigns WHERE icon_url IS NOT NULL AND icon_url != ''`
  ).all<{ id: string; icon_url: string }>();
  for (const row of iconResults.results || []) {
    const key = extractKeyFromPublicUrl(row.icon_url);
    if (key) keys.add(key);
  }

  const imageResults = await db.prepare(
    `SELECT id, image_url FROM campaigns WHERE image_url IS NOT NULL AND image_url != ''`
  ).all<{ id: string; image_url: string }>();
  for (const row of imageResults.results || []) {
    const key = extractKeyFromPublicUrl(row.image_url);
    if (key) keys.add(key);
  }

  const blogResults = await db.prepare(
    `SELECT id, featured_image_url FROM blog_posts WHERE featured_image_url IS NOT NULL AND featured_image_url != ''`
  ).all<{ id: string; featured_image_url: string }>();
  for (const row of blogResults.results || []) {
    const key = extractKeyFromPublicUrl(row.featured_image_url);
    if (key) keys.add(key);
  }

  const userResults = await db.prepare(
    `SELECT id, avatar_url FROM users WHERE avatar_url IS NOT NULL AND avatar_url != ''`
  ).all<{ id: string; avatar_url: string }>();
  for (const row of userResults.results || []) {
    const key = extractKeyFromPublicUrl(row.avatar_url);
    if (key) keys.add(key);
  }

  // Query export jobs (private bucket)
  const exportResults = await db.prepare(
    `SELECT r2_key FROM export_jobs`
  ).all<{ r2_key: string }>();
  for (const row of exportResults.results || []) {
    keys.add(row.r2_key);
  }

  return keys;
}

function extractKeyFromPublicUrl(url: string): string | null {
  try {
    const u = new URL(url);
    // Strip the leading / from the pathname to get the key
    return u.pathname.startsWith("/") ? u.pathname.slice(1) : u.pathname;
  } catch {
    // If it's not a URL, it might already be a bare key
    if (!url.startsWith("http")) return url;
    return null;
  }
}

async function deleteOrphansForBucket(
  client: S3Client,
  bucket: string,
  prefixes: string[],
  referencedKeys: Set<string>,
  db: D1Database,
  bucketName: string
): Promise<number> {
  let totalDeleted = 0;

  for (const prefix of prefixes) {
    let isTruncated = true;
    let continuationToken: string | undefined;

    while (isTruncated) {
      const list = await client.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: prefix,
          ...(continuationToken ? { ContinuationToken: continuationToken } : {}),
        })
      );

      if (!list.Contents || list.Contents.length === 0) break;

      const orphans = list.Contents.filter((obj: any) => !referencedKeys.has(obj.Key));

      if (orphans.length > 0) {
        const objects = orphans.map((o: any) => ({ Key: o.Key }));
        await client.send(
          new DeleteObjectsCommand({
            Bucket: bucket,
            Delete: { Objects: objects, Quiet: true },
          })
        );

        // Log each deletion to the audit log
        for (const orphan of orphans) {
          await db.prepare(
            "INSERT INTO audit_logs (id, actor_user_id, action, target_type, target_id, reason, metadata) VALUES (?, 'system', 'r2_orphan_deleted', ?, ?, ?, ?)"
          ).bind(
            crypto.randomUUID(),
            bucketName,
            orphan.Key,
            "Orphan cleanup: no D1 reference found",
            JSON.stringify({ size: orphan.Size, last_modified: orphan.LastModified })
          ).run();
        }

        totalDeleted += orphans.length;
      }

      isTruncated = list.IsTruncated || false;
      continuationToken = list.NextContinuationToken;
    }
  }

  return totalDeleted;
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    console.log("[r2-orphan-cleanup] Starting weekly cleanup...");

    const client = new S3Client({
      region: "auto",
      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
      },
    });

    const referencedKeys = await collectReferencedKeys(env.DB);
    console.log(`  Referenced keys in D1: ${referencedKeys.size}`);

    const publicDeleted = await deleteOrphansForBucket(
      client, env.PUBLIC_BUCKET, PUBLIC_PREFIXES, referencedKeys, env.DB, "public"
    );
    console.log(`  Public bucket: ${publicDeleted} orphans deleted`);

    const privateDeleted = await deleteOrphansForBucket(
      client, env.PRIVATE_BUCKET, PRIVATE_PREFIXES, referencedKeys, env.DB, "private"
    );
    console.log(`  Private bucket: ${privateDeleted} orphans deleted`);

    console.log("[r2-orphan-cleanup] Cleanup complete.");
  },
};
