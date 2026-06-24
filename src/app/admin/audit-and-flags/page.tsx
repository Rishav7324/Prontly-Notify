"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";
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

const auditLogs: AuditEntry[] = [
  { id: "1", actor: "super-admin@prontly.com", action: "Impersonate user", target: "admin@acme.com", timestamp: "2024-07-15 14:30:22", category: "admin" },
  { id: "2", actor: "super-admin@prontly.com", action: "Suspend account", target: "info@shopeasy.com", timestamp: "2024-07-15 13:15:00", category: "user" },
  { id: "3", actor: "system", action: "Auto-disable sending", target: "media.co", timestamp: "2024-07-15 12:45:33", category: "system" },
  { id: "4", actor: "super-admin@prontly.com", action: "Update plan", target: "team@devhub.dev", timestamp: "2024-07-15 11:30:12", category: "admin" },
  { id: "5", actor: "super-admin@prontly.com", action: "Retry payment", target: "admin@acme.com ($2,999)", timestamp: "2024-07-15 10:20:45", category: "payment" },
  { id: "6", actor: "super-admin@prontly.com", action: "Reset password", target: "dev@techstart.io", timestamp: "2024-07-15 09:15:00", category: "user" },
  { id: "7", actor: "system", action: "FCM certificate rotated", target: "fcm-gateway", timestamp: "2024-07-15 08:00:00", category: "system" },
  { id: "8", actor: "super-admin@prontly.com", action: "Feature flag toggled", target: "ai-campaigns (off)", timestamp: "2024-07-14 17:30:00", category: "admin" },
  { id: "9", actor: "super-admin@prontly.com", action: "Create coupon", target: "VIP50", timestamp: "2024-07-14 16:00:00", category: "admin" },
  { id: "10", actor: "system", action: "Payment failed", target: "contact@webstack.co", timestamp: "2024-07-14 15:45:00", category: "payment" },
  { id: "11", actor: "super-admin@prontly.com", action: "Flag site", target: "media.co (spam)", timestamp: "2024-07-14 14:20:00", category: "admin" },
  { id: "12", actor: "super-admin@prontly.com", action: "Reinstate account", target: "hello@pixelperfect.io", timestamp: "2024-07-14 12:00:00", category: "user" },
];

const initialFlags: FeatureFlag[] = [
  { id: "1", name: "AI Campaigns", description: "Enable AI-powered campaign suggestions", enabled: true, rolloutPercentage: 100, eligiblePlans: ["Pro", "Business", "Enterprise"] },
  { id: "2", name: "A/B Testing", description: "Allow users to run A/B tests on notifications", enabled: false, rolloutPercentage: 0, eligiblePlans: ["Business", "Enterprise"] },
  { id: "3", name: "Advanced Analytics", description: "Show advanced analytics dashboard", enabled: true, rolloutPercentage: 50, eligiblePlans: ["Enterprise"] },
  { id: "4", name: "Web Push VAPID", description: "Use VAPID for web push authentication", enabled: true, rolloutPercentage: 100, eligiblePlans: ["Free", "Pro", "Business", "Enterprise"] },
  { id: "5", name: "Subscriber Export", description: "Enable CSV/JSON subscriber export", enabled: false, rolloutPercentage: 0, eligiblePlans: ["Pro", "Business", "Enterprise"] },
  { id: "6", name: "Scheduled Campaigns", description: "Schedule campaigns for future delivery", enabled: true, rolloutPercentage: 75, eligiblePlans: ["Free", "Pro", "Business", "Enterprise"] },
  { id: "7", name: "Multi-Language Support", description: "Send notifications in multiple languages", enabled: false, rolloutPercentage: 0, eligiblePlans: ["Enterprise"] },
];

const categoryFilters = ["All", "admin", "user", "system", "payment"];

