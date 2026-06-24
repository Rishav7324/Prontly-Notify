import Link from "next/link";
import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import {
  Bell,
  BarChart3,
  RefreshCw,
  Cpu,
  Users,
  Globe,
  Check,
  ArrowRight,
  Star,
  ChevronRight,
  Play,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Prontly Notify | Browser Push Notification Platform",
  description:
    "AI-assisted browser push notifications for publishers, SaaS, and e-commerce. Bring visitors back with browser push.",
};

const features = [
  {
    icon: Bell,
    title: "Smart Campaigns",
    desc: "Create, schedule, and A/B test push notifications with AI-optimized titles and send times.",
  },
  {
    icon: RefreshCw,
    title: "Behavioral Automation",
    desc: "Trigger automated drips based on subscriber activity, inactivity, or custom events.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Copy",
    desc: "Generate high-CTR notification titles and previews in one click with our AI engine.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Track delivery, clicks, and conversions with live dashboards and weekly AI summaries.",
  },
  {
    icon: Users,
    title: "Smart Segmentation",
    desc: "Target subscribers by browser, location, activity, or custom attributes — no SQL needed.",
  },
  {
    icon: Globe,
    title: "Multi-site Management",
    desc: "Manage multiple websites under one account with per-site dashboards and billing.",
  },
];

const steps = [
  {
    num: "01",
    title: "Add Your Site",
    desc: "Paste a snippet or install our plugin. It takes under 5 minutes.",
  },
  {
    num: "02",
    title: "Collect Subscribers",
    desc: "Visitors opt in with one click — no app store, no email required.",
  },
  {
    num: "03",
    title: "Send & Grow",
    desc: "Launch AI-assisted campaigns and watch engagement climb.",
  },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/mo",
    desc: "Perfect for trying out push notifications.",
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
    price: "₹999",
    period: "/mo",
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
    price: "₹2,999",
    period: "/mo",
    desc: "For serious publishers and SaaS teams.",
    features: [
      "Up to 50,000 subscribers",
      "10 websites",
      "500 AI credits / mo",
      "Full analytics suite",
      "Priority support",
      "Team members",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=growth",
    popular: true,
  },
];

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Founder, TechBlog.in",
    content:
      "Prontly Notify doubled our return visitor rate in the first month. The AI title suggestions alone are worth the price.",
  },
  {
    name: "Ananya Sharma",
    role: "Growth Lead, SaaSBox",
    content:
      "We moved from OneSignal and cut our costs by 60%. The automation workflows are genuinely intuitive.",
  },
  {
    name: "Vikram Patel",
    role: "Owner, ShopWave Store",
    content:
      "Cart abandonment recovery via push notifications has recovered 15% of lost sales. Game changer for e-commerce.",
  },
];

const faqItems = [
  {
    title: "What are browser push notifications?",
    content:
      "Browser push notifications are clickable messages sent directly to a user's device from their web browser, even when they're not on your website. They work on Chrome, Firefox, and Edge — no app download required.",
  },
  {
    title: "How does the opt-in process work?",
    content:
      "When a visitor lands on your site, they see a browser-native permission prompt asking if they'd like to receive notifications. Once they click 'Allow', they're subscribed and you can start sending targeted campaigns.",
  },
  {
    title: "Is there a free plan available?",
    content:
      "Yes — our Free plan supports up to 2,000 subscribers and 1 website at no cost. You get 10 AI credits per month and basic analytics. No credit card required.",
  },
  {
    title: "Which platforms can I use it with?",
    content:
      "Prontly Notify works with any website. We offer plugins for WordPress, Shopify, and Webflow, plus a universal JavaScript snippet for custom sites and a REST API for developers.",
  },
  {
    title: "How do you compare to OneSignal?",
    content:
      "Prontly Notify offers AI-powered campaign tools at a fraction of the cost, with competitive free-tier limits, Indian pricing (INR), and dedicated support. Our edge infrastructure keeps delivery fast and costs low.",
  },
];

