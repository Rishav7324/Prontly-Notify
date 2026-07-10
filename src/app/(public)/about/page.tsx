"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const values = [
  {
    title: "Edge-First Infrastructure",
    desc: "Built on Cloudflare D1 and R2, our stack keeps delivery latency low and infrastructure costs lower.",
  },
  {
    title: "AI-Native, Not AI-Wrapped",
    desc: "AI is embedded into campaign creation, timing optimization, segmentation, and analytics from day one.",
  },
  {
    title: "India-Priced, Global-Grade",
    desc: "Headquartered in India with pricing in INR, we make enterprise-class push notification tooling accessible to all.",
  },
  {
    title: "Developer-Friendly by Default",
    desc: "REST API, webhooks, platform-specific SDKs, and a universal JS snippet for any integration.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1200px] px-4 py-24 text-center">
        <Badge variant="info" className="mb-4">About Us</Badge>
        <h1 className="font-display mx-auto max-w-3xl text-[40px] font-bold leading-[1.15] text-[#F8FAFC] md:text-[56px]">
          Building the re-engagement layer for the modern web
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#94A3B8]">
          Prontly Notify was founded to solve one problem: most website visitors never come back. We&apos;re fixing that with AI-powered browser push notifications that are fast, affordable, and dead-simple to integrate.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-24">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-[#F8FAFC]">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#94A3B8]">
              We believe every website owner — not just enterprises with six-figure marketing budgets — deserves access to the most effective re-engagement channel on the web.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#94A3B8]">
              Browser push is the only zero-install, permission-based channel that delivers messages directly to a returning visitor&apos;s device. We&apos;re on a mission to make it as easy as pasting a script tag.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-[#F8FAFC]">Our Values</h2>
            <div className="mt-6 space-y-6">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/20">
                    <Check className="size-3.5 text-[#60A5FA]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#F8FAFC]">{v.title}</p>
                    <p className="mt-1 text-sm text-[#94A3B8]">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-24">
        <div
          className="relative overflow-hidden rounded-2xl border p-12 text-center md:p-20"
          style={{
            borderColor: "rgba(59,130,246,0.25)",
            background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(30,58,138,0.12))",
          }}
        >
          <div className="pointer-events-none absolute -inset-x-40 -top-40 -z-10 h-[300px] rounded-full opacity-20 blur-[120px]" style={{ backgroundColor: "rgba(59,130,246,0.15)" }} />
          <h2 className="font-display text-[32px] font-bold text-[#F8FAFC] md:text-[44px]">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#94A3B8]">
            Join 2,400+ websites already using Prontly Notify. Free plan available.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button variant="primary" size="lg" className="rounded-full px-8">
                Start Free — No Card Required
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="rounded-full border border-[rgba(255,255,255,0.15)] px-8">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
