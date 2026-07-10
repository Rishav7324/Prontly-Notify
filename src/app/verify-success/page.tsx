"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

function VerifySuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "verified" | "error">("verifying");
  const [error, setError] = useState("");

  useEffect(() => {
    const oobCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");
    if (!oobCode && mode !== "verifyEmail") {
      setStatus("error");
      setError("Invalid verification link.");
      return;
    }

    async function verify() {
      try {
        await auth.currentUser?.reload();
        const firebaseUid = auth.currentUser?.uid;

        const res = await fetch("/api/v1/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oobCode, firebaseUid }),
        });
        const data = await res.json();
        if (!data.success) {
          setStatus("error");
          setError(data.error || "Verification failed.");
          return;
        }

        setStatus("verified");
        setTimeout(() => router.replace("/onboarding"), 2000);
      } catch {
        setStatus("error");
        setError("Something went wrong. Try again.");
      }
    }
    verify();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4">
      <div className="w-full max-w-md rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#1e293b] p-8 text-center shadow-2xl">
        {status === "verifying" && (
          <>
            <Loader2 className="mx-auto mb-4 size-10 animate-spin text-[#3b82f6]" />
            <h1 className="text-lg font-bold text-[#f8fafc]">Verifying your email...</h1>
          </>
        )}

        {status === "verified" && (
          <>
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#22c55e]/10">
              <CheckCircle2 className="size-8 text-[#22c55e]" />
            </div>
            <h1 className="text-lg font-bold text-[#f8fafc]">Email verified!</h1>
            <p className="mt-2 text-sm text-[#94a3b8]">Redirecting to onboarding...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#ef4444]/10">
              <XCircle className="size-8 text-[#ef4444]" />
            </div>
            <h1 className="text-lg font-bold text-[#f8fafc]">Verification failed</h1>
            <p className="mt-2 text-sm text-[#94a3b8]">{error}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifySuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0f172a]">
          <Loader2 className="size-8 animate-spin text-[#3b82f6]" />
        </div>
      }
    >
      <VerifySuccessInner />
    </Suspense>
  );
}
