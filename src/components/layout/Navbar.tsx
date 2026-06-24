"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Product", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
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
          "border shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)]",
          "transition-all duration-300",
          scrolled
            ? "bg-[rgba(10,14,26,0.92)] border-[rgba(255,255,255,0.14)]"
            : "bg-[rgba(17,24,39,0.72)] border-[rgba(255,255,255,0.10)]"
        )}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 rounded-[5px] bg-[#3B82F6]" />
          <Link href="/">
            <span className="hidden sm:inline text-sm text-[#F8FAFC] font-display font-semibold">
              Prontly Notify
            </span>
            <span className="sm:hidden text-sm text-[#F8FAFC] font-display font-semibold">
              Prontly
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] text-[rgba(248,250,252,0.65)] px-3 py-1.5 rounded-full transition-colors hover:bg-[rgba(255,255,255,0.08)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/login"
            className="hidden md:inline-flex text-[13px] text-[#F8FAFC] px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.14)] transition-colors hover:bg-[rgba(255,255,255,0.06)]"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-[13px] font-semibold text-white px-4 py-1.5 rounded-full bg-[#3B82F6] transition-all hover:bg-[#3B82F6]/90"
          >
            Start Free
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 text-[#F8FAFC]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[rgba(10,14,26,0.98)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-[#F8FAFC] transition-colors hover:text-[#3B82F6]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-base text-[rgba(248,250,252,0.65)] px-8 py-2.5 rounded-full border border-[rgba(255,255,255,0.14)] transition-colors hover:bg-[rgba(255,255,255,0.06)]"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-white px-8 py-2.5 rounded-full bg-[#3B82F6] transition-all hover:bg-[#3B82F6]/90"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
