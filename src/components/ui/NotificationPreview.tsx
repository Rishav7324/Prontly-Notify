"use client";

import { Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationPreviewProps {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  className?: string;
}

export function NotificationPreview({
  title,
  body,
  icon,
  image,
  className,
}: NotificationPreviewProps) {
  return (
    <div
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface shadow-lg",
        className
      )}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 border-b border-border bg-black/[0.03] px-4 py-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-error" />
          <span className="size-2.5 rounded-full bg-warning" />
          <span className="size-2.5 rounded-full bg-success" />
        </div>
        <span className="text-[11px] text-text-muted tracking-wide uppercase font-medium">
          Push Notification
        </span>
      </div>

      {/* Notification body */}
      <div className="p-4">
        <div className="flex gap-3">
          {/* Icon */}
          <div className="shrink-0">
            {icon ? (
              <img
                src={icon}
                alt=""
                className="size-10 rounded-lg object-cover"
              />
            ) : (
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Bell className="size-5" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="truncate text-sm font-semibold text-text-primary">
                {title}
              </p>
              <button
                className="shrink-0 text-text-muted hover:text-text-secondary transition-colors"
                aria-label="Close"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <p className="mt-0.5 text-sm text-text-secondary line-clamp-2">
              {body}
            </p>

            {/* Image preview */}
            {image && (
              <img
                src={image}
                alt=""
                className="mt-2 w-full rounded-lg object-cover max-h-32"
              />
            )}

            {/* Action buttons mockup */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs font-medium text-primary">View</span>
              <span className="text-xs text-text-muted">Dismiss</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
