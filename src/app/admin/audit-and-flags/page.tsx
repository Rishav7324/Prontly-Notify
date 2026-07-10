"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/domain/EmptyState";
import { cn, formatDate, generateId } from "@/lib/utils";
import {
  ScrollText,
  Search,
  Flag,
  Users,
  Activity,
  KeyRound,
  UserX,
  Percent,
  Loader2,
  RefreshCw,
  Eye,
  Shield,
  Clock,
  Mail,
} from "lucide-react";

interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  category: "admin" | "user" | "system" | "payment";
}

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  eligiblePlans: string[];
}

const tabs = [
  { id: "audit-logs", label: "Audit Logs", icon: <ScrollText className="size-4" /> },
  { id: "feature-flags", label: "Feature Flags", icon: <Flag className="size-4" /> },
];

const categoryFilters = ["All", "admin", "user", "system", "payment"];

async function fetchAuditLogs() {
  const res = await fetch("/api/v1/admin/audit-logs?limit=50");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch audit logs");
  return { logs: json.data, meta: json.meta };
}

async function fetchFeatureFlags() {
  const res = await fetch("/api/v1/admin/feature-flags");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch feature flags");
  return json.data;
}

async function updateFeatureFlag(id: string, data: any) {
  const res = await fetch("/api/v1/admin/feature-flags", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to update flag");
  return json.data;
}

export default function AdminAuditAndFlags() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("audit-logs");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([]);
  const [updatingFlag, setUpdatingFlag] = useState<string | null>(null);

  const loadAuditLogs = useCallback(async () => {
    try {
      const { logs: data } = await fetchAuditLogs();
      setAuditLogs(data.map((a: any) => ({
        id: a.id,
        actor: a.actor_name || a.actor_email || a.actor_user_id || "system",
        action: a.action,
        target: a.target_id || a.target_type || "",
        timestamp: a.created_at,
        category: (a.action.includes("payment") || a.action.includes("Payment") ? "payment" :
                   a.target_type === "workspace" || a.action.includes("user") || a.action.includes("User") ? "user" :
                   a.target_type === "system" || a.action.includes("error") || a.action.includes("fail") ? "system" :
                   "admin") as "admin" | "user" | "system" | "payment",
      })));
    } catch (err: any) {
      addToast(err.message, "error");
    }
  }, [addToast]);

  const loadFlags = useCallback(async () => {
    try {
      const data = await fetchFeatureFlags();
      setFlags(data.map((f: any) => ({
        id: f.id,
        name: f.key?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) || f.key,
        description: f.description || "",
        enabled: f.status === "on" || f.status === "rollout",
        rolloutPercentage: f.rollout_percentage || (f.status === "on" ? 100 : 0),
        eligiblePlans: f.eligible_plan_ids ? (Array.isArray(f.eligible_plan_ids) ? f.eligible_plan_ids : []) : [],
      })));
    } catch (err: any) {
      addToast(err.message, "error");
    }
  }, [addToast]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([loadAuditLogs(), loadFlags()]);
    setLoading(false);
  }, [loadAuditLogs, loadFlags]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const filteredAuditLogs = auditLogs.filter((a) => {
    const matchesSearch =
      a.actor.toLowerCase().includes(search.toLowerCase()) ||
      a.action.toLowerCase().includes(search.toLowerCase()) ||
      a.target.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleToggleFlag = async (id: string, enabled: boolean) => {
    setUpdatingFlag(id);
    try {
      const status = enabled ? "on" : "off";
      await updateFeatureFlag(id, { status, rollout_percentage: enabled ? "100" : "0" });
      setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, enabled, rolloutPercentage: enabled ? 100 : 0 } : f)));
      addToast(`Feature "${flags.find(f => f.id === id)?.name}" ${enabled ? "enabled" : "disabled"}`, "success");
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setUpdatingFlag(null);
    }
  };

  const handleRolloutChange = async (id: string, value: number) => {
    setUpdatingFlag(id);
    try {
      const status = value === 100 ? "on" : value === 0 ? "off" : "rollout";
      await updateFeatureFlag(id, { status, rollout_percentage: String(value) });
      setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, rolloutPercentage: value, enabled: value > 0 } : f)));
      addToast(`Rollout updated to ${value}%`, "info");
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setUpdatingFlag(null);
    }
  };

  const auditColumns: Column<AuditEntry>[] = [
    { key: "timestamp", label: "Timestamp", sortable: true, render: (item) => <span className="tabular-nums text-xs text-text-muted">{item.timestamp ? formatDate(item.timestamp) : "N/A"}</span>},
    { key: "actor", label: "Actor", sortable: true, render: (item) => <span className="text-text-secondary">{item.actor}</span>},
    { key: "action", label: "Action", sortable: true, render: (item) => <span className="font-medium text-text-primary">{item.action}</span>},
    { key: "target", label: "Target", render: (item) => <span className="text-text-secondary">{item.target}</span>},
    { key: "category", label: "Category", sortable: true, render: (item) => <Badge variant={item.category === "admin" ? "primary" : item.category === "user" ? "info" : item.category === "system" ? "warning" : "default"}>{item.category}</Badge>},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Audit Logs & Feature Flags</h1>
          <p className="mt-1 text-sm text-text-muted">System-wide activity tracking and feature control</p>
        </div>
        <Button variant="outline" size="sm" icon={<RefreshCw className="size-4" />} onClick={loadAll} loading={loading}>Refresh</Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "audit-logs" && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Search by actor, action, or target..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Search audit logs" />
            </div>
            <div className="flex gap-2">
              {categoryFilters.map((f) => (
                <button key={f} onClick={() => setCategoryFilter(f)} className={cn("rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors", categoryFilter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary")}>{f}</button>
              ))}
            </div>
          </div>

          {!loading && filteredAuditLogs.length === 0 ? (
            <EmptyState icon={<ScrollText className="size-12" />} title="No audit logs found" description="No activity matching your filters" />
          ) : (
            <>
              <div className="hidden space-y-0 lg:block">
                <Card>
                  <CardContent className="p-0">
                    {loading ? (
                      <div className="space-y-3 p-6">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-black/5" />)}</div>
                    ) : (
                      <div className="divide-y divide-border">
                        {filteredAuditLogs.map((entry) => (
                          <div key={entry.id} className="flex items-start gap-4 px-6 py-4 hover:bg-black/[0.02]">
                            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              {entry.action.includes("Impersonate") ? <Eye className="size-4" /> :
                               entry.action.includes("Suspend") || entry.action.includes("Reinstate") ? <UserX className="size-4" /> :
                               entry.action.includes("Flag") ? <Flag className="size-4" /> :
                               entry.action.includes("payment") || entry.action.includes("Payment") ? <Mail className="size-4" /> :
                               entry.action.includes("password") || entry.action.includes("Password") ? <KeyRound className="size-4" /> :
                               <Activity className="size-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2">
                                <span className="font-medium text-text-primary">{entry.actor}</span>
                                <span className="text-text-secondary">{entry.action}</span>
                                <span className="text-text-muted">{entry.target}</span>
                              </div>
                            </div>
                            <div className="shrink-0 text-right">
                              <span className="text-xs text-text-muted">{entry.timestamp ? formatDate(entry.timestamp) : ""}</span>
                              <div className="mt-0.5">
                                <Badge variant={entry.category === "admin" ? "primary" : entry.category === "user" ? "info" : entry.category === "system" ? "warning" : "default"} size="sm">{entry.category}</Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:hidden">
                <DataTable columns={auditColumns} data={filteredAuditLogs} keyExtractor={(a) => a.id} loading={loading} sortable />
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "feature-flags" && (
        <div className="space-y-4">
          {!loading && flags.length === 0 ? (
            <EmptyState icon={<Flag className="size-12" />} title="No feature flags" description="No feature flags configured" />
          ) : loading ? (
            <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-24 animate-pulse rounded-xl bg-black/5" />)}</div>
          ) : (
            flags.map((flag) => (
              <Card key={flag.id}>
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Toggle
                          checked={flag.enabled}
                          onChange={(checked) => handleToggleFlag(flag.id, checked)}
                          disabled={updatingFlag === flag.id}
                        />
                        <div>
                          <p className="font-medium text-text-primary">{flag.name}</p>
                          <p className="text-sm text-text-muted">{flag.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                      <div className="flex items-center gap-3">
                        <Percent className="size-4 text-text-muted shrink-0" />
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={flag.rolloutPercentage}
                          onChange={(e) => handleRolloutChange(flag.id, parseInt(e.target.value))}
                          className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-black/10 accent-primary"
                          aria-label={`${flag.name} rollout percentage`}
                          disabled={updatingFlag === flag.id}
                        />
                        <span className="w-10 text-right text-xs tabular-nums text-text-muted">{flag.rolloutPercentage}%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="size-3.5 text-text-muted shrink-0" />
                        {flag.eligiblePlans.map((plan) => (
                          <Badge key={plan} variant="default" size="sm">{plan}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
