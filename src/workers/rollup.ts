// Analytics rollup worker
// Runs hourly to aggregate analytics_daily data
// and update cached segment subscriber counts

import { executeQuery } from "@/lib/db";

export async function rollupAnalytics() {
  // Aggregate campaign_deliveries into analytics_daily for today
  const today = new Date().toISOString().slice(0, 10);

  const dailyStats = await executeQuery<any>(
    `SELECT c.site_id,
            COUNT(CASE WHEN cd.status IN ('delivered', 'clicked') THEN 1 END) as delivered,
            COUNT(CASE WHEN cd.status = 'clicked' THEN 1 END) as clicked,
            COUNT(CASE WHEN cd.status = 'failed' THEN 1 END) as failed,
            COUNT(*) as sent
     FROM campaign_deliveries cd
     JOIN campaigns c ON c.id = cd.campaign_id
     WHERE date(cd.sent_at) = ?
     GROUP BY c.site_id`,
    [today]
  );

  for (const stat of dailyStats) {
    await executeQuery(
      `INSERT INTO analytics_daily (id, site_id, date, sent, delivered, clicked, dismissed)
       VALUES (?, ?, ?, ?, ?, ?, 0)
       ON CONFLICT(site_id, date) DO UPDATE SET
         sent = excluded.sent,
         delivered = excluded.delivered,
         clicked = excluded.clicked`,
      [crypto.randomUUID(), stat.site_id, today, stat.sent, stat.delivered, stat.clicked]
    );
  }

  // Update cached subscriber counts for segments
  const segments = await executeQuery<any>("SELECT id, site_id, rule_json FROM segments WHERE type IN ('dynamic', 'ai_suggested')");

  for (const segment of segments) {
    try {
      const rules = JSON.parse(segment.rule_json ?? "[]");
      let count = 0;

      if (rules.length === 0) {
        const rows = await executeQuery<{ count: number }[]>(
          "SELECT COUNT(*) as count FROM subscribers WHERE site_id = ? AND is_active = true",
          [segment.site_id]
        );
        count = rows[0]?.count ?? 0;
      } else {
        const conditions: string[] = [];
        const params: any[] = [segment.site_id];

        for (const group of rules) {
          const groupConditions: string[] = [];
          for (const rule of group.conditions ?? []) {
            switch (rule.operator) {
              case "equals":
                groupConditions.push(`COALESCE(json_extract(s.tags, '$."${rule.attribute}"'), '') = ?`);
                params.push(rule.value);
                break;
              case "not_equals":
                groupConditions.push(`COALESCE(json_extract(s.tags, '$."${rule.attribute}"'), '') != ?`);
                params.push(rule.value);
                break;
              case "contains":
                groupConditions.push(`instr(COALESCE(s.browser, ''), ?) > 0`);
                params.push(rule.value);
                break;
              case "greater_than":
                groupConditions.push(`CAST(COALESCE(json_extract(s.tags, '$."${rule.attribute}"'), '0') AS INTEGER) > ?`);
                params.push(Number(rule.value));
                break;
              case "less_than":
                groupConditions.push(`CAST(COALESCE(json_extract(s.tags, '$."${rule.attribute}"'), '0') AS INTEGER) < ?`);
                params.push(Number(rule.value));
                break;
              case "is_set":
                groupConditions.push(`json_extract(s.tags, '$."${rule.attribute}"') IS NOT NULL`);
                break;
            }
          }
          if (groupConditions.length > 0) {
            conditions.push(`(${groupConditions.join(` ${group.logic ?? "AND"} `)})`);
          }
        }

        const whereClause = conditions.length > 0 ? `AND (${conditions.join(" OR ")})` : "";
        const rows = await executeQuery<{ count: number }[]>(
          `SELECT COUNT(*) as count FROM subscribers s WHERE s.site_id = ? AND s.is_active = true ${whereClause}`,
          params
        );
        count = rows[0]?.count ?? 0;
      }

      await executeQuery("UPDATE segments SET subscriber_count_cached = ?, updated_at = datetime('now') WHERE id = ?", [count, segment.id]);
    } catch {
      // skip segments with invalid rules
    }
  }

  return { sitesProcessed: dailyStats.length };
}
