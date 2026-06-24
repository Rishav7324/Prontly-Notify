"use client";

import { useState, useEffect, useCallback, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Globe, Copy, Check, ChevronRight, SkipForward,
  Monitor, ShoppingBag, Code, Sparkles, ArrowRight, Loader2,
  RefreshCw, AlertCircle
} from "lucide-react";

type Platform = "wordpress" | "shopify" | "custom" | null;

interface SiteData {
  url: string;
  name: string;
  category: string;
  platform: Platform;
}

const CATEGORIES = [
  "Blog / Content",
  "E-commerce",
  "SaaS",
  "News / Media",
  "Community",
  "Other",
];

const PLATFORMS: { id: Platform; icon: typeof Code; label: string; desc: string }[] = [
  { id: "wordpress", icon: Monitor, label: "WordPress", desc: "Plugin installation" },
  { id: "shopify", icon: ShoppingBag, label: "Shopify", desc: "Theme integration" },
  { id: "custom", icon: Code, label: "Custom", desc: "Any framework or static site" },
];

const SERVICE_WORKER_SNIPPET = `// sw.js - Service Worker for Push Notifications
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  self.registration.showNotification(data.title || "Prontly Notify", {
    body: data.body || "",
    icon: data.icon || "/icon.png",
    badge: "/badge.png",
    data: data.url ? { url: data.url } : {},
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/";
  event.waitUntil(clients.openWindow(url));
});`;

const REGISTRATION_SNIPPET = `// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("SW registered"))
    .catch(console.error);
}

// Prontly initialization
import { ProntlyClient } from "@prontly/sdk";

const prontly = new ProntlyClient({
  siteId: "YOUR_SITE_ID",
});

prontly.init();`;

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
}

