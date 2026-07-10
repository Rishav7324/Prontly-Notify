"use client";

import { AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "warning" | "error" | "success";

interface InlineAlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  info: "border-primary/30 bg-primary/10 text-primary",
  warning: "border-warning/30 bg-warning/10 text-warning",
  error: "border-error/30 bg-error/10 text-error",
  success: "border-success/30 bg-success/10 text-success",
};

const icons: Record<AlertVariant, typeof AlertCircle> = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: AlertCircle,
};

export function InlineAlert({ variant = "info", title, message, dismissible, onDismiss, className }: InlineAlertProps) {
  const Icon = icons[variant];
  return (
    <div className={cn("flex items-start gap-3 rounded-lg border p-3 text-sm", variantStyles[variant], className)}>
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        <p>{message}</p>
      </div>
      {dismissible && onDismiss && (
        <button onClick={onDismiss} aria-label="Dismiss" className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
