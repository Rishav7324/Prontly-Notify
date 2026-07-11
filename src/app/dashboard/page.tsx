"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { EmptyState } from "@/components/domain/EmptyState";
import { KPIStatCard } from "@/components/domain/KPIStatCard";
import { useToast } from "@/hooks/useToast";
import { useActiveSite } from "@/hooks/useActiveSite";
import { formatNumber, formatDate, cn } from "@/lib/utils";
import Link from "next/link";
import {
  Users,
  Send,
  MousePointerClick,
  Megaphone,
  Loader2,
  Bot,
  RefreshCw,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  UserPlus,
  CalendarClock,
  Activity,
  Globe,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DateRange = "7d" | "30d" | "90d";

interface Campaign {
  id: string;
  title: string;
  status: "sent" | "scheduled" | "draft" | "failed";
  sentDate: string;
  delivered: number;
  ctr: number;
}

interface ActivityItem {
  id: string;
  type: "subscriber" | "campaign" | "click" | "scheduled";
  text: string;
  timestamp: string;
}

type KpiCard = {
  label: string;
  value: string;
  delta?: { value: number; isPositive: boolean };
  sparklineData?: number[];
  icon: React.ReactNode;
};

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
];

const statusVariant: Record<Campaign["status"], "success" | "info" | "default" | "error"> = {
  sent: "success",
  scheduled: "info",
  draft: "default",
  failed: "error",
};

const statusLabel: Record<Campaign["status"], string> = {
  sent: "Sent",
  scheduled: "Scheduled",
  draft: "Draft",
  failed: "Failed",
};

