"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { applyActionCode, checkActionCode } from "firebase/auth";
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";

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
        if (code === "auth/expired-action-code") {
          setError("This verification link has expired. Request a new one from your dashboard.");
        } else if (code === "auth/invalid-action-code") {
          setError("This verification link is invalid or has already been used.");
        } else {
          setError("Something went wrong. Please try requesting a new verification email.");
        }
        setStatus("error");
      });
  }, [oobCode, router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: "#fdfcfc" }}>
      <div className="w-full max-w-md rounded-2xl border border-[#ebe8e4] p-8 shadow-subtle" style={{ backgroundColor: "#fdfcfc" }}>
        {status === "checking" && (
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 size-10 animate-spin" style={{ color: "#000000" }} />
            <p style={{ color: "#777169" }} className="text-sm">Verifying your email...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
              <CheckCircle2 className="size-8" style={{ color: "#22C55E" }} />
            </div>
            <h1 className="text-lg font-light tracking-tight" style={{ color: "#000000", letterSpacing: "-0.02em" }}>
              Email verified!
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#777169" }}>
              Redirecting to your dashboard...
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

        {status === "error" && (
          <div className="mt-6 text-center">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "#000000" }}
            >
              <Mail className="size-4" />
              Request new verification
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailConfirmPage() {
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
