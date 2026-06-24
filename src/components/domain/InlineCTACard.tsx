"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface InlineCTACardProps {
  title: string;
  description: string;
  cta: string;
  href: string;
  variant?: "primary" | "glass";
  className?: string;
}

export function InlineCTACard({ title, description, cta, href, variant = "glass", className }: InlineCTACardProps) {
  return (
    <div className={cn(
      "rounded-xl p-5",
      variant === "primary" && "bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20",
      variant === "glass" && "bg-surface-glass border border-border backdrop-blur-xl",
      className
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-display text-base font-semibold text-text-primary">{title}</h4>
          <p className="text-sm text-text-muted">{description}</p>
        </div>
        <Link href={href}>
          <Button variant="primary" size="sm" className="shrink-0 whitespace-nowrap">
            {cta} <ArrowRight className="ml-1 size-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
