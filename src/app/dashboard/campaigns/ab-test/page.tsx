"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { StateContainer } from "@/components/ui/StateContainer";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import {
  TestTube,
  Plus,
  Trash2,
  BarChart3,
  Loader2,
} from "lucide-react";


interface ABTest {
  id: string;
  title: string;
  variants: { title: string; body: string; percentage: number }[];
  status: "running" | "completed" | "draft";
  winnerId: string | null;
  durationHours: number;
  sentAt: string | null;
  createdAt: string;
}

type State = "default" | "loading" | "empty" | "error";

export default function ABTestPage() {
  const { addToast } = useToast();
  const [state, setState] = useState<State>("loading");
  const [tests, setTests] = useState<ABTest[]>([]);

  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [variantATitle, setVariantATitle] = useState("");
  const [variantABody, setVariantABody] = useState("");
  const [variantBTitle, setVariantBTitle] = useState("");
  const [variantBBody, setVariantBBody] = useState("");
  const [splitA, setSplitA] = useState(50);
  const [durationHours, setDurationHours] = useState(24);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function load() {
      setState("loading");
      try {
        const res = await fetch("/api/v1/campaigns/ab-tests");
        const json = await res.json();
        if (json.success) {
          setTests(json.data || []);
          setState(json.data?.length === 0 ? "empty" : "default");
        } else {
          setState("error");
        }
      } catch {
        setState("error");
      }
    }
    load();
  }, []);

  const handleCreate = useCallback(async () => {
    if (!title || !variantATitle || !variantABody || !variantBTitle || !variantBBody) {
      addToast("Please fill in all fields", "error");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/v1/campaigns/ab-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          variants: [
            { title: variantATitle, body: variantABody, percentage: splitA },
            { title: variantBTitle, body: variantBBody, percentage: 100 - splitA },
          ],
          duration_hours: durationHours,
        }),
      });
      const json = await res.json();
      if (json.success) {
        addToast("A/B test created", "success");
        setTests((prev) => [json.data, ...prev]);
        setShowCreate(false);
        resetForm();
        setState("default");
      } else {
        addToast(json.error || "Failed to create A/B test", "error");
      }
    } catch {
      addToast("Failed to create A/B test", "error");
    } finally {
      setCreating(false);
    }
  }, [title, variantATitle, variantABody, variantBTitle, variantBBody, splitA, durationHours, addToast]);

  const resetForm = () => {
    setTitle("");
    setVariantATitle("");
    setVariantABody("");
    setVariantBTitle("");
    setVariantBBody("");
    setSplitA(50);
    setDurationHours(24);
  };

  const handleDeclareWinner = async (testId: string, variantIndex: number) => {
    try {
      const res = await fetch(`/api/v1/campaigns/ab-tests/${testId}/declare-winner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant_index: variantIndex }),
      });
      const json = await res.json();
      if (json.success) {
        addToast("Winner declared", "success");
        setTests((prev) =>
          prev.map((t) =>
            t.id === testId ? { ...t, status: "completed", winnerId: String(variantIndex) } : t
          )
        );
      } else {
        addToast(json.error, "error");
      }
    } catch {
      addToast("Failed to declare winner", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">A/B Test Campaigns</h1>
          <p className="mt-1 text-sm text-text-muted">Test notification variants to optimize engagement</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)} icon={<TestTube className="h-4 w-4" />}>
          {showCreate ? "Cancel" : "New A/B Test"}
        </Button>
      </div>

      {showCreate && (
        <Card variant="featured">
          <CardHeader>
            <CardTitle>Create A/B Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Input
              label="Test Name"
              placeholder="e.g. Welcome Offer Test"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <Badge variant="primary" size="sm">Variant A</Badge>
                <Input
                  label="Title"
                  placeholder="Variant A title"
                  value={variantATitle}
                  onChange={(e) => setVariantATitle(e.target.value)}
                />
                <Input
                  as="textarea"
                  label="Body"
                  placeholder="Variant A body"
                  value={variantABody}
                  onChange={(e) => setVariantABody(e.target.value)}
                />
              </div>

              <div className="space-y-3 rounded-lg border border-border p-4">
                <Badge variant="default" size="sm">Variant B</Badge>
                <Input
                  label="Title"
                  placeholder="Variant B title"
                  value={variantBTitle}
                  onChange={(e) => setVariantBTitle(e.target.value)}
                />
                <Input
                  as="textarea"
                  label="Body"
                  placeholder="Variant B body"
                  value={variantBBody}
                  onChange={(e) => setVariantBBody(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                  Split (Variant A: {splitA}% / Variant B: {100 - splitA}%)
                </label>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={splitA}
                  onChange={(e) => setSplitA(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>A: {splitA}%</span>
                  <span>B: {100 - splitA}%</span>
                </div>
              </div>

              <Input
                label="Duration (hours)"
                type="number"
                min={1}
                max={720}
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                hint="Auto-select winner after this many hours"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCreate} loading={creating} icon={<TestTube className="h-4 w-4" />}>
                Create A/B Test
              </Button>
              <Button variant="ghost" onClick={() => { setShowCreate(false); resetForm(); }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <StateContainer state={state} emptyMessage="No A/B tests yet. Create your first split test.">
        <div className="space-y-4">
          {tests.map((test) => (
            <Card key={test.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CardTitle>{test.title}</CardTitle>
                  <Badge
                    variant={test.status === "running" ? "info" : test.status === "completed" ? "success" : "default"}
                    size="sm"
                  >
                    {test.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {test.variants.map((v, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-lg border p-4",
                        test.winnerId === String(i)
                          ? "border-success/30 bg-success/5"
                          : "border-border bg-background"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={i === 0 ? "primary" : "default"} size="sm">
                          Variant {i === 0 ? "A" : "B"} ({v.percentage}%)
                        </Badge>
                        {test.winnerId === String(i) && (
                          <span className="text-xs font-medium text-success">Winner</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-text-primary">{v.title}</p>
                      <p className="mt-1 text-xs text-text-muted">{v.body}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>Duration: {test.durationHours}h</span>
                  {test.status === "running" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeclareWinner(test.id, 0)}
                      icon={<BarChart3 className="h-3.5 w-3.5" />}
                    >
                      Declare Winner
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </StateContainer>
    </div>
  );
}