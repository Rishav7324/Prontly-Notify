import "server-only";

type D1PreparedStatement = { bind: (...values: any[]) => Promise<{ results: any[] }> };
type D1Database = { prepare: (sql: string) => D1PreparedStatement };

function getD1Config() {
  // Support both old (CF_) and new (CLOUDFLARE_) env var naming
  return {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CF_ACCOUNT_ID,
    databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID || process.env.CF_D1_DATABASE_ID,
    apiToken: process.env.CLOUDFLARE_API_TOKEN || process.env.CF_D1_API_TOKEN,
  };
}

function getBinding(): D1Database | null {
  try {
    const DB = (process.env as Record<string, any>)?.DB;
    if (DB && typeof DB.prepare === "function") return DB as D1Database;
  } catch {
    // not in a binding-enabled runtime
  }
  return null;
}

export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T> {
  const binding = getBinding();
  if (binding) {
    const result = await binding.prepare(sql).bind(...params);
    return (result.results ?? []) as T;
  }

  // Fallback: D1 REST API (used in local Node dev / environments without a binding)
  const { accountId, databaseId, apiToken } = getD1Config();
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
    signal: AbortSignal.timeout(15000),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.errors?.[0]?.message || "D1 Query Failed");
  return data.result?.[0]?.results || [];
}

// UUIDv7 generator placeholder (use a library like 'uuidv7' in production)
export function generateUUID() {
  return crypto.randomUUID();
}
