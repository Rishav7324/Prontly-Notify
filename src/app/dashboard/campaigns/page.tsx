"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StateContainer } from "@/components/ui/StateContainer";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { useToast } from "@/components/ui/Toast";
import { formatDate, formatNumber } from "@/lib/utils";
import Link from "next/link";
import {
  Plus,
  MoreVertical,
  Copy,
  Edit,
  BarChart3,
  Trash2,
  Send,
} from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  status: "sent" | "scheduled" | "draft" | "failed";
  sentDate: string | null;
  delivered: number;
  ctr: number;
}

const mockCampaigns: Campaign[] = [
  { id: "1", title: "Summer Sale Blast", status: "sent", sentDate: "2026-06-20", delivered: 8450, ctr: 5.2 },
  { id: "2", title: "New Feature v2.0", status: "sent", sentDate: "2026-06-18", delivered: 6200, ctr: 3.8 },
  { id: "3", title: "Weekly Newsletter", status: "scheduled", sentDate: "2026-06-25", delivered: 0, ctr: 0 },
  { id: "4", title: "Re-engagement Flow", status: "draft", sentDate: null, delivered: 0, ctr: 0 },
  { id: "5", title: "Flash Sale", status: "failed", sentDate: "2026-06-15", delivered: 2100, ctr: 1.2 },
  { id: "6", title: "Product Update", status: "draft", sentDate: null, delivered: 0, ctr: 0 },
];

const statusVariant = (s: Campaign["status"]) =>
  ({ sent: "success", scheduled: "info", draft: "default", failed: "error" } as const)[s];

export default function CampaignsPage() {
  const { addToast } = useToast();
  const [filter, setFilter] = useState<"all" | "sent" | "scheduled" | "draft" | "failed">("all");
  const [state] = useState<"default" | "loading" | "empty" | "error">("default");

  const filtered = filter === "all" ? mockCampaigns : mockCampaigns.filter((c) => c.status === filter);

  const chips = [
    { key: "all", label: "All", count: mockCampaigns.length },
    { key: "sent", label: "Sent", count: mockCampaigns.filter((c) => c.status === "sent").length },
    { key: "scheduled", label: "Scheduled", count: mockCampaigns.filter((c) => c.status === "scheduled").length },
    { key: "draft", label: "Draft", count: mockCampaigns.filter((c) => c.status === "draft").length },
    { key: "failed", label: "Failed", count: mockCampaigns.filter((c) => c.status === "failed").length },
  ] as const;

  const columns: Column<Campaign>[] = [
    { key: "title", label: "Campaign", render: (c) => <span className="font-medium text-text-primary">{c.title}</span> },
    { key: "status", label: "Status", render: (c) => <Badge variant={statusVariant(c.status)} size="sm">{c.status}</Badge> },
    { key: "sentDate", label: "Date", render: (c) => c.sentDate ? formatDate(c.sentDate) : "—" },
    { key: "delivered", label: "Delivered", render: (c) => formatNumber(c.delivered) },
    { key: "ctr", label: "CTR", render: (c) => c.ctr ? `${c.ctr}%` : "—" },
    {
      key: "actions",
      label: "",
      render: (c) => (
        <DropdownMenu
          align="end"
          trigger={<MoreVertical className="h-4 w-4 text-text-muted" />}
          items={[
            { label: "Duplicate", icon: <Copy className="h-4 w-4" />, onClick: () => addToast("Campaign duplicated", "success") },
            { label: c.status === "draft" ? "Edit" : "View", icon: <Edit className="h-4 w-4" />, onClick: () => addToast("Opening campaign...", "info") },
            { label: "Analytics", icon: <BarChart3 className="h-4 w-4" />, onClick: () => addToast("Loading analytics...", "info") },
            { label: "Delete", icon: <Trash2 className="h-4 w-4" />, destructive: true, onClick: () => addToast("Campaign deleted", "error") },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Campaigns</h1>
          <p className="mt-1 text-sm text-text-muted">Manage your push notification campaigns</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button icon={<Plus className="h-4 w-4" />}>New Campaign</Button>
        </Link>
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

      <StateContainer
        state={state}
        emptyMessage="No campaigns match your filters."
        emptyAction={
          <Link href="/dashboard/campaigns/new">
            <Button icon={<Send className="h-4 w-4" />}>Create your first campaign</Button>
          </Link>
        }
      >
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(c) => c.id}
          emptyMessage="No campaigns yet. Click &quot;New Campaign&quot; to get started."
        />
      </StateContainer>
    </div>
  );
}
