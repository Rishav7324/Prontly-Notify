"use client";

import { useState } from "react";
import { Plus, X, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface Condition {
  id: string;
  attribute: string;
  operator: string;
  value: string;
}

interface RuleGroup {
  id: string;
  conditions: Condition[];
  logic: "AND" | "OR";
}

interface SegmentRuleBuilderProps {
  rules: RuleGroup[];
  onChange: (rules: RuleGroup[]) => void;
  className?: string;
}

const TRIGGER_TYPES = [
  { value: "new_subscriber", label: "New Subscriber" },
  { value: "tag_added", label: "Tag Added" },
  { value: "page_visited", label: "Page Visited" },
  { value: "inactive_days", label: "Inactive N Days" },
];

const OPERATORS = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not equals" },
  { value: "contains", label: "Contains" },
  { value: "greater_than", label: "Greater than" },
  { value: "less_than", label: "Less than" },
  { value: "is_set", label: "Is set" },
];

const ATTRIBUTES = [
  { value: "browser", label: "Browser" },
  { value: "country", label: "Country" },
  { value: "os", label: "OS" },
  { value: "last_seen_days", label: "Last seen (days)" },
  { value: "subscribed_days", label: "Subscribed (days)" },
];

let idCounter = 0;
function newId() { return `rule_${++idCounter}`; }

export function SegmentRuleBuilder({ rules, onChange, className }: SegmentRuleBuilderProps) {
  const addCondition = (groupId: string) => {
    onChange(rules.map(g =>
      g.id === groupId
        ? { ...g, conditions: [...g.conditions, { id: newId(), attribute: "browser", operator: "equals", value: "" }] }
        : g
    ));
  };

  const updateCondition = (groupId: string, conditionId: string, field: keyof Condition, value: string) => {
    onChange(rules.map(g =>
      g.id === groupId
        ? { ...g, conditions: g.conditions.map(c => c.id === conditionId ? { ...c, [field]: value } : c) }
        : g
    ));
  };

  const removeCondition = (groupId: string, conditionId: string) => {
    onChange(rules.map(g =>
      g.id === groupId
        ? { ...g, conditions: g.conditions.filter(c => c.id !== conditionId) }
        : g
    ));
  };

  const toggleLogic = (groupId: string) => {
    onChange(rules.map(g =>
      g.id === groupId
        ? { ...g, logic: g.logic === "AND" ? "OR" : "AND" }
        : g
    ));
  };

  const addGroup = () => {
    onChange([...rules, { id: newId(), conditions: [{ id: newId(), attribute: "browser", operator: "equals", value: "" }], logic: "AND" }]);
  };

  const removeGroup = (groupId: string) => {
    onChange(rules.filter(g => g.id !== groupId));
  };

  return (
    <div className={cn("space-y-4", className)}>
      {rules.map((group, gi) => (
        <div key={group.id} className="rounded-lg border border-border bg-surface/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {gi > 0 && (
                <Badge variant="info" size="sm" className="cursor-pointer" onClick={() => toggleLogic(group.id)}>
                  {group.logic}
                </Badge>
              )}
              <span className="text-xs text-text-muted">Condition group {gi + 1}</span>
            </div>
            {rules.length > 1 && (
              <button onClick={() => removeGroup(group.id)} className="text-text-muted hover:text-error transition-colors">
                <X className="size-4" />
              </button>
            )}
          </div>
          <div className="space-y-2">
            {group.conditions.map((condition) => (
              <div key={condition.id} className="flex items-center gap-2 flex-wrap">
                <select
                  value={condition.attribute}
                  onChange={(e) => updateCondition(group.id, condition.id, "attribute", e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-text-primary"
                >
                  {ATTRIBUTES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
                <select
                  value={condition.operator}
                  onChange={(e) => updateCondition(group.id, condition.id, "operator", e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-text-primary"
                >
                  {OPERATORS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <input
                  value={condition.value}
                  onChange={(e) => updateCondition(group.id, condition.id, "value", e.target.value)}
                  placeholder="Value"
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-text-primary flex-1 min-w-[120px]"
                />
                <button onClick={() => removeCondition(group.id, condition.id)} className="text-text-muted hover:text-error transition-colors shrink-0">
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => addCondition(group.id)}>
            <Plus className="size-3.5 mr-1" /> Add condition
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addGroup}>
        <GitBranch className="size-3.5 mr-1" /> Add condition group (OR)
      </Button>
    </div>
  );
}
