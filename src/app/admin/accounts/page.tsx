"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Drawer } from "@/components/ui/Drawer";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn, formatDate, generateId } from "@/lib/utils";
import {
  Search,
  Filter,
  UserX,
  UserCheck,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  Clock,
  Globe,
  CreditCard,
  Activity,
  Mail,
  Shield,
  ShieldAlert,
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

interface AuditEntry {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  actor: string;
}

const mockAccounts: Account[] = [
  { id: "1", name: "Acme Corp", email: "admin@acme.com", plan: "Enterprise", mrr: 2999, sites: 12, status: "active", signupDate: "2024-01-15", avatar: "AC" },
  { id: "2", name: "TechStart Inc", email: "dev@techstart.io", plan: "Business", mrr: 1499, sites: 5, status: "active", signupDate: "2024-03-22", avatar: "TI" },
  { id: "3", name: "Media Group", email: "contact@media.co", plan: "Enterprise", mrr: 4999, sites: 8, status: "active", signupDate: "2024-02-10", avatar: "MG" },
  { id: "4", name: "ShopEasy", email: "info@shopeasy.com", plan: "Pro", mrr: 299, sites: 3, status: "suspended", signupDate: "2024-05-01", avatar: "SE" },
  { id: "5", name: "DevHub", email: "team@devhub.dev", plan: "Free", mrr: 0, sites: 1, status: "active", signupDate: "2024-06-12", avatar: "DH" },
  { id: "6", name: "Pixel Perfect", email: "hello@pixelperfect.io", plan: "Business", mrr: 999, sites: 7, status: "trial", signupDate: "2024-07-08", avatar: "PP" },
  { id: "7", name: "DataFlow", email: "ops@dataflow.app", plan: "Pro", mrr: 499, sites: 2, status: "active", signupDate: "2024-04-18", avatar: "DF" },
  { id: "8", name: "WebStack", email: "contact@webstack.co", plan: "Free", mrr: 0, sites: 1, status: "suspended", signupDate: "2024-03-30", avatar: "WS" },
];

const plans = ["All Plans", "Free", "Pro", "Business", "Enterprise"];
const statuses = ["All Statuses", "active", "suspended", "trial"];

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [suspendModal, setSuspendModal] = useState<Account | null>(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [impersonateModal, setImpersonateModal] = useState<Account | null>(null);

  const auditLog: AuditEntry[] = useMemo(() => [], []);

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

  const handleSuspend = () => {
    if (!suspendModal || !suspendReason.trim()) return;
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === suspendModal.id
          ? { ...a, status: a.status === "suspended" ? "active" : "suspended" }
          : a
      )
    );
    setSuspendModal(null);
    setSuspendReason("");
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
        <p className="mt-1 text-sm text-text-muted">
          User & account oversight
        </p>
      </div>

      {/* Filters */}
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

      {/* Accounts Table + Detail Drawer */}
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

      {/* Detail Drawer (clicking row opens) */}
      <Drawer
        open={!!selectedAccount}
        onClose={() => setSelectedAccount(null)}
        title={selectedAccount?.name}
      >
        {selectedAccount && (
          <div className="space-y-6">
            {/* Profile */}
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

            {/* Subscription */}
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

            {/* Websites */}
            <div className="rounded-lg border border-border bg-background p-4">
              <h4 className="mb-3 text-sm font-semibold text-text-primary flex items-center gap-2">
                <Globe className="size-4 text-text-muted" />
                Websites ({selectedAccount.sites})
              </h4>
              <p className="text-sm text-text-muted">Coming soon</p>
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg border border-border bg-background p-4">
              <h4 className="mb-3 text-sm font-semibold text-text-primary flex items-center gap-2">
                <Activity className="size-4 text-text-muted" />
                Recent Activity
              </h4>
              <p className="text-sm text-text-muted">Coming soon</p>
            </div>

            {/* Actions */}
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

      {/* Suspend/Reinstate Modal */}
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
            <Button variant="outline" onClick={() => { setSuspendModal(null); setSuspendReason(""); }}>
              Cancel
            </Button>
            <Button
              variant={suspendModal?.status === "suspended" ? "primary" : "destructive"}
              disabled={suspendReason.trim().length < 10}
              onClick={handleSuspend}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Impersonate Modal */}
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
              <p className="mt-1 text-sm text-text-secondary">
                You are about to impersonate {impersonateModal?.name}. This action will be logged and is subject to audit review.
              </p>
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
