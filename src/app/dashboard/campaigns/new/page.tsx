"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Select } from "@/components/ui/Select";
import { NotificationPreview } from "@/components/ui/NotificationPreview";
import { useToast } from "@/components/ui/Toast";
import {
  Sparkles,
  Send,
  Clock,
  ArrowLeft,
  Save,
  Target,
  Eye,
} from "lucide-react";

const steps = [
  { id: "compose", label: "Compose" },
  { id: "target", label: "Target" },
  { id: "schedule", label: "Schedule" },
  { id: "review", label: "Review" },
];

const segments = [
  { value: "all", label: "All Subscribers" },
  { value: "active", label: "Active Users" },
  { value: "new", label: "New (7 days)" },
  { value: "engaged", label: "Highly Engaged" },
];

export default function NewCampaignPage() {
  const { addToast } = useToast();
  const [step, setStep] = useState("compose");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [clickUrl, setClickUrl] = useState("");
  const [audience, setAudience] = useState("all");
  const [schedule, setSchedule] = useState<"now" | "later">("now");
  const [scheduledDate, setScheduledDate] = useState("");

  const stepIndex = steps.findIndex((s) => s.id === step);
  const isLastStep = stepIndex === steps.length - 1;

  const handleNext = () => {
    if (stepIndex < steps.length - 1) setStep(steps[stepIndex + 1].id);
  };
  const handlePrev = () => {
    if (stepIndex > 0) setStep(steps[stepIndex - 1].id);
  };

  const handleSend = () => {
    addToast("Campaign sent successfully!", "success");
  };

  const handleSaveDraft = () => {
    addToast("Campaign saved as draft", "success");
  };

  const handleAiSuggest = () => {
    setTitle("Limited Time Offer: 20% Off!");
    setBody("Don't miss out on our exclusive sale. Click here to grab your discount before it ends!");
    addToast("AI suggestion applied!", "success");
  };

  const handleAiSuggestTime = () => {
    setScheduledDate("2026-06-25T09:00");
    addToast("AI suggests Tuesday 9:00 AM for best engagement!", "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()} icon={<ArrowLeft className="h-4 w-4" />}>
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">New Campaign</h1>
          <p className="mt-1 text-sm text-text-muted">Create and send a push notification campaign</p>
        </div>
        <div className="ml-auto">
          <Button variant="outline" onClick={handleSaveDraft} icon={<Save className="h-4 w-4" />}>
            Save as Draft
          </Button>
        </div>
      </div>

      <Tabs tabs={steps} activeTab={step} onChange={setStep} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          {step === "compose" && (
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    label="Notification Title"
                    placeholder="Enter title..."
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" onClick={handleAiSuggest} icon={<Sparkles className="h-4 w-4" />}>
                  AI Suggest
                </Button>
              </div>
              <div>
                <Input
                  as="textarea"
                  label="Body"
                  placeholder="Enter notification body..."
                  value={body}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
                  maxLength={240}
                />
                <p className="mt-1 text-right text-xs text-text-muted">{body.length}/240</p>
              </div>
              <Input
                label="Icon URL (optional)"
                placeholder="https://example.com/icon.png"
                value={iconUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIconUrl(e.target.value)}
              />
              <Input
                label="Click URL"
                placeholder="https://example.com/landing"
                value={clickUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClickUrl(e.target.value)}
              />
            </div>
          )}

          {step === "target" && (
            <div className="space-y-4">
              <Select
                label="Target Audience"
                options={segments}
                value={audience}
                onChange={setAudience}
              />
              <Card>
                <CardContent>
                  <p className="text-sm text-text-secondary">
                    <Target className="mr-1 inline h-4 w-4" />
                    <strong className="text-text-primary">12,847</strong> subscribers will receive this campaign
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {step === "schedule" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setSchedule("now")}
                  className={`flex-1 rounded-lg border p-4 text-center transition-colors ${
                    schedule === "now" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <Send className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-text-primary">Send Now</span>
                </button>
                <button
                  onClick={() => setSchedule("later")}
                  className={`flex-1 rounded-lg border p-4 text-center transition-colors ${
                    schedule === "later" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <Clock className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-text-primary">Schedule</span>
                </button>
              </div>
              {schedule === "later" && (
                <div className="space-y-3">
                  <Input
                    label="Schedule Date & Time"
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScheduledDate(e.target.value)}
                  />
                  <Button variant="outline" size="sm" onClick={handleAiSuggestTime} icon={<Sparkles className="h-4 w-4" />}>
                    AI Suggest Best Time
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === "review" && (
            <Card>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border bg-white/[0.02] p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Campaign Summary</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Title</span>
                      <span className="text-text-primary">{title || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Body</span>
                      <span className="text-text-primary">{body || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Audience</span>
                      <span className="text-text-primary">{segments.find((s) => s.value === audience)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Schedule</span>
                      <span className="text-text-primary">
                        {schedule === "now" ? "Send immediately" : scheduledDate || "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Reach</span>
                      <span className="text-text-primary">~12,847 subscribers</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={handleSend} icon={<Send className="h-4 w-4" />}>
                  Send Campaign
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrev} disabled={stepIndex === 0}>
              Previous
            </Button>
            {!isLastStep ? (
              <Button onClick={handleNext}>Next Step</Button>
            ) : (
              <Button variant="secondary" onClick={() => setStep("compose")}>
                Edit Campaign
              </Button>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              <div className="mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4 text-text-muted" />
                <span className="text-sm font-medium text-text-primary">Preview</span>
              </div>
              <NotificationPreview
                title={title || "Notification Title"}
                body={body || "Your notification body will appear here..."}
                icon={iconUrl || undefined}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
