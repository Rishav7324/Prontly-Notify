"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/domain/EmptyState";
import { cn, formatDate } from "@/lib/utils";
import {
  Cpu,
  Activity,
  Clock,
  Layers,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Loader2,
  RefreshCw,
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

async function fetchHealth() {
  const res = await fetch("/api/v1/admin/system/health");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch system health");
  return json.data;
}

async function fetchErrors() {
  const res = await fetch("/api/v1/admin/system/errors");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch errors");
  return json.data;
}

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
        <defs><linearGradient id="fcmGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(34, 197, 94, 0.2)" /><stop offset="100%" stopColor="rgba(34, 197, 94, 0)" /></linearGradient></defs>
      <path d={d} fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#fcmGrad)" />
      {labels.map((l, i) => (<text key={i} x={(i / (data.length - 1)) * w} y={h + 14} textAnchor="middle" className="fill-text-muted" fontSize="9">{l}</text>))}
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
        const color = v > 230 ? "#F59E0B" : "#0447FF";
        return (<g key={i}><rect x={i * (barW + gap)} y={h - barH} width={barW} height={barH} rx="3" fill={color} opacity={0.7} /><text x={i * (barW + gap) + barW / 2} y={h + 14} textAnchor="middle" className="fill-text-muted" fontSize="9">{labels[i]}</text></g>);
      })}
    </svg>
  );
}

const levelFilters = ["All", "error", "warning", "info"];
const serviceFilters = ["All Services", "fcm-gateway", "queue-worker", "api-gateway", "delivery-worker"];

export default function AdminSystem() {
  const { addToast } = useToast();
  const [logs, setLogs] = useState<ErrorLogEntry[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [levelFilter, setLevelFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [health, errors] = await Promise.all([fetchHealth(), fetchErrors()]);
      setStats(health.stats);
      setLogs(errors.recentErrors.map((e: any, i: number) => ({
        id: e.id || String(i),
        timestamp: e.created_at,
        level: (e.action.includes("error") ? "error" : e.action.includes("fail") ? "warning" : "info") as "error" | "warning" | "info",
        service: e.target_type || "system",
        message: e.action,
        region: "Global",
      })));
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const metrics: MetricCard[] = stats ? [
    { label: "Total Users", value: String(stats.totalUsers), status: "healthy", icon: Activity, change: "+0.3%" },
    { label: "Total Workspaces", value: String(stats.totalWorkspaces), status: "healthy", icon: Clock, change: "+12" },
    { label: "Total Sites", value: String(stats.totalSites), status: "healthy", icon: Layers, change: "+2" },
    { label: "Total Subscribers", value: String(stats.totalSubscribers), status: "healthy", icon: AlertTriangle, change: "+5%" },
  ] : [];

  const systemStatus = stats ? "operational" as const : "degraded" as const;

  const filteredLogs = logs.filter((l) => {
    const matchesLevel = levelFilter === "All" || l.level === levelFilter;
    const matchesService = serviceFilter === "All Services" || l.service === serviceFilter;
    const matchesSearch = l.message.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesService && matchesSearch;
  });

  const logColumns: Column<ErrorLogEntry>[] = [
    { key: "timestamp", label: "Timestamp", sortable: true, render: (item) => <span className="tabular-nums text-text-muted text-xs">{item.timestamp ? formatDate(item.timestamp) : "N/A"}</span>},
    { key: "level", label: "Level", sortable: true, render: (item) => <Badge variant={item.level === "error" ? "error" : item.level === "warning" ? "warning" : "info"}>{item.level}</Badge>},
    { key: "service", label: "Service", sortable: true, render: (item) => <span className="font-mono text-xs text-text-secondary">{item.service}</span>},
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
        <div className="flex items-center gap-3">
          <Badge variant={systemStatus === "operational" ? "success" : "warning"} size="md" className="gap-1.5">
            <Activity className="size-3.5" />
            {systemStatus === "operational" ? "Operational" : "Degraded"}
          </Badge>
          <Button variant="outline" size="sm" icon={<RefreshCw className="size-4" />} onClick={loadData} loading={loading}>Refresh</Button>
        </div>
      </div>

      {!stats && !loading ? (
        <EmptyState icon={<Cpu className="size-12" />} title="No system data" description="Could not load system health data" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <Card key={m.label}>
                {loading ? <Skeleton variant="card" /> : (
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className={cn("rounded-lg p-2", m.status === "healthy" ? "bg-success/10" : "bg-warning/10")}>
                        <m.icon className={cn("size-4", m.status === "healthy" ? "text-success" : "text-warning")} />
                      </div>
                      <div className={cn("h-2 w-2 rounded-full", m.status === "healthy" ? "bg-success" : "bg-warning")} />
                    </div>
                    <p className="mt-3 text-xs text-text-muted">{m.label}</p>
                    <p className="mt-1 text-2xl font-bold text-text-primary tabular-nums">{m.value}</p>
                    <p className={cn("mt-1 text-xs", m.change.startsWith("+") ? "text-success" : "text-error")}>{m.change}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />FCM Success Rate (7 days)</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? <Skeleton variant="chart" /> : <div className="flex justify-center py-4"><FCMChart /></div>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="size-4 text-warning" />Avg Delivery Latency (7 days)</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? <Skeleton variant="chart" /> : <div className="flex justify-center py-4"><LatencyChart /></div>}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Error Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                  <input type="text" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Search error logs" />
                </div>
                <div className="flex gap-2">
                  {levelFilters.map((f) => (
                    <button key={f} onClick={() => setLevelFilter(f)} className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors", levelFilter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary")}>{f === "All" ? "All" : <span className="capitalize">{f}</span>}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {serviceFilters.map((f) => (
                    <button key={f} onClick={() => setServiceFilter(f)} className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors", serviceFilter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary")}>{f === "All Services" ? "All" : f}</button>
                  ))}
                </div>
              </div>
              {!loading && filteredLogs.length === 0 ? (
                <EmptyState icon={<CheckCircle2 className="size-12" />} title="No errors" description="All systems operating normally" />
              ) : (
                <DataTable columns={logColumns} data={filteredLogs} keyExtractor={(l) => l.id} loading={loading} sortable />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
