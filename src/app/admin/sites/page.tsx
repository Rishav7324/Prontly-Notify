"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/domain/EmptyState";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import {
  Search,
  Globe,
  Ban,
  Flag,
  ShieldAlert,
  AlertTriangle,
  Loader2,
} from "lucide-react";

interface Site {
  id: string;
  domain: string;
  owner: string;
  ownerEmail: string;
  subscribers: number;
  installStatus: "live" | "broken" | "pending";
  lastSend: string;
  flagged: boolean;
  sendingDisabled: boolean;
}

const installFilters = ["All", "Live", "Broken", "Pending"];
const flagFilters = ["All", "Flagged", "Clear"];

async function fetchSites(search?: string, status?: string) {
  const params = new URLSearchParams({ limit: "100" });
  if (search) params.set("search", search);
  if (status && status !== "All") params.set("install_status", status.toLowerCase());
  const res = await fetch(`/api/v1/admin/sites?${params.toString()}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch sites");
  return json.data as any[];
}

async function toggleSending(siteId: string) {
  const res = await fetch(`/api/v1/admin/sites/${siteId}/disable-sending`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ siteId }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to toggle sending");
  return json.data;
}

export default function AdminSites() {
  const { addToast } = useToast();
  const [sites, setSites] = useState<Site[]>([]);
  const [search, setSearch] = useState("");
  const [installFilter, setInstallFilter] = useState("All");
  const [flagFilter, setFlagFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [actionModal, setActionModal] = useState<{
    site: Site;
    action: "disable" | "flag" | "unflag";
  } | null>(null);
  const [actionReason, setActionReason] = useState("");
  const [actioning, setActioning] = useState(false);

  const loadSites = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSites(
        search || undefined,
        installFilter !== "All" ? installFilter : undefined
      );
      setSites(data.map((s: any) => ({
        id: s.id,
        domain: s.domain || s.name,
        owner: s.workspace_name,
        ownerEmail: s.owner_email || "",
        subscribers: s.subscriber_count || 0,
        installStatus: (s.install_status === "verified" ? "live" : s.install_status) || "pending",
        lastSend: s.updated_at ? formatDate(s.updated_at) : "Never",
        flagged: false,
        sendingDisabled: s.sending_enabled === 0,
      })));
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [search, installFilter, addToast]);

  useEffect(() => {
    loadSites();
  }, [loadSites]);

  const filteredSites = useMemo(() => {
    return sites.filter((s) => {
      const matchesSearch =
        s.domain.toLowerCase().includes(search.toLowerCase()) ||
        s.owner.toLowerCase().includes(search.toLowerCase());
      const matchesInstall =
        installFilter === "All" ||
        s.installStatus === installFilter.toLowerCase();
      const matchesFlag =
        flagFilter === "All" ||
        (flagFilter === "Flagged" && s.flagged) ||
        (flagFilter === "Clear" && !s.flagged);
      return matchesSearch && matchesInstall && matchesFlag;
    });
  }, [sites, search, installFilter, flagFilter]);

  const handleAction = async () => {
    if (!actionModal || !actionReason.trim()) return;
    setActioning(true);
    try {
      if (actionModal.action === "disable") {
        await toggleSending(actionModal.site.id);
        setSites((prev) =>
          prev.map((s) =>
            s.id === actionModal.site.id ? { ...s, sendingDisabled: !s.sendingDisabled } : s
          )
        );
        addToast(`Sending ${actionModal.site.sendingDisabled ? "enabled" : "disabled"} for ${actionModal.site.domain}`, "success");
      } else {
        setSites((prev) =>
          prev.map((s) =>
            s.id === actionModal.site.id ? { ...s, flagged: !s.flagged } : s
          )
        );
        addToast(`Site ${actionModal.site.flagged ? "unflagged" : "flagged"}`, "success");
      }
      setActionModal(null);
      setActionReason("");
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setActioning(false);
    }
  };

  const columns: Column<Site>[] = [
    { key: "domain", label: "Domain", sortable: true, render: (item) => (
      <div className="flex items-center gap-2">
        <Globe className="size-4 text-text-muted shrink-0" />
        <span className="font-medium text-text-primary">{item.domain}</span>
      </div>
    )},
    { key: "owner", label: "Owner", sortable: true, render: (item) => (
      <div>
        <p className="text-text-primary">{item.owner}</p>
        <p className="text-xs text-text-muted">{item.ownerEmail}</p>
      </div>
    )},
    { key: "subscribers", label: "Subscribers", sortable: true, render: (item) => (
      <span className="tabular-nums">{item.subscribers.toLocaleString()}</span>
    ), hideOnMobile: true },
    { key: "installStatus", label: "Install Status", sortable: true, render: (item) => {
      const v = item.installStatus === "live" ? "success" : item.installStatus === "broken" ? "error" : "warning";
      return <Badge variant={v}>{item.installStatus}</Badge>;
    }},
    { key: "lastSend", label: "Last Send", sortable: true, render: (item) => (
      <span className="text-text-muted">{item.lastSend}</span>
    ), hideOnMobile: true },
    { key: "flagged", label: "Flag Status", render: (item) => {
      if (item.sendingDisabled) return <Badge variant="error">Disabled</Badge>;
      if (item.flagged) return <Badge variant="warning">Flagged</Badge>;
      return <Badge variant="success">Clear</Badge>;
    }},
    { key: "actions", label: "Actions", render: (item) => (
      <div className="flex gap-1">
        <Button
          variant="icon-only"
          size="sm"
          icon={<Ban className="size-3.5" />}
          onClick={() => { setActionModal({ site: item, action: "disable" }); setActionReason(""); }}
          aria-label={item.sendingDisabled ? "Enable sending" : "Disable sending"}
        />
        <Button
          variant="icon-only"
          size="sm"
          icon={<Flag className={`size-3.5 ${item.flagged ? "text-warning" : ""}`} />}
          onClick={() => { setActionModal({ site: item, action: item.flagged ? "unflag" : "flag" }); setActionReason(""); }}
          aria-label={item.flagged ? "Unflag site" : "Flag for review"}
        />
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Website Oversight</h1>
        <p className="mt-1 text-sm text-text-muted">Monitor and manage registered websites</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search by domain or owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Search sites"
          />
        </div>
        <div className="flex gap-2">
          {installFilters.map((f) => (
            <button
              key={f}
              onClick={() => setInstallFilter(f)}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                installFilter === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {flagFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFlagFilter(f)}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                flagFilter === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {!loading && filteredSites.length === 0 ? (
        <EmptyState icon={<Globe className="size-12" />} title="No sites found" description="Try adjusting your search or filters" />
      ) : (
        <DataTable
          columns={columns}
          data={filteredSites}
          keyExtractor={(s) => s.id}
          loading={loading}
          sortable
        />
      )}

      <Modal
        open={!!actionModal}
        onClose={() => { setActionModal(null); setActionReason(""); }}
        title={
          actionModal?.action === "disable"
            ? actionModal?.site.sendingDisabled ? "Enable Sending" : "Disable Sending"
            : actionModal?.site.flagged ? "Remove Flag" : "Flag for Review"
        }
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-warning/25 bg-warning/5 p-3">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-warning" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                {actionModal?.action === "disable"
                  ? `${actionModal?.site.sendingDisabled ? "Enable sending for" : "Disable sending on"} ${actionModal?.site.domain}?`
                  : `${actionModal?.site.flagged ? "Remove flag from" : "Flag"} ${actionModal?.site.domain} for review?`}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                {actionModal?.action === "disable"
                  ? "Notifications will stop being delivered to subscribers of this site."
                  : "This site will be marked for administrative review."}
              </p>
            </div>
          </div>
          <Input
            as="textarea"
            label="Reason"
            placeholder="Required: Explain why..."
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
            error={actionReason.length > 0 && actionReason.length < 10 ? "Must be at least 10 characters" : undefined}
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => { setActionModal(null); setActionReason(""); }}>Cancel</Button>
            <Button
              variant={actionModal?.action === "disable" ? "destructive" : "secondary"}
              disabled={actionReason.trim().length < 10 || actioning}
              onClick={handleAction}
              loading={actioning}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
