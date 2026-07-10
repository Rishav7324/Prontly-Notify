"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { AuthCard } from "@/components/forms/AuthCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Mail, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

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
      const idToken = await user.getIdToken();
      const res = await fetch("/api/v1/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to send");
      setCooldown(60);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (verified) {
    return (
      <AuthCard title="Email verified!">
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="size-7 text-success" />
          </div>
          <p className="mb-2 text-sm text-text-secondary">Your email has been verified successfully.</p>
          <p className="mb-6 text-xs text-text-muted">Redirecting to onboarding...</p>
          <ProgressBar value={redirectProgress} size="sm" />
        </div>
      </AuthCard>
    );
  }

  const displayEmail = user.email ? maskEmail(user.email) : "your email";

  return (
    <AuthCard title="Verify your email">
      <div className="text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/5">
          <Mail className="size-8 text-primary" />
        </div>

        <p className="mb-2 text-sm text-text-secondary leading-relaxed">
          We sent a verification link to{" "}
          <span className="font-medium text-text-primary">{displayEmail}</span>
        </p>
        <p className="mb-8 text-xs text-text-muted">
          Click the link to verify your account. This page refreshes automatically.
        </p>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error text-left">
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

        <div className="mt-6 space-y-2">
          <Link
            href="/login"
            className="block text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Change email address
          </Link>
          <Link
            href="/login"
            className="block text-sm text-primary hover:text-primary-400 transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
