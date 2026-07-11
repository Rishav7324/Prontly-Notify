"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Send,
  Workflow,
  Shuffle,
  BarChart3,
  Sparkles,
  Puzzle,
  UserCircle,
  KeyRound,
  CreditCard,
  Settings,
} from "lucide-react";
import type { Icon as LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Subscribers", href: "/dashboard/subscribers", icon: Users },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Send },
  { label: "Automation", href: "/dashboard/automation", icon: Workflow },
  { label: "Segments", href: "/dashboard/segments", icon: Shuffle },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "AI Tools", href: "/dashboard/ai", icon: Sparkles },
  { label: "Integration", href: "/dashboard/integration", icon: Puzzle },
  { label: "Team", href: "/dashboard/team", icon: UserCircle },
  { label: "API Keys", href: "/dashboard/api-keys", icon: KeyRound },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { workspace, profile } = useAuth();
  const planName = workspace?.plan_name || "Free Plan";
  const wsName = workspace?.name || "My Workspace";
  const initial = (profile?.name || wsName).charAt(0).toUpperCase();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[260px] flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <img src="/logo.svg" alt="Prontly Notify" className="h-8 w-8 rounded-lg" />
        <span className="font-display text-lg font-bold text-primary">
          Prontly
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary" />
                  )}
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-primary/5 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
            {initial}
          </div>
          <div className="min-w-0 flex-1 truncate">
            <p className="truncate text-sm font-medium text-text-primary">
              {wsName}
            </p>
            <p className="text-xs text-text-muted">{planName}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
