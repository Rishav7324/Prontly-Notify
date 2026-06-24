"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { score, label: "Weak", color: "bg-error" };
  if (score <= 4) return { score, label: "Medium", color: "bg-warning" };
  return { score, label: "Strong", color: "bg-success" };
}

export function PasswordStrengthMeter({ password, className }: PasswordStrengthMeterProps) {
  const strength = useMemo(() => getStrength(password), [password]);

  if (!password) return null;

  const Icon = strength.score <= 2 ? ShieldAlert : strength.score <= 4 ? Shield : ShieldCheck;

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              level <= strength.score ? strength.color : "bg-border"
            )}
          />
        ))}
      </div>
      {strength.label && (
        <div className="flex items-center gap-1 text-xs">
          <Icon className={cn("size-3", strength.score <= 2 ? "text-error" : strength.score <= 4 ? "text-warning" : "text-success")} />
          <span className={cn(strength.score <= 2 ? "text-error" : strength.score <= 4 ? "text-warning" : "text-success")}>
            {strength.label}
          </span>
        </div>
      )}
    </div>
  );
}
