"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/domain/EmptyState";
import { AISuggestionCard } from "@/components/ui/AISuggestionCard";
import { useToast } from "@/components/ui/Toast";
import { formatDate, formatNumber } from "@/lib/utils";
import { Plus, Users, X, Sparkles, Shuffle, Hash, Loader2 } from "lucide-react";

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

export default function SegmentsPage() {
  const { addToast } = useToast();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [conditions, setConditions] = useState<Condition[]>([
    { id: "1", attribute: "country", operator: "eq", value: "India" },
  ]);
  const [logic, setLogic] = useState<"and" | "or">("and");
  const [previewCount, setPreviewCount] = useState<number | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/segments");
        const json = await res.json();
        if (json.success) setSegments(json.data);
      } catch {
        addToast("Failed to load segments", "error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [addToast]);

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      { id: String(Date.now()), attribute: "subscribed_at", operator: "gt", value: "" },
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  };

  const handlePreviewCount = async () => {
    setPreviewLoading(true);
    try {
      const res = await fetch("/api/v1/segments/preview-count", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conditions, logic }),
      });
      const json = await res.json();
      if (json.success) setPreviewCount(json.data.count ?? json.data.estimated_count);
    } catch {
      addToast("Failed to preview count", "error");
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleCreateSegment = async () => {
    try {
      const res = await fetch("/api/v1/segments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `Segment ${Date.now()}`, conditions, logic }),
      });
      const json = await res.json();
      if (json.success) {
        addToast("Segment created!", "success");
        setSegments((prev) => [json.data, ...prev]);
      } else addToast(json.error, "error");
    } catch {
      addToast("Failed to create segment", "error");
    }
  };

  const columns: Column<Segment>[] = [
    { key: "name", label: "Name", render: (s) => <span className="font-medium text-text-primary">{s.name}</span> },
    { key: "count", label: "Subscribers", render: (s) => formatNumber(s.count) },
    { key: "type", label: "Type", render: (s) => <Badge variant={s.type === "dynamic" ? "info" : "default"} size="sm">{s.type}</Badge> },
    { key: "lastUpdated", label: "Last Updated", render: (s) => formatDate(s.lastUpdated) },
  ];

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
          <h1 className="text-2xl font-bold text-text-primary">Segments</h1>
          <p className="mt-1 text-sm text-text-muted">Segment your audience for targeted campaigns</p>
        </div>
        <Button onClick={handleCreateSegment} icon={<Plus className="h-4 w-4" />}>
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
                  onChange={(v) => {
                    const newConditions = conditions.map((cond) =>
                      cond.id === c.id ? { ...cond, attribute: v } : cond
                    );
                    setConditions(newConditions);
                  }}
                  className="w-44"
                />
                <Select
                  options={operators}
                  value={c.operator}
                  onChange={(v) => {
                    const newConditions = conditions.map((cond) =>
                      cond.id === c.id ? { ...cond, operator: v } : cond
                    );
                    setConditions(newConditions);
                  }}
                  className="w-36"
                />
                <Input
                  placeholder="Value"
                  value={c.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newConditions = conditions.map((cond) =>
                      cond.id === c.id ? { ...cond, value: e.target.value } : cond
                    );
                    setConditions(newConditions);
                  }}
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
              <span className="font-semibold text-text-primary">
                {previewCount !== null ? `~${formatNumber(previewCount)} subscribers` : "Click preview"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handlePreviewCount} loading={previewLoading} icon={<Hash className="h-3 w-3" />}>
                Preview Count
              </Button>
              <Button size="sm" onClick={handleCreateSegment}>
                <Hash className="mr-1 h-3 w-3" /> Create Segment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {segments.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No segments yet"
          description="Create one using the rule builder above."
        />
      ) : (
        <DataTable
          columns={columns}
          data={segments}
          keyExtractor={(s) => s.id}
          sortable
        />
      )}
    </div>
  );
}
