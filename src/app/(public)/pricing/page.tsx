"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, HelpCircle, ArrowRight } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";

const plans = [
  {
    name: "Free",
    price: { monthly: "₹0", annual: "₹0" },
    period: { monthly: "/mo", annual: "/mo" },
    desc: "Perfect for testing the waters.",
    features: [
      "Up to 2,000 subscribers",
      "1 website",
      "10 AI credits / mo",
      "Basic analytics",
      "Standard support",
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Starter",
    price: { monthly: "₹999", annual: "₹999" },
    period: { monthly: "/mo", annual: "/mo" },
    desc: "For growing blogs and small stores.",
    features: [
      "Up to 10,000 subscribers",
      "3 websites",
      "100 AI credits / mo",
      "Advanced analytics",
      "Email support",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=starter",
    popular: false,
  },
  {
    name: "Growth",
    price: { monthly: "₹2,999", annual: "₹2,499" },
    period: { monthly: "/mo", annual: "/mo" },
    desc: "For serious publishers and SaaS teams.",
    features: [
      "Up to 50,000 subscribers",
      "10 websites",
      "500 AI credits / mo",
      "Full analytics suite",
      "Priority support",
      "Team members (up to 3)",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=growth",
    popular: true,
  },
  {
    name: "Scale",
    price: { monthly: "₹7,999", annual: "₹6,999" },
    period: { monthly: "/mo", annual: "/mo" },
    desc: "For high-volume businesses and agencies.",
    features: [
      "Up to 200,000 subscribers",
      "Unlimited websites",
      "Unlimited AI credits",
      "Enterprise analytics",
      "Dedicated support",
      "Unlimited team members",
      "API access",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

const comparisonFeatures = [
  { label: "Subscriber limit", free: "2,000", starter: "10,000", growth: "50,000", scale: "200,000" },
  { label: "Websites", free: "1", starter: "3", growth: "10", scale: "Unlimited" },
  { label: "AI credits / mo", free: "10", starter: "100", growth: "500", scale: "Unlimited" },
  { label: "AI title generation", free: true, starter: true, growth: true, scale: true },
  { label: "Smart scheduling", free: false, starter: true, growth: true, scale: true },
  { label: "Behavioral automation", free: false, starter: "1 flow", growth: "5 flows", scale: "Unlimited" },
  { label: "Segmentation", free: "Basic", starter: "Basic", growth: "Advanced", scale: "Advanced" },
  { label: "Team members", free: false, starter: false, growth: "Up to 3", scale: "Unlimited" },
  { label: "API access", free: false, starter: false, growth: false, scale: true },
  { label: "Priority support", free: false, starter: false, growth: true, scale: true },
  { label: "Dedicated support", free: false, starter: false, growth: false, scale: true },
  { label: "Custom reports", free: false, starter: false, growth: true, scale: true },
];

const faqItems = [
  {
    title: "Can I switch plans at any time?",
    content: "Yes — you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle.",
  },
  {
    title: "What payment methods do you accept?",
    content: "We accept all major credit/debit cards, UPI, net banking, and Razorpay-powered payment methods. All prices are in INR and include applicable taxes.",
  },
  {
    title: "Is there a free trial for paid plans?",
    content: "Yes — every paid plan comes with a 14-day free trial. No credit card required to start. You only pay after the trial ends.",
  },
  {
    title: "What happens when I exceed my subscriber limit?",
    content: "We'll notify you via email and in-app. You can still send notifications, but new subscriber collection will be paused until you upgrade.",
  },
  {
    title: "Can I cancel anytime?",
    content: "Absolutely. You can cancel your subscription from the Billing settings. Your plan remains active until the end of the current billing period.",
  },
];

function CheckIcon() {
  return <Check className="size-4 text-primary" />;
}

function XIcon() {
  return <X className="size-4 text-text-muted" />;
}

function CellValue({ value }: { value: string | boolean | number }) {
  if (typeof value === "boolean") {
    return value ? <CheckIcon /> : <XIcon />;
  }
  return <span className="text-sm text-text-secondary">{value}</span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="info" className="mb-4">Pricing</Badge>
          <h1 className="font-display mb-4 text-4xl font-bold md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary">
            Start free. Upgrade when you grow. All plans include a 14-day free
            trial — no credit card required.
          </p>

          {/* Toggle */}
          <div className="mx-auto mb-12 inline-flex items-center gap-3 rounded-xl border border-border bg-surface p-1.5">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                !annual ? "bg-primary text-white" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                annual ? "bg-primary text-white" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Annual
              <span className="ml-1.5 text-xs opacity-80">Save ~17%</span>
            </button>
          </div>

          {/* Plan Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-xl border p-6 text-left ${
                  plan.popular
                    ? "border-primary/40 bg-surface shadow-lg shadow-primary/10"
                    : "border-border bg-surface"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="primary">Most Popular</Badge>
                  </div>
                )}
                <h3 className="mb-1 text-lg font-semibold">{plan.name}</h3>
                <p className="mb-4 text-sm text-text-secondary">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-text-muted">
                    {annual ? plan.period.annual : plan.period.monthly}
                  </span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary-600"
                      : "border border-border text-text-primary hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </Link>
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
                  <th className="px-6 py-4 text-sm font-semibold text-text-primary">Feature</th>
                  <th className="px-6 py-4 text-sm font-semibold text-text-primary">Free</th>
                  <th className="px-6 py-4 text-sm font-semibold text-text-primary">Starter</th>
                  <th className="px-6 py-4 text-sm font-semibold text-primary">Growth</th>
                  <th className="px-6 py-4 text-sm font-semibold text-text-primary">Scale</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <td className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-text-primary">
                      {row.label}
                    </td>
                    <td className="px-6 py-4"><CellValue value={row.free} /></td>
                    <td className="px-6 py-4"><CellValue value={row.starter} /></td>
                    <td className="px-6 py-4"><CellValue value={row.growth} /></td>
                    <td className="px-6 py-4"><CellValue value={row.scale} /></td>
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
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* Enterprise */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Card variant="featured" className="text-center">
          <CardTitle className="text-2xl">Need a custom plan?</CardTitle>
          <CardDescription className="mx-auto mb-6 max-w-xl mt-2">
            We offer custom pricing for high-volume senders, enterprises, and
            agencies with specific requirements.
          </CardDescription>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600"
          >
            Contact Sales
            <ArrowRight className="size-4" />
          </Link>
        </Card>
      </section>
    </div>
  );
}
