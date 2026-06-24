"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Drawer } from "@/components/ui/Drawer";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/domain/EmptyState";
import { cn, formatDate, generateId } from "@/lib/utils";
import {
  Search,
  UserX,
  UserCheck,
  KeyRound,
  Eye,
  AlertTriangle,
  Clock,
  Globe,
  CreditCard,
  Activity,
  Mail,
  Shield,
  ShieldAlert,
  Loader2,
  Users,
} from "lucide-react";

interface Account {
  id: string;
  name: string;
  email: string;
  plan: string;
  mrr: number;
  sites: number;
  status: "active" | "suspended" | "trial";
  signupDate: string;
  avatar: string;
}

const plans = ["All Plans", "Free", "Pro", "Business", "Enterprise"];
const statuses = ["All Statuses", "active", "suspended", "trial"];

async function fetchAccounts(search?: string, plan?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (plan && plan !== "All Plans") params.set("plan", plan.toLowerCase());
  const res = await fetch(`/api/v1/admin/accounts?${params.toString()}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch accounts");
  return { accounts: json.data, meta: json.meta };
}

async function suspendAccount(id: string, reason: string) {
  const res = await fetch(`/api/v1/admin/accounts/${id}/suspend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to suspend account");
  return json.data;
}

export default function AdminAccounts() {
  const { addToast } = useToast();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [suspendModal, setSuspendModal] = useState<Account | null>(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [impersonateModal, setImpersonateModal] = useState<Account | null>(null);
  const [suspending, setSuspending] = useState(false);

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const { accounts: data } = await fetchAccounts(
        search || undefined,
        planFilter !== "All Plans" ? planFilter : undefined
      );
      setAccounts(data.map((a: any) => ({
        id: a.id,
        name: a.name || a.owner_name,
        email: a.owner_email,
        plan: a.plan_name || "Free",
        mrr: 0,
        sites: a.site_count || 0,
        status: a.subscription_status === "active" ? "active" : a.subscription_status === "past_due" ? "suspended" : "trial",
        signupDate: a.created_at,
        avatar: (a.name || a.owner_name || "??").split(" ").map((s: string) => s[0]).join("").slice(0, 2).toUpperCase(),
      })));
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [search, planFilter, addToast]);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  const filteredAccounts = useMemo(() => {
    return accounts.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase());
      const matchesPlan = planFilter === "All Plans" || a.plan === planFilter;
      const matchesStatus = statusFilter === "All Statuses" || a.status === statusFilter;
      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [accounts, search, planFilter, statusFilter]);

  const handleSuspend = async () => {
    if (!suspendModal || !suspendReason.trim()) return;
    setSuspending(true);
    try {
      await suspendAccount(suspendModal.id, suspendReason);
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === suspendModal.id
            ? { ...a, status: a.status === "suspended" ? "active" as const : "suspended" as const }
            : a
        )
      );
      addToast(suspendModal.status === "suspended" ? "Account reinstated" : "Account suspended", "success");
      setSuspendModal(null);
      setSuspendReason("");
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setSuspending(false);
    }
  };

  const handleImpersonate = () => {
    if (!impersonateModal) return;
    setImpersonateModal(null);
  };

  const columns: Column<Account>[] = [
    { key: "name", label: "Name", sortable: true, render: (item) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
          {item.avatar}
        </div>
        <div>
          <p className="font-medium text-text-primary">{item.name}</p>
          <p className="text-xs text-text-muted">{item.email}</p>
        </div>
      </div>
    )},
    { key: "plan", label: "Plan", sortable: true, render: (item) => (
      <Badge variant={item.plan === "Enterprise" ? "primary" : item.plan === "Business" ? "info" : "default"}>{item.plan}</Badge>
    )},
    { key: "mrr", label: "MRR", sortable: true, render: (item) => (
      <span className="tabular-nums text-text-primary">${item.mrr.toLocaleString()}</span>
    ), hideOnMobile: true },
    { key: "sites", label: "Sites", sortable: true, render: (item) => (
      <span className="tabular-nums">{item.sites}</span>
    ), hideOnMobile: true },
    { key: "status", label: "Status", sortable: true, render: (item) => {
      const variant = item.status === "active" ? "success" : item.status === "suspended" ? "error" : "warning";
      return <Badge variant={variant}>{item.status}</Badge>;
    }},
    { key: "signupDate", label: "Signup Date", sortable: true, render: (item) => (
      <span className="text-text-muted">{formatDate(item.signupDate)}</span>
    ), hideOnMobile: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Account Management</h1>
        <p className="mt-1 text-sm text-text-muted">User & account oversight</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Search accounts"
          />
        </div>
        <div className="flex gap-2">
          {plans.map((p) => (
            <button
              key={p}
              onClick={() => setPlanFilter(p)}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                planFilter === p
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary"
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                statusFilter === s
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-text-muted hover:border-border-strong hover:text-text-secondary"
              )}
            >
              {s === "All Statuses" ? s : <span className="capitalize">{s}</span>}
            </button>
          ))}
        </div>
      </div>

      {!loading && filteredAccounts.length === 0 ? (
        <EmptyState icon={<Users className="size-12" />} title="No accounts found" description="Try adjusting your search or filters" />
      ) : (
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <DataTable
              columns={columns}
              data={filteredAccounts}
              keyExtractor={(a) => a.id}
              loading={loading}
              sortable
            />
          </div>
        </div>
      )}

      <Drawer
        open={!!selectedAccount}
        onClose={() => setSelectedAccount(null)}
        title={selectedAccount?.name}
      >
        {selectedAccount && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
                {selectedAccount.avatar}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">{selectedAccount.name}</h3>
                <p className="text-sm text-text-muted">{selectedAccount.email}</p>
                <Badge variant={selectedAccount.status === "active" ? "success" : "error"} size="sm" className="mt-1">
                  {selectedAccount.status}
                </Badge>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <h4 className="mb-3 text-sm font-semibold text-text-primary flex items-center gap-2">
                <CreditCard className="size-4 text-text-muted" />
                Subscription
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-muted">Plan</p>
                  <p className="font-medium text-text-primary">{selectedAccount.plan}</p>
                </div>
                <div>
                  <p className="text-text-muted">MRR</p>
                  <p className="font-medium text-text-primary">${selectedAccount.mrr.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <h4 className="mb-3 text-sm font-semibold text-text-primary flex items-center gap-2">
                <Globe className="size-4 text-text-muted" />
                Websites ({selectedAccount.sites})
              </h4>
              <p className="text-sm text-text-muted">Coming soon</p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <h4 className="mb-3 text-sm font-semibold text-text-primary flex items-center gap-2">
                <Activity className="size-4 text-text-muted" />
                Recent Activity
              </h4>
              <p className="text-sm text-text-muted">Coming soon</p>
            </div>

            <div className="space-y-2">
              <Button
                variant="secondary"
                className="w-full justify-start"
                icon={<Eye className="size-4" />}
                onClick={() => setImpersonateModal(selectedAccount)}
              >
                Impersonate Account
              </Button>
              <Button
                variant={selectedAccount.status === "suspended" ? "secondary" : "destructive"}
                className="w-full justify-start"
                icon={selectedAccount.status === "suspended" ? <UserCheck className="size-4" /> : <UserX className="size-4" />}
                onClick={() => setSuspendModal(selectedAccount)}
              >
                {selectedAccount.status === "suspended" ? "Reinstate Account" : "Suspend Account"}
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start"
                icon={<KeyRound className="size-4" />}
              >
                Reset Password
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        open={!!suspendModal}
        onClose={() => { setSuspendModal(null); setSuspendReason(""); }}
        title={suspendModal?.status === "suspended" ? "Reinstate Account" : "Suspend Account"}
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-warning/25 bg-warning/5 p-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
            <p className="text-sm text-text-secondary">
              {suspendModal?.status === "suspended"
                ? `Reinstate ${suspendModal?.name}? They will regain full access.`
                : `Suspend ${suspendModal?.name}? They will lose access to all services.`}
            </p>
          </div>
          <Input
            as="textarea"
            label="Reason"
            placeholder="Required: Provide a reason for this action..."
            value={suspendReason}
            onChange={(e) => setSuspendReason(e.target.value)}
            error={suspendReason.length > 0 && suspendReason.length < 10 ? "Must be at least 10 characters" : undefined}
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => { setSuspendModal(null); setSuspendReason(""); }}>Cancel</Button>
            <Button
              variant={suspendModal?.status === "suspended" ? "primary" : "destructive"}
              disabled={suspendReason.trim().length < 10 || suspending}
              onClick={handleSuspend}
              loading={suspending}
            >
              {suspendModal?.status === "suspended" ? "Reinstate" : "Confirm"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!impersonateModal}
        onClose={() => setImpersonateModal(null)}
        title="Impersonate Account"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-warning/25 bg-warning/5 p-3">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-warning" />
            <div>
              <p className="text-sm font-medium text-text-primary">Security Notice</p>
              <p className="mt-1 text-sm text-text-secondary">You are about to impersonate {impersonateModal?.name}. This action will be logged and is subject to audit review.</p>
            </div>
          </div>
          <div className="text-sm text-text-muted">
            <p className="font-medium text-text-primary">Audit log will record:</p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-center gap-2"><Shield className="size-3 text-primary" /> Actor: Super Admin</li>
              <li className="flex items-center gap-2"><Mail className="size-3 text-primary" /> Target: {impersonateModal?.email}</li>
              <li className="flex items-center gap-2"><Clock className="size-3 text-primary" /> Timestamp: Auto-recorded</li>
            </ul>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setImpersonateModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleImpersonate}>Begin Impersonation</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
