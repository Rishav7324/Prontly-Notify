"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface InstallStatusBadgeProps {
  status: "pending" | "verified" | "broken";
  className?: string;
}

const statusConfig = {
  pending: { label: "Pending", variant: "warning" as const },
  verified: { label: "Live", variant: "success" as const },
  broken: { label: "Not Detected", variant: "error" as const },
};

export function InstallStatusBadge({ status, className }: InstallStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant} size="sm" className={cn("capitalize", className)}>{config.label}</Badge>;
}

interface SystemStatusBadgeProps {
  status: "operational" | "degraded" | "down";
  className?: string;
}

const sysStatusConfig = {
  operational: { label: "Operational", variant: "success" as const },
  degraded: { label: "Degraded", variant: "warning" as const },
  down: { label: "Down", variant: "error" as const },
};

export function SystemStatusBadge({ status, className }: SystemStatusBadgeProps) {
  const config = sysStatusConfig[status];
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
      status === "operational" && "bg-success/10 text-success",
      status === "degraded" && "bg-warning/10 text-warning",
      status === "down" && "bg-error/10 text-error",
      className
    )}>
      <span className={cn(
        "size-1.5 rounded-full",
        status === "operational" && "bg-success",
        status === "degraded" && "bg-warning",
        status === "down" && "bg-error",
      )} />
      {config.label}
    </span>
  );
}
