import { executeQuery, generateUUID } from "@/lib/db";

export interface SiteRow {
  id: string;
  workspace_id: string;
  name: string;
  domain: string;
  category: string;
  platform: string;
  public_key: string;
  private_key: string | null;
  install_status: "pending" | "verified" | "broken";
  onboarding_step: number;
  sending_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export async function getSiteById(id: string) {
  const rows = await executeQuery<SiteRow[]>("SELECT * FROM sites WHERE id = ?", [id]);
  return rows[0] ?? null;
}

export async function getSitesByWorkspace(workspaceId: string) {
  return executeQuery<SiteRow[]>("SELECT * FROM sites WHERE workspace_id = ? ORDER BY created_at DESC", [workspaceId]);
}

export async function createSite(data: Omit<SiteRow, "id" | "created_at" | "updated_at" | "install_status" | "onboarding_step" | "sending_enabled" | "private_key">) {
  const id = generateUUID();
  const keys = await generateVapidKeys();
  await executeQuery(
    "INSERT INTO sites (id, workspace_id, name, domain, category, platform, public_key, private_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [id, data.workspace_id, data.name, data.domain, data.category, data.platform, keys.publicKey, keys.privateKey]
  );
  return getSiteById(id);
}

export async function updateSite(id: string, data: Partial<Pick<SiteRow, "name" | "domain" | "category" | "platform" | "install_status" | "onboarding_step">>) {
  const sets: string[] = [];
  const params: unknown[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) {
      sets.push(`${k} = ?`);
      params.push(v);
    }
  }
  if (sets.length === 0) return getSiteById(id);
  sets.push("updated_at = datetime('now')");
  params.push(id);
  await executeQuery(`UPDATE sites SET ${sets.join(", ")} WHERE id = ?`, params);
  return getSiteById(id);
}

export async function deleteSite(id: string) {
  await executeQuery("DELETE FROM sites WHERE id = ?", [id]);
}

async function generateVapidKeys() {
  return {
    publicKey: crypto.randomUUID().replace(/-/g, "").slice(0, 32),
    privateKey: crypto.randomUUID().replace(/-/g, "").slice(0, 32),
  };
}
