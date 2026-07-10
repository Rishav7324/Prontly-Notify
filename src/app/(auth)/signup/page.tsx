"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthCard } from "@/components/forms/AuthCard";
import { OAuthButton } from "@/components/forms/OAuthButton";
import { PasswordStrengthMeter } from "@/components/forms/PasswordStrengthMeter";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useToast } from "@/components/ui/Toast";
import { Loader2, Info } from "lucide-react";

function getFirebaseErrorMessage(code: string): string {
  const map: Record<string, string> = {
    "auth/email-already-in-use":
      "An account with this email already exists.",
    "auth/invalid-email": "Invalid email address format.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/operation-not-allowed": "Email/password sign-up is not enabled.",
    "auth/popup-closed-by-user": "Sign-up cancelled. Try again.",
    "auth/popup-blocked": "Pop-up was blocked. Allow pop-ups for this site.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const isGrowthPlan = searchParams.get("plan") === "growth";

  const validate = (): boolean => {
    if (!name.trim()) {
      setError("Name is required.");
      return false;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (!agreeTerms) {
      setError("You must agree to the terms of service.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });

      const idToken = await cred.user.getIdToken();
      await fetch("/api/v1/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, email, name: name.trim() }),
      });
      await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          uid: cred.user.uid,
          email: cred.user.email,
          name: name.trim(),
          plan: isGrowthPlan ? "growth" : "free",
        }),
      });

      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      addToast("Account created! Check your email to verify.", "success");
      router.push("/verify-email");
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string };
      setError(getFirebaseErrorMessage(firebaseErr.code || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setError("");
    setOauthLoading(provider);
    try {
      const authProvider =
        provider === "google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();
      const cred = await signInWithPopup(auth, authProvider);

      const idToken = await cred.user.getIdToken();
      await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          uid: cred.user.uid,
          email: cred.user.email,
          name: cred.user.displayName || provider,
          plan: isGrowthPlan ? "growth" : "free",
        }),
      });

      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (cred.user.emailVerified) {
        router.push("/onboarding");
      } else {
        router.push("/verify-email");
      }
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string };
      if (firebaseErr.code !== "auth/popup-closed-by-user") {
        setError(getFirebaseErrorMessage(firebaseErr.code || ""));
      }
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <AuthCard title="Create your free account" subtitle="Join thousands of publishers using Prontly">
      {isGrowthPlan && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>You selected the Growth plan</span>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
          <div className="mt-0.5 size-4 shrink-0 rounded-full bg-error/20 flex items-center justify-center">
            <span className="text-xs font-bold text-error">!</span>
          </div>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          autoFocus
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <PasswordStrengthMeter password={password} className="mt-2" />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <Checkbox
            checked={agreeTerms}
            onChange={(checked) => setAgreeTerms(checked)}
          />
          <span className="text-sm text-text-secondary -mt-0.5">
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-primary hover:text-primary-400 underline underline-offset-2"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary hover:text-primary-400 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button type="submit" loading={loading} className="w-full" size="lg">
          Create Account
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface-glass px-2 text-text-muted">
            or sign up with
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <OAuthButton
          provider="google"
          onClick={() => handleOAuth("google")}
          loading={oauthLoading === "google"}
        />
        <OAuthButton
          provider="github"
          onClick={() => handleOAuth("github")}
          loading={oauthLoading === "github"}
        />
      </div>

      <p className="mt-8 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:text-primary-400 transition-colors"
        >
          Log in
        </Link>
      </p>
    </AuthCard>
  );
}
