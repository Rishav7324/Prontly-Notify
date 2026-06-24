"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
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

const featurePanels: Record<string, React.ReactNode> = {
  title: (
    <div className="space-y-3">
      <Input placeholder="Describe your campaign (e.g. Summer Sale)" />
      <Button size="sm" icon={<Sparkles className="h-3.5 w-3.5" />}>Generate Titles</Button>
    </div>
  ),
  ctr: (
    <div className="space-y-3">
      <Input as="textarea" placeholder="Paste your notification copy to optimize..." />
      <Button size="sm" icon={<Zap className="h-3.5 w-3.5" />}>Optimize CTR</Button>
    </div>
  ),
  schedule: (
    <div className="space-y-3">
      <p className="text-sm text-text-secondary">AI recommends: <strong className="text-text-primary">Tuesday, 9:00 AM</strong></p>
      <Button size="sm" icon={<Clock className="h-3.5 w-3.5" />}>Apply Best Time</Button>
    </div>
  ),
};

export default function AiToolsPage() {
  const { addToast } = useToast();
  const [credits] = useState({ used: 42, total: 50 });
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const creditsExhausted = credits.used >= credits.total;

  const handleTryIt = (id: string) => {
    if (creditsExhausted) {
      setShowUpgrade(true);
      return;
    }
    setActiveFeature(activeFeature === id ? null : id);
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium text-text-primary">AI Credits</span>
            </div>
            <span className="text-sm text-text-muted">{credits.used} / {credits.total} used</span>
          </div>
          <ProgressBar value={credits.used} max={credits.total} className="mt-2" />
          {creditsExhausted && (
            <p className="mt-2 text-xs text-warning">Credits exhausted. Upgrade your plan for more.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((f) => (
          <Card key={f.id} variant="interactive">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 ${f.color}`}>
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

              {activeFeature === f.id && featurePanels[f.id] && (
                <div className="mt-4 rounded-lg border border-border bg-white/[0.02] p-3">
                  {featurePanels[f.id]}
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