export default function AdminAuditAndFlags() {
  const [activeTab, setActiveTab] = useState("audit-logs");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [flags, setFlags] = useState<FeatureFlag[]>(initialFlags);

  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((a) => {
      const matchesSearch =
        a.actor.toLowerCase().includes(search.toLowerCase()) ||
        a.action.toLowerCase().includes(search.toLowerCase()) ||
        a.target.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "All" || a.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  const handleToggleFlag = (id: string, enabled: boolean) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled } : f))
    );
  };

  const handleRolloutChange = (id: string, value: number) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, rolloutPercentage: value } : f))
    );
  };

  const auditColumns: Column<AuditEntry>[] = [
    { key: "timestamp", label: "Timestamp", sortable: true, render: (item) => (
      <span className="tabular-nums text-xs text-text-muted">{item.timestamp}</span>
    )},
    { key: "actor", label: "Actor", sortable: true, render: (item) => (
      <span className="text-text-secondary">{item.actor}</span>
    )},
    { key: "action", label: "Action", sortable: true, render: (item) => (
      <span className="font-medium text-text-primary">{item.action}</span>
    )},
    { key: "target", label: "Target", render: (item) => <span className="text-text-secondary">{item.target}</span>},
    { key: "category", label: "Category", sortable: true, render: (item) => {
      const v = item.category === "admin" ? "primary" : item.category === "user" ? "info" : item.category === "system" ? "warning" : "default";
      return <Badge variant={v}>{item.category}</Badge>;
    }},
  ];

  const iconForAction = (action: string) => {
    if (action.includes("Impersonate")) return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
    if (action.includes("Suspend") || action.includes("Reinstate")) return <UserX className="size-4" />;
    if (action.includes("Flag")) return <Flag className="size-4" />;
    if (action.includes("payment") || action.includes("Payment")) return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>;
    if (action.includes("plan") || action.includes("Plan")) return <Activity className="size-4" />;
    if (action.includes("password") || action.includes("Password")) return <KeyRound className="size-4" />;
    if (action.includes("coupon") || action.includes("Coupon")) return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="m9 12 2 2 4-4" /></svg>;
    return <Activity className="size-4" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Audit Logs & Feature Flags</h1>
        <p className="mt-1 text-sm text-text-muted">
          System-wide activity tracking and feature control
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "audit-logs" && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search by actor, action, or target..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Search audit logs"
              />
            </div>
            <div className="flex gap-2">
              {categoryFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setCategoryFilter(f)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors",
                    categoryFilter === f
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline view for desktop */}
          <div className="hidden space-y-0 lg:block">
            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="space-y-3 p-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />
                    ))}
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {filteredAuditLogs.length === 0 ? (
                      <div className="p-6 text-center text-sm text-text-muted">No audit logs found.</div>
                    ) : (
                      filteredAuditLogs.map((entry) => (
                        <div key={entry.id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02]">
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {iconForAction(entry.action)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="font-medium text-text-primary">{entry.actor}</span>
                              <span className="text-text-secondary">{entry.action}</span>
                              <span className="text-text-muted">{entry.target}</span>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className="text-xs text-text-muted">{entry.timestamp}</span>
                            <div className="mt-0.5">
                              <Badge variant={entry.category === "admin" ? "primary" : entry.category === "user" ? "info" : entry.category === "system" ? "warning" : "default"} size="sm">
                                {entry.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Table view for mobile */}
          <div className="lg:hidden">
            <DataTable columns={auditColumns} data={filteredAuditLogs} keyExtractor={(a) => a.id} loading={loading} sortable />
          </div>
        </div>
      )}

      {activeTab === "feature-flags" && (
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl bg-white/5" />
              ))}
            </div>
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
                        />
                        <div>
                          <p className="font-medium text-text-primary">{flag.name}</p>
                          <p className="text-sm text-text-muted">{flag.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                      {/* Rollout slider */}
                      <div className="flex items-center gap-3">
                        <Percent className="size-4 text-text-muted shrink-0" />
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={flag.rolloutPercentage}
                          onChange={(e) => handleRolloutChange(flag.id, parseInt(e.target.value))}
                          className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
                          aria-label={`${flag.name} rollout percentage`}
                        />
                        <span className="w-10 text-right text-xs tabular-nums text-text-muted">
                          {flag.rolloutPercentage}%
                        </span>
                      </div>
                      {/* Eligible plans */}
                      <div className="flex items-center gap-1.5">
                        <Users className="size-3.5 text-text-muted shrink-0" />
                        {flag.eligiblePlans.map((plan) => (
                          <Badge key={plan} variant="default" size="sm">
                            {plan}
                          </Badge>
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