function useConfetti(active: boolean): ConfettiPiece[] {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }
    const colors = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
    const generated: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[i % colors.length],
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 2,
    }));
    setPieces(generated);
  }, [active]);

  return pieces;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState(1);
  const [site, setSite] = useState<SiteData>({
    url: "",
    name: "",
    category: "Blog / Content",
    platform: null,
  });
  const [siteId, setSiteId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [success, setSuccess] = useState(false);
  const snippetRef = useRef<HTMLPreElement>(null);

  const confettiPieces = useConfetti(success);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
    } else if (!user.emailVerified) {
      router.replace("/verify-email");
    }
  }, [user, authLoading, router]);

  const validateStep1 = (): boolean => {
    if (!site.url.trim()) { setError("Website URL is required."); return false; }
    try {
      new URL(site.url.startsWith("http") ? site.url : `https://${site.url}`);
    } catch {
      setError("Enter a valid URL (e.g. https://example.com).");
      return false;
    }
    if (!site.name.trim()) { setError("Site name is required."); return false; }
    if (site.name.trim().length < 2) { setError("Site name must be at least 2 characters."); return false; }
    return true;
  };

  const handleCreateSite = async () => {
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/v1/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: site.url.startsWith("http") ? site.url : `https://${site.url}`,
          name: site.name.trim(),
          category: site.category,
          platform: site.platform,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to create site.");
      }
      const data = await res.json();
      setSiteId(data.id || data.siteId);
      setStep(3);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create site.");
    } finally {
      setSaving(false);
    }
  };

  const handleNextStep = () => {
    setError("");
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      if (!site.platform) { setError("Select a platform."); return; }
      handleCreateSite();
    }
  };

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(
        `${SERVICE_WORKER_SNIPPET}\n\n${REGISTRATION_SNIPPET.replace("YOUR_SITE_ID", siteId || "")}`
      );
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      const range = document.createRange();
      if (snippetRef.current) {
        range.selectNodeContents(snippetRef.current);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const handleVerifyInstall = async () => {
    if (!siteId) return;
    setError("");
    setVerifying(true);
    let attempts = 0;
    const maxAttempts = 30;

    const poll = async (): Promise<boolean> => {
      try {
        const res = await fetch(`/api/v1/sites/${siteId}/verify-install`);
        if (!res.ok) return false;
        const data = await res.json();
        return data.verified === true;
      } catch {
        return false;
      }
    };

    while (attempts < maxAttempts) {
      const isVerified = await poll();
      if (isVerified) {
        await fetch(`/api/v1/sites/${siteId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "active" }),
        }).catch(() => {});
        setVerified(true);
        setVerifying(false);
        setSuccess(true);
        return;
      }
      attempts++;
      await new Promise((r) => setTimeout(r, 3000));
    }

    setError("Verification timed out. Make sure you've added the snippet and try again.");
    setVerifying(false);
  };

  const handleSkip = () => {
    setSuccess(true);
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (success) {
    return (
      <div className="relative overflow-hidden">
        {confettiPieces.map((p) => (
          <div
            key={p.id}
            className="absolute top-0 size-2 rounded-sm animate-fall"
            style={{
              left: `${p.x}%`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}

        <Card className="text-center relative z-10">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-success/10">
            <Sparkles className="size-8 text-success" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-text-primary">
            {verified ? "You're all set!" : "Welcome aboard!"}
          </h1>
          <p className="mb-8 text-sm text-text-secondary">
            {verified
              ? "Your website is connected and ready to send push notifications."
              : "You can set up your website integration later from the dashboard."}
          </p>
          <Button size="lg" className="w-full" onClick={handleGoToDashboard}>
            Go to Dashboard
            <ArrowRight className="size-4" />
          </Button>
        </Card>

        <style jsx>{`
          @keyframes fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
          }
          .animate-fall {
            animation: fall 2s ease-in forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  s <= step
                    ? "bg-primary text-white"
                    : "bg-white/10 text-text-muted"
                }`}
              >
                {s < step ? <Check className="size-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-colors ${
                    s < step ? "bg-primary" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-text-muted">
          Step {step} of 3
          {step === 1 && " — Website details"}
          {step === 2 && " — Choose platform"}
          {step === 3 && " — Integration"}
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {step === 1 && (
        <Card>
          <h2 className="mb-1 text-lg font-semibold text-text-primary">Add your website</h2>
          <p className="mb-6 text-sm text-text-muted">We&apos;ll generate the integration code for your site.</p>

          <form
            onSubmit={(e: FormEvent) => { e.preventDefault(); handleNextStep(); }}
            className="space-y-4"
          >
            <Input
              label="Website URL"
              type="url"
              placeholder="https://example.com"
              value={site.url}
              onChange={(e) => setSite({ ...site, url: e.target.value })}
              autoFocus
            />
            <Input
              label="Site Name"
              type="text"
              placeholder="My Blog"
              value={site.name}
              onChange={(e) => setSite({ ...site, name: e.target.value })}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Category</label>
              <select
                value={site.category}
                onChange={(e) => setSite({ ...site, category: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={handleSkip} className="flex-1">
                <SkipForward className="size-4" />
                Skip for now
              </Button>
              <Button type="submit" className="flex-1">
                Continue
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="mb-1 text-lg font-semibold text-text-primary">Choose your platform</h2>
          <p className="mb-6 text-sm text-text-muted">Select where you want to integrate push notifications.</p>

          <div className="space-y-3">
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              const selected = site.platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSite({ ...site, platform: p.id })}
                  className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-150 ${
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-surface hover:border-border-strong"
                  }`}
                >
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                      selected ? "bg-primary/10 text-primary" : "bg-white/5 text-text-secondary"
                    }`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{p.label}</p>
                    <p className="text-xs text-text-muted">{p.desc}</p>
                  </div>
                  {selected && (
                    <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                      <Check className="size-3.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button onClick={handleNextStep} loading={saving} className="flex-1">
              Continue
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <h2 className="mb-1 text-lg font-semibold text-text-primary">Add the code snippet</h2>
          <p className="mb-6 text-sm text-text-muted">
            Add this code to your website before the closing <code className="text-primary text-xs">&lt;/body&gt;</code> tag.
          </p>

          <pre
            ref={snippetRef}
            className="mb-4 overflow-x-auto rounded-lg bg-background p-4 text-xs text-text-secondary leading-relaxed border border-border"
          >
            <code>{`${SERVICE_WORKER_SNIPPET}\n\n${REGISTRATION_SNIPPET.replace("YOUR_SITE_ID", siteId || "")}`}</code>
          </pre>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={handleCopySnippet}
            >
              {copiedSnippet ? (
                <><Check className="size-4" /> Copied</>
              ) : (
                <><Copy className="size-4" /> Copy snippet</>
              )}
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={handleVerifyInstall}
              loading={verifying}
            >
              {verifying ? "Verifying..." : "I've added it"}
              {!verifying && <Check className="size-4" />}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleSkip}
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              <SkipForward className="size-3.5 inline mr-1" />
              Skip for now
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
