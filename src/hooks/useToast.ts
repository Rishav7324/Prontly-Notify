"use client";

import { toast as showToast } from "@/components/ui/Toast";

export function useToast() {
  return {
    success: (message: string) => showToast(message, "success"),
    error: (message: string) => showToast(message, "error"),
    info: (message: string) => showToast(message, "info"),
    warning: (message: string) => showToast(message, "warning"),
  };
}
