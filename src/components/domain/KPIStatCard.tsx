"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import { Sparkline } from "@/components/charts/LineChart";

interface KPIStatCardProps {
  label: string;
  value: string;
  delta?: { value: number; isPositive: boolean };
  sparklineData?: number[];
  icon?: ReactNode;
  format?: "number" | "percent" | "currency";
  className?: string;
}

export function KPIStatCard({ label, value, delta, sparklineData, icon, className }: KPIStatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider truncate">{label}</p>
            <p className="text-2xl font-bold text-text-primary tabular-nums">{value}</p>
            {delta && (
              <p className={cn("text-xs font-medium flex items-center gap-1", delta.isPositive ? "text-success" : "text-error")}>
                <span>{delta.isPositive ? "+" : ""}{delta.value}%</span>
                <span className="text-text-muted">vs last period</span>
              </p>
            )}
          </div>
          {icon && <div className="shrink-0 ml-3 text-text-muted">{icon}</div>}
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-2 h-8">
            <Sparkline data={sparklineData} height={32} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
