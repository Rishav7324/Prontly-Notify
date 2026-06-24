"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { useToast } from "@/components/ui/Toast";
import { useActiveSite } from "@/hooks/useActiveSite";
import {
  Copy,
  CheckCircle2,
  XCircle,
  Download,
  TestTube,
  Globe,
  ShoppingCart,
  Blocks,
  Code2,
  Database,
  Loader2,
} from "lucide-react";

const platforms = [
  { id: "wordpress", label: "WordPress", icon: <Globe className="h-4 w-4" /> },
  { id: "shopify", label: "Shopify", icon: <ShoppingCart className="h-4 w-4" /> },
  { id: "webflow", label: "Webflow", icon: <Blocks className="h-4 w-4" /> },
  { id: "custom", label: "Custom JS", icon: <Code2 className="h-4 w-4" /> },
  { id: "rest", label: "REST API", icon: <Database className="h-4 w-4" /> },
];

export default function IntegrationPage() {
  const { addToast } = useToast();
  const { activeSite } = useActiveSite();
  const [activePlatform, setActivePlatform] = useState("custom");
  const [loading, setLoading] = useState(true);
  const [installed, setInstalled] = useState(false);
  const [apiSnippet, setApiSnippet] = useState("");
  const [swSnippet, setSwSnippet] = useState("");
  const [checklist, setChecklist] = useState<{ label: string; done: boolean }[]>([
    { label: "SDK script loaded on all pages", done: false },
    { label: "Service worker registered", done: false },
    { label: "HTTPS enabled", done: true },
    { label: "VAPID keys configured", done: false },
    { label: "Permission prompt triggered", done: false },
  ]);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (!activeSite) return;
    const siteId = activeSite.id;
    async function load() {
      setLoading(true);
      try {
        const [snippetRes, verifyRes] = await Promise.all([
          fetch(`/api/v1/sites/${siteId}/sdk-snippet`),
          fetch(`/api/v1/sites/${siteId}/verify-install`),
        ]);
        const snippetJson = await snippetRes.json();
        const verifyJson = await verifyRes.json();

        if (snippetJson.success) {
          setApiSnippet(snippetJson.data.snippet ?? snippetJson.data.sdk_code ?? "// SDK code here");
          setSwSnippet(snippetJson.data.service_worker ?? snippetJson.data.sw_code ?? "// Service worker code here");
        } else {
          setApiSnippet(`// Prontly Notify SDK\nconst prontly = new ProntlyClient({ siteId: "${siteId}" });\nprontly.subscribe();`);
          setSwSnippet('importScripts("https://cdn.prontly.com/sdk/service-worker.js");');
        }

        if (verifyJson.success) {
          setInstalled(verifyJson.data.installed ?? false);
          if (verifyJson.data.checklist) {
            setChecklist(verifyJson.data.checklist);
          }
        }
      } catch {
        setApiSnippet(`// Prontly Notify SDK\nconst prontly = new ProntlyClient({ siteId: "${siteId}" });\nprontly.subscribe();`);
        setSwSnippet('importScripts("https://cdn.prontly.com/sdk/service-worker.js");');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeSite]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast("Copied to clipboard!", "success");
  };

  const handleTestInstallation = async () => {
    if (!activeSite) return;
    setTesting(true);
    try {
      const res = await fetch(`/api/v1/sites/${activeSite.id}/verify-install`);
      const json = await res.json();
      if (json.success) {
        setInstalled(json.data.installed ?? false);
        addToast(json.data.installed ? "Installation verified!" : "Installation not detected", json.data.installed ? "success" : "warning");
      }
    } catch {
      addToast("Failed to verify installation", "error");
    } finally {
      setTesting(false);
    }
  };

  const handleSendTest = async () => {
    if (!activeSite) return;
    try {
      const res = await fetch(`/api/v1/sites/${activeSite.id}/send-test-notification`, { method: "POST" });
      const json = await res.json();
      if (json.success) addToast("Test notification sent!", "success");
      else addToast(json.error, "error");
    } catch {
      addToast("Failed to send test notification", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Integration</h1>
            <p className="mt-1 text-sm text-text-muted">Connect your website to Prontly Notify</p>
          </div>
          <Badge variant={installed ? "success" : "default"} size="sm">
            {installed ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
            {installed ? "Live" : "Not Detected"}
          </Badge>
        </div>
      </div>

      <Tabs tabs={platforms} activeTab={activePlatform} onChange={setActivePlatform} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Installation Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-text-secondary">1. Add the SDK</p>
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 text-sm text-text-secondary">
                    <code>{apiSnippet}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(apiSnippet)}
                    icon={<Copy className="h-3.5 w-3.5" />}
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-text-secondary">2. Register Service Worker</p>
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg border border-border bg-background p-4 text-sm text-text-secondary">
                    <code>{swSnippet}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(swSnippet)}
                    icon={<Copy className="h-3.5 w-3.5" />}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleCopy(apiSnippet)} icon={<Copy className="h-4 w-4" />}>
                  Copy Full Snippet
                </Button>
                <Button variant="outline" icon={<Download className="h-4 w-4" />}>
                  Download Service Worker
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.done ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-text-muted" />
                    )}
                    <span className={`text-sm ${item.done ? "text-text-primary" : "text-text-muted"}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4">
              <Button
                className="w-full"
                onClick={handleTestInstallation}
                loading={testing}
                icon={<TestTube className="h-4 w-4" />}
              >
                Test Installation
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSendTest}
              >
                Send Test Notification
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Documentation", "Troubleshooting", "Web Push API Spec", "Best Practices"].map((link) => (
                <button
                  key={link}
                  onClick={() => addToast(`Opening ${link}...`, "info")}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                >
                  {link}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
