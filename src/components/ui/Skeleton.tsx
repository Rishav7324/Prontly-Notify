"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SkeletonVariant = "card" | "table-row" | "chart" | "text";

const variantStyles: Record<SkeletonVariant, string> = {
  card: "h-48 w-full rounded-xl",
  "table-row": "h-12 w-full rounded-lg",
  chart: "h-64 w-full rounded-xl",
  text: "h-4 w-full rounded",
};

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

export function Skeleton({
  variant = "text",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-black/5",
        variantStyles[variant],
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
