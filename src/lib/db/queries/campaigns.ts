import { executeQuery, generateUUID } from "@/lib/db";

export interface CampaignRow {
  id: string;
  site_id: string;
  title: string;
  body: string;
  icon_url: string | null;
  image_url: string | null;
  click_url: string | null;
  action_buttons: string;
  segment_id: string | null;
  status: "draft" | "scheduled" | "sending" | "sent" | "failed";
  scheduled_at: string | null;
  sent_at: string | null;
  ai_generated: boolean;
  created_by_user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignStatsRow {
  campaign_id: string;
  sent_count: number;
  delivered_count: number;
  failed_count: number;
  click_count: number;
  updated_at: string;
}

export async function getCampaignById(id: string) {
  const rows = await executeQuery<CampaignRow[]>("SELECT * FROM campaigns WHERE id = ?", [id]);
  return rows[0] ?? null;
}

export async function getCampaignsBySite(siteId: string, options?: { status?: string; offset?: number; limit?: number }) {
  const conditions = ["site_id = ?"];
  const params: unknown[] = [siteId];
  if (options?.status) { conditions.push("status = ?"); params.push(options.status); }
  const limit = options?.limit ?? 20;
  const offset = options?.offset ?? 0;
  return executeQuery<(CampaignRow & CampaignStatsRow)[]>(
    `SELECT c.*, COALESCE(cs.sent_count, 0) as sent_count, COALESCE(cs.delivered_count, 0) as delivered_count,
            COALESCE(cs.failed_count, 0) as failed_count, COALESCE(cs.click_count, 0) as click_count
     FROM campaigns c LEFT JOIN campaign_stats cs ON cs.campaign_id = c.id
     WHERE ${conditions.join(" AND ")} ORDER BY c.created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
}

export async function createCampaign(data: {
  site_id: string; title: string; body: string; click_url?: string; icon_url?: string; image_url?: string;
  action_buttons?: { label: string; url: string }[]; segment_id?: string; scheduled_at?: string;
  ai_generated?: boolean; created_by_user_id?: string;
}) {
  const id = generateUUID();
  await executeQuery(
    `INSERT INTO campaigns (id, site_id, title, body, click_url, icon_url, image_url, action_buttons, segment_id, scheduled_at, ai_generated, created_by_user_id, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft')`,
    [id, data.site_id, data.title, data.body, data.click_url ?? null, data.icon_url ?? null, data.image_url ?? null,
     JSON.stringify(data.action_buttons ?? []), data.segment_id ?? null, data.scheduled_at ?? null,
     data.ai_generated ?? false, data.created_by_user_id ?? null]
  );
  return getCampaignById(id);
}

export async function updateCampaign(id: string, data: Partial<Pick<CampaignRow, "title" | "body" | "click_url" | "status" | "scheduled_at" | "segment_id">>) {
  const sets: string[] = [];
  const params: unknown[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) { sets.push(`${k} = ?`); params.push(v); }
  }
  if (sets.length === 0) return getCampaignById(id);
  sets.push("updated_at = datetime('now')");
  params.push(id);
  await executeQuery(`UPDATE campaigns SET ${sets.join(", ")} WHERE id = ?`, params);
  return getCampaignById(id);
}

export async function duplicateCampaign(id: string) {
  const original = await getCampaignById(id);
  if (!original) return null;
  const newId = generateUUID();
  await executeQuery(
    `INSERT INTO campaigns (id, site_id, title, body, click_url, icon_url, image_url, action_buttons, segment_id, status, ai_generated, created_by_user_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?)`,
    [newId, original.site_id, `${original.title} (copy)`, original.body, original.click_url, original.icon_url,
     original.image_url, original.action_buttons, original.segment_id, original.ai_generated, original.created_by_user_id]
  );
  return getCampaignById(newId);
}

export async function getCampaignStats(campaignId: string) {
  const rows = await executeQuery<CampaignStatsRow[]>("SELECT * FROM campaign_stats WHERE campaign_id = ?", [campaignId]);
  if (rows[0]) return rows[0];
  return { campaign_id: campaignId, sent_count: 0, delivered_count: 0, failed_count: 0, click_count: 0, updated_at: "" };
}

export async function incrementCampaignStat(campaignId: string, field: "sent_count" | "delivered_count" | "failed_count" | "click_count") {
  await executeQuery(
    `INSERT INTO campaign_stats (campaign_id, ${field}, updated_at) VALUES (?, 1, datetime('now'))
     ON CONFLICT(campaign_id) DO UPDATE SET ${field} = ${field} + 1, updated_at = datetime('now')`,
    [campaignId]
  );
}
