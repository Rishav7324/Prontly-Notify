import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Refund Policy | Prontly Notify",
  description:
    "Prontly Notify Refund Policy — details on cancellations, refunds, and billing adjustments.",
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10">
        <Badge variant="info" className="mb-4">Legal</Badge>
        <h1 className="font-display mb-4 text-4xl font-bold">Refund Policy</h1>
        <p className="text-sm text-text-muted">Last updated: June 15, 2026</p>
      </div>

      <div className="space-y-8 text-sm text-text-secondary leading-relaxed">
        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">1. Free Trial</h2>
          <p>
            All paid plans come with a 14-day free trial. You will not be charged until the trial period ends. You may cancel at any time during the trial with no charge.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">2. Money-Back Guarantee</h2>
          <p>
            We offer a 7-day money-back guarantee on all paid plans. If you are not satisfied within 7 days of your first payment, contact us at support@prontly.in for a full refund — no questions asked.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">3. Cancellation</h2>
          <p>
            You can cancel your subscription at any time from the Billing settings in your dashboard. Upon cancellation, your plan remains active until the end of the current billing period. After that, your account will revert to the Free plan tier.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">4. Refund Eligibility</h2>
          <p className="mb-2">Refunds are issued under the following conditions:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Cancellation within the 7-day money-back period: Full refund</li>
            <li>Cancellation after the money-back period: No refund, but service continues until the end of the billing period</li>
            <li>Annual plan cancellations: Prorated refund for unused months, minus the first month at the monthly rate</li>
            <li>Duplicate or erroneous charges: Full refund of the incorrect charge</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">5. How to Request a Refund</h2>
          <p>
            To request a refund, email us at support@prontly.in with the subject line &ldquo;Refund Request&rdquo; and include your account email and reason for the request. We will process your refund within 5-7 business days.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">6. Payment Disputes</h2>
          <p>
            If you believe you have been charged incorrectly, please contact us before filing a dispute with your payment provider. We will work to resolve the issue promptly.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">7. Changes to This Policy</h2>
          <p>
            We may update this Refund Policy as needed. Existing subscriptions will be governed by the policy in effect at the time of purchase.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">8. Contact</h2>
          <p>
            For billing and refund inquiries, contact us at support@prontly.in.
          </p>
        </section>
      </div>
    </div>
  );
}
