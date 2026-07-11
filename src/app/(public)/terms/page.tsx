"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Shield, ChevronRight } from "lucide-react";

const sections = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "description", label: "2. Description of Service" },
  { id: "registration", label: "3. Account Registration" },
  { id: "acceptable-use", label: "4. Acceptable Use" },
  { id: "subscriber-compliance", label: "5. Subscriber Compliance" },
  { id: "payment", label: "6. Payment Terms" },
  { id: "liability", label: "7. Limitation of Liability" },
  { id: "termination", label: "8. Termination" },
  { id: "changes", label: "9. Changes to Terms" },
  { id: "contact", label: "10. Contact" },
];

const content: Record<string, { heading: string; body: string; list?: string[] }> = {
  acceptance: {
    heading: "1. Acceptance of Terms",
    body: "By accessing or using Prontly Notify (&ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Platform.",
  },
  description: {
    heading: "2. Description of Service",
    body: "Prontly Notify provides a browser push notification platform that enables website owners to collect subscribers and send targeted notifications. The service includes campaign management, automation, AI-assisted features, analytics, and integration tools.",
  },
  registration: {
    heading: "3. Account Registration",
    body: "You must provide accurate information when creating an account. You are responsible for:",
    list: [
      "Maintaining the confidentiality of your login credentials",
      "All activities that occur under your account",
      "Notifying us immediately of any unauthorized use",
      "Ensuring your use complies with all applicable laws",
    ],
  },
  "acceptable-use": {
    heading: "4. Acceptable Use",
    body: "You agree not to use the Platform to:",
    list: [
      "Send spam, unsolicited, or misleading notifications",
      "Violate any applicable laws or regulations",
      "Infringe on the intellectual property rights of others",
      "Distribute malware or harmful content",
      "Attempt to circumvent our security measures or billing systems",
    ],
  },
  "subscriber-compliance": {
    heading: "5. Subscriber Compliance",
    body: "You must ensure that all subscribers have explicitly opted in to receive notifications from your website. You are required to maintain a privacy policy that discloses your use of browser push notifications and provide an easy mechanism for subscribers to unsubscribe.",
  },
  payment: {
    heading: "6. Payment Terms",
    body: "Paid plans are billed in advance on a monthly or annual basis as selected. All payments are processed through Razorpay. Refunds are handled in accordance with our refund policy. Failure to pay may result in suspension or downgrade of your account.",
  },
  liability: {
    heading: "7. Limitation of Liability",
    body: "Prontly Notify is provided &ldquo;as is&rdquo; without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform. Our total liability shall not exceed the amount you have paid us in the 12 months preceding the claim.",
  },
  termination: {
    heading: "8. Termination",
    body: "We reserve the right to suspend or terminate accounts that violate these terms. You may cancel your account at any time. Upon termination, your data will be retained for 30 days before permanent deletion.",
  },
  changes: {
    heading: "9. Changes to Terms",
    body: "We may update these terms from time to time. We will notify users of material changes via email or in-app notification. Continued use after changes constitutes acceptance of the updated terms.",
  },
  contact: {
    heading: "10. Contact",
    body: 'For questions about these terms, contact us at <a href="mailto:legal@prontly.in" class="text-primary hover:underline">legal@prontly.in</a>.',
  },
};

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("[data-section-id]");
      let current = "acceptance";
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
            <h1 className="font-display text-[32px] font-bold text-text-primary">Terms of Service</h1>
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
                  These terms are designed to comply with applicable regulations including GDPR and India&apos;s DPDPA. Your rights as a user are protected under relevant data protection laws.
                </p>
              </div>
            </div>
          </div>

          {Object.entries(content).map(([id, section]) => (
            <section key={id} data-section-id={id} id={id} className="mb-10 scroll-mt-28">
              <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">{section.heading}</h2>
              <p className="text-sm leading-relaxed text-text-secondary" dangerouslySetInnerHTML={{ __html: section.body }} />
              {section.list && (
                <ul className="mt-3 space-y-2 pl-5">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      <span>{item}</span>
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
