"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import { Sparkline } from "./LineChart";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: { value: number; isPositive: boolean };
  sparklineData?: number[];
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ label, value, delta, sparklineData, icon, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-text-primary tabular-nums">{value}</p>
            {delta && (
              <p className={cn("text-xs font-medium", delta.isPositive ? "text-success" : "text-error")}>
                {delta.isPositive ? "+" : ""}{delta.value}%
              </p>
            )}
          </div>
          {icon && <div className="text-text-muted">{icon}</div>}
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-3">
            <Sparkline data={sparklineData} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
