import { executeQuery, generateUUID } from "@/lib/db";

export interface AuditLogRow {
  id: string;
  actor_user_id: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  reason: string | null;
  metadata: string;
  created_at: string;
}

export async function createAuditLog(data: {
  actor_user_id: string; action: string; target_type?: string; target_id?: string; reason?: string; metadata?: Record<string, unknown>;
}) {
  const id = generateUUID();
  await executeQuery(
    "INSERT INTO audit_logs (id, actor_user_id, action, target_type, target_id, reason, metadata) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, data.actor_user_id, data.action, data.target_type ?? null, data.target_id ?? null, data.reason ?? null,
     JSON.stringify(data.metadata ?? {})]
  );
  return id;
}

export async function getAuditLogs(options?: { actorUserId?: string; action?: string; offset?: number; limit?: number }) {
  const conditions: string[] = [];
  const params: unknown[] = [];
  if (options?.actorUserId) { conditions.push("actor_user_id = ?"); params.push(options.actorUserId); }
  if (options?.action) { conditions.push("action = ?"); params.push(options.action); }
  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;
  return executeQuery<AuditLogRow[]>(
    `SELECT * FROM audit_logs ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, limit, offset]
  );
}

export async function getAuditLogsForTarget(targetType: string, targetId: string) {
  return executeQuery<AuditLogRow[]>(
    "SELECT * FROM audit_logs WHERE target_type = ? AND target_id = ? ORDER BY created_at DESC LIMIT 20",
    [targetType, targetId]
  );
}

export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  body_mdx: string | null;
  excerpt: string | null;
  featured_image_url: string | null;
  category: string | null;
  tags: string;
  status: string;
  seo_title: string | null;
  seo_description: string | null;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPublishedPosts(options?: { category?: string; offset?: number; limit?: number }) {
  const conditions = ["status = 'published'"];
  const params: unknown[] = [];
  if (options?.category) { conditions.push("category = ?"); params.push(options.category); }
  const limit = options?.limit ?? 20;
  const offset = options?.offset ?? 0;
  return executeQuery<BlogPostRow[]>(
    `SELECT * FROM blog_posts WHERE ${conditions.join(" AND ")} ORDER BY published_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
}

export async function getPostBySlug(slug: string) {
  const rows = await executeQuery<BlogPostRow[]>("SELECT * FROM blog_posts WHERE slug = ?", [slug]);
  return rows[0] ?? null;
}

export async function createPost(data: {
  title: string; slug: string; body_mdx?: string; excerpt?: string; category?: string;
  tags?: string[]; author_id?: string; status?: string;
}) {
  const id = generateUUID();
  await executeQuery(
    "INSERT INTO blog_posts (id, title, slug, body_mdx, excerpt, category, tags, author_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, data.title, data.slug, data.body_mdx ?? null, data.excerpt ?? null, data.category ?? null,
     JSON.stringify(data.tags ?? []), data.author_id ?? null, data.status ?? "draft"]
  );
  return getPostBySlug(data.slug);
}

export async function updatePost(slug: string, data: Partial<Omit<BlogPostRow, "id" | "created_at">>) {
  const sets: string[] = [];
  const params: unknown[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) { sets.push(`${k} = ?`); params.push(v); }
  }
  if (sets.length === 0) return getPostBySlug(slug);
  sets.push("updated_at = datetime('now')");
  params.push(slug);
  await executeQuery(`UPDATE blog_posts SET ${sets.join(", ")} WHERE slug = ?`, params);
  return getPostBySlug(slug);
}
