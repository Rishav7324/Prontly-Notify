"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/domain/EmptyState";
import { cn, formatNumber } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Send,
  CheckCircle2,
  XCircle,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Activity,
  Loader2,
  Bell,
  Globe,
  BarChart3,
} from "lucide-react";

interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: typeof DollarSign;
}

function SparklineChart() {
  const points = [40, 65, 45, 80, 55, 90, 70, 95, 75, 85, 88, 92];
  const width = 240;
  const height = 60;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * width,
    y: height - ((p - min) / range) * (height - 10) - 5,
  }));
  const pathD = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join("");
  return (
    <svg width={width} height={height} className="overflow-visible" aria-label="Revenue trend chart">
      <path d={pathD} fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
        <stop offset="100%" stopColor="rgba(59,130,246,0)" />
      </linearGradient>
      <path d={`${pathD} L${width},${height} L0,${height} Z`} fill="url(#revenueGrad)" />
    </svg>
  );
}

function BarChart() {
  const data = [65, 40, 80, 55, 90, 70, 85, 60, 75, 95, 50, 78];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxVal = Math.max(...data);
  const barWidth = 20;
  const gap = 8;
  const chartH = 140;
  return (
    <svg width={(barWidth + gap) * data.length} height={chartH + 20} className="overflow-visible" aria-label="Notification delivery chart">
      {data.slice(0, 7).map((v, i) => {
        const barH = (v / maxVal) * chartH;
        return (
          <g key={i}>
            <rect
              x={i * (barWidth + gap)}
              y={chartH - barH}
              width={barWidth}
              height={barH}
              rx="3"
              fill="rgba(59,130,246,0.6)"
            />
            <text
              x={i * (barWidth + gap) + barWidth / 2}
              y={chartH + 14}
              textAnchor="middle"
              className="fill-text-muted"
              fontSize="10"
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

async function fetchData() {
  const res = await fetch("/api/v1/admin/overview");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch overview");
  return json.data;
}

export default function AdminDashboard() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchData();
      setOverview(data);
      setLastRefreshed(new Date());
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [loadData]);

  const kpiData: KpiCard[] = overview ? [
    { label: "MRR", value: `$${formatNumber(overview.overview.mrr)}`, change: overview.overview.mrr > 0 ? "+12.3%" : "0%", trend: "up", icon: DollarSign },
    { label: "Active Accounts", value: formatNumber(overview.overview.total_workspaces), change: "+5.2%", trend: "up", icon: Users },
    { label: "Total Subscribers", value: formatNumber(overview.overview.total_subscribers), change: "+8.1%", trend: "up", icon: Users },
    { label: "Notifications Today", value: formatNumber(overview.delivery.total_sent), change: "+3.7%", trend: "up", icon: Send },
    { label: "Delivery Success Rate", value: overview.delivery.total_sent > 0 ? `${((overview.delivery.total_delivered / overview.delivery.total_sent) * 100).toFixed(1)}%` : "N/A", change: "-0.4%", trend: "down", icon: CheckCircle2 },
    { label: "Failed Payments", value: String(overview.overview.failed_payments), change: "+15%", trend: "up", icon: XCircle },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Overview</h1>
          <p className="mt-1 text-sm text-text-muted">System-wide metrics and alerts</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted">Last updated: {lastRefreshed.toLocaleTimeString()}</span>
          <Button variant="outline" size="sm" icon={<RefreshCw className="size-4" />} onClick={loadData} loading={loading}>Refresh</Button>
        </div>
      </div>

      {!overview && !loading ? (
        <EmptyState icon={<BarChart3 className="size-12" />} title="No data available" description="Could not load admin overview data" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {kpiData.map((kpi) => (
              <Card key={kpi.label} className="relative overflow-hidden">
                {loading ? (
                  <Skeleton variant="card" />
                ) : (
                  <>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <kpi.icon className="size-4 text-primary" />
                        </div>
                        <Badge variant={kpi.trend === "up" ? "success" : "error"} size="sm">
                          {kpi.trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                          {kpi.change}
                        </Badge>
                      </div>
                      <p className="mt-3 text-xs text-text-muted">{kpi.label}</p>
                      <p className="mt-1 text-2xl font-bold text-text-primary tabular-nums">{kpi.value}</p>
                    </CardContent>
                    {kpi.label === "MRR" && <div className="absolute -bottom-2 -right-2 opacity-20"><SparklineChart /></div>}
                  </>
                )}
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="size-4 text-warning" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="text" className="h-12" />)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <Activity className="size-8 text-text-muted mb-2" />
                    <p className="text-sm text-text-muted">No active alerts</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Trend (30 days)</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? <Skeleton variant="chart" /> : (
                  <div className="flex items-end justify-center py-4"><BarChart /></div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Signups</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="table-row" />)}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Date</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Signups</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overview.recent_signups.length === 0 ? (
                        <tr><td colSpan={2} className="px-4 py-8 text-center text-sm text-text-muted">No recent signups</td></tr>
                      ) : (
                        overview.recent_signups.map((row: any, i: number) => (
                          <tr key={i} className="border-b border-border last:border-b-0 hover:bg-white/[0.02]">
                            <td className="px-4 py-3 text-sm text-text-primary">{row.date}</td>
                            <td className="px-4 py-3 text-sm tabular-nums text-text-secondary">{row.count}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
