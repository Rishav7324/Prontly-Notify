import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ | Prontly Notify",
  description:
    "Frequently asked questions about Prontly Notify, browser push notifications, pricing, integration, and more.",
};

const categories = [
  {
    title: "General",
    items: [
      {
        title: "What is Prontly Notify?",
        content:
          "Prontly Notify is a browser push notification platform that lets website owners collect subscribers and send targeted notifications — all without requiring an app or email address. It's built for bloggers, SaaS founders, e-commerce stores, and content creators.",
      },
      {
        title: "How does browser push work?",
        content:
          "When a visitor lands on your site, their browser shows a permission prompt. If they click 'Allow', their browser generates a unique subscription token. You can then send notifications to that browser via Firebase Cloud Messaging, even when the visitor isn't on your site.",
      },
      {
        title: "Which browsers are supported?",
        content:
          "Prontly Notify works on Chrome (desktop and Android), Firefox, Edge, and other Chromium-based browsers. Safari support via web push is available on macOS Ventura+ and iOS 16.4+.",
      },
      {
        title: "Do visitors need to install an app?",
        content:
          "No — that's the beauty of browser push. There's no app to download. Visitors simply click 'Allow' on a browser prompt and they're subscribed instantly.",
      },
    ],
  },
  {
    title: "Pricing & Plans",
    items: [
      {
        title: "Is there a free plan?",
        content:
          "Yes! Our Free plan supports up to 2,000 subscribers and 1 website at no cost. You get 10 AI credits per month and basic analytics. No credit card required.",
      },
      {
        title: "Can I upgrade or downgrade anytime?",
        content:
          "Absolutely. You can change your plan at any time from the Billing settings. Upgrades take effect immediately. Downgrades apply at the start of your next billing cycle.",
      },
      {
        title: "What payment methods do you accept?",
        content:
          "We accept all major credit/debit cards, UPI, net banking, and Razorpay-powered payment methods. All prices are in INR and include applicable taxes.",
      },
    ],
  },
  {
    title: "Integration & Setup",
    items: [
      {
        title: "How do I add Prontly Notify to my website?",
        content:
          "You can add Prontly Notify via our WordPress plugin, Shopify integration, Webflow embed, or by pasting a simple JavaScript snippet into your site's HTML. Detailed guides are available in our Docs section.",
      },
      {
        title: "Do I need a developer to set it up?",
        content:
          "Not at all. If you're using WordPress, Shopify, or Webflow, you can set it up in under 5 minutes without writing any code. For custom sites, you just need to paste one script tag.",
      },
      {
        title: "Can I use Prontly Notify with multiple websites?",
        content:
          "Yes — all paid plans support multiple websites under one account. You can manage all your sites from a single dashboard.",
      },
    ],
  },
  {
    title: "Technical",
    items: [
      {
        title: "Is my data secure?",
        content:
          "Yes. All data is encrypted in transit (TLS 1.2+) and at rest. We use Firebase Authentication for secure login, and subscriber tokens are stored in Cloudflare D1 with encryption. We never share or sell your subscriber data.",
      },
      {
        title: "Do you offer an API?",
        content:
          "Yes — our REST API allows you to manage subscribers, send notifications, and pull analytics programmatically. API access is available on the Scale plan.",
      },
    ],
  },
];

const categories2 = [
  {
    title: "Account & Billing",
    items: [
      {
        title: "How do I cancel my subscription?",
        content:
          "You can cancel anytime from Billing settings in your dashboard. Your plan stays active until the end of the current billing period. After that, your account will revert to the Free plan.",
      },
      {
        title: "What happens if I exceed my subscriber limit?",
        content:
          "We'll notify you by email and in-app. New subscriber collection will be paused until you upgrade, but you can continue sending to existing subscribers.",
      },
    ],
  },
];

export default function FAQPage() {
  const allItems = [...categories.flatMap((c) => c.items), ...categories2.flatMap((c) => c.items)];
  const allCategories = [...categories, ...categories2];

  return (
    <div>
      {/* Header */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="info" className="mb-4">FAQ</Badge>
          <h1 className="font-display mb-4 text-4xl font-bold md:text-5xl">
            Frequently asked questions
          </h1>
          <p className="text-lg text-text-secondary">
            Everything you need to know about Prontly Notify. Can&apos;t find
            what you&apos;re looking for?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Categories */}
      {allCategories.map((cat) => (
        <section key={cat.title} className="border-t border-border py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display mb-6 text-2xl font-bold">{cat.title}</h2>
            <Accordion items={cat.items} />
          </div>
        </section>
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              ...categories,
              ...categories2,
            ].flatMap(cat => cat.items.map(item => ({
              "@type": "Question",
              name: item.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.content,
              },
            }))),
          }),
        }}
      />

      {/* Still have questions */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display mb-4 text-2xl font-bold">
            Still have questions?
          </h2>
          <p className="mb-8 text-text-secondary">
            We&apos;re here to help. Reach out to our team and we&apos;ll get
            back to you within 4 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600"
          >
            Contact Support
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
