"use client";

import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface UsageMeterProps {
  label: string;
  used: number;
  limit: number;
  unit?: string;
  showPercent?: boolean;
  className?: string;
}

export function UsageMeter({ label, used, limit, unit = "", showPercent = true, className }: UsageMeterProps) {
  const pct = limit > 0 ? Math.round((used / limit) * 100) : 0;
  const isWarning = pct >= 80 && pct < 100;
  const isError = pct >= 100;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">{label}</span>
        <span className={cn(
          "font-medium tabular-nums",
          isError ? "text-error" : isWarning ? "text-warning" : "text-text-primary"
        )}>
          {used.toLocaleString()}{unit && ` ${unit}`} / {limit === -1 ? "Unlimited" : limit.toLocaleString()}
          {showPercent && limit > 0 && ` (${pct}%)`}
        </span>
      </div>
      <div className={cn(
        "h-1.5 rounded-full bg-background overflow-hidden",
        isError && "ring-1 ring-error/30",
        isWarning && "ring-1 ring-warning/30",
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isError ? "bg-error" : isWarning ? "bg-warning" : "bg-primary",
          )}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}
