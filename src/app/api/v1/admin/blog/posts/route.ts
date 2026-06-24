import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";

function ok(data: any, meta?: any) { return Response.json({ success: true, data, ...(meta ? { meta } : {}) }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const user = await executeQuery<any>("SELECT is_staff FROM users WHERE id = ?", [auth.userId]);
    if (user.length === 0 || !user[0].is_staff) return err("Staff access required", 403);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const offset = parseInt(searchParams.get("offset") ?? "0");
    const limit = parseInt(searchParams.get("limit") ?? "50");

    const conditions = ["1=1"];
    const params: any[] = [];
    if (status) { conditions.push("status = ?"); params.push(status); }

    const posts = await executeQuery<any>(
      `SELECT id, title, slug, excerpt, category, status, author_id, published_at, created_at, updated_at
       FROM blog_posts WHERE ${conditions.join(" AND ")} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const count = await executeQuery<any>(
      `SELECT COUNT(*) as count FROM blog_posts WHERE ${conditions.join(" AND ")}`, params
    );

    return ok(posts, { total: count[0]?.count ?? 0, offset, limit });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    const user = await executeQuery<any>("SELECT is_staff FROM users WHERE id = ?", [auth.userId]);
    if (user.length === 0 || !user[0].is_staff) return err("Staff access required", 403);

    const body = await request.json();
    if (!body.title || !body.slug) return err("title and slug are required", 400);

    const existing = await executeQuery<any>("SELECT id FROM blog_posts WHERE slug = ?", [body.slug]);
    if (existing.length > 0) return err("A post with this slug already exists", 409);

    const id = generateUUID();
    await executeQuery(
      "INSERT INTO blog_posts (id, title, slug, body_mdx, excerpt, category, tags, status, seo_title, seo_description, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, body.title, body.slug, body.body_mdx ?? null, body.excerpt ?? null, body.category ?? null,
       JSON.stringify(body.tags ?? []), body.status ?? "draft", body.seo_title ?? null, body.seo_description ?? null,
       auth.userId]
    );

    return ok({ id, slug: body.slug }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
