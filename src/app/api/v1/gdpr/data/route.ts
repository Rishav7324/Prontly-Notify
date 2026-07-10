import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";
import { writeAuditLog } from "@/lib/audit/logger";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function DELETE(_req: NextRequest) {
  try {
    const auth = await requireAuth();

    const workspaceId = auth.workspaceId;
    if (!workspaceId) return err("No workspace associated with user", 400);

    const sites = await executeQuery<any>(
      "SELECT id FROM sites WHERE workspace_id = ?",
      [workspaceId]
    );
    const siteIds = sites.map((s: any) => s.id);

    if (siteIds.length > 0) {
      const placeholders = siteIds.map(() => "?").join(",");

      await executeQuery(
        `DELETE FROM campaign_deliveries WHERE campaign_id IN (SELECT id FROM campaigns WHERE site_id IN (${placeholders}))`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM campaign_stats WHERE campaign_id IN (SELECT id FROM campaigns WHERE site_id IN (${placeholders}))`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM campaigns WHERE site_id IN (${placeholders})`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM automation_runs WHERE automation_id IN (SELECT id FROM automations WHERE site_id IN (${placeholders}))`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM automation_steps WHERE automation_id IN (SELECT id FROM automations WHERE site_id IN (${placeholders}))`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM automations WHERE site_id IN (${placeholders})`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM subscriber_attributes WHERE subscriber_id IN (SELECT id FROM subscribers WHERE site_id IN (${placeholders}))`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM subscribers WHERE site_id IN (${placeholders})`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM segments WHERE site_id IN (${placeholders})`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM notification_logs WHERE site_id IN (${placeholders})`,
        siteIds
      );
      await executeQuery(
        `DELETE FROM sites WHERE id IN (${placeholders})`,
        siteIds
      );
    }

    await executeQuery("DELETE FROM workspace_members WHERE workspace_id = ?", [workspaceId]);
    await executeQuery("DELETE FROM subscriptions WHERE workspace_id = ?", [workspaceId]);
    await executeQuery("DELETE FROM api_keys WHERE workspace_id = ?", [workspaceId]);
    await executeQuery("DELETE FROM ai_usage WHERE workspace_id = ?", [workspaceId]);
    await executeQuery("DELETE FROM audit_logs WHERE workspace_id = ?", [workspaceId]);
    await executeQuery("DELETE FROM billing_invoices WHERE workspace_id = ?", [workspaceId]);
    await executeQuery("DELETE FROM payment_methods WHERE workspace_id = ?", [workspaceId]);
    await executeQuery("DELETE FROM workspaces WHERE id = ?", [workspaceId]);

    await executeQuery("DELETE FROM users WHERE id = ?", [auth.userId]);

    await writeAuditLog({
      actor_user_id: auth.userId,
      action: "gdpr_data_deletion",
      target_type: "user",
      target_id: auth.userId,
      reason: "GDPR data deletion request",
      metadata: { workspace_deleted: workspaceId },
    });

    return ok({ message: "All user data has been deleted" });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
