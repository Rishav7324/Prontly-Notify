import { executeQuery, generateUUID } from "@/lib/db";

export interface ApiKeyRow {
  id: string;
  workspace_id: string;
  name: string;
  key_hash: string;
  key_prefix: string;
  scopes: string;
  created_by_user_id: string | null;
  last_used_at: string | null;
  revoked_at: string | null;
  created_at: string;
}

export async function getApiKeys(workspaceId: string) {
  return executeQuery<ApiKeyRow[]>(
    "SELECT id, name, key_prefix, scopes, created_by_user_id, last_used_at, created_at FROM api_keys WHERE workspace_id = ? AND revoked_at IS NULL ORDER BY created_at DESC",
    [workspaceId]
  );
}

export async function createApiKey(data: { workspace_id: string; name: string; created_by_user_id?: string; scopes?: string[] }) {
  const id = generateUUID();
  const rawKey = `pn_${generateUUID().replace(/-/g, "")}`;
  const keyHash = await sha256(rawKey);
  const keyPrefix = rawKey.slice(0, 8);
  await executeQuery(
    "INSERT INTO api_keys (id, workspace_id, name, key_hash, key_prefix, scopes, created_by_user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, data.workspace_id, data.name, keyHash, keyPrefix, JSON.stringify(data.scopes ?? ["subscribers:read"]),
     data.created_by_user_id ?? null]
  );
  return { id, name: data.name, key: rawKey, key_prefix: keyPrefix };
}

export async function revokeApiKey(id: string, workspaceId: string) {
  await executeQuery(
    "UPDATE api_keys SET revoked_at = datetime('now') WHERE id = ? AND workspace_id = ? AND revoked_at IS NULL",
    [id, workspaceId]
  );
}

export async function verifyApiKey(rawKey: string): Promise<{ workspace_id: string; scopes: string[] } | null> {
  const keyHash = await sha256(rawKey);
  const rows = await executeQuery<ApiKeyRow[]>(
    "SELECT workspace_id, scopes FROM api_keys WHERE key_hash = ? AND revoked_at IS NULL",
    [keyHash]
  );
  if (!rows[0]) return null;
  await executeQuery("UPDATE api_keys SET last_used_at = datetime('now') WHERE key_hash = ?", [keyHash]);
  return { workspace_id: rows[0].workspace_id, scopes: JSON.parse(rows[0].scopes) };
}

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}
