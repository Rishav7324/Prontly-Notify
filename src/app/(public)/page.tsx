"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Check,
  ChevronRight,
  Code2,
  Globe,
  Layers,
  MousePointerClick,
  Play,
  RefreshCw,
  Rocket,
  Send,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { FeatureCard } from "@/components/domain/FeatureCard";
import { InlineCTACard } from "@/components/domain/InlineCTACard";
import { Button } from "@/components/ui/Button";

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
    icon: Bot,
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
    icon: MousePointerClick,
    title: "Add Your Site",
    desc: "Paste a snippet or install our plugin. It takes under 5 minutes.",
  },
  {
    num: "02",
    icon: Users,
    title: "Collect Subscribers",
    desc: "Visitors opt in with one click — no app store, no email required.",
  },
  {
    num: "03",
    icon: Send,
    title: "Send & Grow",
    desc: "Launch AI-assisted campaigns and watch engagement climb.",
  },
];

const aiFeatureList = [
  "AI-powered headline and body copy generation",
  "Smart send-time optimization per subscriber",
  "Automated A/B testing with statistical significance",
  "Predictive churn alerts and re-engagement suggestions",
  "Natural language campaign brief-to-ready-campaign",
];

export default function HomePage() {
  const router = useRouter();
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-reveal-id");
            if (id) {
              setRevealed((prev) => new Set(prev).add(id));
            }
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll("[data-reveal-id]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const revealProps = (id: string) => ({
    "data-reveal-id": id,
    className: `transition-all duration-700 ease-out ${
      revealed.has(id)
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-5"
    }`,
  });

  return (
    <div>
      <style>{`
        @keyframes notificationFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.01); }
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marqueeScroll 30s linear infinite;
          width: fit-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .notification-card {
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      {/* ────────────── HERO ────────────── */}
      <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1200px] flex-col items-center px-4 pb-16 pt-20 md:flex-row md:py-24">
        <div className="flex-1 text-center md:text-left">
          <div
            {...revealProps("hero-badge")}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: "rgba(59,130,246,0.12)",
              borderColor: "rgba(59,130,246,0.3)",
              color: "#93C5FD",
            }}
          >
            <Sparkles className="size-4" />
            Browser Push Notifications
          </div>

          <h1
            {...revealProps("hero-headline")}
            className="font-display text-[36px] font-bold leading-[1.1] tracking-tight text-text-primary md:text-[64px]"
          >
            Bring Visitors Back{" "}
            <span className="text-primary">— Without Email</span>
          </h1>

          <p
            {...revealProps("hero-sub")}
            className="mx-auto mt-6 max-w-[600px] text-xl leading-relaxed text-text-secondary md:mx-0"
          >
            The edge-first, AI-native push notification platform built for
            bloggers, SaaS founders, and e-commerce stores. No app required
            — just instant, intelligent re-engagement.
          </p>

          <div
            {...revealProps("hero-cta")}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link href="/signup">
              <Button
                variant="primary"
                size="lg"
                className="h-12 rounded-full px-8 text-base font-semibold"
              >
                Start Free — No Card Required
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/#demo">
              <Button
                variant="ghost"
                size="lg"
                className="h-12 rounded-full border px-8 text-base font-medium text-text-primary"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                <Play className="mr-2 size-4" />
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Product illustration placeholder */}
        <div
          {...revealProps("hero-mockup")}
          className="mt-12 w-full max-w-sm md:mt-0 md:ml-12"
        >
          <div className="flex h-[300px] items-center justify-center rounded-2xl border border-border bg-surface">
            <Bell className="size-16 text-primary/40" />
          </div>
        </div>

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ backgroundColor: "rgba(59,130,246,0.15)" }}
        />
      </section>

      {/* ────────────── TRUST BAR ────────────── */}
      <section
        className="overflow-hidden border-y py-6"
        style={{
          backgroundColor: "rgba(255,255,255,0.02)",
          borderColor: "rgba(255,255,255,0.05)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4">
          <p className="mb-4 text-center text-sm font-medium text-text-muted">
            Start sending push notifications in minutes
          </p>
          <div className="relative overflow-hidden">
            <div className="marquee-track flex items-center gap-16">
              {[
                Globe,
                ShoppingBag,
                Code2,
                Zap,
                Layers,
                Send,
                Globe,
                ShoppingBag,
                Code2,
                Zap,
                Layers,
                Send,
              ].map((Icon, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-2 text-text-muted"
                >
                  <Icon className="size-6" />
                  <span className="text-xs font-medium uppercase tracking-wider opacity-50">
                    Company
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── HOW IT WORKS ────────────── */}
      <section className="mx-auto max-w-[1200px] px-4 py-24 md:py-24">
        <div {...revealProps("hiw-header")}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            How It Works
          </p>
          <h2 className="font-display text-[36px] font-bold leading-tight text-text-primary md:text-[44px]">
            Get started in 3 minutes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            No developer required. No credit card needed.
          </p>
        </div>

        <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          {/* Dashed connector lines (desktop only) */}
          <div
            className="absolute left-[calc(16.666%+24px)] right-[calc(16.666%+24px)] top-16 hidden h-px md:block"
            style={{
              borderTop: "1px dashed rgba(59,130,246,0.25)",
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.num}
              {...revealProps(`hiw-${i}`)}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="flex size-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(59,130,246,0.12)" }}
              >
                <step.icon className="size-5 text-[#60A5FA]" />
              </div>
              <span
                className="mt-4 text-[80px] font-bold leading-none select-none"
                style={{ color: "#1E3A8A" }}
              >
                {step.num}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────── FEATURE GRID ────────────── */}
      <section
        className="mx-auto max-w-[1200px] px-4 py-24 md:py-24"
        id="features"
      >
        <div {...revealProps("features-header")}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Platform
          </p>
          <h2 className="font-display text-[36px] font-bold leading-tight text-text-primary md:text-[44px]">
            Everything you need to re-engage
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            A complete push notification platform powered by AI and edge
            infrastructure.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} {...revealProps(`feature-${i}`)}>
              <FeatureCard
                icon={<f.icon className="size-5" />}
                title={f.title}
                description={f.desc}
                className="rounded-2xl border-border/50 bg-surface-glass p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                onClick={() => router.push("/#features")}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ────────────── AI FEATURES ────────────── */}
      <section className="mx-auto max-w-[1200px] px-4 py-24 md:py-24">
        <div
          {...revealProps("ai-card")}
          className="rounded-2xl border p-8 md:p-12"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            borderColor: "rgba(59, 130, 246, 0.3)",
          }}
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: "rgba(59,130,246,0.12)",
              borderColor: "rgba(59,130,246,0.3)",
              color: "#93C5FD",
            }}
          >
            <Sparkles className="size-3.5" />
            Powered by AI
          </div>
          <h3 className="mt-6 font-display text-[28px] font-bold leading-tight text-text-primary md:text-[36px]">
            Let AI do the heavy lifting
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            From writing notification copy to scheduling perfect send times,
            our AI engine optimizes every campaign for maximum engagement.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {aiFeatureList.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                <Check className="mt-0.5 size-4 shrink-0 text-[#60A5FA]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────────── PRICING ────────────── */}
      <section className="mx-auto max-w-[1200px] px-4 py-24 md:py-24 text-center">
        <div {...revealProps("pricing-header")}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Pricing
          </p>
          <h2 className="font-display text-[36px] font-bold leading-tight text-text-primary md:text-[44px]">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Start free. Upgrade when you grow. No hidden fees.
          </p>
          <div className="mt-8">
            <Link href="/pricing">
              <Button variant="primary" size="lg">
                View Plans & Pricing
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────── FINAL CTA ────────────── */}
      <section className="mx-auto max-w-[1200px] px-4 py-24 md:py-24">
        <div
          {...revealProps("final-cta")}
          className="relative overflow-hidden rounded-2xl border p-12 text-center md:p-20"
          style={{
            backgroundColor: "rgba(59,130,246,0.06)",
            borderColor: "rgba(59,130,246,0.25)",
          }}
        >
          <div
            className="pointer-events-none absolute -inset-x-40 -top-40 -z-10 h-[300px] rounded-full opacity-20 blur-[120px]"
            style={{ backgroundColor: "rgba(59,130,246,0.15)" }}
          />
          <h2 className="font-display text-[32px] font-bold leading-tight text-text-primary md:text-[44px]">
            Ready to bring visitors back?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Start sending push notifications in minutes. Free plan
            available — no credit card required.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button
                variant="primary"
                size="lg"
                className="h-12 rounded-full px-8 text-base font-semibold"
              >
                Start Free
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="ghost"
                size="lg"
                className="h-12 rounded-full border px-8 text-base font-medium"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                Talk to Sales
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-text-muted">No credit card required</p>
        </div>
      </section>

      {/* Spacer for footer */}
      <div className="h-8" />
    </div>
  );
}
