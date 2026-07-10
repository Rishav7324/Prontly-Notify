"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/prontly",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://twitter.com/prontly",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/prontly",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  { label: "Email", href: "mailto:hello@prontly.com", icon: <Mail className="w-4 h-4" /> },
];

const productLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "/integrations" },
  { label: "API", href: "/api" },
  { label: "Changelog", href: "/changelog" },
  { label: "Status", href: "/status" },
];

const resourceLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "SDK", href: "/sdk" },
  { label: "Webhooks", href: "/webhooks" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Security", href: "/security" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export function Footer() {
  return (
    <footer className="bg-warm-taupe border-t border-stone">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-ink text-sm font-bold text-eggshell">
                P
              </div>
              <span className="text-lg font-bold text-ink font-display">
                Prontly
              </span>
            </div>
            <p className="text-sm text-smoke mb-6 max-w-xs">
              AI-powered browser push notifications for publishers, SaaS, and e-commerce platforms.
            </p>
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-stone text-smoke transition-colors hover:bg-ink hover:text-eggshell"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10 px-3 text-sm rounded-lg bg-eggshell border border-stone text-ink placeholder-ash focus:outline-none focus:border-ink"
              />
              <button
                type="submit"
                className="h-10 px-4 text-sm font-semibold text-eggshell rounded-lg bg-ink transition-all hover:bg-graphite shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-smoke transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-smoke transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-smoke transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-stone" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-smoke text-center md:text-left">
            &copy; 2026 Prontly Notify. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-sm text-smoke">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <span className="text-stone">&middot;</span>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <span className="text-stone">&middot;</span>
            <Link href="/cookies" className="transition-colors hover:text-ink">
              Cookies
            </Link>
          </div>
          <div className="flex items-center gap-3 text-xs text-smoke">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              GDPR
            </span>
            <span className="text-stone">&middot;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              DPDPA 2023
            </span>
            <span className="text-stone">&middot;</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              SSL Secured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