function activityIcon(type: ActivityItem["type"], className?: string) {
  const cn = className ?? "size-4";
  switch (type) {
    case "subscriber":
      return <UserPlus className={cn} />;
    case "campaign":
      return <Send className={cn} />;
    case "click":
      return <MousePointerClick className={cn} />;
    case "scheduled":
      return <CalendarClock className={cn} />;
  }
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function DashboardHome() {
  const toast = useToast();
  const { activeSite } = useActiveSite();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [kpis, setKpis] = useState<KpiCard[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [growthData, setGrowthData] = useState<{ label: string; value: number }[]>([]);
  const [aiSummary, setAiSummary] = useState("");
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [regenerating, setRegenerating] = useState(false);

  const fetchData = useCallback(async () => {
    if (!activeSite) return;
    const siteId = activeSite.id;
    setLoading(true);
    try {
      const summaryRes = await fetch(`/api/v1/sites/${siteId}/dashboard-summary?range=${dateRange}`).catch(() => null);
      const campaignsRes = await fetch(`/api/v1/campaigns?range=${dateRange}`).catch(() => null);
      const aiRes = await fetch(`/api/v1/ai/analytics-summary?siteId=${siteId}&range=${dateRange}`).catch(() => null);

      if (summaryRes && summaryRes.ok) {
        const summaryJson = await summaryRes.json();
        if (summaryJson.success) {
          const d = summaryJson.data;
          setKpis([
            {
              label: "Total Subscribers",
              value: formatNumber(d.subscribers?.total ?? 0),
              icon: <Users className="size-5" />,
            },
            {
              label: "Sent",
              value: formatNumber(d.delivery?.total_sent ?? 0),
              icon: <Send className="size-5" />,
            },
            {
              label: "Avg CTR",
              value: d.delivery ? `${(d.delivery.ctr ?? 0).toFixed(1)}%` : "0.0%",
              icon: <MousePointerClick className="size-5" />,
            },
            {
              label: "Active Campaigns",
              value: String(d.campaigns?.sent ?? 0),
              icon: <Megaphone className="size-5" />,
            },
          ]);
          setGrowthData(d.subscriber_trend ?? []);
          setActivity(d.recent_activity ?? []);
        }
      }
      if (campaignsRes && campaignsRes.ok) {
        const campaignsJson = await campaignsRes.json();
        if (campaignsJson.success) setCampaigns(campaignsJson.data ?? []);
      }
      if (aiRes && aiRes.ok) {
        const aiJson = await aiRes.json();
        if (aiJson.success) setAiSummary(aiJson.data.summary ?? "");
      }
    } catch {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [activeSite, dateRange, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRegenerate = async () => {
    if (!activeSite) return;
    setRegenerating(true);
    try {
      const res = await fetch(`/api/v1/ai/analytics-summary?siteId=${activeSite.id}&range=${dateRange}`, {
        method: "POST",
      });
      const json = await res.json();
      if (json.success) setAiSummary(json.data.summary ?? "");
    } catch {
      toast.error("Failed to regenerate insight");
    } finally {
      setRegenerating(false);
    }
  };

  const campaignColumns: Column<Campaign>[] = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (c) => (
        <span className="font-medium text-text-primary">{c.title}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (c) => (
        <Badge variant={statusVariant[c.status]} size="sm">
          {statusLabel[c.status]}
        </Badge>
      ),
    },
    {
      key: "delivered",
      label: "Sent",
      sortable: true,
      render: (c) => (
        <span className="tabular-nums text-text-secondary">{formatNumber(c.delivered)}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: "ctr",
      label: "CTR",
      sortable: true,
      render: (c) => (
        <span className="tabular-nums text-text-secondary">{c.ctr}%</span>
      ),
      hideOnMobile: true,
    },
    {
      key: "sentDate",
      label: "Date",
      sortable: true,
      render: (c) => (
        <span className="text-text-muted">{c.sentDate ? formatDate(c.sentDate) : "—"}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: "actions",
      label: "",
      render: (c) => (
        <DropdownMenu
          align="end"
          trigger={<MoreHorizontal className="size-4" />}
          items={[
            { label: "View", icon: <Eye className="size-4" />, onClick: () => {} },
            { label: "Edit", icon: <Edit className="size-4" />, onClick: () => {} },
            { label: "Duplicate", icon: <Copy className="size-4" />, onClick: () => {} },
            { label: "Delete", icon: <Trash2 className="size-4" />, onClick: () => {}, destructive: true },
          ]}
        />
      ),
    },
  ];

  if (!activeSite && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Globe className="mb-4 size-12 text-text-muted" />
        <h2 className="text-xl font-semibold text-text-primary">No website selected</h2>
        <p className="mt-2 text-sm text-text-muted">Select or add a website to view your dashboard.</p>
        <Link href="/dashboard/sites">
          <Button className="mt-6" icon={<Plus className="size-4" />}>Add Website</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="mt-1 text-sm text-text-muted">Welcome back! Here&apos;s your overview.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date range selector */}
          <div className="flex overflow-hidden rounded-lg border border-border bg-surface">
            {dateRangeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDateRange(opt.value)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  dateRange === opt.value
                    ? "bg-primary text-white"
                    : "text-text-muted hover:text-text-primary"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Link href="/dashboard/campaigns/new">
            <Button icon={<Plus className="size-4" />}>New Campaign</Button>
          </Link>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KPIStatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            sparklineData={kpi.sparklineData}
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* 2-Column Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Subscriber Growth Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Growth</CardTitle>
            </CardHeader>
            <CardContent>
              {growthData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <defs>
                        <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0447ff" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#0447ff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ebe8e4" />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: "#a59f97" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#a59f97" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => formatNumber(v)}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#fdfcfc",
                          border: "1px solid #ebe8e4",
                          borderRadius: 8,
                          fontSize: 13,
                        }}
                        labelStyle={{ color: "#777169" }}
                        formatter={(value: any) => { const n = typeof value === "number" ? value : 0; return [formatNumber(n), "Subscribers"]; }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0447ff"
                        strokeWidth={2}
                        fill="url(#growthFill)"
                        dot={{ r: 3, fill: "#0447ff", stroke: "#fdfcfc", strokeWidth: 2 }}
                        activeDot={{ r: 5, fill: "#0447ff", stroke: "#fdfcfc", strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-text-muted">No growth data available for this period.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: AI Insight + Recent Activity */}
        <div className="space-y-6">
          {/* AI Insight Card */}
          <div className="relative rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-[1px]">
            <div className="rounded-xl bg-surface p-4 h-full">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center rounded-lg bg-primary/15 p-2">
                    <Bot className="size-4 text-primary" />
                  </span>
                  <span className="text-sm font-semibold text-text-primary">AI Insight</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  loading={regenerating}
                  icon={<RefreshCw className="size-3.5" />}
                  onClick={handleRegenerate}
                >
                  Regenerate
                </Button>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {aiSummary || "No insights available yet. Check back after sending more campaigns."}
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="size-4 text-text-muted" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activity.length > 0 ? (
                <div className="space-y-4">
                  {activity.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-black/[0.04]">
                        {activityIcon(item.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-text-secondary">{item.text}</p>
                        <p className="mt-0.5 text-xs text-text-muted">{timeAgo(item.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-text-muted">No recent activity.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <Link href="/dashboard/campaigns">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <EmptyState
              icon={<Send className="size-8" />}
              title="No campaigns yet"
              description="Start your first campaign!"
              action={
                <Link href="/dashboard/campaigns/new">
                  <Button icon={<Plus className="size-4" />}>Create Campaign</Button>
                </Link>
              }
            />
          ) : (
            <DataTable
              columns={campaignColumns}
              data={campaigns}
              sortable
              keyExtractor={(c) => c.id}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
