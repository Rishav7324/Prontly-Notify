"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const productLinks = [
  { label: "Features", href: "/features" },
  { label: "Integrations", href: "/integrations" },
  { label: "API", href: "/api" },
  { label: "Changelog", href: "/changelog" },
];

export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              P
            </div>
            <span className="font-display text-lg font-bold text-primary">
              Prontly
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {/* Product dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                Product
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    dropdownOpen && "rotate-180"
                  )}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-44 animate-fade-in rounded-lg border border-border bg-surface p-1.5 shadow-lg">
                  {productLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:inline-block"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-glow-primary"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-slide-down border-t border-border bg-surface md:hidden">
          <div className="space-y-1 px-4 py-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              Product
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  dropdownOpen && "rotate-180"
                )}
              />
            </button>
            {dropdownOpen && (
              <div className="ml-4 space-y-1">
                {productLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setMobileOpen(false);
                      setDropdownOpen(false);
                    }}
                    className="block rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              Blog
            </Link>
            <hr className="my-2 border-border" />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
