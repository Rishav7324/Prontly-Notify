"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

export function FeatureCard({ icon, title, description, className, onClick }: FeatureCardProps) {
  return (
    <Card
      className={cn("group cursor-pointer transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5", className)}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-display mb-1 text-base font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
