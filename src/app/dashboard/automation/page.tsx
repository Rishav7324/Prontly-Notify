"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { StateContainer } from "@/components/ui/StateContainer";
import { useToast } from "@/components/ui/Toast";
import {
  Plus,
  Workflow,
  Timer,
  Send,
  Split,
  Trash2,
  GripVertical,
  Users,
  MousePointerClick,
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

const emptySteps: Step[] = [
  { id: "1", kind: "wait", label: "Wait 1 day", config: { duration: "1" } },
  { id: "2", kind: "send", label: "Send welcome notification", config: { title: "Welcome!" } },
  { id: "3", kind: "wait", label: "Wait 3 days", config: { duration: "3" } },
  { id: "4", kind: "condition", label: "If clicked", config: { metric: "clicked" } },
  { id: "5", kind: "send", label: "Send follow-up", config: { title: "Still interested?" } },
];

const mockAutomations: Automation[] = [
  { id: "1", name: "Welcome Series", active: true, triggered: 1250, steps: emptySteps },
  { id: "2", name: "Re-engagement", active: false, triggered: 430, steps: emptySteps },
];

const stepIcons: Record<StepKind, React.ReactNode> = {
  wait: <Timer className="h-4 w-4 text-warning" />,
  send: <Send className="h-4 w-4 text-primary" />,
  condition: <Split className="h-4 w-4 text-info" />,
};

const stepColors: Record<StepKind, string> = {
  wait: "border-l-warning",
  send: "border-l-primary",
  condition: "border-l-info",
};

export default function AutomationPage() {
  const { addToast } = useToast();
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);
  const [showTemplate, setShowTemplate] = useState(false);
  const [state] = useState<"default" | "loading" | "empty" | "error">("default");

  const toggleActive = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
    addToast("Automation status updated", "success");
  };

  const handleSelectTemplate = () => {
    setShowTemplate(false);
    addToast("New automation created from template!", "success");
  };

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

      <StateContainer
        state={state}
        emptyMessage="No automations yet. Create your first drip campaign."
        emptyAction={
          <Button onClick={() => setShowTemplate(true)} icon={<Plus className="h-4 w-4" />}>
            Create Automation
          </Button>
        }
      >
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
                    onChange={() => toggleActive(auto.id)}
                    label={auto.active ? "Active" : "Paused"}
                  />
                </div>

                <div className="relative mt-6 space-y-0">
                  {auto.steps.map((step, i) => (
                    <div key={step.id} className="flex">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface ${stepColors[step.kind].replace("border-l-", "")}`}
                        >
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
      </StateContainer>

      <Modal open={showTemplate} onClose={() => setShowTemplate(false)} title="Choose a Template" size="lg">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={handleSelectTemplate}
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
