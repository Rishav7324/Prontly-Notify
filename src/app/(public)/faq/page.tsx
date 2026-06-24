"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

const categories = [
  {
    id: "billing",
    title: "Account & Billing",
    items: [
      { title: "Is there a free plan?", content: "Yes! Our Free plan supports up to 2,000 subscribers and 1 website at no cost. You get 10 AI credits per month and basic analytics. No credit card required." },
      { title: "How do I cancel my subscription?", content: "You can cancel anytime from Billing settings in your dashboard. Your plan stays active until the end of the current billing period. After that, your account will revert to the Free plan." },
      { title: "What payment methods do you accept?", content: "We accept all major credit/debit cards, UPI, net banking, and Razorpay-powered payment methods. All prices are in INR and include applicable taxes." },
      { title: "Can I upgrade or downgrade anytime?", content: "Absolutely. You can change your plan at any time from the Billing settings. Upgrades take effect immediately. Downgrades apply at the start of your next billing cycle." },
      { title: "What happens if I exceed my subscriber limit?", content: "We'll notify you by email and in-app. New subscriber collection will be paused until you upgrade, but you can continue sending to existing subscribers." },
    ],
  },
  {
    id: "general",
    title: "General",
    items: [
      { title: "What is Prontly Notify?", content: "Prontly Notify is a browser push notification platform that lets website owners collect subscribers and send targeted notifications — all without requiring an app or email address." },
      { title: "How does browser push work?", content: "When a visitor lands on your site, their browser shows a permission prompt. If they click 'Allow', their browser generates a unique subscription token. You can then send notifications via Firebase Cloud Messaging." },
      { title: "Which browsers are supported?", content: "Prontly Notify works on Chrome (desktop and Android), Firefox, Edge, and other Chromium-based browsers. Safari support is available on macOS Ventura+ and iOS 16.4+." },
    ],
  },
  {
    id: "integration",
    title: "Integration & Setup",
    items: [
      { title: "How do I add Prontly Notify to my website?", content: "You can add Prontly Notify via our WordPress plugin, Shopify integration, Webflow embed, or by pasting a simple JavaScript snippet into your site's HTML." },
      { title: "Do I need a developer to set it up?", content: "Not at all. If you're using WordPress, Shopify, or Webflow, you can set it up in under 5 minutes without writing any code." },
      { title: "Can I use Prontly Notify with multiple websites?", content: "Yes — all paid plans support multiple websites under one account. You can manage all your sites from a single dashboard." },
    ],
  },
  {
    id: "technical",
    title: "Technical",
    items: [
      { title: "Is my data secure?", content: "Yes. All data is encrypted in transit (TLS 1.2+) and at rest. We use Firebase Authentication for secure login, and subscriber tokens are stored in Cloudflare D1 with encryption." },
      { title: "Do you offer an API?", content: "Yes — our REST API allows you to manage subscribers, send notifications, and pull analytics programmatically. API access is available on the Scale plan." },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("billing");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.content.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const activeData = filteredCategories.find((c) => c.id === activeCategory) || filteredCategories[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: { "@type": "Answer", text: item.content },
      }))
    ),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="mx-auto max-w-[1200px] px-4 py-24 text-center">
        <Badge variant="info" className="mb-4">FAQ</Badge>
        <h1 className="font-display text-[36px] font-bold text-[#F8FAFC] md:text-[48px]">
          Frequently asked questions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#94A3B8]">
          Everything you need to know about Prontly Notify.
        </p>
        <div className="relative mx-auto mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] py-3 pl-10 pr-4 text-sm text-[#F8FAFC] placeholder:text-[#64748B] outline-none focus:border-[#3B82F6]/50 focus:ring-1 focus:ring-[#3B82F6]/30"
          />
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 pb-24">
        <div className="flex gap-8">
          <aside className="hidden w-56 shrink-0 lg:block">
            <nav className="sticky top-24 space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeCategory === cat.id
                      ? "bg-[#3B82F6]/10 text-[#3B82F6] font-medium"
                      : "text-[#94A3B8] hover:bg-white/5 hover:text-[#F8FAFC]"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className={cat.id === activeCategory || searchQuery ? "block" : "hidden lg:block"}>
                <h2 className="font-display mb-6 text-2xl font-bold text-[#F8FAFC]">{cat.title}</h2>
                <Accordion items={cat.items} type="multiple" />
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <p className="py-12 text-center text-[#94A3B8]">No questions found for your search.</p>
            )}
          </div>
        </div>
      </div>

      <section className="border-t border-[rgba(255,255,255,0.08)] py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">Still have questions?</h2>
          <p className="mt-4 text-[#94A3B8]">Our team typically responds within 4 hours.</p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="mt-8 rounded-full px-8">
              Contact Support
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
