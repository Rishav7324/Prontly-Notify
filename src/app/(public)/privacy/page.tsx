"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Shield, ChevronRight } from "lucide-react";

const sections = [
  { id: "introduction", label: "1. Introduction" },
  { id: "information-we-collect", label: "2. Information We Collect" },
  { id: "how-we-use", label: "3. How We Use Your Information" },
  { id: "data-sharing", label: "4. Data Sharing & Disclosure" },
  { id: "data-security", label: "5. Data Security" },
  { id: "data-retention", label: "6. Data Retention" },
  { id: "your-rights", label: "7. Your Rights" },
  { id: "contact", label: "8. Contact" },
];

const content = {
  introduction: {
    heading: "1. Introduction",
    body: "Prontly Notify (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our push notification platform. By using Prontly Notify, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use our services.",
  },
  "information-we-collect": {
    heading: "2. Information We Collect",
    body: "We collect the following types of information:",
    list: [
      "Account Information: When you sign up, we collect your name, email address, and password.",
      "Website Information: Your website URL, domain, and platform type (WordPress, Shopify, etc.).",
      "Subscriber Data: Browser tokens, browser type, operating system, and approximate geographic location of your push subscribers.",
      "Usage Data: Information about how you interact with our platform, including campaign metrics and feature usage.",
      "Payment Information: Processed securely through Razorpay. We do not store credit card numbers.",
    ],
  },
  "how-we-use": {
    heading: "3. How We Use Your Information",
    body: "We use the information we collect to:",
    list: [
      "Provide, operate, and maintain our push notification platform",
      "Process transactions and manage subscriptions",
      "Send technical notices, updates, and support messages",
      "Improve our platform through analytics and product research",
      "Comply with legal obligations and enforce our Terms of Service",
    ],
  },
  "data-sharing": {
    heading: "4. Data Sharing & Disclosure",
    body: "We do not sell your personal information. We may share data with:",
    list: [
      "Service Providers: Firebase (authentication, push delivery), Cloudflare (infrastructure), Razorpay (payment processing)",
      "Legal Requirements: When required by law or to protect our rights",
      "Business Transfers: In connection with a merger, acquisition, or sale of assets",
    ],
  },
  "data-security": {
    heading: "5. Data Security",
    body: "We implement appropriate technical and organizational measures to protect your data, including encryption in transit (TLS 1.2+) and at rest, regular security audits, and access controls. However, no method of transmission over the Internet is 100% secure.",
  },
  "data-retention": {
    heading: "6. Data Retention",
    body: "We retain your account information for as long as your account is active. Upon account deletion, we maintain a 30-day grace period during which recovery is possible, after which data is permanently purged. Subscriber data is retained per your campaign needs and can be exported or deleted at any time.",
  },
  "your-rights": {
    heading: "7. Your Rights",
    body: "Depending on your jurisdiction, you may have the right to:",
    list: [
      "Access, correct, or delete your personal data",
      "Export your data in a portable format",
      "Withdraw consent where processing is based on consent",
      "Lodge a complaint with a data protection authority (India: DPDPA, EU: GDPR, California: CCPA)",
    ],
  },
  contact: {
    heading: "8. Contact",
    body: 'For privacy-related inquiries, please contact us at <a href="mailto:privacy@prontly.in" class="text-primary hover:underline">privacy@prontly.in</a> or through our Contact page.',
  },
};

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("[data-section-id]");
      let current = "introduction";
      headings.forEach((h) => {
        const rect = h.getBoundingClientRect();
        if (rect.top <= 120) current = h.getAttribute("data-section-id") || current;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-24">
      <div className="flex gap-12">
        <aside className="hidden w-1/4 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeSection === s.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-10">
            <Badge variant="info" className="mb-4">Legal</Badge>
            <h1 className="font-display text-[32px] font-bold text-text-primary">Privacy Policy</h1>
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-muted">
              <Shield className="size-3.5 text-primary" />
              Last updated: June 15, 2026
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-success/25 bg-success/5 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 size-5 shrink-0 text-success" />
              <div>
                <p className="text-sm font-semibold text-text-primary">GDPR & DPDPA Compliant</p>
                <p className="mt-1 text-xs text-text-secondary">
                  Prontly Notify complies with the General Data Protection Regulation (GDPR) and the Digital Personal Data Protection Act (DPDPA) of India. Your data is processed lawfully, fairly, and transparently.
                </p>
              </div>
            </div>
          </div>

          {Object.entries(content).map(([id, section]) => (
            <section key={id} data-section-id={id} id={id} className="mb-10 scroll-mt-28">
              <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">{section.heading}</h2>
              <p className="text-sm leading-relaxed text-text-secondary" dangerouslySetInnerHTML={{ __html: section.body }} />
              {"list" in section && section.list && (
                <ul className="mt-3 space-y-2 pl-5">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
