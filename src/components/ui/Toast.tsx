"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn, generateId } from "@/lib/utils";

type ToastVariant = "success" | "warning" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  success:
    "border-success/30 bg-success/10 [&_svg]:text-success",
  warning:
    "border-warning/30 bg-warning/10 [&_svg]:text-warning",
  error:
    "border-error/30 bg-error/10 [&_svg]:text-error",
  info: "border-primary/30 bg-primary/10 [&_svg]:text-primary",
};

const variantIcons: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle2 className="size-5 shrink-0" />,
  warning: <AlertTriangle className="size-5 shrink-0" />,
  error: <AlertCircle className="size-5 shrink-0" />,
  info: <Info className="size-5 shrink-0" />,
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => onRemove(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onRemove]);

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4 shadow-lg animate-slide-up",
        variantStyles[toast.variant]
      )}
    >
      {variantIcons[toast.variant]}
      <p className="flex-1 text-sm text-text-primary">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 text-text-muted hover:text-text-secondary transition-colors"
        aria-label="Dismiss"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = generateId();
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) addToast(detail);
    };
    containerRef.current = document.getElementById("__next");
    window.addEventListener("prontly-toast", handler);
    return () => window.removeEventListener("prontly-toast", handler);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export function toast(
  message: string,
  variant: ToastVariant = "info",
  duration?: number
) {
  const container = document.getElementById("__next");
  if (!container) return;

  const event = new CustomEvent("prontly-toast", {
    detail: { message, variant, duration },
  });
  container.dispatchEvent(event);
}
