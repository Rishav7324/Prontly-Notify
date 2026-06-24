import type { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronRight, FileText, Code, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Documentation | Prontly Notify",
  description:
    "Learn how to integrate and use Prontly Notify with your website. Guides for WordPress, Shopify, Webflow, and custom integrations.",
};

const platforms = [
  {
    name: "WordPress",
    icon: "W",
    desc: "Plugin installation guide for WordPress sites.",
    href: "#",
    docs: "Install & configure the Prontly Notify WordPress plugin in under 2 minutes.",
  },
  {
    name: "Shopify",
    icon: "S",
    desc: "Add push notifications to your Shopify store.",
    href: "#",
    docs: "Integrate via the Shopify theme editor or our dedicated app.",
  },
  {
    name: "Webflow",
    icon: "Wf",
    desc: "Embed notifications in your Webflow site.",
    href: "#",
    docs: "Add the Prontly snippet to your Webflow custom code section.",
  },
  {
    name: "Wix",
    icon: "Wx",
    desc: "Connect Wix with Prontly Notify.",
    href: "#",
    docs: "Use the Wix Velo API or our embed snippet for Wix sites.",
  },
  {
    name: "Custom HTML/JS",
    icon: "</>",
    desc: "Universal snippet for any website.",
    href: "#",
    docs: "Paste our JavaScript snippet and start collecting subscribers immediately.",
  },
  {
    name: "REST API",
    icon: "{}",
    desc: "Developer API for custom integrations.",
    href: "#",
    docs: "Full REST API reference for programmatic notification sending.",
  },
];

const sidebarLinks = [
  { label: "Getting Started", href: "#" },
  { label: "Installation", href: "#" },
  { label: "WordPress", href: "#", sub: true },
  { label: "Shopify", href: "#", sub: true },
  { label: "Webflow", href: "#", sub: true },
  { label: "Wix", href: "#", sub: true },
  { label: "Custom JS", href: "#", sub: true },
  { label: "Campaigns", href: "#" },
  { label: "Automation", href: "#" },
  { label: "Segments", href: "#" },
  { label: "Analytics", href: "#" },
  { label: "AI Features", href: "#" },
  { label: "REST API", href: "#" },
  { label: "FAQs", href: "#" },
];

export default function DocsPage() {
  return (
    <div className="mx-auto flex max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Sidebar - Desktop */}
      <aside className="mr-10 hidden w-56 shrink-0 lg:block">
        <nav>
          <ul className="space-y-1">
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-text-primary ${
                    link.sub
                      ? "pl-8 text-text-muted"
                      : "font-medium text-text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="mb-10">
          <Badge variant="info" className="mb-4">Documentation</Badge>
          <h1 className="font-display mb-3 text-4xl font-bold">
            How can we help you?
          </h1>
          <p className="mb-6 text-text-secondary">
            Search our documentation, browse platform guides, or dive into the
            REST API reference.
          </p>
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Platform Grid */}
        <h2 className="font-display mb-6 text-2xl font-bold">
          Choose your platform
        </h2>
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="group rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                {p.icon}
              </div>
              <h3 className="mb-1 font-semibold group-hover:text-primary transition-colors">
                {p.name}
              </h3>
              <p className="text-sm text-text-secondary">{p.docs}</p>
            </Link>
          ))}
        </div>

        {/* Code Snippet */}
        <h2 className="font-display mb-6 text-2xl font-bold">
          Quick start snippet
        </h2>
        <div className="mb-16 rounded-xl border border-border bg-surface p-6">
          <p className="mb-4 text-sm text-text-secondary">
            Paste this snippet just before the closing <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-primary">&lt;/body&gt;</code> tag on any page.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-background p-4 text-sm text-text-secondary">
            <code>{`<!-- Prontly Notify -->
<script defer src="https://cdn.prontly.in/sdk/v1.js"
  data-site-id="YOUR_SITE_ID">
</script>`}</code>
          </pre>
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: FileText, title: "Sending a campaign", desc: "Learn how to compose and send your first push notification campaign." },
            { icon: Code, title: "API Reference", desc: "Full documentation for the Prontly Notify REST API." },
            { icon: BookOpen, title: "Best practices", desc: "Tips for maximizing opt-in rates and CTR." },
          ].map((item) => (
            <Link key={item.title} href="#" className="rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-white/5">
              <item.icon className="mb-3 size-5 text-primary" />
              <h3 className="mb-1 text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-text-secondary">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
