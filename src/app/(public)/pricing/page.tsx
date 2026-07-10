"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";
import { Loader2, ArrowRight, Check, X } from "lucide-react";
import { PricingCard } from "@/components/domain/PricingCard";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

interface Plan {
  id: string;
  name: string;
  description: string;
  monthly_price: number;
  annual_price: number | null;
  subscriber_limit: number | string;
  site_limit: number | string;
  ai_credits: number | string;
  team_seats: number | string;
  features: string[];
  is_featured: boolean;
}

interface ComparisonFeature {
  label: string;
  getValue: (plan: Plan) => string | boolean;
}

// ponytail: plans loaded from API; no fallback — show empty state if API fails

const comparisonFeatures: ComparisonFeature[] = [
  {
    label: "Subscriber Limit",
    getValue: (p) =>
      typeof p.subscriber_limit === "number"
        ? `Up to ${p.subscriber_limit.toLocaleString("en-IN")}`
        : `Up to ${p.subscriber_limit}`,
  },
  {
    label: "Site Limit",
    getValue: (p) =>
      typeof p.site_limit === "number" ? String(p.site_limit) : String(p.site_limit),
  },
  {
    label: "AI Credits",
    getValue: (p) =>
      typeof p.ai_credits === "number"
        ? `${p.ai_credits.toLocaleString("en-IN")} / mo`
        : String(p.ai_credits),
  },
  {
    label: "Team Seats",
    getValue: (p) =>
      typeof p.team_seats === "number"
        ? `Up to ${p.team_seats}`
        : String(p.team_seats),
  },
  { label: "API Access", getValue: (p) => p.name === "Scale" },
  { label: "Custom Domain", getValue: (p) => p.name !== "Free" },
  {
    label: "Automation",
    getValue: (p) => p.name === "Growth" || p.name === "Scale",
  },
  {
    label: "Segments",
    getValue: (p) =>
      p.name === "Growth" || p.name === "Scale" ? "Advanced" : "Basic",
  },
  {
    label: "Priority Support",
    getValue: (p) => p.name === "Growth" || p.name === "Scale",
  },
  { label: "SSO/SAML", getValue: (p) => p.name === "Scale" },
];

const faqItems = [
  {
    title: "Can I switch plans at any time?",
    content:
      "Yes — you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle.",
  },
  {
    title: "Is there a free trial for paid plans?",
    content:
      "Yes — every paid plan comes with a 14-day free trial. No credit card required to start. You only pay after the trial ends.",
  },
  {
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit/debit cards, UPI, net banking, and Razorpay-powered payment methods. All prices are in INR and include applicable taxes.",
  },
  {
    title: "Can I cancel anytime?",
    content:
      "Absolutely. You can cancel your subscription from the Billing settings. Your plan remains active until the end of the current billing period.",
  },
  {
    title: "What happens if I exceed my subscriber or usage limits?",
    content:
      "We'll notify you via email and in-app. You can still send notifications, but new subscriber collection will be paused until you upgrade to a higher tier.",
  },
];

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

function getPrice(plan: Plan, annual: boolean): string {
  if (annual) {
    const annualPrice =
      plan.annual_price ?? Math.round(plan.monthly_price * 12 * 0.9);
    return annualPrice === 0 ? "₹0" : `₹${formatINR(annualPrice)}`;
  }
  return plan.monthly_price === 0 ? "₹0" : `₹${formatINR(plan.monthly_price)}`;
}

function getPeriod(plan: Plan, annual: boolean): string {
  if (annual) return "/yr";
  return plan.monthly_price === 0 ? "" : "/mo";
}

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-4 text-primary" />
    ) : (
      <X className="mx-auto size-4 text-text-muted" />
    );
  }
  return <span className="text-sm text-text-secondary">{value}</span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToast } = useToast();

  useEffect(() => {
    fetch("/api/v1/billing/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPlans(data.data);
        } else {
          setError("Could not load pricing plans.");
        }
      })
      .catch(() => {
        setError("Could not load pricing plans.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || plans.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-text-muted">{error || "No plans available."}</p>
      </div>
    );
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Prontly Notify",
            offers: plans.map((p) => ({
              "@type": "Offer",
              name: p.name,
              price: getPrice(p, annual).replace("₹", "").replace(",", ""),
              priceCurrency: "INR",
              description: p.description,
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="info" className="mb-4">
            Pricing
          </Badge>
          <h1 className="font-display mb-4 text-4xl font-bold md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
            Start free. Upgrade when you grow. All plans include a 14-day free
            trial — no credit card required.
          </p>

          {/* Toggle */}
          <div className="mx-auto mb-12 inline-flex items-center rounded-xl border border-border bg-surface p-1.5">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                !annual
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                annual
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Annual
              <span
                className={`ml-1.5 rounded-full bg-success/20 px-1.5 py-0.5 text-[10px] font-semibold text-success transition-opacity ${
                  annual ? "opacity-100" : "opacity-0"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>

          {/* Plan Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div key={plan.id} className="transition-all duration-300">
                <PricingCard
                  name={plan.name}
                  price={getPrice(plan, annual)}
                  period={getPeriod(plan, annual)}
                  description={plan.description}
                  features={plan.features}
                  cta={
                    plan.monthly_price === 0
                      ? "Get Started"
                      : plan.is_featured
                        ? "Start Free Trial"
                        : "Get Started"
                  }
                  onCta={() => {
                    window.location.href =
                      plan.monthly_price === 0
                        ? "/signup"
                        : `/signup?plan=${plan.id}`;
                  }}
                  featured={plan.is_featured}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">
            Compare plans in detail
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="sticky left-0 z-10 bg-surface px-6 py-4 text-sm font-semibold text-text-primary">
                    Feature
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      className={`px-6 py-4 text-sm font-semibold ${
                        p.is_featured ? "text-primary" : "text-text-primary"
                      }`}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feat, idx) => (
                  <tr
                    key={feat.label}
                    className={`border-b border-border last:border-0 ${
                      idx % 2 === 1 ? "bg-black/[0.03]" : ""
                    }`}
                  >
                    <td className="sticky left-0 z-10 bg-surface px-6 py-4 text-sm font-medium text-text-primary">
                      {feat.label}
                    </td>
                    {plans.map((p) => (
                      <td key={p.id} className="px-6 py-4">
                        <CellValue value={feat.getValue(p)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display mb-8 text-center text-3xl font-bold">
            Billing & plan FAQ
          </h2>
          <Accordion items={faqItems} type="multiple" />
        </div>
      </section>

      {/* Enterprise */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Card variant="featured" className="text-center">
          <CardTitle className="text-2xl">Need a custom plan?</CardTitle>
          <CardDescription className="mx-auto mb-6 mt-2 max-w-xl">
            We offer custom pricing for high-volume senders, enterprises, and
            agencies with specific requirements.
          </CardDescription>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600"
          >
            Talk to Enterprise Sales
            <ArrowRight className="size-4" />
          </a>
        </Card>
      </section>
    </div>
  );
}
