"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StateContainer } from "@/components/ui/StateContainer";
import { useToast } from "@/components/ui/Toast";
import { formatDate, formatNumber } from "@/lib/utils";
import { Search, Download, Users, Filter, Globe, Monitor, Smartphone } from "lucide-react";

interface Subscriber {
  id: string;
  browser: string;
  location: string;
  subscribedDate: string;
  status: "active" | "unsubscribed";
}

const mockSubscribers: Subscriber[] = [
  { id: "1", browser: "Chrome", location: "Mumbai, IN", subscribedDate: "2026-06-01", status: "active" },
  { id: "2", browser: "Safari", location: "Delhi, IN", subscribedDate: "2026-05-28", status: "active" },
  { id: "3", browser: "Firefox", location: "Bangalore, IN", subscribedDate: "2026-05-15", status: "unsubscribed" },
  { id: "4", browser: "Chrome", location: "New York, US", subscribedDate: "2026-06-10", status: "active" },
  { id: "5", browser: "Edge", location: "London, UK", subscribedDate: "2026-04-20", status: "active" },
];

const browserIcon = (b: string) => {
  const props = "h-4 w-4 text-text-muted";
  switch (b.toLowerCase()) {
    case "chrome": return <Monitor className={props} />;
    case "safari": return <Globe className={props} />;
    default: return <Smartphone className={props} />;
  }
};

const columns: Column<Subscriber>[] = [
  { key: "browser", label: "Browser", render: (s) => <div className="flex items-center gap-2">{browserIcon(s.browser)}<span>{s.browser}</span></div> },
  { key: "location", label: "Location", render: (s) => <div className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-text-muted" />{s.location}</div> },
  { key: "subscribedDate", label: "Subscribed", render: (s) => formatDate(s.subscribedDate) },
  { key: "status", label: "Status", render: (s) => <Badge variant={s.status === "active" ? "success" : "default"} size="sm">{s.status}</Badge> },
];

export default function SubscribersPage() {
  const { addToast } = useToast();
  const [filter, setFilter] = useState<"all" | "active" | "unsubscribed">("all");
  const [search, setSearch] = useState("");
  const [state] = useState<"default" | "loading" | "empty" | "error">("default");

  const filtered = mockSubscribers.filter((s) => {
    if (filter === "active" && s.status !== "active") return false;
    if (filter === "unsubscribed" && s.status !== "unsubscribed") return false;
    if (search && !s.browser.toLowerCase().includes(search.toLowerCase()) && !s.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const chips = [
    { key: "all", label: "All", count: mockSubscribers.length },
    { key: "active", label: "Active", count: mockSubscribers.filter((s) => s.status === "active").length },
    { key: "unsubscribed", label: "Unsubscribed", count: mockSubscribers.filter((s) => s.status === "unsubscribed").length },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Subscribers</h1>
          <p className="mt-1 text-sm text-text-muted">{formatNumber(mockSubscribers.length)} total subscribers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => addToast("Creating segment from current filters...", "info")} icon={<Filter className="h-4 w-4" />}>
            Create Segment
          </Button>
          <Button variant="outline" icon={<Download className="h-4 w-4" />} onClick={() => addToast("Exporting CSV...", "success")}>
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

      <StateContainer
        state={state}
        emptyMessage="No subscribers match your filters."
        emptyAction={
          <Button onClick={() => setFilter("all")}>Clear filters</Button>
        }
      >
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(s) => s.id}
          sortable
          emptyMessage="No subscribers yet. Add a website to start collecting."
        />
      </StateContainer>
    </div>
  );
}
