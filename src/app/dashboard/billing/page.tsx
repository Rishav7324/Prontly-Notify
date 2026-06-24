"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";
import { formatDate, formatNumber } from "@/lib/utils";
import { RazorpayCheckout } from "@/components/billing/RazorpayCheckout";
import {
  CreditCard,
  FileText,
  Download,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";

interface Invoice {
  id: string;
  razorpay_invoice_id: string | null;
  amount: number;
  currency: string;
  status: string;
  invoice_pdf_url: string | null;
  period_start: string | null;
  period_end: string | null;
  paid_at: string | null;
  created_at: string;
}

interface Plan {
  id: string;
  name: string;
  price_monthly: number;
  price_annual: number;
  subscriber_limit: number;
  site_limit: number;
  ai_credit_limit: number;
  team_seat_limit: number;
  features: string;
}

interface SubscriptionData {
  subscription: {
    id: string;
    plan_id: string;
    status: string;
    current_period_end: string;
    plan_name: string;
    price_monthly: number;
    subscriber_limit: number;
    site_limit: number;
    ai_credit_limit: number;
    team_seat_limit: number;
  } | null;
  usage: {
    sites: number;
    subscribers: number;
    ai_credits: number;
  };
}

export default function BillingPage() {
  const { addToast } = useToast();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [subRes, plansRes, invRes] = await Promise.all([
          fetch("/api/v1/billing/subscription"),
          fetch("/api/v1/billing/plans"),
          fetch("/api/v1/billing/invoices"),
        ]);
        const subJson = await subRes.json();
        const plansJson = await plansRes.json();
        const invJson = await invRes.json();
        if (subJson.success) setData(subJson.data);
        if (plansJson.success) setPlans(plansJson.data);
        if (invJson.success) setInvoices(invJson.data);
      } catch (err) {
        addToast("Failed to load billing data", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [addToast]);

  const sub = data?.subscription;
  const usage = data?.usage || { sites: 0, subscribers: 0, ai_credits: 0 };

  const planLimits = sub
    ? {
        subscribers: { used: usage.subscribers, total: sub.subscriber_limit },
        websites: { used: usage.sites, total: sub.site_limit },
        aiCredits: { used: usage.ai_credits, total: sub.ai_credit_limit },
        teamSeats: { used: 0, total: sub.team_seat_limit },
      }
    : null;

  const columns: Column<Invoice>[] = [
    {
      key: "id",
      label: "Invoice",
      render: (i) => (
        <span className="font-medium text-text-primary">
          {i.razorpay_invoice_id || i.id.slice(0, 8)}
        </span>
      ),
    },
    { key: "created_at", label: "Date", render: (i) => formatDate(i.created_at) },
    {
      key: "amount",
      label: "Amount",
      render: (i) => `₹${(i.amount / 100).toLocaleString("en-IN")}`,
    },
    {
      key: "status",
      label: "Status",
      render: (i) => (
        <Badge
          variant={
            i.status === "paid"
              ? "success"
              : i.status === "open" || i.status === "pending"
              ? "warning"
              : "error"
          }
          size="sm"
        >
          {i.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (i) =>
        i.status === "paid" && i.invoice_pdf_url ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(i.invoice_pdf_url!, "_blank")}
            icon={<Download className="h-3.5 w-3.5" />}
          />
        ) : null,
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
          <h1 className="text-2xl font-bold text-text-primary">Billing</h1>
          <p className="mt-1 text-sm text-text-muted">
            Manage your subscription and invoices
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card variant="featured" className="lg:col-span-1">
          <CardContent>
            <Badge variant="primary" size="sm">
              {sub?.plan_name || "Free"} Plan
            </Badge>
            <p className="mt-3 text-2xl font-bold text-text-primary">
              {sub ? `₹${(sub.price_monthly / 100).toLocaleString("en-IN")}` : "Free"}
            </p>
            <p className="text-sm text-text-muted">
              {sub
                ? `/month · Renews ${formatDate(sub.current_period_end)}`
                : "Free plan · No charges"}
            </p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={() => setShowPlanModal(true)}>
                {sub ? "Change Plan" : "Upgrade"}
              </Button>
              {sub && sub.status === "active" && sub.plan_id !== "free" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCancelConfirm(true)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {planLimits ? (
              <>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Subscribers</span>
                    <span className="text-text-muted">
                      {formatNumber(planLimits.subscribers.used)} /{" "}
                      {planLimits.subscribers.total === -1
                        ? "Unlimited"
                        : formatNumber(planLimits.subscribers.total)}
                    </span>
                  </div>
                  {planLimits.subscribers.total > 0 && (
                    <ProgressBar
                      value={planLimits.subscribers.used}
                      max={planLimits.subscribers.total}
                      className="mt-1"
                      showLabel
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Websites</span>
                    <span className="text-text-muted">
                      {planLimits.websites.used} /{" "}
                      {planLimits.websites.total === -1
                        ? "Unlimited"
                        : planLimits.websites.total}
                    </span>
                  </div>
                  {planLimits.websites.total > 0 && (
                    <ProgressBar
                      value={planLimits.websites.used}
                      max={planLimits.websites.total}
                      className="mt-1"
                      showLabel
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">AI Credits</span>
                    <span className="text-text-muted">
                      {planLimits.aiCredits.used} /{" "}
                      {planLimits.aiCredits.total === -1
                        ? "Unlimited"
                        : planLimits.aiCredits.total}{" "}
                      / month
                    </span>
                  </div>
                  {planLimits.aiCredits.total > 0 && (
                    <ProgressBar
                      value={planLimits.aiCredits.used}
                      max={planLimits.aiCredits.total}
                      className="mt-1"
                      showLabel
                    />
                  )}
                </div>
              </>
            ) : (
              <p className="text-sm text-text-muted">Loading usage data...</p>
            )}
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
                <p className="text-sm font-medium text-text-primary">
                  {sub && sub.plan_id !== "free"
                    ? "Razorpay Subscription"
                    : "No payment method"}
                </p>
                <p className="text-xs text-text-muted">
                  {sub && sub.plan_id !== "free"
                    ? "Managed via Razorpay"
                    : "Upgrade to add a payment method"}
                </p>
              </div>
              {sub && sub.plan_id !== "free" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() =>
                    addToast(
                      "Update payment method in Razorpay dashboard",
                      "info"
                    )
                  }
                >
                  Update
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length > 0 ? (
              <DataTable
                columns={columns}
                data={invoices}
                keyExtractor={(i) => i.id}
              />
            ) : (
              <p className="py-4 text-center text-sm text-text-muted">
                No invoices yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Modal
        open={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        title={sub ? "Change Plan" : "Choose a Plan"}
        size="lg"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const isCurrent = sub?.plan_id === plan.id;
            return (
              <div
                key={plan.id}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  isCurrent
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Badge
                  variant={isCurrent ? "primary" : "default"}
                  size="sm"
                >
                  {isCurrent ? "Current" : plan.name}
                </Badge>
                <p className="mt-3 text-2xl font-bold text-text-primary">
                  {plan.price_monthly === 0
                    ? "Free"
                    : `₹${(plan.price_monthly / 100).toLocaleString("en-IN")}`}
                </p>
                <p className="text-xs text-text-muted">/month</p>
                <ul className="mt-3 space-y-1 text-xs text-text-secondary">
                  <li>
                    •{" "}
                    {plan.subscriber_limit === -1
                      ? "Unlimited"
                      : formatNumber(plan.subscriber_limit)}{" "}
                    subscribers
                  </li>
                  <li>
                    •{" "}
                    {plan.site_limit === -1
                      ? "Unlimited"
                      : plan.site_limit}{" "}
                    websites
                  </li>
                  <li>
                    •{" "}
                    {plan.ai_credit_limit === -1
                      ? "Unlimited"
                      : plan.ai_credit_limit}{" "}
                    AI credits
                  </li>
                  <li>
                    •{" "}
                    {plan.team_seat_limit === -1
                      ? "Unlimited"
                      : plan.team_seat_limit}{" "}
                    team seats
                  </li>
                </ul>
                {!isCurrent && (
                  <div className="mt-4">
                    {plan.price_monthly === 0 ? (
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={async () => {
                          try {
                            const res = await fetch(
                              "/api/v1/billing/change-plan",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ plan_id: plan.id }),
                              }
                            );
                            const json = await res.json();
                            if (json.success) {
                              addToast(`Downgraded to ${plan.name}`, "success");
                              setShowPlanModal(false);
                              window.location.reload();
                            } else {
                              addToast(json.error, "error");
                            }
                          } catch {
                            addToast("Failed to change plan", "error");
                          }
                        }}
                      >
                        Downgrade
                      </Button>
                    ) : (
                      <RazorpayCheckout
                        planId={plan.id}
                        planName={plan.name}
                        variant="primary"
                        size="sm"
                        className="w-full"
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Modal>

      <Modal
        open={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        title="Cancel Subscription"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Are you sure you want to cancel your subscription? Your service will
            continue until the end of the current billing period.
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setShowCancelConfirm(false)}
            >
              Keep Subscription
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={async () => {
                try {
                  const res = await fetch("/api/v1/billing/cancel", {
                    method: "POST",
                  });
                  const json = await res.json();
                  if (json.success) {
                    addToast("Subscription cancelled", "success");
                    setShowCancelConfirm(false);
                    window.location.reload();
                  } else {
                    addToast(json.error, "error");
                  }
                } catch {
                  addToast("Failed to cancel", "error");
                }
              }}
            >
              Confirm Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
