import { executeQuery, generateUUID } from "@/lib/db";

export interface AnalyticsDailyRow {
  id: string;
  site_id: string;
  date: string;
  sent: number;
  delivered: number;
  clicked: number;
  dismissed: number;
}

export interface DashboardSummary {
  totalSubscribers: number;
  activeSubscribers: number;
  totalCampaigns: number;
  totalNotificationsSent: number;
  subscribersByDay: { date: string; count: number }[];
  browserBreakdown: { browser: string; count: number }[];
  recentNotifications: AnalyticsDailyRow[];
}

export async function getDashboardSummary(siteId: string): Promise<DashboardSummary> {
  const [subCount, campaignCount, analytics] = await Promise.all([
    executeQuery<{ count: number }[]>("SELECT COUNT(*) as count FROM subscribers WHERE site_id = ? AND is_active = true", [siteId]),
    executeQuery<{ count: number }[]>("SELECT COUNT(*) as count FROM campaigns WHERE site_id = ?", [siteId]),
    executeQuery<AnalyticsDailyRow[]>(
      "SELECT * FROM analytics_daily WHERE site_id = ? ORDER BY date DESC LIMIT 30", [siteId]
    ),
  ]);

  const browserData = await executeQuery<{ browser: string; count: number }[]>(
    "SELECT browser, COUNT(*) as count FROM subscribers WHERE site_id = ? AND is_active = true AND browser IS NOT NULL GROUP BY browser ORDER BY count DESC",
    [siteId]
  );

  const totalSent = analytics.reduce((s: number, r: AnalyticsDailyRow) => s + r.sent, 0);

  return {
    totalSubscribers: subCount[0]?.count ?? 0,
    activeSubscribers: subCount[0]?.count ?? 0,
    totalCampaigns: campaignCount[0]?.count ?? 0,
    totalNotificationsSent: totalSent,
    subscribersByDay: analytics.map((r: AnalyticsDailyRow) => ({ date: r.date, count: r.sent })),
    browserBreakdown: browserData,
    recentNotifications: analytics.slice(0, 7),
  };
}

export async function getAnalytics(siteId: string, days = 30) {
  return executeQuery<AnalyticsDailyRow[]>(
    "SELECT * FROM analytics_daily WHERE site_id = ? ORDER BY date DESC LIMIT ?",
    [siteId, days]
  );
}

export async function incrementAnalytics(siteId: string, date: string, field: "sent" | "delivered" | "clicked" | "dismissed") {
  await executeQuery(
    `INSERT INTO analytics_daily (id, site_id, date, ${field}) VALUES (?, ?, ?, 1)
     ON CONFLICT(site_id, date) DO UPDATE SET ${field} = ${field} + 1`,
    [generateUUID(), siteId, date]
  );
}
