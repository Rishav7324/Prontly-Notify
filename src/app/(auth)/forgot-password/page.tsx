"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthCard } from "@/components/forms/AuthCard";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Lock, ExternalLink } from "lucide-react";

function getFirebaseErrorMessage(code: string): string {
  const map: Record<string, string> = {
    "auth/invalid-email": "Invalid email address format.",
    "auth/user-not-found": "If an account exists, you'll receive a reset link.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

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
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      setCooldown(60);
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string };
      setError(getFirebaseErrorMessage(firebaseErr.code || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setCooldown(60);
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string };
      setError(getFirebaseErrorMessage(firebaseErr.code || ""));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthCard title="Check your inbox">
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-[#22C55E]/10">
            <CheckCircle2 className="size-7 text-[#22C55E]" />
          </div>
          <p className="mb-2 text-sm text-[#94A3B8] leading-relaxed">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium text-[#F8FAFC]">{email}</span>.
            It may take a few minutes to arrive.
          </p>
          <div className="mt-6 space-y-3">
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] px-4 py-3 text-sm font-medium text-[#F8FAFC] transition-colors hover:bg-white/5"
            >
              <ExternalLink className="size-4" />
              Open Gmail &rarr;
            </a>
            <Button
              variant="ghost"
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
              className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
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
    <AuthCard title="Reset your password">
      <div className="mb-6 flex justify-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#3B82F6]/10">
          <Lock className="size-6 text-[#3B82F6]" />
        </div>
      </div>
      <p className="mb-6 text-center text-sm text-[#94A3B8]">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/10 p-3 text-sm text-[#EF4444]">
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
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </div>
    </AuthCard>
  );
}
