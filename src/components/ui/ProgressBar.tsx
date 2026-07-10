"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ProgressBarVariant = "default" | "warning" | "error";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<ProgressBarVariant, string> = {
  default: "bg-primary",
  warning: "bg-warning",
  error: "bg-error",
};

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  max = 100,
  variant,
  showLabel = false,
  size = "md",
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  const resolvedVariant: ProgressBarVariant =
    variant ?? (pct >= 100 ? "error" : pct >= 80 ? "warning" : "default");

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
            variantStyles[resolvedVariant]
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
