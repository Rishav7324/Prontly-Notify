"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, AlertCircle } from "lucide-react";

function getFirebaseErrorMessage(code: string): string {
  const map: Record<string, string> = {
    "auth/invalid-email": "Invalid email address format.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/popup-closed-by-user": "Sign-in cancelled. Try again.",
    "auth/popup-blocked": "Pop-up was blocked. Allow pop-ups for this site.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  if (authLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  const validate = (): boolean => {
    if (!email.trim()) { setError("Email is required."); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return false; }
    if (!password) { setError("Password is required."); return false; }
    return true;
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
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
      const authProvider = provider === "google"
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();
      await signInWithPopup(auth, authProvider);
      router.replace("/dashboard");
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
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-text-primary">Welcome back</h1>
        <p className="mt-2 text-sm text-text-secondary">Sign in to your Prontly account</p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          autoFocus
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <div className="mt-1.5 flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:text-primary-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" loading={loading} className="w-full" size="lg">
          <Mail className="size-4" />
          Log In
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-text-muted">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleOAuth("google")}
          loading={oauthLoading === "google"}
          disabled={!!oauthLoading}
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleOAuth("github")}
          loading={oauthLoading === "github"}
          disabled={!!oauthLoading}
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-primary hover:text-primary-400 transition-colors">
          Create an account
        </Link>
      </p>
    </>
  );
}
