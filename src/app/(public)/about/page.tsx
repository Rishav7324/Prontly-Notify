import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Prontly Notify",
  description:
    "Learn about Prontly Notify — the edge-first, AI-native browser push notification platform built for publishers, SaaS, and e-commerce.",
};

const stats = [
  { value: "2,000+", label: "Websites onboarded" },
  { value: "50M+", label: "Notifications delivered" },
  { value: "4.8/5", label: "Average rating" },
  { value: "99.9%", label: "Uptime SLA" },
];

const values = [
  {
    title: "Edge-First Infrastructure",
    desc: "Built on Cloudflare D1 and R2, our stack keeps delivery latency low and infrastructure costs lower — which means we can offer a genuinely useful free tier.",
  },
  {
    title: "AI-Native, Not AI-Wrapped",
    desc: "AI isn't a chatbot bolted on the side. It's embedded into campaign creation, timing optimization, segmentation, and analytics from day one.",
  },
  {
    title: "India-Priced, Global-Grade",
    desc: "Headquartered in India with pricing in INR, we make enterprise-class push notification tooling accessible to the long tail of creators and small businesses.",
  },
  {
    title: "Developer-Friendly by Default",
    desc: "REST API, webhooks, platform-specific SDKs, and a universal JS snippet — because the best engagement tools are the ones engineers actually enjoy integrating.",
  },
];

const team = [
  { name: "Arjun Verma", role: "Founder & CEO", initials: "AV" },
  { name: "Priya Kapoor", role: "CTO", initials: "PK" },
  { name: "Rahul Nair", role: "Head of Product", initials: "RN" },
  { name: "Sneha Iyer", role: "Lead Engineer", initials: "SI" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="info" className="mb-4">About Us</Badge>
          <h1 className="font-display mb-6 text-4xl font-bold md:text-5xl">
            Building the re-engagement layer for the modern web
          </h1>
          <p className="text-lg text-text-secondary">
            Prontly Notify was founded to solve one problem: most website
            visitors never come back. We&apos;re fixing that with AI-powered
            browser push notifications that are fast, affordable, and
            dead-simple to integrate.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-surface p-6 text-center">
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="mb-4 text-text-secondary leading-relaxed">
              We believe every website owner — not just enterprises with
              six-figure marketing budgets — deserves access to the most
              effective re-engagement channel on the web.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Browser push is the only zero-install, permission-based channel
              that delivers messages directly to a returning visitor&apos;s
              device. We&apos;re on a mission to make it as easy as pasting a
              script tag.
            </p>
          </div>
          <div>
            <h2 className="font-display mb-6 text-3xl font-bold">Our Values</h2>
            <ul className="space-y-4">
              {values.map((v) => (
                <li key={v.title} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">{v.title}</p>
                    <p className="text-sm text-text-secondary">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold">Meet the Team</h2>
            <p className="text-text-secondary">
              A small team with a big mission — building the future of
              re-engagement.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="rounded-xl border border-border bg-surface p-6 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
                  {m.initials}
                </div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-text-muted">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-surface p-12 text-center md:p-20">
          <h2 className="font-display mb-4 text-3xl font-bold">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            Join 2,000+ websites using Prontly Notify. Free plan available.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-primary-600"
          >
            Start Free &mdash; No Card Required
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