const integrations = [
  { name: "WordPress", href: "/docs" },
  { name: "Shopify", href: "/docs" },
  { name: "Webflow", href: "/docs" },
  { name: "Custom JS", href: "/docs" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-glass p-8 backdrop-blur-xl md:p-16">
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <Badge variant="info" className="mb-6">
              <Sparkles className="mr-1 size-3.5" />
              AI-Powered Re-engagement
            </Badge>
            <h1 className="font-display mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Bring visitors back with{" "}
              <span className="text-primary">Browser Push</span>.
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-text-secondary md:text-xl">
              The edge-first, AI-native push notification platform built for
              bloggers, SaaS founders, and e-commerce stores. No app required
              — just instant, intelligent re-engagement.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600"
              >
                Start Free &mdash; No Card Required
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-white/5"
              >
                View Pricing
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-surface py-8 text-center">
          <p className="text-sm font-medium text-text-muted">
            Trusted by <span className="text-text-primary">2,000+ websites</span>{" "}
            across India, US, UK, and beyond
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display mb-4 text-3xl font-bold md:text-4xl">
            How it works
          </h2>
          <p className="text-text-secondary">
            Get started in three simple steps — no developer required.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="relative rounded-xl border border-border bg-surface p-6">
              <span className="mb-4 inline-block text-4xl font-bold text-primary/30">
                {step.num}
              </span>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold md:text-4xl">
              Everything you need to re-engage
            </h2>
            <p className="text-text-secondary">
              A complete push notification platform powered by AI and edge
              infrastructure.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-text-secondary">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Widget */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-glass p-8 backdrop-blur-xl md:p-12">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex-1">
              <Badge variant="primary" className="mb-4">
                <Play className="mr-1 size-3.5" />
                Live Demo
              </Badge>
              <h2 className="font-display mb-4 text-2xl font-bold md:text-3xl">
                See a notification in action
              </h2>
              <p className="mb-6 text-text-secondary">
                This is exactly what your visitors will see when they opt in.
                Click the button to trigger a demo notification.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600"
              >
                <Play className="size-4" />
                Trigger Demo Notification
              </button>
            </div>
            <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-4 shadow-lg">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                  P
                </div>
                <div>
                  <p className="text-sm font-medium">Prontly Notify</p>
                  <p className="text-xs text-text-muted">just now</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                You have 147 new subscribers this week! Check your campaign
                performance in the dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold md:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="text-text-secondary">
              Start free. Upgrade when you grow. No hidden fees.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border p-6 ${
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
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-text-muted">{plan.period}</span>
                </div>
                <ul className="mb-8 space-y-3">
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
          <p className="mt-8 text-center text-sm text-text-muted">
            Need higher limits?{" "}
            <Link href="/pricing" className="text-primary hover:underline">
              View all plans &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold md:text-4xl">
              Loved by publishers and founders
            </h2>
            <p className="text-text-secondary">
              See why thousands choose Prontly Notify.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="mb-4 flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mb-6 text-sm text-text-secondary">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold md:text-4xl">
              Works with your stack
            </h2>
            <p className="text-text-secondary">
              Plug and play with your favourite platforms.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-xl border border-border bg-surface px-8 py-4 text-sm font-medium text-text-primary transition-colors hover:bg-white/5"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="text-text-secondary">
              Everything you need to know about Prontly Notify.
            </p>
          </div>
          <Accordion items={faqItems} />
          <p className="mt-6 text-center text-sm text-text-muted">
            Still have questions?{" "}
            <Link href="/faq" className="text-primary hover:underline">
              Visit our full FAQ &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-surface p-12 text-center shadow-lg md:p-20">
          <h2 className="font-display mb-4 text-3xl font-bold md:text-4xl">
            Ready to bring visitors back?
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            Join 2,000+ websites already using Prontly Notify. Free plan
            available — no credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-primary-600"
            >
              Start Free &mdash; No Card Required
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-medium text-text-primary transition-colors hover:bg-white/5"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
