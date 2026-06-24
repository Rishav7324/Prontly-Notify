"use client";

import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "primary";

type BadgeSize = "sm" | "md";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-text-secondary border border-border",
  success: "bg-success/15 text-success border border-success/25",
  warning: "bg-warning/15 text-warning border border-warning/25",
  error: "bg-error/15 text-error border border-error/25",
  info: "bg-primary/15 text-primary border border-primary/25",
  primary: "bg-primary text-white border border-primary",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px] font-medium rounded",
  md: "px-2.5 py-1 text-xs font-medium rounded-md",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
