import "server-only";

function getD1Config() {
  // Support both old (CF_) and new (CLOUDFLARE_) env var naming
  return {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CF_ACCOUNT_ID,
    databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID || process.env.CF_D1_DATABASE_ID,
    apiToken: process.env.CLOUDFLARE_API_TOKEN || process.env.CF_D1_API_TOKEN,
  };
}

export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T> {
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