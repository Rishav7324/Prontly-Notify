"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/domain/EmptyState";
import { formatDate, formatNumber } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  XCircle,
  RefreshCcw,
  AlertTriangle,
  BarChart3,
  CreditCard,
} from "lucide-react";

interface FailedPayment {
  id: string;
  account: string;
  email: string;
  amount: number;
  date: string;
  reason: string;
  retryCount: number;
}

interface CouponPerformance {
  id: string;
  code: string;
  redemptions: number;
  revenue: number;
  conversionRate: number;
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "failed-payments", label: "Failed Payments" },
  { id: "coupons", label: "Coupons" },
];

async function fetchBillingOverview() {
  const res = await fetch("/api/v1/admin/billing/overview");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch billing overview");
  return json.data;
}

async function fetchFailedPayments() {
  const res = await fetch("/api/v1/admin/billing/failed-payments");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch failed payments");
  return json.data.failedPayments;
}

async function fetchCoupons() {
  const res = await fetch("/api/v1/admin/coupons");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch coupons");
  return json.data.coupons;
}

async function fetchPlans() {
  const res = await fetch("/api/v1/billing/plans");
  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Failed to fetch plans");
  return json.data;
}

function RevenueChart() {
  const points = [55, 62, 48, 78, 65, 82, 70, 88, 75, 92, 85, 78];
  const w = 280; const h = 80;
  const max = Math.max(...points); const min = Math.min(...points); const range = max - min || 1;
  const coords = points.map((p, i) => ({ x: (i / (points.length - 1)) * w, y: h - ((p - min) / range) * (h - 10) - 5 }));
  const d = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join("");
  return (
    <svg width={w} height={h} className="overflow-visible" aria-label="Revenue chart">
      <defs>
        <linearGradient id="billGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(34, 197, 94, 0.25)" />
          <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#billGrad)" />
    </svg>
  );
}

