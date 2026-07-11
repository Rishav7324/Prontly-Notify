"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { applyActionCode, checkActionCode } from "firebase/auth";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { AuthCard } from "@/components/forms/AuthCard";
import { Button } from "@/components/ui/Button";

function ConfirmInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [status, setStatus] = useState<"checking" | "success" | "error">("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!oobCode) {
      setStatus("error");
      setError("Invalid verification link — no code found.");
      return;
    }
    checkActionCode(auth, oobCode)
      .then(() => applyActionCode(auth, oobCode))
      .then(() => {
        setStatus("success");
        setTimeout(() => router.replace("/dashboard"), 3000);
      })
      .catch((err) => {
        const code = err.code || "";
        if (code === "auth/expired-action-code") setError("This verification link has expired.");
        else if (code === "auth/invalid-action-code") setError("This verification link is invalid or has already been used.");
        else setError("Something went wrong. Please try again.");
        setStatus("error");
      });
  }, [oobCode, router]);

  if (status === "checking") {
    return (
      <AuthCard title="Verifying email" showBrandPanel={false}>
        <div className="flex justify-center py-8">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
      </AuthCard>
    );
  }

  if (status === "success") {
    return (
      <AuthCard title="Email verified!" showBrandPanel={false}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-success-subtle">
            <CheckCircle2 className="size-8 text-success" />
          </div>
          <p className="text-sm text-text-muted">Redirecting to dashboard...</p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Verification failed" showBrandPanel={false}>
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-error-subtle">
          <XCircle className="size-8 text-error" />
        </div>
        <p className="text-sm text-text-secondary mb-6">{error}</p>
        <Button onClick={() => router.push("/dashboard")} variant="primary">
          Go to Dashboard
        </Button>
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailConfirmPage() {
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
