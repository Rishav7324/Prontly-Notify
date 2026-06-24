"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";
import { formatNumber, formatDate } from "@/lib/utils";
import {
  Download,
  Sparkles,
  TrendingUp,
  MousePointerClick,
  Send,
  UserMinus,
  RotateCw,
  Calendar,
} from "lucide-react";

interface TopCampaign {
  id: string;
  title: string;
  sent: number;
  delivered: number;
  ctr: number;
}

const dateRanges = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
  { key: "custom", label: "Custom" },
];

const kpis = [
  { label: "Net Growth", value: "+1,247", change: 12.5, icon: <TrendingUp className="h-5 w-5" />, color: "text-success" },
  { label: "Avg CTR", value: "4.8%", change: -0.3, icon: <MousePointerClick className="h-5 w-5" />, color: "text-primary" },
  { label: "Total Delivered", value: "142,389", change: 8.1, icon: <Send className="h-5 w-5" />, color: "text-primary" },
  { label: "Unsubscribe Rate", value: "0.8%", change: 0.1, icon: <UserMinus className="h-5 w-5" />, color: "text-error" },
];

const topCampaigns: TopCampaign[] = [
  { id: "1", title: "Summer Sale Blast", sent: 10000, delivered: 8450, ctr: 5.2 },
  { id: "2", title: "New Feature v2.0", sent: 8000, delivered: 6200, ctr: 3.8 },
  { id: "3", title: "Weekly Digest #42", sent: 7500, delivered: 5800, ctr: 4.1 },
  { id: "4", title: "Product Update", sent: 5000, delivered: 3900, ctr: 2.9 },
  { id: "5", title: "Re-engagement Flow", sent: 3000, delivered: 2100, ctr: 1.5 },
];

function LineChartPlaceholder() {
  const pts = [
    [10, 80], [30, 60], [50, 70], [70, 40], [90, 55], [110, 35], [130, 45], [150, 25], [170, 40], [190, 30], [210, 20], [230, 28],
  ];
  const d = pts.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg viewBox="0 0 240 100" className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" points={d} />
      <polygon fill="url(#lineGrad)" points={`0,100 ${d} 240,100`} />
    </svg>
  );
}

function BarChartPlaceholder() {
  const bars = [60, 40, 75, 50, 85, 65, 45, 70, 55, 80, 60, 45];
  const bw = 14;
  const gap = 6;
  return (
    <svg viewBox="0 0 240 100" className="h-full w-full" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <rect key={i} x={i * (bw + gap)} y={100 - h} width={bw} height={h} rx="2" fill="#3B82F6" opacity={0.7 + h / 200} />
      ))}
    </svg>
  );
}

function DonutChartPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32">
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="12" strokeDasharray="220 40" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 50 50)" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="12" strokeDasharray="80 220" strokeDashoffset="-230" strokeLinecap="round" transform="rotate(-90 50 50)" />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill="#F8FAFC" fontSize="10" fontWeight="bold">4.8%</text>
    </svg>
  );
}

const columns: Column<TopCampaign>[] = [
  { key: "title", label: "Campaign", render: (c) => <span className="font-medium text-text-primary">{c.title}</span> },
  { key: "sent", label: "Sent", render: (c) => formatNumber(c.sent) },
  { key: "delivered", label: "Delivered", render: (c) => formatNumber(c.delivered) },
  { key: "ctr", label: "CTR", render: (c) => `${c.ctr}%` },
];

export default function AnalyticsPage() {
  const { addToast } = useToast();
  const [range, setRange] = useState("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
          <p className="mt-1 text-sm text-text-muted">Track your notification performance</p>
        </div>
        <Button variant="outline" onClick={() => addToast("Exporting analytics CSV...", "success")} icon={<Download className="h-4 w-4" />}>
          Export CSV
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {dateRanges.map((dr) => (
          <button
            key={dr.key}
            onClick={() => setRange(dr.key)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              range === dr.key ? "bg-primary text-white" : "bg-white/5 text-text-secondary hover:bg-white/10"
            }`}
          >
            {dr.key === "custom" && <Calendar className="h-3.5 w-3.5" />}
            {dr.label}
          </button>
        ))}
      </div>

      <Card variant="featured">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-text-primary">AI Summary</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => addToast("Regenerating AI analysis...", "info")} icon={<RotateCw className="h-3.5 w-3.5" />}>
              Regenerate
            </Button>
          </div>
          <p className="mt-2 text-sm text-text-secondary">
            Your CTR improved&nbsp;8% compared to&nbsp;last period. Tuesday mornings continue to&nbsp;be your
            best-performing send time.&nbsp;Unsubscribe rate remains stable at&nbsp;0.8%.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent>
              <div className="flex items-center gap-2 text-text-muted">
                {kpi.icon}
                <span className="text-sm">{kpi.label}</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-text-primary">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Subscriber Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <LineChartPlaceholder />
            </div>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <BarChartPlaceholder />
            </div>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>CTR Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <DonutChartPlaceholder />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={topCampaigns} keyExtractor={(c) => c.id} />
        </CardContent>
      </Card>
    </div>
  );
}
