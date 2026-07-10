"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Product", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const { user, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50",
          "flex items-center justify-between gap-4",
          "h-[52px] w-[calc(100%-32px)] md:w-[calc(100%-128px)] max-w-[760px]",
          "rounded-full px-4 md:px-5",
          "border border-stone/60 shadow-subtle",
          "transition-all duration-300",
          scrolled
            ? "bg-eggshell/90 backdrop-blur-xl"
            : "bg-eggshell/70 backdrop-blur-lg"
        )}
      >
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Prontly Notify"
              className="h-6 w-6 rounded-md"
            />
            <span className="hidden sm:inline text-sm text-ink font-display font-semibold">
              Prontly Notify
            </span>
            <span className="sm:hidden text-sm text-ink font-display font-semibold">
              Prontly
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] text-smoke px-3 py-1.5 rounded-full transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? null : user ? (
            <Link
              href="/dashboard"
              className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold text-eggshell px-4 py-1.5 rounded-full bg-ink transition-all hover:bg-graphite"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden md:inline-flex text-[13px] text-smoke px-4 py-1.5 rounded-full border border-stone transition-colors hover:border-ink hover:text-ink"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-[13px] font-semibold text-eggshell px-4 py-1.5 rounded-full bg-ink transition-all hover:bg-graphite"
              >
                Start Free
              </Link>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 text-ink touch-target"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-eggshell/98 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-ink transition-colors hover:text-smoke"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-4">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-base font-semibold text-eggshell px-8 py-2.5 rounded-full bg-ink transition-all hover:bg-graphite"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-smoke px-8 py-2.5 rounded-full border border-stone transition-colors hover:border-ink hover:text-ink"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-semibold text-eggshell px-8 py-2.5 rounded-full bg-ink transition-all hover:bg-graphite"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
