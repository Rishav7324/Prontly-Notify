"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { AuthCard } from "@/components/forms/AuthCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Mail, RefreshCw, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const maskedLocal = local.length <= 2
    ? local[0] + "*"
    : local[0] + "*".repeat(local.length - 2) + local[local.length - 1];
  return `${maskedLocal}@${domain}`;
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [redirectProgress, setRedirectProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.replace("/login"); return; }
    if (user.emailVerified) {
      setVerified(true);
      return;
    }

    intervalRef.current = setInterval(async () => {
      try {
        await user.reload();
        if (user.emailVerified) {
          clearPolling();
          setVerified(true);
        }
      } catch {
        // polling silently
      }
    }, 5000);

    return () => clearPolling();
  }, [user, authLoading, router, clearPolling]);

  useEffect(() => {
    if (cooldown <= 0) return;
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownRef.current) clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current); };
  }, [cooldown]);

  useEffect(() => {
    if (!verified) return;
    const duration = 3000;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      setRedirectProgress(pct * 100);
      if (pct < 1) requestAnimationFrame(animate);
      else router.replace("/onboarding");
    };
    requestAnimationFrame(animate);
  }, [verified, router]);

  const handleResend = async () => {
    if (!user || cooldown > 0 || resending) return;
    setError("");
    setResending(true);
    try {
      await sendEmailVerification(user);
      setCooldown(60);
    } catch (err: unknown) {
      const fbErr = err as { code?: string };
      setError(fbErr.code === "auth/too-many-requests" ? "Too many requests. Try again later." : "Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="size-6 animate-spin text-[#3B82F6]" />
      </div>
    );
  }

  if (!user) return null;

  if (verified) {
    return (
      <AuthCard title="Email verified!">
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-[#22C55E]/10">
            <CheckCircle2 className="size-7 text-[#22C55E]" />
          </div>
          <p className="mb-2 text-sm text-[#94A3B8]">Your email has been verified successfully.</p>
          <p className="mb-6 text-xs text-[#64748B]">Redirecting to onboarding...</p>
          <ProgressBar value={redirectProgress} size="sm" />
        </div>
      </AuthCard>
    );
  }

  const displayEmail = user.email ? maskEmail(user.email) : "your email";

  return (
    <AuthCard title="Verify your email">
      <div className="text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#3B82F6]/10">
          <svg
            className="size-8 text-[#3B82F6]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <p className="mb-2 text-sm text-[#94A3B8] leading-relaxed">
          We sent a verification link to{" "}
          <span className="font-medium text-[#F8FAFC]">{displayEmail}</span>
        </p>
        <p className="mb-8 text-xs text-[#64748B]">
          Click the link to verify your account. This page refreshes automatically.
        </p>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/10 p-3 text-sm text-[#EF4444] text-left">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={handleResend}
          loading={resending}
          disabled={cooldown > 0}
        >
          <RefreshCw className="size-4" />
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
        </Button>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] px-4 py-2.5 text-sm font-medium text-[#F8FAFC] transition-colors hover:bg-white/5"
          >
            <ExternalLink className="size-3.5" />
            Gmail
          </a>
          <a
            href="https://outlook.live.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#111827] px-4 py-2.5 text-sm font-medium text-[#F8FAFC] transition-colors hover:bg-white/5"
          >
            <ExternalLink className="size-3.5" />
            Outlook
          </a>
        </div>

        <div className="mt-6 space-y-2">
          <Link
            href="/login"
            className="block text-sm text-[#64748B] hover:text-[#94A3B8] transition-colors"
          >
            Change email address
          </Link>
          <Link
            href="/login"
            className="block text-sm text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
