"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Bell,
  Send,
  CheckCircle2,
  XCircle,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Activity,
} from "lucide-react";

interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: typeof DollarSign;
}

interface Alert {
  id: string;
  type: "warning" | "error" | "info";
  message: string;
  timestamp: string;
}

interface RecentSignup {
  id: string;
  name: string;
  email: string;
  plan: string;
  date: string;
}

const kpiData: KpiCard[] = [
  { label: "MRR", value: "$48,293", change: "+12.3%", trend: "up", icon: DollarSign },
  { label: "Active Accounts", value: "1,847", change: "+5.2%", trend: "up", icon: Users },
  { label: "Total Subscribers", value: "12.4M", change: "+8.1%", trend: "up", icon: Users },
  { label: "Notifications Today", value: "843K", change: "+3.7%", trend: "up", icon: Send },
  { label: "Delivery Success Rate", value: "97.8%", change: "-0.4%", trend: "down", icon: CheckCircle2 },
  { label: "Failed Payments", value: "23", change: "+15%", trend: "up", icon: XCircle },
];

const alerts: Alert[] = [
  { id: "1", type: "warning", message: "FCM endpoint degradation detected in APAC region", timestamp: "2m ago" },
  { id: "2", type: "error", message: "Queue backlog exceeding threshold (78K pending)", timestamp: "15m ago" },
  { id: "3", type: "info", message: "SSL certificate renewal for *.prontly.com in 7 days", timestamp: "1h ago" },
  { id: "4", type: "warning", message: "Database connection pool at 82% capacity", timestamp: "2h ago" },
  { id: "5", type: "info", message: "Rate limit approaching for EU cluster", timestamp: "3h ago" },
];

const recentSignups: RecentSignup[] = [
  { id: "1", name: "Acme Corp", email: "admin@acme.com", plan: "Business", date: "5m ago" },
  { id: "2", name: "TechStart Inc", email: "dev@techstart.io", plan: "Pro", date: "12m ago" },
  { id: "3", name: "Media Group", email: "contact@media.co", plan: "Enterprise", date: "28m ago" },
  { id: "4", name: "ShopEasy", email: "info@shopeasy.com", plan: "Pro", date: "45m ago" },
  { id: "5", name: "DevHub", email: "team@devhub.dev", plan: "Free", date: "1h ago" },
];

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

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLastRefreshed(new Date());
    }, 800);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const interval = setInterval(refresh, 60000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Overview</h1>
          <p className="mt-1 text-sm text-text-muted">
            System-wide metrics and alerts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted">
            Last updated: {lastRefreshed.toLocaleTimeString()}
          </span>
          <Button variant="outline" size="sm" icon={<RefreshCw className="size-4" />} onClick={refresh} loading={loading}>
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Row */}
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
                    <Badge
                      variant={kpi.trend === "up" ? "success" : "error"}
                      size="sm"
                    >
                      {kpi.trend === "up" ? (
                        <TrendingUp className="size-3" />
                      ) : (
                        <TrendingDown className="size-3" />
                      )}
                      {kpi.change}
                    </Badge>
                  </div>
                  <p className="mt-3 text-xs text-text-muted">{kpi.label}</p>
                  <p className="mt-1 text-2xl font-bold text-text-primary tabular-nums">
                    {kpi.value}
                  </p>
                </CardContent>
                {kpi.label === "MRR" && <div className="absolute -bottom-2 -right-2 opacity-20"><SparklineChart /></div>}
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Alerts Feed + Revenue Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Alerts */}
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
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} variant="text" className="h-12" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border p-3",
                      alert.type === "error" && "border-error/25 bg-error/5",
                      alert.type === "warning" && "border-warning/25 bg-warning/5",
                      alert.type === "info" && "border-border bg-white/[0.02]"
                    )}
                  >
                    <div className="mt-0.5 shrink-0">
                      {alert.type === "error" && <XCircle className="size-4 text-error" />}
                      {alert.type === "warning" && <AlertTriangle className="size-4 text-warning" />}
                      {alert.type === "info" && <Activity className="size-4 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary">{alert.message}</p>
                      <p className="mt-0.5 text-xs text-text-muted">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Revenue Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend (30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton variant="chart" />
            ) : (
              <div className="flex items-end justify-center py-4">
                <BarChart />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Signups */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Signups</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} variant="table-row" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Plan</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSignups.map((signup) => (
                    <tr key={signup.id} className="border-b border-border last:border-b-0 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-sm font-medium text-text-primary">{signup.name}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{signup.email}</td>
                      <td className="px-4 py-3">
                        <Badge variant={signup.plan === "Enterprise" ? "primary" : signup.plan === "Business" ? "info" : signup.plan === "Pro" ? "default" : "default"} size="sm">
                          {signup.plan}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-muted">{signup.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
