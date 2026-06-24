"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  destructive?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = "start",
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {trigger}
      </button>
      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg animate-fade-in",
            align === "end" ? "right-0" : "left-0"
          )}
          role="menu"
        >
          {items.map((item, index) => (
            <button
              key={index}
              role="menuitem"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors",
                item.destructive
                  ? "text-error hover:bg-error/10"
                  : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
              )}
            >
              {item.icon && <span className="size-4">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
