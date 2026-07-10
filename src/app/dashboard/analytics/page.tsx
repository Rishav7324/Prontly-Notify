"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/domain/EmptyState";
import { AnalyticsChart } from "@/components/analytics/AnalyticsChart";
import { useToast } from "@/components/ui/Toast";
import { useActiveSite } from "@/hooks/useActiveSite";
import { formatNumber } from "@/lib/utils";
import {
  Download,
  Sparkles,
  TrendingUp,
  MousePointerClick,
  Send,
  UserMinus,
  RotateCw,
  Loader2,
  BarChart3,
  Radio,
  Users,
} from "lucide-react";

interface TopCampaign {
  id: string;
  title: string;
  sent: number;
  delivered: number;
  ctr: number;
}

const dateRanges = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
];

export default function AnalyticsPage() {
  const { addToast } = useToast();
  const { activeSite } = useActiveSite();
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30d");
  const [kpis, setKpis] = useState<{ label: string; value: string; change: number; icon: React.ReactNode; color: string }[]>([]);
  const [growthData, setGrowthData] = useState<{ label: string; value: number }[]>([]);
  const [campaignPerfData, setCampaignPerfData] = useState<{ label: string; value: number }[]>([]);
  const [ctrDistData, setCtrDistData] = useState<{ label: string; value: number }[]>([]);
  const [topCampaigns, setTopCampaigns] = useState<TopCampaign[]>([]);
  const [aiSummary, setAiSummary] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [liveSubscribers, setLiveSubscribers] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    if (!activeSite) return;
    const siteId = activeSite.id;
    try {
      const [analyticsRes, aiRes, liveRes] = await Promise.all([
        fetch(`/api/v1/sites/${siteId}/analytics?range=${range}`),
        fetch("/api/v1/ai/analytics-summary"),
        fetch(`/api/v1/sites/${siteId}/subscribers/count`),
      ]);
      const analyticsJson = await analyticsRes.json();
      const aiJson = await aiRes.json();
      const liveJson = await liveRes.json();

      if (analyticsJson.success) {
        const d = analyticsJson.data;
        setKpis([
          { label: "Net Growth", value: `+${formatNumber(d.net_growth ?? 0)}`, change: d.growth_change ?? 0, icon: <TrendingUp className="h-5 w-5" />, color: "text-success" },
          { label: "Avg CTR", value: `${(d.avg_ctr ?? 0).toFixed(1)}%`, change: d.ctr_change ?? 0, icon: <MousePointerClick className="h-5 w-5" />, color: "text-primary" },
          { label: "Total Delivered", value: formatNumber(d.total_delivered ?? 0), change: d.delivered_change ?? 0, icon: <Send className="h-5 w-5" />, color: "text-primary" },
          { label: "Unsubscribe Rate", value: `${(d.unsubscribe_rate ?? 0).toFixed(1)}%`, change: d.unsub_change ?? 0, icon: <UserMinus className="h-5 w-5" />, color: "text-error" },
        ]);
        setGrowthData(d.subscriber_growth ?? []);
        setCampaignPerfData(d.campaign_performance ?? []);
        setCtrDistData(d.ctr_distribution ?? []);
        setTopCampaigns(d.top_campaigns ?? []);
      }
      if (aiJson.success) setAiSummary(aiJson.data.summary ?? "");
      if (liveJson.success) setLiveSubscribers(liveJson.data.count ?? liveJson.data.total ?? null);
    } catch {
      addToast("Failed to load analytics", "error");
    } finally {
      setLoading(false);
    }
  }, [activeSite, range, addToast]);

  useEffect(() => {
    if (!activeSite) return;
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchData, 30_000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, fetchData]);

  const handleExport = async () => {
    if (!activeSite) return;
    try {
      const res = await fetch(`/api/v1/sites/${activeSite.id}/analytics/export?range=${range}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics-${range}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      addToast("Export downloaded", "success");
    } catch {
      addToast("Failed to export analytics", "error");
    }
  };

  const columns: Column<TopCampaign>[] = [
    { key: "title", label: "Campaign", render: (c) => <span className="font-medium text-text-primary">{c.title}</span> },
    { key: "sent", label: "Sent", render: (c) => formatNumber(c.sent) },
    { key: "delivered", label: "Delivered", render: (c) => formatNumber(c.delivered) },
    { key: "ctr", label: "CTR", render: (c) => `${c.ctr}%` },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
          <p className="mt-1 text-sm text-text-muted">Track your notification performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Toggle
              checked={autoRefresh}
              onChange={setAutoRefresh}
              label="Auto-refresh"
            />
            {autoRefresh && (
              <Badge variant="success" size="sm" className="animate-pulse">
                <Radio className="mr-1 h-3 w-3" />
                Live
              </Badge>
            )}
          </div>
          <Button variant="outline" onClick={handleExport} icon={<Download className="h-4 w-4" />}>
            Export CSV
          </Button>
        </div>
      </div>

      {liveSubscribers !== null && (
        <Card variant="glass">
          <CardContent>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm text-text-secondary">Active Subscribers</span>
              <span className="text-2xl font-bold text-text-primary">{formatNumber(liveSubscribers)}</span>
              {autoRefresh && (
                <Badge variant="success" size="sm">
                  <Radio className="mr-1 h-3 w-3" />
                  Live
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {dateRanges.map((dr) => (
          <button
            key={dr.key}
            onClick={() => setRange(dr.key)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              range === dr.key ? "bg-primary text-white" : "bg-white/5 text-text-secondary hover:bg-white/10"
            }`}
          >
            {dr.label}
          </button>
        ))}
      </div>

      {aiSummary && (
        <Card variant="featured">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-text-primary">AI Summary</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => addToast("Regenerating AI analysis...", "info")} icon={<RotateCw className="h-3.5 w-3.5" />}>
                Regenerate
              </Button>
            </div>
            <p className="mt-2 text-sm text-text-secondary">{aiSummary}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent>
              <div className="flex items-center gap-2 text-text-muted">
                {kpi.icon}
                <span className="text-sm">{kpi.label}</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <AnalyticsChart
            title="Subscriber Growth"
            data={growthData}
            height={180}
          />
        </div>
        <div className="xl:col-span-1">
          <AnalyticsChart
            title="Campaign Performance"
            data={campaignPerfData}
            height={180}
          />
        </div>
        <div className="xl:col-span-1">
          <AnalyticsChart
            title="CTR Distribution"
            data={ctrDistData}
            height={180}
            suffix="%"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          {topCampaigns.length === 0 ? (
            <EmptyState
              icon={<BarChart3 className="h-8 w-8" />}
              title="No campaigns yet"
              description="Send your first campaign to see analytics."
            />
          ) : (
            <DataTable columns={columns} data={topCampaigns} keyExtractor={(c) => c.id} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}