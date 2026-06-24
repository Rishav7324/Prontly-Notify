"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/domain/EmptyState";
import { formatDate, generateId } from "@/lib/utils";
import {
  TicketCheck,
  Plus,
  Search,
  Percent,
  DollarSign,
  Loader2,
} from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "flat";
  value: number;
  planRestriction: string;
  expiry: string;
  redemptions: number;
  maxUses: number;
  status: "active" | "expired" | "disabled";
}

const planOptions = [
  { value: "All", label: "All Plans" },
  { value: "Free", label: "Free" },
  { value: "Pro", label: "Pro" },
  { value: "Business", label: "Business" },
  { value: "Enterprise", label: "Enterprise" },
];

async function fetchCoupons() {
  const res = await fetch("/api/v1/admin/coupons");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch coupons");
  return json.data.coupons;
}

async function createCoupon(data: any) {
  const res = await fetch("/api/v1/admin/coupons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to create coupon");
  return json.data;
}

export default function AdminCoupons() {
  const { addToast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    type: "percentage" as "percentage" | "flat",
    value: 0,
    planRestriction: "All",
    expiry: "",
    maxUses: 100,
  });

  const loadCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCoupons();
      setCoupons(data.map((c: any) => ({
        id: c.id,
        code: c.code,
        type: c.type || "percentage",
        value: c.value || 0,
        planRestriction: c.eligible_plan_ids ? (Array.isArray(c.eligible_plan_ids) ? c.eligible_plan_ids.join(", ") : c.eligible_plan_ids) : "All",
        expiry: c.expires_at || "",
        redemptions: c.redeemed_count || 0,
        maxUses: c.max_redemptions || 1,
        status: c.status || "active",
      })));
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newCoupon.code.trim() || !newCoupon.expiry || newCoupon.value <= 0) return;
    setCreating(true);
    try {
      await createCoupon({
        code: newCoupon.code.toUpperCase().trim(),
        type: newCoupon.type,
        value: newCoupon.value,
        max_redemptions: newCoupon.maxUses,
        eligible_plan_ids: newCoupon.planRestriction === "All" ? [] : [newCoupon.planRestriction.toLowerCase()],
        expires_at: newCoupon.expiry,
      });
      addToast("Coupon created", "success");
      setCreateModal(false);
      setNewCoupon({ code: "", type: "percentage", value: 0, planRestriction: "All", expiry: "", maxUses: 100 });
      loadCoupons();
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setCreating(false);
    }
  };

  const columns: Column<Coupon>[] = [
    { key: "code", label: "Code", sortable: true, render: (item) => <span className="font-mono font-semibold text-primary">{item.code}</span>},
    { key: "type", label: "Type", render: (item) => (
      <div className="flex items-center gap-1.5">
        {item.type === "percentage" ? <Percent className="size-3.5 text-text-muted" /> : <DollarSign className="size-3.5 text-text-muted" />}
        <span className="capitalize text-text-secondary">{item.type}</span>
      </div>
    )},
    { key: "value", label: "Value", sortable: true, render: (item) => (
      <span className="tabular-nums text-text-primary">{item.type === "percentage" ? `${item.value}%` : `$${(item.value / 100).toFixed(2)}`}</span>
    )},
    { key: "planRestriction", label: "Plan", sortable: true, render: (item) => <span className="text-text-secondary">{item.planRestriction}</span>},
    { key: "expiry", label: "Expiry", sortable: true, render: (item) => <span className="text-text-muted">{item.expiry ? formatDate(item.expiry) : "No expiry"}</span>},
    { key: "redemptions", label: "Redemptions", sortable: true, render: (item) => (
      <div className="flex items-center gap-2">
        <span className="tabular-nums">{item.redemptions}</span>
        <span className="text-xs text-text-muted">/ {item.maxUses}</span>
      </div>
    )},
    { key: "status", label: "Status", sortable: true, render: (item) => {
      const v = item.status === "active" ? "success" : item.status === "expired" ? "error" : "warning";
      return <Badge variant={v}>{item.status}</Badge>;
    }},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Coupons & Discounts</h1>
          <p className="mt-1 text-sm text-text-muted">Manage promotional codes and discounts</p>
        </div>
        <Button icon={<Plus className="size-4" />} onClick={() => setCreateModal(true)}>New Coupon</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search by code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          aria-label="Search coupons"
        />
      </div>

      {!loading && filteredCoupons.length === 0 ? (
        <EmptyState icon={<TicketCheck className="size-12" />} title="No coupons found" description="Create your first coupon code" action={<Button icon={<Plus className="size-4" />} onClick={() => setCreateModal(true)}>New Coupon</Button>} />
      ) : (
        <DataTable columns={columns} data={filteredCoupons} keyExtractor={(c) => c.id} loading={loading} sortable />
      )}

      <Modal open={createModal} onClose={() => setCreateModal(false)} title="Create New Coupon">
        <div className="space-y-4">
          <Input
            label="Coupon Code"
            placeholder="e.g. SUMMER50"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">Discount Type</label>
              <select
                value={newCoupon.type}
                onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value as "percentage" | "flat" })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat Amount ($)</option>
              </select>
            </div>
            <Input
              label={newCoupon.type === "percentage" ? "Percentage Off" : "Amount Off (cents)"}
              type="number"
              placeholder={newCoupon.type === "percentage" ? "e.g. 20" : "e.g. 1000"}
              value={newCoupon.value || ""}
              onChange={(e) => setNewCoupon({ ...newCoupon, value: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              type="date"
              value={newCoupon.expiry}
              onChange={(e) => setNewCoupon({ ...newCoupon, expiry: e.target.value })}
            />
            <Input
              label="Max Uses"
              type="number"
              value={newCoupon.maxUses}
              onChange={(e) => setNewCoupon({ ...newCoupon, maxUses: parseInt(e.target.value) || 100 })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-secondary">Eligible Plans</label>
            <select
              value={newCoupon.planRestriction}
              onChange={(e) => setNewCoupon({ ...newCoupon, planRestriction: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {planOptions.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setCreateModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreate} loading={creating}>Create Coupon</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
