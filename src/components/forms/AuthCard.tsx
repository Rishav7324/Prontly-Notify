"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBrandPanel?: boolean;
  className?: string;
}

export function AuthCard({ children, title, subtitle, showBrandPanel = true, className }: AuthCardProps) {
  return (
    <div className="flex min-h-screen">
      {/* Brand / testimonial panel — desktop only, hidden for no-split screens */}
      {showBrandPanel && (
        <div className="hidden lg:flex w-[45%] flex-col justify-between bg-surface p-12">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Prontly Notify" className="size-10 rounded-xl" />
              <span className="text-xl font-bold text-ink font-display">Prontly</span>
            </div>
            <blockquote className="mt-16 max-w-md">
              <p className="text-2xl font-medium leading-snug text-ink">
                &ldquo;We doubled our re-engagement rate in two weeks. Prontly makes push notifications effortless.&rdquo;
              </p>
              <footer className="mt-6">
                <p className="font-semibold text-ink">Alex Rivera</p>
                <p className="text-sm text-smoke">Head of Growth, Pulse</p>
              </footer>
            </blockquote>
          </div>
          <p className="text-xs text-smoke">&copy; 2026 Prontly Notify</p>
        </div>
      )}

      {/* Form panel */}
      <div className={cn(
        "flex flex-1 items-center justify-center px-4 py-12",
        showBrandPanel && "lg:w-[55%]"
      )}>
        <div className={cn(
          "w-full max-w-[420px] rounded-2xl border border-border bg-surface-glass p-6 sm:p-8 backdrop-blur-xl animate-fade-up",
          className
        )}>
          <div className="mb-6 text-center">
            <div className="mb-2 flex justify-center lg:hidden">
              <img src="/logo.svg" alt="Prontly Notify" className="size-10 rounded-xl" />
            </div>
            <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
