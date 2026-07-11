"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader2, CheckCircle2, XCircle, Lock, Eye, EyeOff } from "lucide-react";
import { AuthCard } from "@/components/forms/AuthCard";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  return local[0] + "***@" + domain;
}

function ConfirmInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [status, setStatus] = useState<"checking" | "ready" | "success" | "error">("checking");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!oobCode) {
      setStatus("error");
      setError("Invalid reset link — no code found.");
      return;
    }
    verifyPasswordResetCode(auth, oobCode)
      .then((e) => { setEmail(e); setStatus("ready"); })
      .catch((err) => {
        const code = err.code || "";
        if (code === "auth/expired-action-code") setError("This reset link has expired. Please request a new one.");
        else if (code === "auth/invalid-action-code") setError("This reset link is invalid or has already been used.");
        else setError("Something went wrong. Please request a new reset link.");
        setStatus("error");
      });
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords don't match."); return; }
    setSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode!, password);
      setStatus("success");
      setTimeout(() => router.replace("/login"), 3000);
    } catch (err: any) {
      const code = err.code || "";
      if (code === "auth/weak-password") setError("Password must be at least 6 characters.");
      else if (code === "auth/expired-action-code") setError("This link has expired. Request a new reset link.");
      else setError("Failed to reset password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "checking") {
    return (
      <AuthCard title="Checking reset link" showBrandPanel={false}>
        <div className="flex justify-center py-8">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      </AuthCard>
    );
  }

  if (status === "success") {
    return (
      <AuthCard title="Password changed!" showBrandPanel={false}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-success-subtle">
            <CheckCircle2 className="size-8 text-success" />
          </div>
          <p className="text-sm text-text-muted">Redirecting to login...</p>
        </div>
      </AuthCard>
    );
  }

  if (status === "error") {
    return (
      <AuthCard title="Reset link invalid" showBrandPanel={false}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-error-subtle">
            <XCircle className="size-8 text-error" />
          </div>
          <p className="text-sm text-text-secondary">{error}</p>
          <div className="mt-6">
            <Button onClick={() => router.push("/forgot-password")} variant="primary">
              Request new reset link
            </Button>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Reset your password" showBrandPanel={false}>
      <div className="mb-6 flex justify-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-accent-subtle">
          <Lock className="size-6 text-primary" />
        </div>
      </div>
      <p className="mb-6 text-center text-sm text-text-secondary">
        Resetting password for <span className="font-medium text-text-primary">{maskEmail(email)}</span>
      </p>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-error/30 bg-error-subtle p-3 text-sm text-error">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            label="New Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-muted hover:text-text-secondary"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
        <Button type="submit" loading={submitting} className="w-full" size="lg">
          Reset Password
        </Button>
      </form>
    </AuthCard>
  );
}

export default function ResetPasswordConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <ConfirmInner />
    </Suspense>
  );
}
