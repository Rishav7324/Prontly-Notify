"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

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
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string };
      setError(getFirebaseErrorMessage(firebaseErr.code || ""));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Card className="text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="size-7 text-success" />
        </div>
        <h1 className="mb-2 text-xl font-bold text-text-primary">Check your inbox</h1>
        <p className="mb-6 text-sm text-text-secondary leading-relaxed">
          We&apos;ve sent a password reset link to{" "}
          <span className="font-medium text-text-primary">{email}</span>.
          It may take a few minutes to arrive.
        </p>
        <p className="mb-8 text-xs text-text-muted">
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <button
            onClick={() => setSent(false)}
            className="text-primary hover:text-primary-400 underline underline-offset-2 transition-colors"
          >
            try again
          </button>
          .
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Forgot password</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

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
    </Card>
  );
}
