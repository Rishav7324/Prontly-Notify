"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = "md",
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const isWarning = pct >= 80 && pct < 100;
  const isError = pct >= 100;

  const barColor = isError
    ? "bg-error"
    : isWarning
      ? "bg-warning"
      : "bg-primary";

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-white/10",
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            barColor
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 text-xs font-medium text-text-secondary tabular-nums">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
