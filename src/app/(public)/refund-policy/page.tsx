"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Shield, ChevronRight } from "lucide-react";

const sections = [
  { id: "free-trial", label: "1. Free Trial" },
  { id: "money-back", label: "2. Money-Back Guarantee" },
  { id: "cancellation", label: "3. Cancellation" },
  { id: "eligibility", label: "4. Refund Eligibility" },
  { id: "how-to-request", label: "5. How to Request a Refund" },
  { id: "disputes", label: "6. Payment Disputes" },
  { id: "changes", label: "7. Changes to This Policy" },
  { id: "contact", label: "8. Contact" },
];

export default function RefundPolicyPage() {
  const [activeSection, setActiveSection] = useState("free-trial");

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("[data-section-id]");
      let current = "free-trial";
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
            <h1 className="font-display text-[32px] font-bold text-text-primary">Refund Policy</h1>
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-muted">
              <Shield className="size-3.5 text-primary" />
              Last updated: June 15, 2026
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-success/25 bg-success/5 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 size-5 shrink-0 text-success" />
              <div>
                <p className="text-sm font-semibold text-text-primary">7-Day Money-Back Guarantee</p>
                <p className="mt-1 text-xs text-text-secondary">
                  We stand behind our product. If you&apos;re not satisfied within 7 days of your first payment, we&apos;ll refund you in full — no questions asked.
                </p>
              </div>
            </div>
          </div>

          <section data-section-id="free-trial" id="free-trial" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">1. Free Trial</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              All paid plans come with a 14-day free trial. You will not be charged until the trial period ends. You may cancel at any time during the trial with no charge.
            </p>
          </section>

          <section data-section-id="money-back" id="money-back" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">2. Money-Back Guarantee</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              We offer a 7-day money-back guarantee on all paid plans. If you are not satisfied within 7 days of your first payment, contact us at{' '}
              <a href="mailto:support@prontly.in" className="text-primary hover:underline">support@prontly.in</a>{' '}
              for a full refund — no questions asked.
            </p>
          </section>

          <section data-section-id="cancellation" id="cancellation" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">3. Cancellation</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              You can cancel your subscription at any time from the Billing settings in your dashboard. Upon cancellation, your plan remains active until the end of the current billing period. After that, your account will revert to the Free plan tier.
            </p>
          </section>

          <section data-section-id="eligibility" id="eligibility" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">4. Refund Eligibility</h2>
            <p className="mb-3 text-sm text-text-secondary">Refunds are issued under the following conditions:</p>
            <ul className="space-y-2 pl-5">
              {[
                "Cancellation within the 7-day money-back period: Full refund",
                "Cancellation after the money-back period: No refund, but service continues until the end of the billing period",
                "Annual plan cancellations: Prorated refund for unused months, minus the first month at the monthly rate",
                "Duplicate or erroneous charges: Full refund of the incorrect charge",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section data-section-id="how-to-request" id="how-to-request" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">5. How to Request a Refund</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              To request a refund, email us at{' '}
              <a href="mailto:support@prontly.in" className="text-primary hover:underline">support@prontly.in</a>{' '}
              with the subject line &ldquo;Refund Request&rdquo; and include your account email and reason for the request. We will process your refund within 5-7 business days.
            </p>
          </section>

          <section data-section-id="disputes" id="disputes" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">6. Payment Disputes</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              If you believe you have been charged incorrectly, please contact us before filing a dispute with your payment provider. We will work to resolve the issue promptly.
            </p>
          </section>

          <section data-section-id="changes" id="changes" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">7. Changes to This Policy</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              We may update this Refund Policy as needed. Existing subscriptions will be governed by the policy in effect at the time of purchase.
            </p>
          </section>

          <section data-section-id="contact" id="contact" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-text-primary">8. Contact</h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              For billing and refund inquiries, contact us at{' '}
              <a href="mailto:support@prontly.in" className="text-primary hover:underline">support@prontly.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
