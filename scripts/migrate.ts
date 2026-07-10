import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const MIGRATIONS_DIR = join(__dirname, "..", "db", "migrations");

function getD1Config() {
  return {
    accountId: process.env.CF_ACCOUNT_ID,
    databaseId: process.env.CF_D1_DATABASE_ID,
    apiToken: process.env.CF_D1_API_TOKEN,
  };
}

async function executeQuery(sql: string, params: any[] = []): Promise<any> {
  const { accountId, databaseId, apiToken } = getD1Config();
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.errors?.[0]?.message || "D1 Query Failed");
  }
  return data.result?.[0]?.results || [];
}

async function ensureMigrationsTable() {
  await executeQuery(
    `CREATE TABLE IF NOT EXISTS _migrations (
      id TEXT PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now')),
      checksum TEXT NOT NULL
    )`
  );
}

async function getAppliedMigrations(): Promise<Set<string>> {
  const rows = await executeQuery("SELECT filename FROM _migrations ORDER BY filename");
  return new Set(rows.map((r: any) => r.filename));
}

async function recordMigration(filename: string, checksum: string) {
  const crypto = await import("crypto");
  const id = crypto.randomUUID();
  await executeQuery(
    "INSERT INTO _migrations (id, filename, checksum) VALUES (?, ?, ?)",
    [id, filename, checksum]
  );
}

function computeChecksum(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(16);
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");

  if (isDryRun) {
    console.log("=== DRY RUN MODE ===");
  }

  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("No migration files found.");
    process.exit(0);
  }

  console.log(`Found ${files.length} migration file(s).`);

  if (!isDryRun) {
    try {
      await ensureMigrationsTable();
    } catch (err: any) {
      console.error("Failed to ensure _migrations table:", err.message);
      process.exit(1);
    }
  }

  const applied = isDryRun ? new Set<string>() : await getAppliedMigrations();
  const pending = files.filter((f) => !applied.has(f));

  if (pending.length === 0) {
    console.log("All migrations are already applied.");
    process.exit(0);
  }

  console.log(`Pending migrations: ${pending.length}`);

  for (const file of pending) {
    const filePath = join(MIGRATIONS_DIR, file);
    const content = readFileSync(filePath, "utf-8").trim();

    if (!content) {
      console.log(`  SKIP ${file} (empty file)`);
      continue;
    }

    const checksum = computeChecksum(content);

    const statements = content
      .split(";")
      .map((s) => s.replace(/^--.*$/gm, "").trim())
      .filter((s) => s.length > 0);

    console.log(`  APPLY ${file} (${statements.length} statement(s))`);

    if (isDryRun) {
      for (const stmt of statements) {
        console.log(`    ${stmt.substring(0, 80)}${stmt.length > 80 ? "..." : ""};`);
      }
      continue;
    }

    try {
      for (const stmt of statements) {
        await executeQuery(stmt);
      }
      await recordMigration(file, checksum);
      console.log(`  DONE  ${file}`);
    } catch (err: any) {
      console.error(`  FAIL  ${file}: ${err.message}`);
      process.exit(1);
    }
  }

  console.log("Migration complete.");
  process.exit(0);
}

main();