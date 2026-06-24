"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { cn, formatDate, generateId } from "@/lib/utils";
import {
  TicketCheck,
  Plus,
  Search,
  Percent,
  DollarSign,
  Calendar,
  Users,
  Tag,
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

const initialCoupons: Coupon[] = [
  { id: "1", code: "VIP50", type: "percentage", value: 50, planRestriction: "All", expiry: "2024-12-31", redemptions: 142, maxUses: 500, status: "active" },
  { id: "2", code: "WELCOME20", type: "percentage", value: 20, planRestriction: "Free,Pro", expiry: "2024-09-30", redemptions: 389, maxUses: 1000, status: "active" },
  { id: "3", code: "BLACKFRIDAY", type: "flat", value: 10000, planRestriction: "Enterprise", expiry: "2024-11-30", redemptions: 567, maxUses: 2000, status: "active" },
  { id: "4", code: "TEAM10", type: "flat", value: 1000, planRestriction: "Business", expiry: "2024-08-15", redemptions: 78, maxUses: 200, status: "active" },
  { id: "5", code: "OLD50", type: "percentage", value: 50, planRestriction: "All", expiry: "2024-06-01", redemptions: 890, maxUses: 1000, status: "expired" },
];

const planOptions = [
  { value: "All", label: "All Plans" },
  { value: "Free", label: "Free" },
  { value: "Pro", label: "Pro" },
  { value: "Business", label: "Business" },
  { value: "Enterprise", label: "Enterprise" },
];

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    type: "percentage" as "percentage" | "flat",
    value: 0,
    planRestriction: "All",
    expiry: "",
    maxUses: 100,
  });

  const filteredCoupons = useMemo(() => {
    return coupons.filter((c) =>
      c.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [coupons, search]);

  const handleCreate = () => {
    if (!newCoupon.code.trim() || !newCoupon.expiry || newCoupon.value <= 0) return;
    const coupon: Coupon = {
      id: generateId(),
      code: newCoupon.code.toUpperCase().trim(),
      type: newCoupon.type,
      value: newCoupon.value,
      planRestriction: newCoupon.planRestriction,
      expiry: newCoupon.expiry,
      redemptions: 0,
      maxUses: newCoupon.maxUses,
      status: "active",
    };
    setCoupons((prev) => [coupon, ...prev]);
    setCreateModal(false);
    setNewCoupon({ code: "", type: "percentage", value: 0, planRestriction: "All", expiry: "", maxUses: 100 });
  };

  const columns: Column<Coupon>[] = [
    { key: "code", label: "Code", sortable: true, render: (item) => (
      <span className="font-mono font-semibold text-primary">{item.code}</span>
    )},
    { key: "type", label: "Type", render: (item) => (
      <div className="flex items-center gap-1.5">
        {item.type === "percentage" ? <Percent className="size-3.5 text-text-muted" /> : <DollarSign className="size-3.5 text-text-muted" />}
        <span className="capitalize text-text-secondary">{item.type}</span>
      </div>
    )},
    { key: "value", label: "Value", sortable: true, render: (item) => (
      <span className="tabular-nums text-text-primary">
        {item.type === "percentage" ? `${item.value}%` : `$${(item.value / 100).toFixed(2)}`}
      </span>
    )},
    { key: "planRestriction", label: "Plan", sortable: true, render: (item) => (
      <span className="text-text-secondary">{item.planRestriction}</span>
    )},
    { key: "expiry", label: "Expiry", sortable: true, render: (item) => (
      <span className="text-text-muted">{formatDate(item.expiry)}</span>
    )},
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
        <Button icon={<Plus className="size-4" />} onClick={() => setCreateModal(true)}>
          New Coupon
        </Button>
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

      <DataTable columns={columns} data={filteredCoupons} keyExtractor={(c) => c.id} loading={loading} sortable />

      {/* Create Modal */}
      <Modal open={createModal} onClose={() => setCreateModal(false)} title="Create New Coupon">
        <div className="space-y-4">
          <Input
            label="Coupon Code"
            placeholder="e.g. SUMMER50"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Discount Type"
              options={[
                { value: "percentage", label: "Percentage (%)" },
                { value: "flat", label: "Flat Amount ($)" },
              ]}
              value={newCoupon.type}
              onChange={(v) => setNewCoupon({ ...newCoupon, type: v as "percentage" | "flat" })}
            />
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
          <Select
            label="Eligible Plans"
            options={planOptions}
            value={newCoupon.planRestriction}
            onChange={(v) => setNewCoupon({ ...newCoupon, planRestriction: v })}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setCreateModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreate}>Create Coupon</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
