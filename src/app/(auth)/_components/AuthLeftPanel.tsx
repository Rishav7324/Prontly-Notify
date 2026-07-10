"use client";

import { usePathname } from "next/navigation";
import { Bell, Check } from "lucide-react";

const features = [
  "Free forever — no hidden costs",
  "No credit card required",
  "Setup in under 5 minutes",
  "AI-powered smart campaigns",
];

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
        <div className="flex flex-col items-center">
          <blockquote className="border-l-2 border-primary/40 pl-4 mb-6">
            <p className="text-sm text-text-secondary leading-relaxed italic">
              &ldquo;Browser push notifications create a direct, permission-based channel between you and your audience.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

function SignupLeftPanel() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="text-center mb-8">
        <p className="text-xl font-semibold text-text-primary leading-snug">
          Start sending push notifications in minutes
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
    </div>
  );
}

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
            &ldquo;Browser push notifications create a direct, permission-based channel between you and your audience.&rdquo;
          </p>
        </blockquote>
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
    </div>
  );
}

export function AuthLeftPanel() {
  const pathname = usePathname();

  if (pathname === "/login") return <LoginLeftPanel />;
  if (pathname === "/signup") return <SignupLeftPanel />;
  return <DefaultLeftPanel />;
}
