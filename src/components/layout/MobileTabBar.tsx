"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Users,
  Send,
  BarChart3,
  MoreHorizontal,
  X,
  LayoutDashboard,
  Workflow,
  Shuffle,
  Sparkles,
  Puzzle,
  UserCircle,
  KeyRound,
  CreditCard,
  Settings,
} from "lucide-react";
import type { Icon as LucideIcon } from "lucide-react";

interface TabItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const visibleTabs: TabItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Subscribers", href: "/dashboard/subscribers", icon: Users },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Send },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "More", href: "#", icon: MoreHorizontal },
];

const drawerItems: TabItem[] = [
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

export function MobileTabBar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-surface px-2 pb-2 pt-1 [padding-bottom:env(safe-area-inset-bottom)] lg:hidden">
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const active =
            tab.href !== "#" ? isActive(tab.href) : drawerOpen;

          return (
            <button
              key={tab.label}
              onClick={() => {
                if (tab.href === "#") {
                  setDrawerOpen(true);
                } else {
                  setDrawerOpen(false);
                }
              }}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 transition-colors",
                tab.href !== "#" ? "min-w-0 flex-1" : "min-w-0 flex-1"
              )}
            >
              {tab.href !== "#" ? (
                <Link
                  href={tab.href}
                  className="flex flex-col items-center gap-0.5"
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      active ? "text-primary" : "text-text-muted"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      active ? "text-primary" : "text-text-muted"
                    )}
                  >
                    {tab.label}
                  </span>
                </Link>
              ) : (
                <>
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      active ? "text-primary" : "text-text-muted"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      active ? "text-primary" : "text-text-muted"
                    )}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 transform rounded-t-2xl border-t border-border bg-surface px-4 pb-8 pt-4 shadow-xl transition-transform duration-300 lg:hidden",
          drawerOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary">
            Navigation
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-black/5 hover:text-text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {drawerItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg py-3 text-center text-xs font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
