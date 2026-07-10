"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader2, CheckCircle2, XCircle, Lock, Eye, EyeOff } from "lucide-react";

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
      .then((email) => {
        setEmail(email);
        setStatus("ready");
      })
      .catch((err) => {
        const code = err.code || "";
        if (code === "auth/expired-action-code") {
          setError("This reset link has expired. Please request a new one.");
        } else if (code === "auth/invalid-action-code") {
          setError("This reset link is invalid or has already been used.");
        } else {
          setError("Something went wrong. Please request a new reset link.");
        }
        setStatus("error");
      });
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode!, password);
      setStatus("success");
      setTimeout(() => router.replace("/login"), 3000);
    } catch (err: any) {
      const code = err.code || "";
      if (code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else if (code === "auth/expired-action-code") {
        setError("This link has expired. Request a new reset link.");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: "#fdfcfc" }}>
      <div className="w-full max-w-md rounded-2xl border border-[#ebe8e4] p-8 shadow-subtle" style={{ backgroundColor: "#fdfcfc" }}>
        {status === "checking" && (
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 size-10 animate-spin" style={{ color: "#000000" }} />
            <p style={{ color: "#777169" }} className="text-sm">Checking reset link...</p>
          </div>
        )}

        {status === "ready" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="flex size-12 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                <Lock className="size-6" style={{ color: "#000000" }} />
              </div>
            </div>

            <p className="mb-6 text-center text-sm" style={{ color: "#777169" }}>
              Resetting password for <span className="font-medium" style={{ color: "#000000" }}>{maskEmail(email)}</span>
            </p>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-lg p-3 text-sm" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#EF4444" }}>
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
          </>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
              <CheckCircle2 className="size-8" style={{ color: "#22C55E" }} />
            </div>
            <h1 className="text-lg font-light tracking-tight" style={{ color: "#000000", letterSpacing: "-0.02em" }}>
              Password changed!
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#777169" }}>
              Redirecting to login...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
              <XCircle className="size-8" style={{ color: "#EF4444" }} />
            </div>
            <p className="text-sm" style={{ color: "#777169" }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#fdfcfc" }}>
          <Loader2 className="size-8 animate-spin" style={{ color: "#000000" }} />
        </div>
      }
    >
      <ConfirmInner />
    </Suspense>
  );
}
