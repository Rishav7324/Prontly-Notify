"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StateContainer } from "@/components/ui/StateContainer";
import { AISuggestionCard } from "@/components/ui/AISuggestionCard";
import { useToast } from "@/components/ui/Toast";
import { formatDate, formatNumber } from "@/lib/utils";
import { Plus, Users, X, Sparkles, Shuffle, Hash } from "lucide-react";

interface Segment {
  id: string;
  name: string;
  count: number;
  type: "static" | "dynamic";
  lastUpdated: string;
}

interface Condition {
  id: string;
  attribute: string;
  operator: string;
  value: string;
}

const mockSegments: Segment[] = [
  { id: "1", name: "Active Users", count: 8450, type: "dynamic", lastUpdated: "2026-06-22" },
  { id: "2", name: "Newsletter Engaged", count: 3200, type: "dynamic", lastUpdated: "2026-06-20" },
  { id: "3", name: "Q2 Campaign Opens", count: 1800, type: "static", lastUpdated: "2026-06-15" },
];

const attributes = [
  { value: "subscribed_at", label: "Subscribed Date" },
  { value: "last_clicked", label: "Last Clicked" },
  { value: "browser", label: "Browser" },
  { value: "country", label: "Country" },
  { value: "campaigns_opened", label: "Campaigns Opened" },
];

const operators = [
  { value: "gt", label: "Greater than" },
  { value: "lt", label: "Less than" },
  { value: "eq", label: "Equals" },
  { value: "contains", label: "Contains" },
  { value: "gte", label: "≥" },
  { value: "lte", label: "≤" },
];

const columns: Column<Segment>[] = [
  { key: "name", label: "Name", render: (s) => <span className="font-medium text-text-primary">{s.name}</span> },
  { key: "count", label: "Subscribers", render: (s) => formatNumber(s.count) },
  { key: "type", label: "Type", render: (s) => <Badge variant={s.type === "dynamic" ? "info" : "default"} size="sm">{s.type}</Badge> },
  { key: "lastUpdated", label: "Last Updated", render: (s) => formatDate(s.lastUpdated) },
];

export default function SegmentsPage() {
  const { addToast } = useToast();
  const [conditions, setConditions] = useState<Condition[]>([
    { id: "1", attribute: "country", operator: "eq", value: "India" },
  ]);
  const [logic, setLogic] = useState<"and" | "or">("and");
  const [state] = useState<"default" | "loading" | "empty" | "error">("default");

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      { id: String(Date.now()), attribute: "subscribed_at", operator: "gt", value: "" },
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCondition = (id: string, field: keyof Condition, value: string) => {
    setConditions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Segments</h1>
          <p className="mt-1 text-sm text-text-muted">Segment your audience for targeted campaigns</p>
        </div>
        <Button onClick={() => addToast("Creating new segment...", "success")} icon={<Plus className="h-4 w-4" />}>
          New Segment
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <AISuggestionCard
          className="lg:col-span-1"
          onAccept={() => addToast("Applied highly engaged segment", "success")}
          onReject={() => addToast("Dismissed", "info")}
        >
          <p className="font-medium text-text-primary">Highly Engaged Users</p>
          <p className="mt-1 text-xs text-text-muted">~3,200 subscribers</p>
          <p className="mt-1 text-xs text-text-secondary">Users who opened 5+ campaigns in last 30 days</p>
        </AISuggestionCard>
        <AISuggestionCard
          className="lg:col-span-1"
          onAccept={() => addToast("Applied at-risk segment", "success")}
          onReject={() => addToast("Dismissed", "info")}
        >
          <p className="font-medium text-text-primary">At-Risk Subscribers</p>
          <p className="mt-1 text-xs text-text-muted">~1,100 subscribers</p>
          <p className="mt-1 text-xs text-text-secondary">Haven&apos;t opened any campaigns in 60+ days</p>
        </AISuggestionCard>
        <AISuggestionCard
          className="lg:col-span-1"
          onAccept={() => addToast("Applied new this week segment", "success")}
          onReject={() => addToast("Dismissed", "info")}
        >
          <p className="font-medium text-text-primary">New This Week</p>
          <p className="mt-1 text-xs text-text-muted">~890 subscribers</p>
          <p className="mt-1 text-xs text-text-secondary">Subscribed in the last 7 days</p>
        </AISuggestionCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <Shuffle className="h-5 w-5" />
              Rule Builder
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {conditions.map((c, i) => (
              <div key={c.id} className="flex flex-wrap items-end gap-2">
                {i > 0 && (
                  <div className="flex items-center pb-2">
                    <button
                      onClick={() => setLogic(logic === "and" ? "or" : "and")}
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        logic === "and" ? "bg-primary/20 text-primary" : "bg-warning/20 text-warning"
                      }`}
                    >
                      {logic.toUpperCase()}
                    </button>
                  </div>
                )}
                <Select
                  options={attributes}
                  value={c.attribute}
                  onChange={(v) => updateCondition(c.id, "attribute", v)}
                  className="w-44"
                />
                <Select
                  options={operators}
                  value={c.operator}
                  onChange={(v) => updateCondition(c.id, "operator", v)}
                  className="w-36"
                />
                <Input
                  placeholder="Value"
                  value={c.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCondition(c.id, "value", e.target.value)}
                  containerClassName="w-36"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCondition(c.id)}
                  className="mb-0.5"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addCondition} icon={<Plus className="h-3 w-3" />}>
              Add Condition
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-text-muted" />
              <span className="text-text-muted">Estimated reach:</span>
              <span className="font-semibold text-text-primary">~3,200 subscribers</span>
            </div>
            <Button size="sm" onClick={() => addToast("Segment created from rules!", "success")}>
              <Hash className="mr-1 h-3 w-3" /> Create Segment
            </Button>
          </div>
        </CardContent>
      </Card>

      <StateContainer
        state={state}
        emptyMessage="No segments yet. Create one using the rule builder above."
      >
        <DataTable
          columns={columns}
          data={mockSegments}
          keyExtractor={(s) => s.id}
          sortable
        />
      </StateContainer>
    </div>
  );
}
