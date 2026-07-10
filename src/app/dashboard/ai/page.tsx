"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useAICredits } from "@/hooks/useAICredits";
import {
  Sparkles,
  PenLine,
  TrendingUp,
  Clock,
  Megaphone,
  Users,
  BarChart3,
  Zap,
  ArrowRight,
  Lightbulb,
  Loader2,
} from "lucide-react";

interface AiFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const features: AiFeature[] = [
  { id: "title", title: "AI Title Generator", description: "Generate high-CTR notification titles", icon: <PenLine className="h-5 w-5" />, color: "text-primary" },
  { id: "ctr", title: "CTR Optimizer", description: "Optimize your copy for maximum clicks", icon: <TrendingUp className="h-5 w-5" />, color: "text-success" },
  { id: "schedule", title: "Smart Scheduling", description: "Find the best time to send", icon: <Clock className="h-5 w-5" />, color: "text-warning" },
  { id: "recommend", title: "Campaign Recommendations", description: "AI suggests next campaign strategies", icon: <Megaphone className="h-5 w-5" />, color: "text-info" },
  { id: "segment", title: "Audience Segmentation", description: "Auto-discover audience segments", icon: <Users className="h-5 w-5" />, color: "text-primary" },
  { id: "analytics", title: "Analytics Summaries", description: "Natural language performance reports", icon: <BarChart3 className="h-5 w-5" />, color: "text-success" },
];

export default function AiToolsPage() {
  const { addToast } = useToast();
  const { credits, isLoading: creditsLoading, hasCredits, pctUsed } = useAICredits();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [titlePrompt, setTitlePrompt] = useState("");
  const [ctrCopy, setCtrCopy] = useState("");
  const [generating, setGenerating] = useState<string | null>(null);

  const handleTryIt = (id: string) => {
    if (!hasCredits) {
      setShowUpgrade(true);
      return;
    }
    setActiveFeature(activeFeature === id ? null : id);
  };

  const handleGenerateTitle = async () => {
    setGenerating("title");
    try {
      const res = await fetch("/api/v1/ai/generate-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: titlePrompt || "marketing campaign" }),
      });
      const json = await res.json();
      if (json.success) {
        addToast(`Generated: ${json.data.title ?? "Check results"}`, "success");
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to generate title", "error");
    } finally {
      setGenerating(null);
    }
  };

  const handleOptimizeCTR = async () => {
    setGenerating("ctr");
    try {
      const res = await fetch("/api/v1/ai/optimize-ctr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ copy: ctrCopy || "Check out our latest offers!" }),
      });
      const json = await res.json();
      if (json.success) addToast("Optimized version ready!", "success");
      else addToast(json.error, "error");
    } catch {
      addToast("Failed to optimize CTR", "error");
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-text-primary">AI Tools</h1>
            <Badge variant="info" size="sm">
              <Sparkles className="mr-1 h-3 w-3" /> AI
            </Badge>
          </div>
          <p className="mt-1 text-sm text-text-muted">Supercharge your campaigns with AI</p>
        </div>
      </div>

      <Card>
        <CardContent>
          {creditsLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-warning" />
                  <span className="text-sm font-medium text-text-primary">AI Credits</span>
                </div>
                <span className="text-sm text-text-muted">{credits?.used ?? 0} / {credits?.limit ?? 50} used</span>
              </div>
              <ProgressBar value={credits?.used ?? 0} max={credits?.limit ?? 50} className="mt-2" />
              {!hasCredits && (
                <p className="mt-2 text-xs text-warning">Credits exhausted. Upgrade your plan for more.</p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((f) => (
          <Card key={f.id} variant="interactive">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 ${f.color}`}>
                  {f.icon}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTryIt(f.id)}
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Try it
                </Button>
              </div>
              <h3 className="mt-4 font-medium text-text-primary">{f.title}</h3>
              <p className="mt-1 text-xs text-text-muted">{f.description}</p>

              {activeFeature === f.id && (
                <div className="mt-4 rounded-lg border border-border bg-black/[0.02] p-3">
                  {f.id === "title" && (
                    <div className="space-y-3">
                      <Input
                        placeholder="Describe your campaign (e.g. Summer Sale)"
                        value={titlePrompt}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitlePrompt(e.target.value)}
                      />
                      <Button size="sm" onClick={handleGenerateTitle} loading={generating === "title"} icon={<Sparkles className="h-3.5 w-3.5" />}>
                        Generate Titles
                      </Button>
                    </div>
                  )}
                  {f.id === "ctr" && (
                    <div className="space-y-3">
                      <Input
                        as="textarea"
                        placeholder="Paste your notification copy to optimize..."
                        value={ctrCopy}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCtrCopy(e.target.value)}
                      />
                      <Button size="sm" onClick={handleOptimizeCTR} loading={generating === "ctr"} icon={<Zap className="h-3.5 w-3.5" />}>
                        Optimize CTR
                      </Button>
                    </div>
                  )}
                  {f.id === "schedule" && (
                    <div className="space-y-3">
                      <p className="text-sm text-text-secondary">AI recommends: <strong className="text-text-primary">Tuesday, 9:00 AM</strong></p>
                      <Button size="sm" icon={<Clock className="h-3.5 w-3.5" />}>Apply Best Time</Button>
                    </div>
                  )}
                  {f.id === "recommend" && (
                    <div className="space-y-3">
                      <p className="text-sm text-text-secondary">Fetching campaign recommendations...</p>
                      <Button size="sm" icon={<Megaphone className="h-3.5 w-3.5" />}>Get Recommendations</Button>
                    </div>
                  )}
                  {f.id === "segment" && (
                    <div className="space-y-3">
                      <p className="text-sm text-text-secondary">Discover new audience segments based on behavior.</p>
                      <Button size="sm" icon={<Users className="h-3.5 w-3.5" />}>Suggest Segments</Button>
                    </div>
                  )}
                  {f.id === "analytics" && (
                    <div className="space-y-3">
                      <p className="text-sm text-text-secondary">Generate a natural language performance summary.</p>
                      <Button size="sm" icon={<BarChart3 className="h-3.5 w-3.5" />}>Generate Summary</Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {showUpgrade && (
        <Card variant="featured">
          <CardContent className="text-center">
            <p className="text-lg font-semibold text-text-primary">Upgrade to Continue</p>
            <p className="mt-1 text-sm text-text-muted">You&apos;ve used all your AI credits. Upgrade to unlock more.</p>
            <Button className="mt-4" onClick={() => { addToast("Redirecting to billing...", "info"); setShowUpgrade(false); }}>
              View Plans
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
