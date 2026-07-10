"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, LogOut, Settings, CreditCard } from "lucide-react";

const websites = [
  { id: "1", name: "My Blog", domain: "myblog.com" },
  { id: "2", name: "Shopify Store", domain: "shop.mystore.com" },
  { id: "3", name: "SaaS App", domain: "app.mysaas.com" },
];

export function TopBar() {
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(websites[0]);

  const websiteRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        websiteRef.current &&
        !websiteRef.current.contains(e.target as Node)
      ) {
        setWebsiteOpen(false);
      }
      if (
        avatarRef.current &&
        !avatarRef.current.contains(e.target as Node)
      ) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur-xl lg:px-6">
      {/* Left spacer for desktop sidebar */}
      <div className="lg:w-[260px]" />

      {/* Website Switcher */}
      <div className="relative" ref={websiteRef}>
        <button
          onClick={() => setWebsiteOpen(!websiteOpen)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-black/5"
        >
          <span className="hidden sm:inline">{selectedSite.name}</span>
          <span className="text-text-muted sm:hidden">
            {selectedSite.domain}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-text-muted transition-transform",
              websiteOpen && "rotate-180"
            )}
          />
        </button>

        {websiteOpen && (
          <div className="absolute left-0 top-full mt-2 w-56 animate-fade-in rounded-lg border border-border bg-surface p-1.5 shadow-lg">
            {websites.map((site) => (
              <button
                key={site.id}
                onClick={() => {
                  setSelectedSite(site);
                  setWebsiteOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                  selectedSite.id === site.id
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
                )}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  {site.name.charAt(0)}
                </div>
                <div className="flex-1 truncate">
                  <p className="font-medium">{site.name}</p>
                  <p className="text-xs text-text-muted">{site.domain}</p>
                </div>
              </button>
            ))}
            <div className="mt-1 border-t border-border pt-1">
              <Link
                href="/dashboard/sites"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
                onClick={() => setWebsiteOpen(false)}
              >
                Manage Websites
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
        </button>

        {/* Avatar menu */}
        <div className="relative" ref={avatarRef}>
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-black/5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
              JD
            </div>
            <ChevronDown
              className={cn(
                "hidden h-4 w-4 text-text-muted transition-transform sm:block",
                avatarOpen && "rotate-180"
              )}
            />
          </button>

          {avatarOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 animate-fade-in rounded-lg border border-border bg-surface p-1.5 shadow-lg">
              <div className="border-b border-border px-3 py-2">
                <p className="text-sm font-medium text-text-primary">
                  John Doe
                </p>
                <p className="text-xs text-text-muted">john@example.com</p>
              </div>
              <Link
                href="/dashboard/settings"
                onClick={() => setAvatarOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                href="/dashboard/billing"
                onClick={() => setAvatarOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary"
              >
                <CreditCard className="h-4 w-4" />
                Billing
              </Link>
              <div className="mt-1 border-t border-border pt-1">
                <button
                  onClick={() => setAvatarOpen(false)}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-black/5 hover:text-error"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
