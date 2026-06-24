import { NextRequest } from "next/server";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { executeQuery, generateUUID } from "@/lib/db";
import { apiKeySchema } from "@/lib/validation";
import crypto from "crypto";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function GET() {
  try {
    const auth = await requireAuth();
    await requireRole(auth, ["owner", "admin"]);

    const keys = await executeQuery<any>(
      `SELECT id, name, key_prefix, scopes, created_by_user_id, last_used_at, created_at, revoked_at
       FROM api_keys WHERE workspace_id = ? AND revoked_at IS NULL
       ORDER BY created_at DESC`,
      [auth.workspaceId]
    );

    return ok(keys);
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth();
    await requireRole(auth, ["owner", "admin"]);

    const body = await request.json();
    const parsed = apiKeySchema.safeParse(body);
    if (!parsed.success) {
      return err(parsed.error.issues[0].message, 400);
    }

    const rawKey = `pn_${crypto.randomBytes(32).toString("hex")}`;
    const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");
    const keyPrefix = rawKey.slice(0, 8);

    const id = generateUUID();
    await executeQuery(
      "INSERT INTO api_keys (id, workspace_id, name, key_hash, key_prefix, scopes, created_by_user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        auth.workspaceId,
        parsed.data.name,
        keyHash,
        keyPrefix,
        JSON.stringify(parsed.data.scopes),
        auth.userId,
      ]
    );

    return Response.json({
      success: true,
      data: {
        id,
        name: parsed.data.name,
        key_prefix: keyPrefix,
        scopes: parsed.data.scopes,
        raw_key: rawKey,
        created_at: new Date().toISOString(),
      },
    }, { status: 201 });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await requireAuth();
    await requireRole(auth, ["owner", "admin"]);

    const url = request.nextUrl;
    const keyId = url.searchParams.get("id");
    if (!keyId) return err("API key id is required", 400);

    await executeQuery(
      "UPDATE api_keys SET revoked_at = CURRENT_TIMESTAMP WHERE id = ? AND workspace_id = ?",
      [keyId, auth.workspaceId]
    );

    return ok({ revoked: true });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
