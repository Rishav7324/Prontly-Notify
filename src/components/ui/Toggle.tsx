"use client";

import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export function Toggle({
  checked = false,
  onChange,
  label,
  disabled = false,
  className,
  id,
  ...props
}: ToggleProps) {
  const toggleId =
    id || `toggle-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <label
      htmlFor={toggleId}
      className={cn(
        "inline-flex items-center gap-3",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <div className="relative">
        <input
          id={toggleId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <div
          className={cn(
            "h-6 w-11 rounded-full transition-colors duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-primary peer-focus-visible:outline-offset-2",
            checked ? "bg-primary" : "bg-black/15"
          )}
        />
        <div
          className={cn(
            "absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-all duration-200 shadow-sm",
            checked && "translate-x-5"
          )}
        />
      </div>
      {label && (
        <span className="text-sm text-text-secondary">{label}</span>
      )}
    </label>
  );
}
