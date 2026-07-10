"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: (reason?: string) => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  requireReason?: boolean;
  loading?: boolean;
}

export function ConfirmationDialog({
  open, onConfirm, onCancel, title, message,
  confirmLabel = "Confirm", cancelLabel = "Cancel",
  variant = "default", requireReason = false, loading = false,
}: ConfirmationDialogProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (requireReason && !reason.trim()) return;
    onConfirm(requireReason ? reason : undefined);
    setReason("");
  };

  return (
    <Modal open={open} onClose={onCancel} size="sm">
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          {variant === "danger" && (
            <div className="rounded-full bg-error/10 p-2">
              <AlertTriangle className="size-5 text-error" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            <p className="mt-1 text-sm text-text-muted">{message}</p>
          </div>
          <button onClick={onCancel} aria-label="Close" className="text-text-muted hover:text-text-primary">
            <X className="size-5" />
          </button>
        </div>
        {requireReason && (
          <div>
            <label className="text-sm font-medium text-text-secondary">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Required: explain why this action is needed"
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary resize-none h-20"
            />
          </div>
        )}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onCancel}>{cancelLabel}</Button>
          <Button
            variant={variant === "danger" ? "destructive" : "primary"}
            onClick={handleConfirm}
            loading={loading}
            disabled={requireReason && !reason.trim()}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
