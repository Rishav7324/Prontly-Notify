"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (type === "single") {
          next.clear();
        }
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-border rounded-xl border border-border", className)}>
      {items.map((item, index) => {
        const isOpen = openIds.has(index);
        return (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-text-primary hover:bg-white/5 transition-colors"
              aria-expanded={isOpen}
            >
              {item.title}
              <ChevronDown
                className={cn(
                  "size-4 text-text-muted transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-96" : "max-h-0"
              )}
            >
              <div className="px-5 pb-4 text-sm text-text-secondary">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
