"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageSquare, Clock, ArrowRight, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const reasons = [
  { value: "support", label: "Technical Support" },
  { value: "sales", label: "Sales Inquiry" },
  { value: "billing", label: "Billing Question" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const { addToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    reason: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    if (!form.reason) errs.reason = "Please select a reason";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitted(true);
      addToast("Message sent successfully! We'll get back to you within 4 hours.", "success");
    } catch {
      addToast("Failed to send message. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="size-8 text-success" />
          </div>
          <h1 className="font-display text-3xl font-bold text-text-primary">Message sent!</h1>
          <p className="mt-4 text-text-secondary">
            Thanks for reaching out. Our team typically responds within 4 hours.
          </p>
          <Button variant="outline" className="mt-8" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", message: "", reason: "" }); }}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-24">
      <div className="mb-12 text-center">
        <Badge variant="info" className="mb-4">Contact</Badge>
        <h1 className="font-display text-[36px] font-bold text-text-primary md:text-[48px]">Get in touch</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          Have a question, need support, or interested in enterprise pricing? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-[3fr_2fr]">
        <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="website"
              className="absolute -left-[9999px]"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={errors.name}
              />
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={errors.email}
              />
            </div>
            <Input
              label="Company"
              placeholder="Acme Inc."
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <Select
              label="Reason for contact"
              options={reasons}
              placeholder="Select a reason"
              value={form.reason}
              onChange={(v) => setForm({ ...form, reason: v })}
              error={errors.reason}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us more about your inquiry..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/30 min-h-[100px] resize-y"
              />
              {errors.message && <p className="text-xs text-error">{errors.message}</p>}
            </div>
            <Button type="submit" loading={submitting} className="w-full" size="lg">
              <Send className="size-4" />
              Send Message
            </Button>
          </form>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-surface p-6">
            <Clock className="mb-3 size-5 text-primary" />
            <p className="mb-1 text-sm font-medium text-text-primary">Response time</p>
            <p className="text-sm text-text-secondary">Usually within 4 hours</p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <Mail className="mb-3 size-5 text-primary" />
            <p className="mb-1 text-sm font-medium text-text-primary">Email us</p>
            <a href="mailto:hello@prontly.in" className="text-sm text-text-secondary transition-colors hover:text-primary">
              hello@prontly.in
            </a>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <MessageSquare className="mb-3 size-5 text-primary" />
            <p className="mb-1 text-sm font-medium text-text-primary">Live chat</p>
            <Button variant="outline" size="sm" className="mt-2">
              Start chat <ArrowRight className="size-3.5" />
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <a href="/faq" className="flex items-center justify-between text-sm font-medium text-text-primary transition-colors hover:text-primary">
              <span>Check our FAQ</span>
              <ArrowRight className="size-4 text-text-muted" />
            </a>
            <p className="mt-1 text-sm text-text-secondary">Many questions are answered in our FAQ section.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
