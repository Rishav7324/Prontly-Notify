"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthCard } from "@/components/forms/AuthCard";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const validate = (): boolean => {
    if (!email.trim()) { setError("Email is required."); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return false; }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to send reset email");
      setSent(true);
      setCooldown(60);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to send");
      setCooldown(60);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthCard title="Check your inbox" showBrandPanel={false}>
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="size-7 text-success" />
          </div>
          <p className="mb-2 text-sm text-text-secondary leading-relaxed">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium text-text-primary">{email}</span>.
          </p>
          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={handleResend}
              disabled={cooldown > 0}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
            </Button>
          </div>
          <div className="mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to login
            </Link>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Reset your password" showBrandPanel={false}>
      <div className="mb-6 flex justify-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/5">
          <Lock className="size-6 text-primary" />
        </div>
      </div>
      <p className="mb-6 text-center text-sm text-text-secondary">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          autoFocus
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          <Mail className="size-4" />
          Send Reset Link
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </div>
    </AuthCard>
  );
}
