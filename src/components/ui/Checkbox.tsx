"use client";

import { type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  className,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "inline-flex items-center gap-2.5",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            "size-4 rounded border transition-colors duration-150",
            "border-border hover:border-border-strong",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-primary peer-focus-visible:outline-offset-2",
            checked && "border-primary bg-primary"
          )}
        >
          {checked && <Check className="size-4 text-white" strokeWidth={3} />}
        </div>
      </div>
      {label && (
        <span className="text-sm text-text-secondary">{label}</span>
      )}
    </label>
  );
}
