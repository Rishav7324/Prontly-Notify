import "server-only";
import { executeQuery } from "@/lib/db";

export type AuditLogEntry = {
  actor_user_id: string;
  action: string;
  target_type: string;
  target_id: string;
  reason?: string;
  metadata?: Record<string, unknown>;
};

export async function writeAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    await executeQuery(
      `INSERT INTO audit_logs (actor_user_id, action, target_type, target_id, reason, metadata, created_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
      [
        entry.actor_user_id,
        entry.action,
        entry.target_type,
        entry.target_id,
        entry.reason ?? null,
        entry.metadata ? JSON.stringify(entry.metadata) : null,
      ]
    );
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
