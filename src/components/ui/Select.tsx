"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
  error,
  label,
  disabled = false,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

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
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-between rounded-lg border bg-background px-3 py-2.5 text-sm transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
            error
              ? "border-error focus:ring-error/30 focus:border-error"
              : "border-border hover:border-border-strong",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !selected && "text-text-muted"
          )}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span>{selected ? selected.label : placeholder}</span>
          <ChevronDown
            className={cn(
              "size-4 text-text-muted transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>
        {error && (
          <AlertCircle className="absolute right-10 top-1/2 size-4 -translate-y-1/2 text-error" />
        )}
        {open && (
          <ul
            role="listbox"
            className="absolute z-50 mt-1 w-full overflow-auto rounded-lg border border-border bg-surface py-1 shadow-lg animate-fade-in max-h-60"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "cursor-pointer px-3 py-2 text-sm transition-colors",
                  value === option.value
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
