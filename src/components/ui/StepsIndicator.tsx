"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  description?: string;
}

interface StepsIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepsIndicator({ steps, currentStep, className }: StepsIndicatorProps) {
  return (
    <div className={cn("flex items-start", className)}>
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div key={step.label} className={cn("flex items-center flex-1", isLast && "flex-none")}>
            <div className="flex flex-col items-center">
              <div className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-all",
                isCompleted && "bg-primary text-white",
                isCurrent && "ring-2 ring-primary bg-primary/10 text-primary",
                !isCompleted && !isCurrent && "bg-border text-text-muted"
              )}>
                {isCompleted ? <Check className="size-4" /> : i + 1}
              </div>
              <div className="mt-2 text-center">
                <p className={cn(
                  "text-xs font-medium",
                  isCurrent ? "text-text-primary" : "text-text-muted"
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-[10px] text-text-muted mt-0.5 hidden sm:block">{step.description}</p>
                )}
              </div>
            </div>
            {!isLast && (
              <div className={cn(
                "h-px flex-1 mx-3 mt-4",
                isCompleted ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
