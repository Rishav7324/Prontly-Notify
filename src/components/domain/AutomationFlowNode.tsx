"use client";

import { Clock, Send, GitFork, Plus, GripVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FlowNodeProps {
  type: "trigger" | "wait" | "send" | "condition";
  label: string;
  description?: string;
  active?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: ReactNode;
}

const NODE_ICONS = {
  trigger: GitFork,
  wait: Clock,
  send: Send,
  condition: GitFork,
};

const NODE_COLORS = {
  trigger: "border-primary/40 bg-primary/5",
  wait: "border-warning/40 bg-warning/5",
  send: "border-success/40 bg-success/5",
  condition: "border-info/40 bg-info/5",
};

export function AutomationFlowNode({ type, label, description, active, onEdit, onDelete, children }: FlowNodeProps) {
  const Icon = NODE_ICONS[type];
  return (
    <div className="flex flex-col items-center">
      <Card className={cn("w-full max-w-sm transition-all", NODE_COLORS[type], active && "ring-1 ring-primary")}>
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <GripVertical className="size-4 text-text-muted shrink-0 cursor-grab" />
            <div className={cn("rounded-lg p-2", NODE_COLORS[type])}>
              <Icon className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-text-primary">{label}</p>
                <Badge variant="default" size="sm">{type}</Badge>
              </div>
              {description && <p className="text-xs text-text-muted truncate">{description}</p>}
            </div>
            <div className="flex items-center gap-1">
              {onEdit && <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>}
              {onDelete && <Button variant="ghost" size="sm" onClick={onDelete} className="text-error">Del</Button>}
            </div>
          </div>
          {children}
        </CardContent>
      </Card>
      <div className="h-6 w-px bg-border" />
    </div>
  );
}

export function AutomationFlowConnector() {
  return <div className="flex justify-center py-1"><div className="h-4 w-px bg-border" /></div>;
}

export function AddStepButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center py-2">
      <Button variant="outline" size="sm" onClick={onClick}>
        <Plus className="size-3.5 mr-1" /> Add Step
      </Button>
    </div>
  );
}
