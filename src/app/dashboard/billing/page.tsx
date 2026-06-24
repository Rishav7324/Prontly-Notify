"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";
import { formatDate, formatNumber } from "@/lib/utils";
import {
  CreditCard,
  FileText,
  Download,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
}

const plans = [
  { id: "free", name: "Free", price: "$0", subscribers: 1000, websites: 1, ai: 10, team: 1 },
  { id: "growth", name: "Growth", price: "$29", subscribers: 10000, websites: 3, ai: 50, team: 5 },
  { id: "pro", name: "Pro", price: "$99", subscribers: 100000, websites: 10, ai: 200, team: 20 },
  { id: "enterprise", name: "Enterprise", price: "Custom", subscribers: -1, websites: -1, ai: -1, team: -1 },
];

const invoices: Invoice[] = [
  { id: "INV-001", date: "2026-06-01", amount: "$29.00", status: "paid" },
  { id: "INV-002", date: "2026-05-01", amount: "$29.00", status: "paid" },
  { id: "INV-003", date: "2026-04-01", amount: "$29.00", status: "paid" },
];

export default function BillingPage() {
  const { addToast } = useToast();
  const [showPlanModal, setShowPlanModal] = useState(false);

  const usage = {
    subscribers: { used: 8470, total: 10000 },
    websites: { used: 2, total: 3 },
    aiCredits: { used: 42, total: 50 },
    teamSeats: { used: 3, total: 5 },
  };

  const columns: Column<Invoice>[] = [
    { key: "id", label: "Invoice", render: (i) => <span className="font-medium text-text-primary">{i.id}</span> },
    { key: "date", label: "Date", render: (i) => formatDate(i.date) },
    { key: "amount", label: "Amount", render: (i) => i.amount },
    {
      key: "status",
      label: "Status",
      render: (i) => (
        <Badge variant={i.status === "paid" ? "success" : i.status === "pending" ? "warning" : "error"} size="sm">
          {i.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (i) => (
        i.status === "paid" ? (
          <Button variant="ghost" size="sm" onClick={() => addToast("Downloading invoice...", "info")} icon={<Download className="h-3.5 w-3.5" />} />
        ) : null
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Billing</h1>
          <p className="mt-1 text-sm text-text-muted">Manage your subscription and invoices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card variant="featured" className="lg:col-span-1">
          <CardContent>
            <Badge variant="primary" size="sm">Current Plan</Badge>
            <p className="mt-3 text-2xl font-bold text-text-primary">Growth</p>
            <p className="text-sm text-text-muted">$29/month · Renews July 1, 2026</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={() => setShowPlanModal(true)}>Manage Plan</Button>
              <Button variant="ghost" size="sm" onClick={() => addToast("Cancelling subscription...", "warning")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Subscribers</span>
                <span className="text-text-muted">{formatNumber(usage.subscribers.used)} / {formatNumber(usage.subscribers.total)}</span>
              </div>
              <ProgressBar value={usage.subscribers.used} max={usage.subscribers.total} className="mt-1" showLabel />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Websites</span>
                <span className="text-text-muted">{usage.websites.used} / {usage.websites.total}</span>
              </div>
              <ProgressBar value={usage.websites.used} max={usage.websites.total} className="mt-1" showLabel />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">AI Credits</span>
                <span className="text-text-muted">{usage.aiCredits.used} / {usage.aiCredits.total} / month</span>
              </div>
              <ProgressBar value={usage.aiCredits.used} max={usage.aiCredits.total} className="mt-1" showLabel />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Team Seats</span>
                <span className="text-text-muted">{usage.teamSeats.used} / {usage.teamSeats.total}</span>
              </div>
              <ProgressBar value={usage.teamSeats.used} max={usage.teamSeats.total} className="mt-1" showLabel />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                <CreditCard className="h-5 w-5 text-text-muted" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Visa ending in 4242</p>
                <p className="text-xs text-text-muted">Expires 12/2028</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => addToast("Update payment method...", "info")}>
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={invoices} keyExtractor={(i) => i.id} />
          </CardContent>
        </Card>
      </div>

      <Modal open={showPlanModal} onClose={() => setShowPlanModal(false)} title="Change Plan" size="lg">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => {
                addToast(`Switching to ${plan.name} plan...`, "success");
                setShowPlanModal(false);
              }}
              className={`rounded-xl border p-4 text-left transition-colors ${
                plan.id === "growth" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <Badge variant={plan.id === "growth" ? "primary" : "default"} size="sm">
                {plan.id === "growth" ? "Current" : plan.name}
              </Badge>
              <p className="mt-3 text-2xl font-bold text-text-primary">{plan.price}</p>
              <p className="text-xs text-text-muted">/month</p>
              <ul className="mt-3 space-y-1 text-xs text-text-secondary">
                <li>• {plan.subscribers === -1 ? "Unlimited" : formatNumber(plan.subscribers)} subscribers</li>
                <li>• {plan.websites === -1 ? "Unlimited" : plan.websites} websites</li>
                <li>• {plan.ai === -1 ? "Unlimited" : plan.ai} AI credits</li>
                <li>• {plan.team === -1 ? "Unlimited" : plan.team} team seats</li>
              </ul>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
