"use client";

import { Suspense, useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthCard } from "@/components/forms/AuthCard";
import { OAuthButton } from "@/components/forms/OAuthButton";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Loader2, AlertCircle, ShieldAlert } from "lucide-react";

function getFirebaseErrorMessage(code: string): string {
  const map: Record<string, string> = {
    "auth/invalid-email": "Invalid email address format.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Try again.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/popup-closed-by-user": "Sign-in cancelled. Try again.",
    "auth/popup-blocked": "Pop-up was blocked. Allow pop-ups for this site.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const redirectParam = searchParams.get("redirect");

  const validate = (): boolean => {
    if (!email.trim()) { setError("Email is required."); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return false; }
    if (!password) { setError("Password is required."); return false; }
    return true;
  };

  const enforceStaff = async (): Promise<boolean> => {
    const user = auth.currentUser;
    if (!user) return false;
    const idToken = await user.getIdToken();
    const res = await fetch("/api/v1/users/me", {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    const data = await res.json();
    return !!(data.success && data.data?.is_staff);
  };

  const doRedirect = () => {
    const dest = redirectParam && !redirectParam.startsWith("/login") ? redirectParam : "/admin";
    router.replace(dest);
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const isStaff = await enforceStaff();
      if (!isStaff) {
        await auth.signOut();
        setError("This portal is for administrators only.");
        setLoading(false);
        return;
      }
      addToast("Welcome, admin!", "success");
      doRedirect();
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string };
      setError(getFirebaseErrorMessage(firebaseErr.code || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async () => {
    setError("");
    setOauthLoading("google");
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      const isStaff = await enforceStaff();
      if (!isStaff) {
        await auth.signOut();
        setError("This portal is for administrators only.");
        setOauthLoading(null);
        return;
      }
      doRedirect();
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
    <AuthCard title="Administrator Sign In" subtitle="Restricted staff portal">
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-warning/30 bg-warning-subtle p-3 text-sm text-text-secondary">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" />
        <span>This portal is for Prontly staff only. User accounts are not permitted.</span>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-error/30 bg-error-subtle p-3 text-sm text-error">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="admin@prontly.in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          autoFocus
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Admin Sign In
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface-glass px-2 text-text-muted">or</span>
        </div>
      </div>

      <OAuthButton provider="google" onClick={handleOAuth} loading={oauthLoading === "google"} />

      <p className="mt-8 text-center text-sm text-text-muted">
        Not an admin?{" "}
        <Link href="/login" className="font-medium text-primary hover:text-primary-400 transition-colors">
          User sign in &rarr;
        </Link>
      </p>
    </AuthCard>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
