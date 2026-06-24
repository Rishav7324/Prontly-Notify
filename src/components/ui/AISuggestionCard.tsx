"use client";

import { type ReactNode } from "react";
import { Sparkles, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AISuggestionCardProps {
  children: ReactNode;
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
}

export function AISuggestionCard({
  children,
  onAccept,
  onReject,
  className,
}: AISuggestionCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-primary/20 bg-primary/[0.03] pl-4",
        "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:rounded-full before:bg-primary before:shadow-glow-primary",
        className
      )}
    >
      <div className="p-4 pl-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
            <Sparkles className="size-3" />
            AI Suggestion
          </span>
        </div>
        <div className="text-sm text-text-secondary">{children}</div>
        {(onAccept || onReject) && (
          <div className="mt-4 flex items-center gap-2">
            {onAccept && (
              <button
                onClick={onAccept}
                className="inline-flex items-center gap-1.5 rounded-md bg-success/15 px-3 py-1.5 text-xs font-medium text-success hover:bg-success/25 transition-colors"
              >
                <Check className="size-3.5" />
                Accept
              </button>
            )}
            {onReject && (
              <button
                onClick={onReject}
                className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-white/10 hover:text-text-secondary transition-colors"
              >
                <X className="size-3.5" />
                Dismiss
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
