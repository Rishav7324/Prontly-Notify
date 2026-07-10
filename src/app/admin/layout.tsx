"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Globe,
  DollarSign,
  FileText,
  Cpu,
  TicketCheck,
  ScrollText,
  Shield,
  Menu,
  X,
  ChevronDown,
  Bell,
  LogOut,
  Settings,
} from "lucide-react";
import { ToastProvider } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";

const sidebarItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/accounts", label: "Accounts", icon: Users },
  { href: "/admin/sites", label: "Sites", icon: Globe },
  { href: "/admin/billing", label: "Revenue", icon: DollarSign },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/system", label: "System", icon: Cpu },
  { href: "/admin/coupons", label: "Coupons", icon: TicketCheck },
  { href: "/admin/audit-and-flags", label: "Audit & Flags", icon: ScrollText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed bottom-0 left-0 top-0 z-50 flex w-[260px] flex-col border-r border-border bg-surface transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              P
            </div>
            <span className="font-display text-lg font-bold text-primary">
              Prontly
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-text-muted hover:text-text-secondary lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="border-b border-border px-4 py-3">
          <Badge variant="primary" size="sm">
            <Shield className="size-3" />
            Admin Panel
          </Badge>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" &&
                  pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
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
                    <Icon className="size-4 shrink-0" />
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
              SA
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-text-primary">
                Super Admin
              </p>
              <p className="text-xs text-text-muted">admin@prontly.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur-xl lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-text-secondary hover:text-text-primary lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="size-5" />
            </button>
            <div className="hidden items-center gap-2 lg:flex">
              <Shield className="size-4 text-primary" />
              <span className="text-sm font-medium text-text-secondary">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
            >
              Exit Admin
            </Link>
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8"><ToastProvider>{children}</ToastProvider></main>
      </div>
    </div>
  );
}
