import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock, ArrowRight, Send } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = {
  title: "Contact | Prontly Notify",
  description:
    "Get in touch with the Prontly Notify team. We're here to help with questions, support, and sales inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <Badge variant="info" className="mb-4">Contact</Badge>
        <h1 className="font-display mb-4 text-4xl font-bold md:text-5xl">
          Get in touch
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-secondary">
          Have a question, need support, or interested in enterprise pricing?
          We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-5">
        {/* Form */}
        <div className="md:col-span-3">
          <form className="space-y-5 rounded-xl border border-border bg-surface p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="First name" placeholder="John" />
              <Input label="Last name" placeholder="Doe" />
            </div>
            <Input label="Email address" type="email" placeholder="john@example.com" />
            <Input label="Subject" placeholder="How can we help?" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us more about your inquiry..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600"
            >
              Send Message
              <Send className="size-4" />
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-6 md:col-span-2">
          {[
            { icon: Mail, title: "Email us", desc: "hello@prontly.in", href: "mailto:hello@prontly.in" },
            { icon: MessageSquare, title: "Live chat", desc: "Chat with our team", href: "#" },
            { icon: Clock, title: "Response time", desc: "Usually within 4 hours", href: undefined },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-surface p-5">
              <item.icon className="mb-3 size-5 text-primary" />
              <p className="mb-1 text-sm font-medium">{item.title}</p>
              {item.href ? (
                <Link href={item.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {item.desc}
                </Link>
              ) : (
                <p className="text-sm text-text-secondary">{item.desc}</p>
              )}
            </div>
          ))}

          <div className="rounded-xl border border-border bg-surface p-5">
            <Link
              href="/faq"
              className="flex items-center justify-between text-sm font-medium"
            >
              <span>Check our FAQ</span>
              <ArrowRight className="size-4 text-text-muted" />
            </Link>
            <p className="mt-1 text-sm text-text-secondary">
              Many questions are answered in our frequently asked questions
              section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
