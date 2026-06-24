import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Privacy Policy | Prontly Notify",
  description:
    "Prontly Notify Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10">
        <Badge variant="info" className="mb-4">Legal</Badge>
        <h1 className="font-display mb-4 text-4xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-text-muted">Last updated: June 15, 2026</p>
      </div>

      <div className="space-y-8 text-sm text-text-secondary leading-relaxed">
        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">1. Introduction</h2>
          <p>
            Prontly Notify (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our push notification platform.
          </p>
          <p className="mt-3">
            By using Prontly Notify, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">2. Information We Collect</h2>
          <p className="mb-2">We collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-text-primary">Account Information:</strong> When you sign up, we collect your name, email address, and password.</li>
            <li><strong className="text-text-primary">Website Information:</strong> Your website URL, domain, and platform type (WordPress, Shopify, etc.).</li>
            <li><strong className="text-text-primary">Subscriber Data:</strong> Browser tokens, browser type, operating system, and approximate geographic location of your push subscribers.</li>
            <li><strong className="text-text-primary">Usage Data:</strong> Information about how you interact with our platform, including campaign metrics and feature usage.</li>
            <li><strong className="text-text-primary">Payment Information:</strong> Processed securely through Razorpay. We do not store credit card numbers.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">3. How We Use Your Information</h2>
          <p className="mb-2">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Provide, operate, and maintain our push notification platform</li>
            <li>Process transactions and manage subscriptions</li>
            <li>Send technical notices, updates, and support messages</li>
            <li>Improve our platform through analytics and product research</li>
            <li>Comply with legal obligations and enforce our Terms of Service</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">4. Data Sharing & Disclosure</h2>
          <p className="mb-2">We do not sell your personal information. We may share data with:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-text-primary">Service Providers:</strong> Firebase (authentication, push delivery), Cloudflare (infrastructure), Razorpay (payment processing)</li>
            <li><strong className="text-text-primary">Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong className="text-text-primary">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your data, including encryption in transit (TLS 1.2+) and at rest, regular security audits, and access controls. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">6. Data Retention</h2>
          <p>
            We retain your account information for as long as your account is active. Upon account deletion, we maintain a 30-day grace period during which recovery is possible, after which data is permanently purged. Subscriber data is retained per your campaign needs and can be exported or deleted at any time.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">7. Your Rights</h2>
          <p className="mb-2">Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Access, correct, or delete your personal data</li>
            <li>Export your data in a portable format</li>
            <li>Withdraw consent where processing is based on consent</li>
            <li>Lodge a complaint with a data protection authority (India: DPDPA, EU: GDPR, California: CCPA)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">8. Contact</h2>
          <p>
            For privacy-related inquiries, please contact us at privacy@prontly.in or through our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
