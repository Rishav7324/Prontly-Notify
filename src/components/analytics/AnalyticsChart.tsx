"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { formatNumber } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Loader2,
} from "lucide-react";

interface DataPoint {
  label: string;
  value: number;
}

interface AnalyticsChartProps {
  title: string;
  data: DataPoint[];
  loading?: boolean;
  height?: number;
  prefix?: string;
  suffix?: string;
}

export function AnalyticsChart({
  title,
  data,
  loading,
  height = 200,
  prefix = "",
  suffix = "",
}: AnalyticsChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const [hovered, setHovered] = useState<number | null>(null);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="flex items-center justify-center"
            style={{ height }}
          >
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const avg = data.length > 0 ? total / data.length : 0;
  const lastVal = data.length > 1 ? data[data.length - 1].value : 0;
  const prevVal = data.length > 1 ? data[data.length - 2].value : 0;
  const trend = lastVal - prevVal;
  const trendPercent =
    prevVal > 0 ? Math.round((trend / prevVal) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-muted">
              Total: {prefix}
              {formatNumber(total)}
              {suffix}
            </span>
            {trend !== 0 && (
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  trend > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend > 0 ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {trendPercent}%
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="relative flex items-end gap-1"
          style={{ height }}
        >
          {data.map((point, i) => {
            const barHeight = (point.value / maxValue) * (height - 20);
            const isHovered = hovered === i;
            return (
              <div
                key={i}
                className="group relative flex flex-1 flex-col items-center justify-end"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`w-full rounded-t transition-all duration-200 ${
                    isHovered
                      ? "bg-primary"
                      : "bg-primary/40 hover:bg-primary/60"
                  }`}
                  style={{ height: Math.max(barHeight, 4) }}
                />
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-dark px-2 py-1 text-xs text-text-primary shadow-lg">
                    {prefix}
                    {formatNumber(point.value)}
                    {suffix}
                  </div>
                )}
                <span className="mt-1 text-[10px] text-text-muted">
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
