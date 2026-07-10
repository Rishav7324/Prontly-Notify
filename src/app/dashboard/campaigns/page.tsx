"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { ConfirmationDialog } from "@/components/domain/ConfirmationDialog";
import { EmptyState } from "@/components/domain/EmptyState";
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
  Loader2,
} from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  status: "sent" | "scheduled" | "draft" | "failed";
  sentDate: string | null;
  delivered: number;
  ctr: number;
}

const statusVariant = (s: Campaign["status"]) =>
  ({ sent: "success", scheduled: "info", draft: "default", failed: "error" } as const)[s];

export default function CampaignsPage() {
  const { addToast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "sent" | "scheduled" | "draft" | "failed">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<Campaign | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/campaigns");
        const json = await res.json();
        if (json.success) setCampaigns(json.data);
      } catch {
        addToast("Failed to load campaigns", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [addToast]);

  const filtered = filter === "all" ? campaigns : campaigns.filter((c) => c.status === filter);

  const chips = [
    { key: "all", label: "All", count: campaigns.length },
    { key: "sent", label: "Sent", count: campaigns.filter((c) => c.status === "sent").length },
    { key: "scheduled", label: "Scheduled", count: campaigns.filter((c) => c.status === "scheduled").length },
    { key: "draft", label: "Draft", count: campaigns.filter((c) => c.status === "draft").length },
    { key: "failed", label: "Failed", count: campaigns.filter((c) => c.status === "failed").length },
  ] as const;

  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/campaigns/${id}/duplicate`, { method: "POST" });
      const json = await res.json();
      if (json.success) {
        addToast("Campaign duplicated", "success");
        setCampaigns((prev) => [json.data, ...prev]);
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to duplicate campaign", "error");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/v1/campaigns/${deleteConfirm.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        addToast("Campaign deleted", "success");
        setCampaigns((prev) => prev.filter((c) => c.id !== deleteConfirm.id));
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to delete campaign", "error");
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  };

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
            { label: "Duplicate", icon: <Copy className="h-4 w-4" />, onClick: () => handleDuplicate(c.id) },
            { label: c.status === "draft" ? "Edit" : "View", icon: <Edit className="h-4 w-4" />, onClick: () => addToast("Opening campaign...", "info") },
            { label: "Analytics", icon: <BarChart3 className="h-4 w-4" />, onClick: () => addToast("Loading analytics...", "info") },
            { label: "Delete", icon: <Trash2 className="h-4 w-4" />, destructive: true, onClick: () => setDeleteConfirm(c) },
          ]}
        />
      ),
    },
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
              filter === chip.key ? "bg-primary text-white" : "bg-black/5 text-text-secondary hover:bg-black/10"
            }`}
          >
            {chip.label} ({chip.count})
          </button>
        ))}
      </div>

      {campaigns.length === 0 ? (
        <EmptyState
          icon={<Send className="h-8 w-8" />}
          title="No campaigns yet"
          description='Click "New Campaign" to get started.'
          action={
            <Link href="/dashboard/campaigns/new">
              <Button icon={<Send className="h-4 w-4" />}>Create your first campaign</Button>
            </Link>
          }
        />
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(c) => c.id}
          emptyMessage="No campaigns match your filters."
        />
      )}

      <ConfirmationDialog
        open={!!deleteConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm(null)}
        title="Delete Campaign"
        message={`Are you sure you want to delete "${deleteConfirm?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
