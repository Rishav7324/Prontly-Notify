"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Tabs } from "@/components/ui/Tabs";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import {
  Cpu,
  Activity,
  Clock,
  Layers,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw,
  Network,
  HardDrive,
  Wifi,
} from "lucide-react";

interface MetricCard {
  label: string;
  value: string;
  status: "healthy" | "warning" | "critical";
  icon: typeof Activity;
  change: string;
}

interface ErrorLogEntry {
  id: string;
  timestamp: string;
  level: "error" | "warning" | "info";
  service: string;
  message: string;
  region: string;
}

const metrics: MetricCard[] = [
  { label: "FCM Success Rate", value: "98.7%", status: "healthy", icon: Activity, change: "+0.3%" },
  { label: "Avg Delivery Latency", value: "245ms", status: "warning", icon: Clock, change: "+12ms" },
  { label: "Queue Depth", value: "12.4K", status: "warning", icon: Layers, change: "+2.1K" },
  { label: "API Error Rate", value: "0.08%", status: "healthy", icon: AlertTriangle, change: "-0.02%" },
];

const errorLogs: ErrorLogEntry[] = [
  { id: "1", timestamp: "2024-07-15 14:23:12", level: "error", service: "fcm-gateway", message: "Connection timeout to FCM endpoint ap2", region: "APAC" },
  { id: "2", timestamp: "2024-07-15 14:20:45", level: "warning", service: "queue-worker", message: "Queue backlog > 10K messages", region: "US-East" },
  { id: "3", timestamp: "2024-07-15 14:15:00", level: "error", service: "api-gateway", message: "Rate limit exceeded for EU cluster", region: "EU" },
  { id: "4", timestamp: "2024-07-15 14:10:33", level: "info", service: "db-proxy", message: "Connection pool scaled to 50 connections", region: "US-West" },
  { id: "5", timestamp: "2024-07-15 14:05:22", level: "warning", service: "fcm-gateway", message: "FCM response time > 1000ms", region: "APAC" },
  { id: "6", timestamp: "2024-07-15 13:55:18", level: "error", service: "delivery-worker", message: "Failed to deliver batch: invalid token", region: "US-East" },
  { id: "7", timestamp: "2024-07-15 13:45:00", level: "info", service: "scheduler", message: "Daily digest job completed", region: "Global" },
  { id: "8", timestamp: "2024-07-15 13:30:12", level: "warning", service: "cache", message: "Redis memory usage at 78%", region: "US-East" },
];

function FCMChart() {
  const data = [97.2, 97.8, 98.1, 97.5, 98.4, 98.9, 98.7];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxVal = 100; const minVal = 95;
  const w = 200; const h = 80;
  const coords = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - minVal) / (maxVal - minVal)) * (h - 10) - 5,
  }));
  const d = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join("");
  return (
    <svg width={w} height={h + 20} className="overflow-visible" aria-label="FCM success rate chart">
      <defs>
        <linearGradient id="fcmGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(34,197,94,0.2)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#fcmGrad)" />
      {labels.map((l, i) => (
        <text key={i} x={(i / (data.length - 1)) * w} y={h + 14} textAnchor="middle" className="fill-text-muted" fontSize="9">{l}</text>
      ))}
    </svg>
  );
}

