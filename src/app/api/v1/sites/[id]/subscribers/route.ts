import { NextRequest } from "next/server";
import { requireAuth, requireSiteAccess } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { subscriberSchema } from "@/lib/validation";

function ok(data: any, meta?: any) {
  return Response.json({ success: true, data, ...(meta ? { meta } : {}) });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: siteId } = await params;

    const body = await request.json();
    const parsed = subscriberSchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    const sites = await executeQuery<any>(
      "SELECT id, sending_enabled FROM sites WHERE id = ?",
      [siteId]
    );
    if (sites.length === 0) return err("Site not found", 404);

    const existing = await executeQuery<any>(
      "SELECT id, status FROM subscribers WHERE site_id = ? AND fcm_token = ?",
      [siteId, parsed.data.fcm_token]
    );

    if (existing.length > 0) {
      if (existing[0].status === "unsubscribed") {
        await executeQuery(
          "UPDATE subscribers SET status = 'active', unsubscribed_at = NULL, last_seen_at = CURRENT_TIMESTAMP WHERE id = ?",
          [existing[0].id]
        );
      } else {
        await executeQuery(
          "UPDATE subscribers SET last_seen_at = CURRENT_TIMESTAMP WHERE id = ?",
          [existing[0].id]
        );
      }
      return ok({ id: existing[0].id, existing: true });
    }

    const id = generateUUID();
    await executeQuery(
      "INSERT INTO subscribers (id, site_id, fcm_token, browser, os, country, city) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        siteId,
        parsed.data.fcm_token,
        parsed.data.browser || null,
        parsed.data.os || null,
        parsed.data.country || null,
        parsed.data.city || null,
      ]
    );

    return Response.json({ success: true, data: { id } }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;
    await requireSiteAccess(auth, id);

    const url = request.nextUrl;
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);
    const offset = (page - 1) * limit;
    const status = url.searchParams.get("status");
    const browser = url.searchParams.get("browser");
    const country = url.searchParams.get("country");
    const search = url.searchParams.get("search");

    let where = "WHERE site_id = ?";
    const paramsArr: any[] = [id];

    if (status && ["active", "unsubscribed"].includes(status)) {
      where += " AND status = ?";
      paramsArr.push(status);
    }
    if (browser) {
      where += " AND browser = ?";
      paramsArr.push(browser);
    }
    if (country) {
      where += " AND country = ?";
      paramsArr.push(country);
    }
    if (search) {
      where += " AND (fcm_token LIKE ? OR country LIKE ? OR city LIKE ?)";
      const s = `%${search}%`;
      paramsArr.push(s, s, s);
    }

    const countResult = await executeQuery<any>(
      `SELECT COUNT(*) as total FROM subscribers ${where}`,
      paramsArr
    );
    const total = countResult[0]?.total || 0;

    const subscribers = await executeQuery<any>(
      `SELECT id, browser, os, country, city, status, subscribed_at, last_seen_at
       FROM subscribers ${where} ORDER BY subscribed_at DESC LIMIT ? OFFSET ?`,
      [...paramsArr, limit, offset]
    );

    return ok(subscribers, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
