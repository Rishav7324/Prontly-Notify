"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/domain/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { useActiveSite } from "@/hooks/useActiveSite";
import { formatDate, formatNumber } from "@/lib/utils";
import { Search, Download, Users, Filter, Globe, Monitor, Smartphone, Loader2 } from "lucide-react";

interface Subscriber {
  id: string;
  browser: string;
  location: string;
  subscribedDate: string;
  status: "active" | "unsubscribed";
}

const browserIcon = (b: string) => {
  const props = "h-4 w-4 text-text-muted";
  switch (b.toLowerCase()) {
    case "chrome": return <Monitor className={props} />;
    case "safari": return <Globe className={props} />;
    default: return <Smartphone className={props} />;
  }
};

export default function SubscribersPage() {
  const { addToast } = useToast();
  const { activeSite } = useActiveSite();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "unsubscribed">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!activeSite) return;
    const siteId = activeSite.id;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/sites/${siteId}/subscribers`);
        const json = await res.json();
        if (json.success) setSubscribers(json.data.subscribers ?? json.data ?? []);
      } catch {
        addToast("Failed to load subscribers", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeSite, addToast]);

  const filtered = subscribers.filter((s) => {
    if (filter === "active" && s.status !== "active") return false;
    if (filter === "unsubscribed" && s.status !== "unsubscribed") return false;
    if (search && !s.browser.toLowerCase().includes(search.toLowerCase()) && !s.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const chips = [
    { key: "all", label: "All", count: subscribers.length },
    { key: "active", label: "Active", count: subscribers.filter((s) => s.status === "active").length },
    { key: "unsubscribed", label: "Unsubscribed", count: subscribers.filter((s) => s.status === "unsubscribed").length },
  ] as const;

  const handleExport = async () => {
    if (!activeSite) return;
    try {
      const res = await fetch(`/api/v1/sites/${activeSite.id}/subscribers/export`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "subscribers.csv";
      a.click();
      URL.revokeObjectURL(url);
      addToast("Export downloaded", "success");
    } catch {
      addToast("Failed to export subscribers", "error");
    }
  };

  const columns: Column<Subscriber>[] = [
    { key: "browser", label: "Browser", render: (s) => <div className="flex items-center gap-2">{browserIcon(s.browser)}<span>{s.browser}</span></div> },
    { key: "location", label: "Location", render: (s) => <div className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-text-muted" />{s.location}</div> },
    { key: "subscribedDate", label: "Subscribed", render: (s) => formatDate(s.subscribedDate) },
    { key: "status", label: "Status", render: (s) => <Badge variant={s.status === "active" ? "success" : "default"} size="sm">{s.status}</Badge> },
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
          <h1 className="text-2xl font-bold text-text-primary">Subscribers</h1>
          <p className="mt-1 text-sm text-text-muted">{formatNumber(subscribers.length)} total subscribers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => addToast("Creating segment from current filters...", "info")} icon={<Filter className="h-4 w-4" />}>
            Create Segment
          </Button>
          <Button variant="outline" icon={<Download className="h-4 w-4" />} onClick={handleExport}>
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <button
            key={chip.key}
            onClick={() => setFilter(chip.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === chip.key ? "bg-primary text-white" : "bg-white/5 text-text-secondary hover:bg-white/10"
            }`}
          >
            {chip.label} ({chip.count})
          </button>
        ))}
      </div>

      <Input
        placeholder="Search subscribers..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        containerClassName="max-w-sm"
      />

      {subscribers.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No subscribers yet"
          description="Add a website to start collecting subscribers."
          action={
            <Button onClick={() => setFilter("all")}>Clear filters</Button>
          }
        />
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(s) => s.id}
          sortable
          emptyMessage="No subscribers match your filters."
        />
      )}
    </div>
  );
}
