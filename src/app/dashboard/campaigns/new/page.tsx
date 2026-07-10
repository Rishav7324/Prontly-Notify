"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { useCampaignDraftStore } from "@/store/campaignDraft";
import { SegmentRuleBuilder } from "@/components/domain/SegmentRuleBuilder";
import {
  Sparkles,
  Send,
  Clock,
  ArrowLeft,
  Save,
  Target,
  Eye,
  Loader2,
  Globe,
  Monitor,
  Smartphone,
  // Chrome and Firefox icons were removed from lucide-react 1.21
  Plus,
  Trash2,
  Image,
  Users,
  Zap,
  CalendarClock,
  CheckCircle2,
  FileEdit,
} from "lucide-react";

// ponytail: segments fetched from API on mount

type DeviceType = "chrome" | "firefox" | "edge";

export default function NewCampaignPage() {
  const { addToast } = useToast();
  const router = useRouter();
  const { draft, setField, setStep: setStoreStep, reset } = useCampaignDraftStore();

  const [submitting, setSubmitting] = useState(false);
  const [deviceToggle, setDeviceToggle] = useState<DeviceType>("chrome");
  const [aiPopoverOpen, setAiPopoverOpen] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiTitleLoading, setAiTitleLoading] = useState(false);
  const [targetMethod, setTargetMethod] = useState<"all" | "segment" | "ai">("all");
  const [segmentValue, setSegmentValue] = useState("");
  const [scheduleMethod, setScheduleMethod] = useState<"now" | "later" | "ai-optimal">("now");
  const [ctaButtons, setCtaButtons] = useState<{ label: string; url: string }[]>([]);
  const [aiSuggestTimeLoading, setAiSuggestTimeLoading] = useState(false);
  const [estimatedReach, setEstimatedReach] = useState(0);
  const [rules, setRules] = useState<any[]>([]);
  const [segments, setSegments] = useState<{ value: string; label: string }[]>([]);

  const aiRef = useRef<HTMLDivElement>(null);

  const titleMax = 65;
  const bodyMax = 240;

  useEffect(() => {
    reset("default");
    async function load() {
      try {
        const [segRes, sitesRes] = await Promise.all([
          fetch("/api/v1/segments"),
          fetch("/api/v1/sites"),
        ]);
        const segJson = await segRes.json();
        if (segJson.success && Array.isArray(segJson.data)) {
          setSegments(segJson.data.map((s: any) => ({ value: s.id, label: s.name })));
        }
        const sitesJson = await sitesRes.json();
        if (sitesJson.success) {
          const total = sitesJson.data.reduce((acc: number, s: any) => acc + (s.subscriber_count || 0), 0);
          setEstimatedReach(total);
        }
      } catch {}
    }
    load();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (aiRef.current && !aiRef.current.contains(e.target as Node)) {
        setAiPopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAiSuggestTitle = async () => {
    setAiTitleLoading(true);
    try {
      const res = await fetch("/api/v1/ai/generate-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: draft.title || "campaign notification" }),
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data.suggestions)) {
        setAiSuggestions(json.data.suggestions.slice(0, 3));
        setAiPopoverOpen(true);
      } else {
        addToast("AI title generation failed", "error");
      }
    } catch {
      addToast("AI title generation failed", "error");
    } finally {
      setAiTitleLoading(false);
    }
  };

  const applyAiSuggestion = (suggestion: string) => {
    setField("title", suggestion);
    setAiPopoverOpen(false);
  };

  const handleSaveDraft = async () => {
    try {
      setField("isSaving", true);
      const res = await fetch("/api/v1/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draft.title,
          body: draft.body,
          icon_url: draft.iconUrl,
          image_url: draft.imageUrl,
          click_url: draft.clickUrl,
          action_buttons: ctaButtons,
          status: "draft",
        }),
      });
      const json = await res.json();
      if (json.success) {
        addToast("Campaign saved as draft", "success");
        router.push("/dashboard/campaigns");
      } else {
        addToast(json.error, "error");
      }
    } catch {
      addToast("Failed to save draft", "error");
    } finally {
      setField("isSaving", false);
    }
  };

  const handleSend = async () => {
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        title: draft.title,
        body: draft.body,
        icon_url: draft.iconUrl,
        image_url: draft.imageUrl,
        click_url: draft.clickUrl,
        action_buttons: ctaButtons,
        audience: targetMethod === "segment" ? segmentValue : "all",
      };
      if (scheduleMethod === "later") {
        payload.scheduled_at = draft.scheduledAt;
        payload.status = "scheduled";
      } else if (scheduleMethod === "ai-optimal") {
        payload.ai_optimized = true;
        payload.status = "scheduled";
      } else {
        payload.status = "sent";
      }
      const res = await fetch("/api/v1/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        if (scheduleMethod === "now" && json.data?.id) {
          await fetch(`/api/v1/campaigns/${json.data.id}/send`, { method: "POST" });
        }
        addToast(
          scheduleMethod === "now" ? "Campaign sent successfully!" : "Campaign scheduled!",
          "success"
        );
        router.push("/dashboard/campaigns");
      } else {
        addToast(json.error, "error");
      }
    } catch {
      addToast("Failed to send campaign", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAiOptimalTime = async () => {
    setAiSuggestTimeLoading(true);
    try {
      const res = await fetch("/api/v1/ai/suggest-send-time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (json.success && json.data.suggested_time) {
        setField("scheduledAt", json.data.suggested_time);
        setScheduleMethod("ai-optimal");
        addToast("AI optimal time selected for best engagement!", "info");
      } else {
        addToast("AI time suggestion failed", "error");
      }
    } catch {
      addToast("AI time suggestion failed", "error");
    } finally {
      setAiSuggestTimeLoading(false);
    }
  };

  const addCta = () => {
    if (ctaButtons.length >= 2) return;
    setCtaButtons([...ctaButtons, { label: "", url: "" }]);
  };

  const updateCta = (index: number, field: "label" | "url", value: string) => {
    const updated = [...ctaButtons];
    updated[index] = { ...updated[index], [field]: value };
    setCtaButtons(updated);
  };

  const removeCta = (index: number) => {
    setCtaButtons(ctaButtons.filter((_, i) => i !== index));
  };

  const deviceIcon = (device: DeviceType) => {
    switch (device) {
      case "chrome": return <Monitor className="size-5" />;
      case "firefox": return <Monitor className="size-5" />;
      case "edge": return <Globe className="size-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">New Campaign</h1>
          <p className="mt-1 text-sm text-text-muted">Create and send a push notification campaign</p>
        </div>
      </div>

      {/* Main 2-column grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* LEFT COL — 4-step wizard */}
        <div className="space-y-8 lg:col-span-3">
          {/* STEP 1: COMPOSE */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span>
                Compose
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Title */}
              <div>
                <div className="flex items-end gap-2">
                  <div className="relative flex-1">
                    <Input
                      label="Notification Title"
                      placeholder="Enter title..."
                      value={draft.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("title", e.target.value)}
                      maxLength={titleMax}
                    />
                  </div>
                  <div className="relative" ref={aiRef}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAiSuggestTitle}
                      disabled={aiTitleLoading}
                      icon={aiTitleLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                    >
                      AI Suggest
                    </Button>
                    {aiPopoverOpen && (
                      <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-surface p-4 shadow-xl animate-fade-in">
                        <p className="mb-3 text-xs font-medium text-text-muted uppercase tracking-wider">AI Suggested Titles</p>
                        <div className="space-y-2">
                          {aiSuggestions.map((suggestion, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background p-3"
                            >
                              <span className="text-sm text-text-primary flex-1">{suggestion}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => applyAiSuggestion(suggestion)}
                              >
                                Use this
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-right text-xs text-text-muted">
                  {draft.title.length}/{titleMax}
                </p>
              </div>

              {/* Body */}
              <div>
                <Input
                  as="textarea"
                  label="Body"
                  placeholder="Enter notification body..."
                  value={draft.body}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField("body", e.target.value)}
                  maxLength={bodyMax}
                />
                <p className="mt-1 text-right text-xs text-text-muted">
                  {draft.body.length}/{bodyMax}
                </p>
              </div>

              {/* Media uploads */}
              <div className="flex gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-secondary">Icon</label>
                  <button
                    className="flex size-14 items-center justify-center rounded-lg border-2 border-dashed border-border bg-background text-text-muted hover:border-primary hover:text-primary transition-colors"
                    onClick={() => {
                      const url = prompt("Enter icon URL:");
                      if (url) setField("iconUrl", url);
                    }}
                  >
                    <Image className="size-5" />
                  </button>
                </div>
                <div className="flex-1">
                  <label className="mb-1.5 block text-sm font-medium text-text-secondary">Banner Image</label>
                  <button
                    className="flex h-14 w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-background text-text-muted hover:border-primary hover:text-primary transition-colors"
                    onClick={() => {
                      const url = prompt("Enter image URL:");
                      if (url) setField("imageUrl", url);
                    }}
                  >
                    <Image className="mr-2 size-5" />
                    <span className="text-sm">Upload banner image</span>
                  </button>
                </div>
              </div>

              {/* Click URL */}
              <Input
                label="Click URL"
                placeholder="https://example.com/landing"
                value={draft.clickUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("clickUrl", e.target.value)}
              />

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-secondary">
                    CTA Buttons ({ctaButtons.length}/2)
                  </label>
                  {ctaButtons.length < 2 && (
                    <Button variant="ghost" size="sm" onClick={addCta} icon={<Plus className="size-4" />}>
                      Add CTA Button
                    </Button>
                  )}
                </div>
                {ctaButtons.map((cta, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-background p-3">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Button label"
                        value={cta.label}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCta(i, "label", e.target.value)}
                      />
                      <Input
                        placeholder="https://example.com/cta"
                        value={cta.url}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCta(i, "url", e.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => removeCta(i)}
                      className="mt-2 text-text-muted hover:text-error transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* STEP 2: TARGET */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</span>
                Target
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-black/[0.02]">
                  <input
                    type="radio"
                    name="target"
                    checked={targetMethod === "all"}
                    onChange={() => setTargetMethod("all")}
                    className="size-4 accent-primary"
                  />
                  <div>
                    <span className="text-sm font-medium text-text-primary">All Subscribers</span>
                    <p className="text-xs text-text-muted">Send to your entire subscriber base</p>
                  </div>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-black/[0.02]">
                  <input
                    type="radio"
                    name="target"
                    checked={targetMethod === "segment"}
                    onChange={() => setTargetMethod("segment")}
                    className="size-4 accent-primary"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-text-primary">Specific Segment</span>
                    <p className="text-xs text-text-muted">Target a predefined subscriber segment</p>
                  </div>
                </label>
                {targetMethod === "segment" && (
                  <div className="ml-7 space-y-4">
                    <div className="relative">
                      <select
                        value={segmentValue}
                        onChange={(e) => setSegmentValue(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      >
                        <option value="">Select a segment...</option>
                        {segments.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <SegmentRuleBuilder rules={rules} onChange={setRules} />
                  </div>
                )}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-black/[0.02]">
                  <input
                    type="radio"
                    name="target"
                    checked={targetMethod === "ai"}
                    onChange={() => setTargetMethod("ai")}
                    className="size-4 accent-primary"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-primary">AI Suggested Audience</span>
                    <Badge variant="info" size="sm">
                      <Sparkles className="mr-1 size-3" />
                      AI
                    </Badge>
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <Users className="size-5 text-primary" />
                <span className="text-sm text-text-primary">
                  Estimated reach: <strong>{estimatedReach.toLocaleString()}</strong>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* STEP 3: SCHEDULE */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">3</span>
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-black/[0.02]">
                  <input
                    type="radio"
                    name="schedule"
                    checked={scheduleMethod === "now"}
                    onChange={() => setScheduleMethod("now")}
                    className="size-4 accent-primary"
                  />
                  <Send className="size-5 text-primary" />
                  <span className="text-sm font-medium text-text-primary">Send Now</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-black/[0.02]">
                  <input
                    type="radio"
                    name="schedule"
                    checked={scheduleMethod === "later"}
                    onChange={() => setScheduleMethod("later")}
                    className="size-4 accent-primary"
                  />
                  <Clock className="size-5 text-primary" />
                  <span className="text-sm font-medium text-text-primary">Schedule for Later</span>
                </label>
                {scheduleMethod === "later" && (
                  <div className="ml-9">
                    <Input
                      label="Schedule Date & Time"
                      type="datetime-local"
                      value={draft.scheduledAt || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("scheduledAt", e.target.value)}
                    />
                  </div>
                )}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-black/[0.02]">
                  <input
                    type="radio"
                    name="schedule"
                    checked={scheduleMethod === "ai-optimal"}
                    onChange={() => {
                      if (!draft.scheduledAt) {
                        handleAiOptimalTime();
                      } else {
                        setScheduleMethod("ai-optimal");
                      }
                    }}
                    className="size-4 accent-primary"
                  />
                  <div className="flex items-center gap-2">
                    <Zap className="size-5 text-primary" />
                    <span className="text-sm font-medium text-text-primary">AI Optimal Time</span>
                  </div>
                </label>
                {scheduleMethod === "ai-optimal" && draft.scheduledAt && (
                  <div className="ml-9">
                    <Badge variant="success" size="md" className="inline-flex items-center gap-1.5">
                      <Sparkles className="size-3.5" />
                      Scheduled for {new Date(draft.scheduledAt).toLocaleString()}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* STEP 4: REVIEW */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">4</span>
                Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                    <Target className="size-3.5" />
                    Audience
                  </div>
                  <p className="mt-2 text-sm font-medium text-text-primary">
                    {targetMethod === "all"
                      ? "All Subscribers"
                      : targetMethod === "segment"
                      ? segments.find((s) => s.value === segmentValue)?.label || segmentValue
                      : "AI Suggested Audience"}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                    <CalendarClock className="size-3.5" />
                    Timing
                  </div>
                  <p className="mt-2 text-sm font-medium text-text-primary">
                    {scheduleMethod === "now"
                      ? "Immediately"
                      : scheduleMethod === "later"
                      ? draft.scheduledAt || "Not set"
                      : "AI Optimal (Tue 9:00 AM IST)"}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                    <Users className="size-3.5" />
                    Est. Reach
                  </div>
                  <p className="mt-2 text-sm font-medium text-text-primary">{estimatedReach.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleSend}
                  disabled={submitting || !draft.title}
                  loading={submitting}
                  icon={<Send className="h-4 w-4" />}
                >
                  Send Campaign
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleSaveDraft}
                  disabled={draft.isSaving}
                  icon={draft.isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="h-4 w-4" />}
                >
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COL — Sticky live notification preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-6 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="size-4" />
                    Preview
                  </CardTitle>
                  {/* Device toggle */}
                  <div className="flex gap-1 rounded-lg border border-border bg-background p-0.5">
                    {(["chrome", "firefox", "edge"] as DeviceType[]).map((device) => (
                      <button
                        key={device}
                        onClick={() => setDeviceToggle(device)}
                        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                          deviceToggle === device
                            ? "bg-primary/20 text-primary"
                            : "text-text-muted hover:text-text-secondary"
                        }`}
                      >
                        {deviceIcon(device)}
                        {device.charAt(0).toUpperCase() + device.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Dark frame with realistic notification */}
                <div className="rounded-xl bg-black p-4 shadow-2xl">
                  <div className="rounded-lg bg-black/[0.06] p-3">
                    {/* Browser chrome dots + URL bar */}
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-error" />
                        <span className="size-2.5 rounded-full bg-warning" />
                        <span className="size-2.5 rounded-full bg-success" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-md bg-black/[0.08] px-3 py-1">
                        <Globe className="size-3 text-white/40" />
                        <span className="text-[11px] text-white/60 truncate max-w-[180px]">
                          {draft.clickUrl || "https://notify.prontly.in"}
                        </span>
                      </div>
                    </div>

                    {/* Notification content */}
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="shrink-0">
                        {draft.iconUrl ? (
                          <img
                            src={draft.iconUrl}
                            alt=""
                            className="size-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                            <Send className="size-5" />
                          </div>
                        )}
                      </div>

                      {/* Title + Body */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">
                          {draft.title || "Notification Title"}
                        </p>
                        <p className="mt-0.5 text-xs text-white/70 line-clamp-2">
                          {draft.body || "Your notification body will appear here..."}
                        </p>

                        {/* Banner image */}
                        {draft.imageUrl && (
                          <img
                            src={draft.imageUrl}
                            alt=""
                            className="mt-2 w-full rounded-lg object-cover max-h-24"
                          />
                        )}

                        {/* Action buttons */}
                        {ctaButtons.filter((b) => b.label).length > 0 && (
                          <div className="mt-3 flex items-center gap-3">
                            {ctaButtons.filter((b) => b.label).map((btn, i) => (
                              <span key={i} className="text-xs font-medium text-primary-400">
                                {btn.label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
