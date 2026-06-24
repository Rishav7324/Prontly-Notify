"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function AuthCard({ children, title, subtitle, className }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className={cn(
        "w-full max-w-[420px] rounded-2xl border border-border bg-surface-glass p-6 sm:p-8 backdrop-blur-xl",
        className
      )}>
        <div className="mb-6 text-center">
          <div className="mb-2 flex justify-center">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-white">P</span>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