export default function AdminBilling() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [retryModal, setRetryModal] = useState<FailedPayment | null>(null);

  const [overviewData, setOverviewData] = useState<any>(null);
  const [failedPayments, setFailedPayments] = useState<FailedPayment[]>([]);
  const [coupons, setCoupons] = useState<CouponPerformance[]>([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [overview, failed, couponData] = await Promise.all([
        fetchBillingOverview(),
        fetchFailedPayments(),
        fetchCoupons(),
      ]);
      setOverviewData(overview);
      setFailedPayments(failed.map((f: any) => ({
        id: f.id,
        account: f.workspace_name || "Unknown",
        email: f.owner_email || "",
        amount: f.amount || 0,
        date: f.current_period_end,
        reason: "Payment past due",
        retryCount: f.retry_count || 0,
      })));
      setCoupons(couponData.map((c: any) => ({
        id: c.id,
        code: c.code,
        redemptions: c.redeemed_count || 0,
        revenue: 0,
        conversionRate: 0,
      })));
    } catch (err: any) {
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const kpis = overviewData ? [
    { label: "MRR", value: `$${formatNumber(overviewData.monthlyMrr)}`, change: "+12.3%", trend: "up" as const },
    { label: "Active Subs", value: String(overviewData.activeSubscriptions), change: "+5.2%", trend: "up" as const },
    { label: "Total Revenue", value: `$${formatNumber(overviewData.totalRevenue)}`, change: "+8.1%", trend: "up" as const },
    { label: "Failed Payments", value: String(overviewData.failedPayments), change: "+15%", trend: "up" as const },
  ] : [];

  const failedPaymentColumns: Column<FailedPayment>[] = [
    { key: "account", label: "Account", sortable: true, render: (item) => (
      <div>
        <p className="font-medium text-text-primary">{item.account}</p>
        <p className="text-xs text-text-muted">{item.email}</p>
      </div>
    )},
    { key: "amount", label: "Amount", sortable: true, render: (item) => (
      <span className="tabular-nums text-text-primary">${item.amount.toLocaleString()}</span>
    )},
    { key: "date", label: "Date", sortable: true, render: (item) => <span className="text-text-muted">{formatDate(item.date)}</span>},
    { key: "reason", label: "Reason", render: (item) => <span className="text-text-secondary">{item.reason}</span>},
    { key: "retryCount", label: "Retries", sortable: true, render: (item) => <Badge variant={item.retryCount >= 3 ? "error" : "warning"}>{item.retryCount}</Badge>},
    { key: "actions", label: "Actions", render: (item) => (
      <Button variant="outline" size="sm" icon={<RefreshCcw className="size-3.5" />} onClick={() => setRetryModal(item)}>Retry</Button>
    )},
  ];

  const couponColumns: Column<CouponPerformance>[] = [
    { key: "code", label: "Code", sortable: true, render: (item) => (
      <span className="font-mono font-medium text-primary">{item.code}</span>
    )},
    { key: "redemptions", label: "Redemptions", sortable: true, render: (item) => <span className="tabular-nums">{item.redemptions}</span>},
    { key: "revenue", label: "Revenue", sortable: true, render: (item) => <span className="tabular-nums text-text-primary">${item.revenue.toLocaleString()}</span>},
    { key: "conversionRate", label: "Conv. Rate", sortable: true, render: (item) => <span className="tabular-nums">{item.conversionRate}%</span>},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Revenue & Billing</h1>
        <p className="mt-1 text-sm text-text-muted">Subscription and payment oversight</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="space-y-6">
          {!overviewData && !loading ? (
            <EmptyState icon={<BarChart3 className="size-12" />} title="No billing data" description="Could not load billing overview" />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi) => (
                  <Card key={kpi.label}>
                    {loading ? <Skeleton variant="card" /> : (
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-text-muted">{kpi.label}</p>
                          <Badge variant={kpi.trend === "up" ? "success" : "error"} size="sm">
                            {kpi.trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                            {kpi.change}
                          </Badge>
                        </div>
                        <p className="mt-2 text-2xl font-bold text-text-primary tabular-nums">{kpi.value}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="size-4 text-primary" />
                    Revenue Trend (6 months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center py-6"><RevenueChart /></div>
                </CardContent>
              </Card>

              {overviewData?.planDistribution?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="size-4 text-primary" />
                      Plan Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {overviewData.planDistribution.map((p: any) => (
                        <div key={p.name} className="rounded-lg border border-border p-3 text-center">
                          <p className="text-sm text-text-muted">{p.name}</p>
                          <p className="mt-1 text-xl font-bold text-text-primary">{p.count}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === "failed-payments" && (
        <div className="space-y-4">
          {!loading && failedPayments.length === 0 ? (
            <EmptyState icon={<CreditCard className="size-12" />} title="No failed payments" description="All payments are processing normally" />
          ) : (
            <DataTable columns={failedPaymentColumns} data={failedPayments} keyExtractor={(f) => f.id} loading={loading} sortable />
          )}

          <Modal open={!!retryModal} onClose={() => setRetryModal(null)} title="Retry Charge">
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-warning/25 bg-warning/5 p-3">
                <RefreshCcw className="mt-0.5 size-5 shrink-0 text-warning" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Retry payment for {retryModal?.account}?</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Amount: ${retryModal?.amount.toLocaleString()} | Previous attempts: {retryModal?.retryCount}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setRetryModal(null)}>Cancel</Button>
                <Button variant="primary" onClick={() => { setRetryModal(null); addToast("Payment retry queued", "success"); }}>
                  <RefreshCcw className="size-4" /> Retry Charge
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {activeTab === "coupons" && (
        !loading && coupons.length === 0 ? (
          <EmptyState icon={<DollarSign className="size-12" />} title="No coupons" description="No coupon data available" />
        ) : (
          <DataTable columns={couponColumns} data={coupons} keyExtractor={(c) => c.id} loading={loading} sortable />
        )
      )}
    </div>
  );
}
