"use client";

import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant =
  | "default"
  | "glass"
  | "elevated"
  | "interactive"
  | "featured";

const variantStyles: Record<CardVariant, string> = {
  default: "bg-surface border border-border",
  glass:
    "bg-surface-glass border border-border backdrop-blur-xl",
  elevated:
    "bg-surface border border-border shadow-lg",
  interactive:
    "bg-surface border border-border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer",
  featured:
    "bg-surface border border-primary/30 shadow-lg shadow-primary/10",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn("rounded-xl p-6", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4 flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold text-text-primary", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-text-muted", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-4 flex items-center gap-3 pt-4 border-t border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
}
