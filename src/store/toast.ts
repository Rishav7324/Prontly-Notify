import { create } from "zustand";

type ToastItem = {
  id: string;
  message: string;
  variant: "success" | "error" | "info" | "warning";
};

interface ToastState {
  toasts: ToastItem[];
  addToast: (message: string, variant: ToastItem["variant"]) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, variant) => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { id, message, variant }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
