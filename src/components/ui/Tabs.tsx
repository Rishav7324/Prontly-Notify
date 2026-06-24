"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex border-b border-border", className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "text-primary"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          {tab.icon && <span className="size-4">{tab.icon}</span>}
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
