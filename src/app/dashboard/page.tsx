"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StateContainer } from "@/components/ui/StateContainer";
import { AISuggestionCard } from "@/components/ui/AISuggestionCard";
import { useToast } from "@/components/ui/Toast";
import { formatNumber, formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  Users,
  Send,
  MousePointerClick,
  Megaphone,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface KpiData {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  sparkline: number[];
}

interface Campaign {
  id: string;
  title: string;
  status: "sent" | "scheduled" | "draft" | "failed";
  sentDate: string;
  delivered: number;
  ctr: number;
}

const kpis: KpiData[] = [
  { label: "Total Subscribers", value: "12,847", change: 12.5, icon: <Users className="h-5 w-5" />, sparkline: [120, 180, 150, 210, 190, 240, 230, 280, 260, 300, 290, 320] },
  { label: "Sends Today", value: "3,421", change: 8.2, icon: <Send className="h-5 w-5" />, sparkline: [200, 180, 220, 190, 240, 210, 260, 230, 280, 250, 300, 280] },
  { label: "Avg CTR", value: "4.8%", change: -0.3, icon: <MousePointerClick className="h-5 w-5" />, sparkline: [4.2, 4.5, 4.3, 4.7, 4.6, 4.9, 4.8, 5.0, 4.7, 4.8, 4.6, 4.8] },
  { label: "Active Campaigns", value: "6", change: 2, icon: <Megaphone className="h-5 w-5" />, sparkline: [2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 5, 6] },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 80;
  const h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-20" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

const mockCampaigns: Campaign[] = [
  { id: "1", title: "Summer Sale Blast", status: "sent", sentDate: "2026-06-20", delivered: 8450, ctr: 5.2 },
  { id: "2", title: "New Feature Announcement", status: "sent", sentDate: "2026-06-18", delivered: 6200, ctr: 3.8 },
  { id: "3", title: "Weekly Digest", status: "scheduled", sentDate: "2026-06-25", delivered: 0, ctr: 0 },
  { id: "4", title: "Re-engagement Flow", status: "draft", sentDate: "", delivered: 0, ctr: 0 },
  { id: "5", title: "Product Update v2.1", status: "failed", sentDate: "2026-06-15", delivered: 2100, ctr: 1.2 },
];

export default function DashboardHome() {
  const { addToast } = useToast();
  const [state] = useState<"default" | "loading" | "empty" | "error">("default");

  const statusVariant = (s: Campaign["status"]) =>
    ({ sent: "success", scheduled: "info", draft: "default", failed: "error" } as const)[s];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-text-muted">Welcome back! Here&apos;s your overview.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-muted">
                  {kpi.icon}
                  <span className="text-sm">{kpi.label}</span>
                </div>
                <Badge variant={kpi.change >= 0 ? "success" : "error"} size="sm">
                  {kpi.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(kpi.change)}%
                </Badge>
              </div>
              <p className="mt-3 text-3xl font-bold text-text-primary">{kpi.value}</p>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-xs text-text-muted">vs last period</span>
                <Sparkline data={kpi.sparkline} color="#3B82F6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <Link href="/dashboard/campaigns">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <StateContainer
                state={state}
                emptyMessage="No campaigns yet. Start your first one!"
                emptyAction={
                  <Link href="/dashboard/campaigns/new">
                    <Button icon={<Send className="h-4 w-4" />}>Create Campaign</Button>
                  </Link>
                }
              >
                <div className="divide-y divide-border">
                  {mockCampaigns.map((c) => (
                    <div key={c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-text-primary">{c.title}</p>
                        <p className="mt-0.5 text-xs text-text-muted">
                          {c.sentDate ? formatDate(c.sentDate) : "Not sent yet"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 pl-4">
                        <div className="hidden text-right sm:block">
                          <p className="text-xs text-text-muted">{formatNumber(c.delivered)} delivered</p>
                          <p className="text-xs text-text-muted">{c.ctr}% CTR</p>
                        </div>
                        <Badge variant={statusVariant(c.status)} size="sm">
                          {c.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </StateContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AISuggestionCard
                onAccept={() => addToast("Suggestion accepted!", "success")}
                onReject={() => addToast("Suggestion dismissed", "info")}
              >
                Your&nbsp;CTR is&nbsp;12% higher on&nbsp;Tuesdays. Consider scheduling your next campaign
                for&nbsp;Tuesday morning to&nbsp;maximize engagement.
              </AISuggestionCard>
              <AISuggestionCard
                onAccept={() => addToast("Suggestion accepted!", "success")}
                onReject={() => addToast("Suggestion dismissed", "info")}
              >
                Your subscriber list grew&nbsp;8% this&nbsp;week. Try sending a&nbsp;welcome re-engagement
                campaign to&nbsp;new subscribers.
              </AISuggestionCard>
              <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-4">
                <p className="text-xs text-text-muted">
                  <TrendingUp className="mr-1 inline h-3 w-3" />
                  AI predicts&nbsp;15% growth in&nbsp;engagement if&nbsp;you increase sending frequency
                  to&nbsp;3x/week.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
