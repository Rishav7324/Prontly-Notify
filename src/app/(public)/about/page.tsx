"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const stats = [
  { value: "2,400+", label: "Sites Onboarded", target: 2400 },
  { value: "18M+", label: "Notifications Sent", target: 18000000 },
  { value: "4.8/5", label: "Average Rating", target: 48 },
  { value: "99.9%", label: "Uptime SLA", target: 999 },
];

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

const team = [
  { name: "Arjun Verma", role: "Founder & CEO", initials: "AV" },
  { name: "Priya Kapoor", role: "CTO", initials: "PK" },
  { name: "Rahul Nair", role: "Head of Product", initials: "RN" },
  { name: "Sneha Iyer", role: "Lead Engineer", initials: "SI" },
];

const timeline = [
  { year: "2024", title: "The Idea", desc: "Founders identified the gap in affordable, AI-driven push notification tools for Indian businesses." },
  { year: "Q1 2025", title: "MVP Launch", desc: "First version launched with basic campaign management and 100 beta users." },
  { year: "Q3 2025", title: "AI Engine", desc: "Launched AI-powered copy generation and smart send-time optimization." },
  { year: "Q1 2026", title: "Scale Milestone", desc: "Crossed 2,000+ sites, 18M notifications, and launched behavioral automation." },
];

export default function AboutPage() {
  const [counting, setCounting] = useState<Record<string, number>>({});
  const statsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = stats.map((s) => s.label);
            targets.forEach((label) => {
              const stat = stats.find((s) => s.label === label);
              if (!stat) return;
              const duration = 2000;
              const start = performance.now();
              const animate = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * stat.target);
                setCounting((prev) => ({ ...prev, [label]: current }));
                if (progress < 1) requestAnimationFrame(animate);
              };
              requestAnimationFrame(animate);
            });
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observerRef.current.observe(statsRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  const formatStat = (label: string): string => {
    const val = counting[label] ?? 0;
    if (label.includes("Rating")) return (val / 10).toFixed(1);
    if (label.includes("SLA")) return (val / 10).toFixed(1) + "%";
    if (label.includes("Notifications")) {
      if (val >= 1000000) return (val / 1000000).toFixed(0) + "M+";
      if (val >= 1000) return (val / 1000).toFixed(0) + "K+";
    }
    if (label.includes("Sites")) return val.toLocaleString() + "+";
    return val.toLocaleString();
  };

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

      <section ref={statsRef} className="border-t border-[rgba(255,255,255,0.08)] py-24">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-8 text-center">
                <p className="font-display text-4xl font-bold text-[#3B82F6] tabular-nums">
                  {counting[s.label] !== undefined ? formatStat(s.label) : "0"}
                </p>
                <p className="mt-2 text-sm text-[#64748B]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
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
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-[#F8FAFC]">Our Journey</h2>
          <p className="mt-2 text-[#94A3B8]">From idea to impact — the Prontly story.</p>
        </div>
        <div className="relative">
          <div className="absolute left-[19px] top-0 h-full w-px bg-[#3B82F6]/30 md:left-1/2 md:-translate-x-px" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div key={item.year} className={`relative flex items-start gap-6 md:w-1/2 ${i % 2 === 0 ? "md:ml-0 md:pr-12" : "md:ml-auto md:pl-12"}`}>
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-xs font-bold text-white">
                  {i + 1}
                </div>
                <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">{item.year}</span>
                  <h3 className="mt-1 text-lg font-semibold text-[#F8FAFC]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#94A3B8]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(255,255,255,0.08)] py-24">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-[#F8FAFC]">Meet the Team</h2>
            <p className="mt-2 text-[#94A3B8]">A small team with a big mission.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="group rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#3B82F6]/20 text-lg font-bold text-[#3B82F6]">
                  {m.initials}
                </div>
                <p className="font-semibold text-[#F8FAFC]">{m.name}</p>
                <p className="text-sm text-[#64748B]">{m.role}</p>
                <a
                  href="#"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#64748B] transition-colors hover:text-[#3B82F6]"
                >
                <MessageCircle className="size-3.5" />
                            LinkedIn
                </a>
              </div>
            ))}
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
