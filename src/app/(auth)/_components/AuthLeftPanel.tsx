"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { Bell, Check, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Prontly Notify helped us recover 34% of lost visitors within the first week. The AI-powered send optimization is a game-changer for our content team.",
    name: "Sarah Kapoor",
    role: "Head of Growth, TechBlog",
    initials: "SK",
  },
  {
    quote:
      "We saw a 3x increase in email engagement after switching to Prontly. The edge-first delivery is incredibly fast and reliable.",
    name: "Marcus Chen",
    role: "CTO, DevStream",
    initials: "MC",
  },
  {
    quote:
      "Setup took less than 5 minutes. Our subscribers love the instant notifications. Zero maintenance overhead for our team.",
    name: "Priya Sharma",
    role: "Founder, CodeDaily",
    initials: "PS",
  },
  {
    quote:
      "The AI-powered send time optimization doubled our open rates. Prontly is hands-down the best notification platform we've used.",
    name: "Alex Rivera",
    role: "VP Product, ScaleUp Inc.",
    initials: "AR",
  },
];

function RotatingTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRotation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startRotation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startRotation]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startRotation();
  };

  const t = testimonials[activeIndex];

  return (
    <div className="flex flex-col items-center">
      <blockquote className="border-l-2 border-primary/40 pl-4 mb-6 transition-opacity duration-500">
        <p className="text-sm text-text-secondary leading-relaxed italic">
          &ldquo;{t.quote}&rdquo;
        </p>
      </blockquote>

      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
          {t.initials}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-text-primary">{t.name}</p>
          <p className="text-xs text-text-muted">{t.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleDotClick(idx)}
            className={cn(
              "size-2 rounded-full transition-all duration-300",
              idx === activeIndex
                ? "bg-primary w-6"
                : "bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const features = [
  "Free forever — no hidden costs",
  "No credit card required",
  "Setup in under 5 minutes",
  "AI-powered smart campaigns",
];

function AnimatedCount({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function LoginLeftPanel() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
          <Bell className="size-5 text-primary" />
        </div>
        <span className="text-lg font-bold text-text-primary">
          Prontly Notify
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <RotatingTestimonials />
      </div>
    </div>
  );
}

function SignupLeftPanel() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="text-center mb-8">
        <p className="text-xl font-semibold text-text-primary leading-snug">
          Join{" "}
          <span className="text-primary">
            <AnimatedCount target={2400} suffix="+" />
          </span>{" "}
          websites already using Prontly Notify
        </p>
      </div>

      <div className="glass rounded-2xl p-8 w-full max-w-sm">
        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-success/20 shrink-0">
                <Check className="size-3 text-success" />
              </div>
              <span className="text-sm text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-text-muted">
        <Users className="size-4" />
        <span>
          <span className="text-text-primary font-medium">
            <AnimatedCount target={12400} suffix="" />
          </span>{" "}
          subscribers and counting
        </span>
      </div>
    </div>
  );
}

const stats = [
  { icon: Users, value: "12K+", label: "Active Users" },
  { icon: Bell, value: "50M+", label: "Notifications Sent" },
  { icon: Check, value: "99.9%", label: "Uptime SLA" },
];

function DefaultLeftPanel() {
  return (
    <div className="relative z-10 max-w-lg">
      <div className="glass rounded-2xl p-10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Bell className="size-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-text-primary">
            Prontly Notify
          </span>
        </div>

        <blockquote className="border-l-2 border-primary/40 pl-4 mb-6">
          <p className="text-sm text-text-secondary leading-relaxed italic">
            &ldquo;Prontly Notify helped us recover 34% of lost visitors within
            the first week. The AI-powered send optimization is a game-changer
            for our content team.&rdquo;
          </p>
        </blockquote>

        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            SK
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              Sarah Kapoor
            </p>
            <p className="text-xs text-text-muted">
              Head of Growth, TechBlog
            </p>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="size-4 text-primary" />
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Why Prontly?
          </span>
        </div>
        <ul className="space-y-3">
          {[
            "AI-powered optimal send time prediction",
            "Edge-first delivery via Cloudflare D1",
            "Zero third-party dependencies for subscribers",
            "Real-time analytics & audience segmentation",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-lg font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuthLeftPanel() {
  const pathname = usePathname();

  if (pathname === "/login") return <LoginLeftPanel />;
  if (pathname === "/signup") return <SignupLeftPanel />;
  return <DefaultLeftPanel />;
}
