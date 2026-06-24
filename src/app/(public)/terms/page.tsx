import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Terms of Service | Prontly Notify",
  description: "Prontly Notify Terms of Service — governing the use of our push notification platform.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10">
        <Badge variant="info" className="mb-4">Legal</Badge>
        <h1 className="font-display mb-4 text-4xl font-bold">Terms of Service</h1>
        <p className="text-sm text-text-muted">Last updated: June 15, 2026</p>
      </div>

      <div className="space-y-8 text-sm text-text-secondary leading-relaxed">
        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Prontly Notify (&ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Platform.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">2. Description of Service</h2>
          <p>
            Prontly Notify provides a browser push notification platform that enables website owners to collect subscribers and send targeted notifications. The service includes campaign management, automation, AI-assisted features, analytics, and integration tools.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">3. Account Registration</h2>
          <p className="mb-2">You must provide accurate information when creating an account. You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Maintaining the confidentiality of your login credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
            <li>Ensuring your use complies with all applicable laws</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">4. Acceptable Use</h2>
          <p className="mb-2">You agree not to use the Platform to:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Send spam, unsolicited, or misleading notifications</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the intellectual property rights of others</li>
            <li>Distribute malware or harmful content</li>
            <li>Attempt to circumvent our security measures or billing systems</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">5. Subscriber Compliance</h2>
          <p>
            You must ensure that all subscribers have explicitly opted in to receive notifications from your website. You are required to maintain a privacy policy that discloses your use of browser push notifications and provide an easy mechanism for subscribers to unsubscribe.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">6. Payment Terms</h2>
          <p>
            Paid plans are billed in advance on a monthly or annual basis as selected. All payments are processed through Razorpay. Refunds are handled in accordance with our refund policy. Failure to pay may result in suspension or downgrade of your account.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">7. Limitation of Liability</h2>
          <p>
            Prontly Notify is provided &ldquo;as is&rdquo; without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform. Our total liability shall not exceed the amount you have paid us in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">8. Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms. You may cancel your account at any time. Upon termination, your data will be retained for 30 days before permanent deletion.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">9. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. We will notify users of material changes via email or in-app notification. Continued use after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">10. Contact</h2>
          <p>
            For questions about these terms, contact us at legal@prontly.in.
          </p>
        </section>
      </div>
    </div>
  );
}
