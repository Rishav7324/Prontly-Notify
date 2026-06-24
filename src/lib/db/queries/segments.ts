import { executeQuery, generateUUID } from "@/lib/db";
import type { SubscriberRow } from "./subscribers";

export interface SegmentRow {
  id: string;
  site_id: string;
  name: string;
  type: "manual" | "dynamic" | "ai_suggested";
  rule_json: string;
  subscriber_count_cached: number;
  created_by_user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SegmentRule {
  id: string;
  attribute: string;
  operator: string;
  value: string;
}

export interface SegmentRuleGroup {
  id: string;
  conditions: SegmentRule[];
  logic: "AND" | "OR";
}

export async function getSegmentById(id: string) {
  const rows = await executeQuery<SegmentRow[]>("SELECT * FROM segments WHERE id = ?", [id]);
  return rows[0] ?? null;
}

export async function getSegmentsBySite(siteId: string) {
  return executeQuery<SegmentRow[]>("SELECT * FROM segments WHERE site_id = ? ORDER BY created_at DESC", [siteId]);
}

export async function createSegment(data: { site_id: string; name: string; rules: SegmentRuleGroup[]; created_by_user_id?: string }) {
  const id = generateUUID();
  await executeQuery(
    "INSERT INTO segments (id, site_id, name, rule_json, created_by_user_id) VALUES (?, ?, ?, ?, ?)",
    [id, data.site_id, data.name, JSON.stringify(data.rules), data.created_by_user_id ?? null]
  );
  return getSegmentById(id);
}

export async function updateSegment(id: string, data: { name?: string; rules?: SegmentRuleGroup[] }) {
  const sets: string[] = [];
  const params: unknown[] = [];
  if (data.name) { sets.push("name = ?"); params.push(data.name); }
  if (data.rules) { sets.push("rule_json = ?"); params.push(JSON.stringify(data.rules)); }
  if (sets.length === 0) return getSegmentById(id);
  sets.push("updated_at = datetime('now')");
  params.push(id);
  await executeQuery(`UPDATE segments SET ${sets.join(", ")} WHERE id = ?`, params);
  return getSegmentById(id);
}

export async function deleteSegment(id: string) {
  await executeQuery("DELETE FROM segments WHERE id = ?", [id]);
}

export async function previewSegmentCount(siteId: string, rules: SegmentRuleGroup[]): Promise<number> {
  if (!rules.length) {
    const rows = await executeQuery<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM subscribers WHERE site_id = ? AND is_active = true", [siteId]
    );
    return rows[0]?.count ?? 0;
  }

  const conditions: string[] = [];
  const params: unknown[] = [siteId];

  for (const group of rules) {
    const groupConditions: string[] = [];
    for (const rule of group.conditions) {
      switch (rule.operator) {
        case "equals":
          groupConditions.push(`json_extract(sub_attr.value, '$."${rule.attribute}"') = ?`);
          params.push(rule.value);
          break;
        case "not_equals":
          groupConditions.push(`COALESCE(json_extract(sub_attr.value, '$."${rule.attribute}"'), '') != ?`);
          params.push(rule.value);
          break;
        case "contains":
          groupConditions.push(`instr(COALESCE(json_extract(sub_attr.value, '$."${rule.attribute}"'), ''), ?) > 0`);
          params.push(rule.value);
          break;
        case "greater_than":
          groupConditions.push(`CAST(COALESCE(json_extract(sub_attr.value, '$."${rule.attribute}"'), '0') AS INTEGER) > ?`);
          params.push(Number(rule.value));
          break;
        case "less_than":
          groupConditions.push(`CAST(COALESCE(json_extract(sub_attr.value, '$."${rule.attribute}"'), '0') AS INTEGER) < ?`);
          params.push(Number(rule.value));
          break;
        case "is_set":
          groupConditions.push(`json_extract(sub_attr.value, '$."${rule.attribute}"') IS NOT NULL`);
          break;
      }
    }
    if (groupConditions.length > 0) {
      conditions.push(`(${groupConditions.join(` ${group.logic} `)})`);
    }
  }

  const whereClause = conditions.length > 0 ? `AND (${conditions.join(" OR ")})` : "";
  const rows = await executeQuery<{ count: number }[]>(
    `SELECT COUNT(*) as count FROM subscribers s
     LEFT JOIN (SELECT subscriber_id, json_group_object(key, value) as value FROM subscriber_attributes GROUP BY subscriber_id) sub_attr ON sub_attr.subscriber_id = s.id
     WHERE s.site_id = ? AND s.is_active = true ${whereClause}`,
    params
  );
  return rows[0]?.count ?? 0;
}
