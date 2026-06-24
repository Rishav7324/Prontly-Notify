import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Cookie Policy | Prontly Notify",
  description:
    "Prontly Notify Cookie Policy — how we use cookies and similar tracking technologies.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10">
        <Badge variant="info" className="mb-4">Legal</Badge>
        <h1 className="font-display mb-4 text-4xl font-bold">Cookie Policy</h1>
        <p className="text-sm text-text-muted">Last updated: June 15, 2026</p>
      </div>

      <div className="space-y-8 text-sm text-text-secondary leading-relaxed">
        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">1. What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device by your web browser when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">2. How We Use Cookies</h2>
          <p className="mb-2">We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong className="text-text-primary">Essential Cookies:</strong> Required for the platform to function properly — session management, authentication, and security.</li>
            <li><strong className="text-text-primary">Analytics Cookies:</strong> Help us understand how visitors use our marketing site (Google Analytics 4). These are non-essential and subject to your consent.</li>
            <li><strong className="text-text-primary">Functionality Cookies:</strong> Remember your preferences and settings for an improved experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">3. Types of Cookies We Use</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 font-medium text-text-primary">Cookie</th>
                  <th className="px-4 py-3 font-medium text-text-primary">Purpose</th>
                  <th className="px-4 py-3 font-medium text-text-primary">Duration</th>
                  <th className="px-4 py-3 font-medium text-text-primary">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 text-text-primary">session_id</td>
                  <td>Authentication session</td>
                  <td>Session</td>
                  <td>Essential</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 text-text-primary">csrf_token</td>
                  <td>CSRF protection</td>
                  <td>Session</td>
                  <td>Essential</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 text-text-primary">_ga</td>
                  <td>Google Analytics</td>
                  <td>2 years</td>
                  <td>Analytics</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-text-primary">_gid</td>
                  <td>Google Analytics</td>
                  <td>24 hours</td>
                  <td>Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">4. Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings. You can block or delete cookies, but this may affect the functionality of our platform. You can also opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">5. Third-Party Cookies</h2>
          <p>
            We use Google Analytics 4 for website analytics. Google may set additional cookies as described in Google&apos;s Privacy Policy. We do not use advertising cookies, social media pixels, or other tracking technologies on our marketing site.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">6. Updates</h2>
          <p>
            We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="font-display mb-3 text-xl font-semibold text-text-primary">7. Contact</h2>
          <p>
            For questions about our use of cookies, contact us at privacy@prontly.in.
          </p>
        </section>
      </div>
    </div>
  );
}
