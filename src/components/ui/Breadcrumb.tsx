"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export function Breadcrumb({ items, className, showHome = true }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-1.5 text-sm text-text-muted", className)}>
      {showHome && (
        <>
          <Link href="/dashboard" className="hover:text-text-primary transition-colors">
            <Home className="size-4" />
          </Link>
          <ChevronRight className="size-3.5" />
        </>
      )}
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast && "text-text-primary font-medium")}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="size-3.5" />}
          </span>
        );
      })}
    </nav>
  );
}
