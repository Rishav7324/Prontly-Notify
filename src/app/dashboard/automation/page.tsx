"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/domain/EmptyState";
import { useToast } from "@/components/ui/Toast";
import {
  Plus,
  Workflow,
  Timer,
  Send,
  Split,
  Trash2,
  Users,
  MousePointerClick,
  Loader2,
} from "lucide-react";

type StepKind = "wait" | "send" | "condition";

interface Step {
  id: string;
  kind: StepKind;
  label: string;
  config: Record<string, string>;
}

interface Automation {
  id: string;
  name: string;
  active: boolean;
  triggered: number;
  steps: Step[];
}

const templates = [
  { id: "welcome", name: "Welcome Series", description: "3-email onboarding sequence for new subscribers", icon: Users },
  { id: "reengage", name: "Re-engagement", description: "Win back inactive subscribers", icon: MousePointerClick },
  { id: "abandoned", name: "Abandoned Content", description: "Remind users about unfinished reads", icon: Timer },
];

const stepIcons: Record<StepKind, React.ReactNode> = {
  wait: <Timer className="h-4 w-4 text-warning" />,
  send: <Send className="h-4 w-4 text-primary" />,
  condition: <Split className="h-4 w-4 text-info" />,
};

export default function AutomationPage() {
  const { addToast } = useToast();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTemplate, setShowTemplate] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/automations");
        const json = await res.json();
        if (json.success) setAutomations(json.data);
      } catch {
        addToast("Failed to load automations", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [addToast]);

  const toggleActive = async (id: string, current: boolean) => {
    setToggling(id);
    try {
      const res = await fetch(`/api/v1/automations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !current }),
      });
      const json = await res.json();
      if (json.success) {
        setAutomations((prev) =>
          prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
        );
        addToast("Automation status updated", "success");
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to update automation", "error");
    } finally {
      setToggling(null);
    }
  };

  const handleSelectTemplate = async (templateId: string) => {
    try {
      const template = templates.find((t) => t.id === templateId);
      const res = await fetch("/api/v1/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: template?.name ?? "New Automation",
          template_id: templateId,
          active: false,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setAutomations((prev) => [...prev, json.data]);
        addToast("New automation created from template!", "success");
        setShowTemplate(false);
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to create automation", "error");
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
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Automation</h1>
          <p className="mt-1 text-sm text-text-muted">Drip campaigns and automated workflows</p>
        </div>
        <Button onClick={() => setShowTemplate(true)} icon={<Plus className="h-4 w-4" />}>
          New Automation
        </Button>
      </div>

      {automations.length === 0 ? (
        <EmptyState
          icon={<Workflow className="h-8 w-8" />}
          title="No automations yet"
          description="Create your first drip campaign."
          action={
            <Button onClick={() => setShowTemplate(true)} icon={<Plus className="h-4 w-4" />}>
              Create Automation
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {automations.map((auto) => (
            <Card key={auto.id}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Workflow className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-text-primary">{auto.name}</p>
                      <p className="text-xs text-text-muted">{auto.triggered} users triggered</p>
                    </div>
                  </div>
                  <Toggle
                    checked={auto.active}
                    onChange={() => toggleActive(auto.id, auto.active)}
                    disabled={toggling === auto.id}
                    label={auto.active ? "Active" : "Paused"}
                  />
                </div>

                <div className="relative mt-6 space-y-0">
                  {auto.steps.map((step, i) => (
                    <div key={step.id} className="flex">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface">
                          {stepIcons[step.kind]}
                        </div>
                        {i < auto.steps.length - 1 && (
                          <div className="h-8 w-0.5 bg-border" />
                        )}
                      </div>
                      <div className="ml-3 flex-1 pb-6">
                        <div className="flex items-center justify-between rounded-lg border border-border bg-white/[0.02] px-4 py-3">
                          <div>
                            <Badge variant="default" size="sm" className="mb-1">
                              {step.kind}
                            </Badge>
                            <p className="text-sm text-text-primary">{step.label}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => addToast("Step removed", "info")}>
                            <Trash2 className="h-4 w-4 text-text-muted" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" onClick={() => addToast("Adding step...", "info")}>
                  <Plus className="mr-1 h-3 w-3" /> Add Step
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal open={showTemplate} onClose={() => setShowTemplate(false)} title="Choose a Template" size="lg">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTemplate(t.id)}
              className="rounded-xl border border-border bg-surface p-4 text-left transition-colors hover:border-primary/50 hover:bg-white/[0.02]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <t.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-medium text-text-primary">{t.name}</p>
              <p className="mt-1 text-xs text-text-muted">{t.description}</p>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
