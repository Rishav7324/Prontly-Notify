"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { applyActionCode } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { Loader2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

const ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-action-code": "This verification link is invalid or has already been used.",
  "auth/expired-action-code": "This verification link has expired. Request a new one below.",
  "auth/user-disabled": "This account has been disabled. Contact support.",
};

function ConfirmInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [resending, setResending] = useState(false);

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      setStatus("error");
      setError("Invalid verification link — no code found.");
      return;
    }

    async function verify() {
      try {
        await applyActionCode(auth, oobCode!);
        try {
          if (user) {
            const idToken = await user.getIdToken();
            await fetch("/api/v1/auth/send-verification", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken, email: user.email, name: user.displayName }),
            });
          }
        } catch {
          // welcome email is best-effort
        }
        setStatus("success");
        setTimeout(() => router.replace("/onboarding"), 3000);
      } catch (err: any) {
        const code = err.code || "";
        setErrorCode(code);
        setError(ERROR_MESSAGES[code] || "Verification failed. Please try again.");
        setStatus("error");
      }
    }

    verify();
  }, [oobCode, router, user]);

  const handleResend = async () => {
    if (!user || resending) return;
    setResending(true);
    try {
      const idToken = await user.getIdToken();
      await fetch("/api/v1/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      setError("A new verification email has been sent.");
      setErrorCode("resent");
    } catch {
      setError("Failed to resend. Try again later.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: "#fdfcfc" }}>
      <div className="w-full max-w-md rounded-2xl border border-[#ebe8e4] p-8 text-center shadow-subtle" style={{ backgroundColor: "#fdfcfc" }}>
        {status === "verifying" && (
          <>
            <Loader2 className="mx-auto mb-4 size-10 animate-spin" style={{ color: "#000000" }} />
            <h1 className="text-lg font-light tracking-tight" style={{ color: "#000000", letterSpacing: "-0.02em" }}>
              Verifying your email...
            </h1>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
              <CheckCircle2 className="size-8" style={{ color: "#22C55E" }} />
            </div>
            <h1 className="text-lg font-light tracking-tight" style={{ color: "#000000", letterSpacing: "-0.02em" }}>
              Email verified!
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#777169" }}>
              Redirecting to onboarding...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
              <XCircle className="size-8" style={{ color: "#EF4444" }} />
            </div>
            <h1 className="text-lg font-light tracking-tight" style={{ color: "#000000", letterSpacing: "-0.02em" }}>
              Verification failed
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#777169" }}>
              {error}
            </p>
            {errorCode !== "resent" && (
              <button
                onClick={handleResend}
                disabled={resending}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
                style={{ backgroundColor: "#000000", color: "#fdfcfc" }}
              >
                <RefreshCw className={`size-4 ${resending ? "animate-spin" : ""}`} />
                {resending ? "Sending..." : "Resend verification email"}
              </button>
            )}
          </>
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
