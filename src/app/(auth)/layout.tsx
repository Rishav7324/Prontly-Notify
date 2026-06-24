import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Quote, Shield, Zap, BarChart3, Users } from "lucide-react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const stats = [
  { icon: Users, value: "12K+", label: "Active Users" },
  { icon: BarChart3, value: "50M+", label: "Notifications Sent" },
  { icon: Zap, value: "99.9%", label: "Uptime SLA" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/[0.03] p-12">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-lg">
          <div className="glass rounded-2xl p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Bell className="size-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-text-primary">Prontly Notify</span>
            </div>

            <blockquote className="border-l-2 border-primary/40 pl-4 mb-6">
              <p className="text-sm text-text-secondary leading-relaxed italic">
                &ldquo;Prontly Notify helped us recover 34% of lost visitors within the first week. The AI-powered send optimization is a game-changer for our content team.&rdquo;
              </p>
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                SK
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Sarah Kapoor</p>
                <p className="text-xs text-text-muted">Head of Growth, TechBlog</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="size-4 text-primary" />
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Why Prontly?</span>
            </div>
            <ul className="space-y-3">
              {[
                "AI-powered optimal send time prediction",
                "Edge-first delivery via Cloudflare D1",
                "Zero third-party dependencies for subscribers",
                "Real-time analytics & audience segmentation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
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
      </div>

      <div className="flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold text-text-primary">
              <Bell className="size-5 text-primary" />
              Prontly Notify
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