function LatencyChart() {
  const data = [180, 210, 195, 240, 220, 260, 245];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxVal = 300; const minVal = 150;
  const w = 200; const h = 80;
  const barW = 18; const gap = 8;
  return (
    <svg width={w} height={h + 20} aria-label="Latency chart">
      {data.map((v, i) => {
        const barH = ((v - minVal) / (maxVal - minVal)) * h;
        const color = v > 230 ? "#F59E0B" : "#3B82F6";
        return (
          <g key={i}>
            <rect x={i * (barW + gap)} y={h - barH} width={barW} height={barH} rx="3" fill={color} opacity={0.7} />
            <text x={i * (barW + gap) + barW / 2} y={h + 14} textAnchor="middle" className="fill-text-muted" fontSize="9">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

const levelFilters = ["All", "error", "warning", "info"];
const serviceFilters = ["All Services", "fcm-gateway", "queue-worker", "api-gateway", "delivery-worker"];

export default function AdminSystem() {
  const [logs, setLogs] = useState<ErrorLogEntry[]>(errorLogs);
  const [levelFilter, setLevelFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const systemStatus: "operational" | "degraded" | "down" = "degraded";

  const filteredLogs = useMemo(() => {
    return logs.filter((l) => {
      const matchesLevel = levelFilter === "All" || l.level === levelFilter;
      const matchesService = serviceFilter === "All Services" || l.service === serviceFilter;
      const matchesSearch = l.message.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesService && matchesSearch;
    });
  }, [logs, levelFilter, serviceFilter, search]);

  const logColumns: Column<ErrorLogEntry>[] = [
    { key: "timestamp", label: "Timestamp", sortable: true, render: (item) => (
      <span className="tabular-nums text-text-muted text-xs">{item.timestamp}</span>
    )},
    { key: "level", label: "Level", sortable: true, render: (item) => {
      const v = item.level === "error" ? "error" : item.level === "warning" ? "warning" : "info";
      return <Badge variant={v}>{item.level}</Badge>;
    }},
    { key: "service", label: "Service", sortable: true, render: (item) => (
      <span className="font-mono text-xs text-text-secondary">{item.service}</span>
    )},
    { key: "message", label: "Message", render: (item) => <span className="text-text-secondary">{item.message}</span>},
    { key: "region", label: "Region", sortable: true, render: (item) => <Badge variant="default" size="sm">{item.region}</Badge>},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">System Health</h1>
          <p className="mt-1 text-sm text-text-muted">Delivery monitoring & infrastructure</p>
        </div>
        <Badge
          variant={systemStatus === "operational" ? "success" : systemStatus === "degraded" ? "warning" : "error"}
          size="md"
          className="gap-1.5"
        >
          <Activity className="size-3.5" />
          {systemStatus === "operational" ? "Operational" : systemStatus === "degraded" ? "Degraded" : "Down"}
        </Badge>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            {loading ? <Skeleton variant="card" /> : (
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={cn("rounded-lg p-2", m.status === "healthy" ? "bg-success/10" : m.status === "warning" ? "bg-warning/10" : "bg-error/10")}>
                    <m.icon className={cn("size-4", m.status === "healthy" ? "text-success" : m.status === "warning" ? "text-warning" : "text-error")} />
                  </div>
                  <div className={cn("h-2 w-2 rounded-full", m.status === "healthy" ? "bg-success" : m.status === "warning" ? "bg-warning" : "bg-error")} />
                </div>
                <p className="mt-3 text-xs text-text-muted">{m.label}</p>
                <p className="mt-1 text-2xl font-bold text-text-primary tabular-nums">{m.value}</p>
                <p className={cn("mt-1 text-xs", m.change.startsWith("+") ? "text-error" : "text-success")}>{m.change}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" />
              FCM Success Rate (7 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton variant="chart" /> : (
              <div className="flex justify-center py-4"><FCMChart /></div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-4 text-warning" />
              Avg Delivery Latency (7 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton variant="chart" /> : (
              <div className="flex justify-center py-4"><LatencyChart /></div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Error Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Error Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Search error logs"
              />
            </div>
            <div className="flex gap-2">
              {levelFilters.map((f) => (
                <button key={f} onClick={() => setLevelFilter(f)}
                  className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                    levelFilter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary"
                  )}
                >{f === "All" ? "All" : <span className="capitalize">{f}</span>}</button>
              ))}
            </div>
            <div className="flex gap-2">
              {serviceFilters.map((f) => (
                <button key={f} onClick={() => setServiceFilter(f)}
                  className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                    serviceFilter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary"
                  )}
                >{f === "All Services" ? "All" : f}</button>
              ))}
            </div>
          </div>
          <DataTable columns={logColumns} data={filteredLogs} keyExtractor={(l) => l.id} loading={loading} sortable />
        </CardContent>
      </Card>
    </div>
  );
}
