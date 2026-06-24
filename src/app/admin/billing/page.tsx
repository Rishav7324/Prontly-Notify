"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn, formatDate, formatNumber, generateId } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  XCircle,
  RefreshCcw,
  TicketCheck,
  AlertTriangle,
  BarChart3,
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

interface Cancellation {
  id: string;
  account: string;
  email: string;
  plan: string;
  date: string;
  reason: string;
  churnType: "voluntary" | "involuntary";
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
  { id: "cancellations", label: "Cancellations" },
  { id: "coupons", label: "Coupons" },
];

const kpis = [
  { label: "MRR", value: "$48,293", change: "+12.3%", trend: "up" as const },
  { label: "ARPU", value: "$8.42", change: "+3.1%", trend: "up" as const },
  { label: "Churn Rate", value: "2.1%", change: "-0.4%", trend: "down" as const },
  { label: "Failed Payments", value: "23", change: "+15%", trend: "up" as const },
];

const failedPayments: FailedPayment[] = [
  { id: "1", account: "Acme Corp", email: "admin@acme.com", amount: 2999, date: "2024-07-15", reason: "Card declined", retryCount: 2 },
  { id: "2", account: "DevHub", email: "team@devhub.dev", amount: 0, date: "2024-07-14", reason: "Insufficient funds", retryCount: 3 },
  { id: "3", account: "ShopEasy", email: "info@shopeasy.com", amount: 299, date: "2024-07-12", reason: "Expired card", retryCount: 1 },
  { id: "4", account: "WebStack", email: "contact@webstack.co", amount: 0, date: "2024-07-10", reason: "Payment method removed", retryCount: 0 },
];

const cancellations: Cancellation[] = [
  { id: "1", account: "Media Group", email: "contact@media.co", plan: "Enterprise", date: "2024-07-13", reason: "Switching to competitor", churnType: "voluntary" },
  { id: "2", account: "Pixel Perfect", email: "hello@pixelperfect.io", plan: "Business", date: "2024-07-11", reason: "Budget constraints", churnType: "voluntary" },
  { id: "3", account: "ShopEasy", email: "info@shopeasy.com", plan: "Pro", date: "2024-07-08", reason: "Payment failure (3 attempts)", churnType: "involuntary" },
];

const couponPerformance: CouponPerformance[] = [
  { id: "1", code: "VIP50", redemptions: 142, revenue: 69200, conversionRate: 28.4 },
  { id: "2", code: "WELCOME20", redemptions: 389, revenue: 82300, conversionRate: 22.1 },
  { id: "3", code: "BLACKFRIDAY", redemptions: 567, revenue: 245000, conversionRate: 35.7 },
  { id: "4", code: "TEAM10", redemptions: 78, revenue: 23400, conversionRate: 18.2 },
];

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
          <stop offset="0%" stopColor="rgba(34,197,94,0.25)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#billGrad)" />
    </svg>
  );
}

export default function AdminBilling() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [retryModal, setRetryModal] = useState<FailedPayment | null>(null);

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
      <Button variant="outline" size="sm" icon={<RefreshCcw className="size-3.5" />} onClick={() => setRetryModal(item)}>
        Retry
      </Button>
    )},
  ];

  const cancellationColumns: Column<Cancellation>[] = [
    { key: "account", label: "Account", sortable: true, render: (item) => (
      <div>
        <p className="font-medium text-text-primary">{item.account}</p>
        <p className="text-xs text-text-muted">{item.email}</p>
      </div>
    )},
    { key: "plan", label: "Plan", sortable: true, render: (item) => <Badge>{item.plan}</Badge>},
    { key: "date", label: "Date", sortable: true, render: (item) => <span className="text-text-muted">{formatDate(item.date)}</span>},
    { key: "churnType", label: "Type", sortable: true, render: (item) => (
      <Badge variant={item.churnType === "voluntary" ? "warning" : "error"}>{item.churnType}</Badge>
    )},
    { key: "reason", label: "Reason", render: (item) => <span className="text-text-secondary">{item.reason}</span>},
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
        </div>
      )}

      {activeTab === "failed-payments" && (
        <div className="space-y-4">
          <DataTable columns={failedPaymentColumns} data={failedPayments} keyExtractor={(f) => f.id} loading={loading} sortable />

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
                <Button variant="primary" onClick={() => setRetryModal(null)}>
                  <RefreshCcw className="size-4" /> Retry Charge
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {activeTab === "cancellations" && (
        <DataTable columns={cancellationColumns} data={cancellations} keyExtractor={(c) => c.id} loading={loading} sortable />
      )}

      {activeTab === "coupons" && (
        <DataTable columns={couponColumns} data={couponPerformance} keyExtractor={(c) => c.id} loading={loading} sortable />
      )}
    </div>
  );
}
