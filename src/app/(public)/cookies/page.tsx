"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Shield, ChevronRight } from "lucide-react";

const sections = [
  { id: "what-are-cookies", label: "1. What Are Cookies" },
  { id: "how-we-use", label: "2. How We Use Cookies" },
  { id: "types", label: "3. Types of Cookies We Use" },
  { id: "managing", label: "4. Managing Cookies" },
  { id: "third-party", label: "5. Third-Party Cookies" },
  { id: "updates", label: "6. Updates" },
  { id: "contact", label: "7. Contact" },
];

const cookieTable = [
  { name: "session_id", purpose: "Authentication session", duration: "Session", type: "Essential" },
  { name: "csrf_token", purpose: "CSRF protection", duration: "Session", type: "Essential" },
  { name: "_ga", purpose: "Google Analytics", duration: "2 years", type: "Analytics" },
  { name: "_gid", purpose: "Google Analytics", duration: "24 hours", type: "Analytics" },
];

export default function CookiesPage() {
  const [activeSection, setActiveSection] = useState("what-are-cookies");

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("[data-section-id]");
      let current = "what-are-cookies";
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
                    ? "bg-[#3B82F6]/10 text-[#3B82F6] font-medium"
                    : "text-[#94A3B8] hover:bg-black/5 hover:text-[#F8FAFC]"
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
            <h1 className="font-display text-[32px] font-bold text-[#F8FAFC]">Cookie Policy</h1>
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#111827] px-3 py-1.5 text-xs text-[#64748B]">
              <Shield className="size-3.5 text-[#3B82F6]" />
              Last updated: June 15, 2026
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-[#22C55E]/25 bg-[#22C55E]/5 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 size-5 shrink-0 text-[#22C55E]" />
              <div>
                <p className="text-sm font-semibold text-[#F8FAFC]">GDPR & DPDPA Compliant</p>
                <p className="mt-1 text-xs text-[#94A3B8]">
                  Our cookie practices comply with GDPR e-Privacy Directive and India&apos;s DPDPA. Non-essential cookies require your consent before being set.
                </p>
              </div>
            </div>
          </div>

          <section data-section-id="what-are-cookies" id="what-are-cookies" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-[#F8FAFC]">1. What Are Cookies</h2>
            <p className="text-sm leading-relaxed text-[#94A3B8]">
              Cookies are small text files stored on your device by your web browser when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section data-section-id="how-we-use" id="how-we-use" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-[#F8FAFC]">2. How We Use Cookies</h2>
            <p className="mb-3 text-sm text-[#94A3B8]">We use cookies for the following purposes:</p>
            <ul className="space-y-2 pl-5">
              {[
                "Essential Cookies: Required for the platform to function properly — session management, authentication, and security.",
                "Analytics Cookies: Help us understand how visitors use our marketing site (Google Analytics 4). These are non-essential and subject to your consent.",
                "Functionality Cookies: Remember your preferences and settings for an improved experience.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                  <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-[#3B82F6]" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </section>

          <section data-section-id="types" id="types" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-[#F8FAFC]">3. Types of Cookies We Use</h2>
            <div className="overflow-x-auto rounded-lg border border-[rgba(255,255,255,0.08)]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[#111827]">
                    <th className="px-4 py-3 font-medium text-[#F8FAFC]">Cookie</th>
                    <th className="px-4 py-3 font-medium text-[#F8FAFC]">Purpose</th>
                    <th className="px-4 py-3 font-medium text-[#F8FAFC]">Duration</th>
                    <th className="px-4 py-3 font-medium text-[#F8FAFC]">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTable.map((row, i) => (
                    <tr key={row.name} className={i < cookieTable.length - 1 ? "border-b border-[rgba(255,255,255,0.08)]" : ""}>
                      <td className="px-4 py-3 text-[#F8FAFC] font-mono text-xs">{row.name}</td>
                      <td className="px-4 py-3 text-[#94A3B8]">{row.purpose}</td>
                      <td className="px-4 py-3 text-[#94A3B8]">{row.duration}</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-[#3B82F6]/10 px-2 py-0.5 text-xs text-[#3B82F6]">{row.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section data-section-id="managing" id="managing" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-[#F8FAFC]">4. Managing Cookies</h2>
            <p className="text-sm leading-relaxed text-[#94A3B8]">
              Most web browsers allow you to control cookies through their settings. You can block or delete cookies, but this may affect the functionality of our platform. You can also opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
            </p>
          </section>

          <section data-section-id="third-party" id="third-party" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-[#F8FAFC]">5. Third-Party Cookies</h2>
            <p className="text-sm leading-relaxed text-[#94A3B8]">
              We use Google Analytics 4 for website analytics. Google may set additional cookies as described in Google&apos;s Privacy Policy. We do not use advertising cookies, social media pixels, or other tracking technologies on our marketing site.
            </p>
          </section>

          <section data-section-id="updates" id="updates" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-[#F8FAFC]">6. Updates</h2>
            <p className="text-sm leading-relaxed text-[#94A3B8]">
              We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section data-section-id="contact" id="contact" className="mb-10 scroll-mt-28">
            <h2 className="font-display mb-4 text-xl font-semibold text-[#F8FAFC]">7. Contact</h2>
            <p className="text-sm leading-relaxed text-[#94A3B8]">
              For questions about our use of cookies, contact us at{' '}
              <a href="mailto:privacy@prontly.in" className="text-[#3B82F6] hover:underline">privacy@prontly.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
