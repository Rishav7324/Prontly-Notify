"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Copy, Check, FileText, Code, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { CodeBlock } from "@/components/ui/CodeBlock";

const sidebarLinks = [
  { label: "Getting Started", href: "#" },
  { label: "Installation", href: "#", children: [
    { label: "WordPress", href: "#" },
    { label: "Shopify", href: "#" },
    { label: "Webflow", href: "#" },
    { label: "Wix", href: "#" },
    { label: "Custom JS", href: "#" },
  ]},
  { label: "Campaigns", href: "#" },
  { label: "Automation", href: "#" },
  { label: "Segments", href: "#" },
  { label: "Analytics", href: "#" },
  { label: "AI Features", href: "#" },
  { label: "REST API", href: "#" },
  { label: "FAQs", href: "#" },
];

const platforms = [
  { name: "WordPress", icon: "W", docs: "Plugin installation guide for WordPress sites. Install & configure in under 2 minutes." },
  { name: "Shopify", icon: "S", docs: "Add push notifications to your Shopify store via the theme editor or our dedicated app." },
  { name: "Webflow", icon: "Wf", docs: "Embed notifications in your Webflow site using the Prontly snippet in custom code." },
  { name: "Wix", icon: "Wx", docs: "Connect Wix with Prontly Notify using the Wix Velo API or our embed snippet." },
  { name: "Custom HTML/JS", icon: "</>", docs: "Universal snippet for any website. Paste and start collecting subscribers immediately." },
  { name: "REST API", icon: "{}", docs: "Full REST API reference for programmatic notification sending and management." },
];

const codeSnippets: Record<string, string> = {
  html: `<!-- Prontly Notify -->
<script defer src="https://cdn.prontly.in/sdk/v1.js"
  data-site-id="YOUR_SITE_ID">
</script>`,
  wordpress: `// In your theme's functions.php
add_action('wp_head', function() {
  if (class_exists('Prontly_Notify')) return;
  ?>
  <script defer src="https://cdn.prontly.in/sdk/v1.js"
    data-site-id="YOUR_SITE_ID">
  </script>
  <?php
});`,
  react: `import { useEffect } from 'react';

export function ProntlyScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.prontly.in/sdk/v1.js';
    script.setAttribute('data-site-id', 'YOUR_SITE_ID');
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}`,
};

const tabData = [
  { id: "html", label: "HTML" },
  { id: "wordpress", label: "WordPress" },
  { id: "react", label: "React" },
];

const onThisPage = [
  { id: "choose-platform", label: "Choose your platform" },
  { id: "quick-start", label: "Quick start snippet" },
  { id: "installation-guide", label: "Installation guides" },
  { id: "next-steps", label: "Next steps" },
];

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("html");

  return (
    <div className="mx-auto flex max-w-[1200px] px-4 py-12">
      <aside className="mr-10 hidden w-56 shrink-0 lg:block">
        <nav>
          <ul className="space-y-1">
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-[#F8FAFC] ${
                    link.children ? "font-medium text-[#94A3B8]" : "text-[#64748B]"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <ul className="ml-3 mt-1 space-y-1 border-l border-[rgba(255,255,255,0.08)]">
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-3 py-1.5 pl-4 text-sm text-[#64748B] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-10">
          <Badge variant="info" className="mb-4">Documentation</Badge>
          <h1 className="font-display mb-3 text-[32px] font-bold text-[#F8FAFC]">
            How can we help you?
          </h1>
          <p className="mb-6 text-[#94A3B8]">
            Search our documentation, browse platform guides, or dive into the REST API reference.
          </p>
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] py-3 pl-10 pr-4 text-sm text-[#F8FAFC] placeholder:text-[#64748B] outline-none focus:border-[#3B82F6]/50 focus:ring-1 focus:ring-[#3B82F6]/30"
            />
          </div>
        </div>

        <h2 id="choose-platform" className="font-display mb-6 text-2xl font-bold text-[#F8FAFC]">
          Choose your platform
        </h2>
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <Link
              key={p.name}
              href="#"
              className="group rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-sm font-bold text-[#3B82F6]">
                {p.icon}
              </div>
              <h3 className="mb-1 font-semibold text-[#F8FAFC] transition-colors group-hover:text-[#3B82F6]">
                {p.name}
              </h3>
              <p className="text-sm text-[#94A3B8]">{p.docs}</p>
            </Link>
          ))}
        </div>

        <h2 id="quick-start" className="font-display mb-6 text-2xl font-bold text-[#F8FAFC]">
          Quick start snippet
        </h2>
        <div className="mb-16">
          <Tabs tabs={tabData} activeTab={activeTab} onChange={setActiveTab} />
          <div className="rounded-b-xl border border-t-0 border-[rgba(255,255,255,0.08)] bg-[#111827] p-6">
            <p className="mb-4 text-sm text-[#94A3B8]">
              Paste this snippet just before the closing <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-[#3B82F6]">&lt;/body&gt;</code> tag.
            </p>
            <CodeBlock code={codeSnippets[activeTab]} language={activeTab === "html" ? "HTML" : activeTab === "wordpress" ? "PHP" : "JSX"} />
          </div>
        </div>

        <h2 id="installation-guide" className="font-display mb-6 text-2xl font-bold text-[#F8FAFC]">
          Installation guides
        </h2>
        <div className="mb-16 grid gap-4 sm:grid-cols-3">
          {[
            { icon: FileText, title: "Sending a campaign", desc: "Compose and send your first push notification campaign." },
            { icon: Code, title: "API Reference", desc: "Full documentation for the Prontly Notify REST API." },
            { icon: BookOpen, title: "Best practices", desc: "Tips for maximizing opt-in rates and CTR." },
          ].map((item) => (
            <Link key={item.title} href="#" className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-5 transition-colors hover:bg-white/5">
              <item.icon className="mb-3 size-5 text-[#3B82F6]" />
              <h3 className="mb-1 text-sm font-semibold text-[#F8FAFC]">{item.title}</h3>
              <p className="text-xs text-[#94A3B8]">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <aside className="ml-10 hidden w-48 shrink-0 lg:block">
        <nav className="sticky top-24">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            On this page
          </h4>
          <ul className="space-y-2 border-l border-[rgba(255,255,255,0.08)]">
            {onThisPage.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block border-l-2 border-transparent py-1 pl-4 text-sm text-[#64748B] transition-colors hover:text-[#94A3B8] hover:border-[#3B82F6]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
