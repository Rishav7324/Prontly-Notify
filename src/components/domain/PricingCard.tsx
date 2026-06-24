"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  onCta: () => void;
  featured?: boolean;
  className?: string;
}

export function PricingCard({ name, price, period, description, features, cta, onCta, featured, className }: PricingCardProps) {
  return (
    <Card className={cn(
      "relative flex flex-col transition-all",
      featured && "border-primary/50 ring-1 ring-primary/20 shadow-xl shadow-primary/5 scale-[1.02]",
      className
    )}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="info">Most Popular</Badge>
        </div>
      )}
      <CardContent className="flex flex-col gap-6 p-6">
        <div>
          <h3 className="font-display text-lg font-bold text-text-primary">{name}</h3>
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-text-primary">{price}</span>
          <span className="text-sm text-text-muted">{period}</span>
        </div>
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button variant={featured ? "primary" : "outline"} onClick={onCta} className="mt-auto w-full">
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}
