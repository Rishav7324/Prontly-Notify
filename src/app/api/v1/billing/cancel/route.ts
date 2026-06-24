import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function POST() {
  try {
    const auth = await requireAuth();

    const subscriptions = await executeQuery<any>(
      "SELECT * FROM subscriptions WHERE workspace_id = ? AND status = 'active'",
      [auth.workspaceId]
    );
    if (subscriptions.length === 0) return err("No active subscription", 404);

    await executeQuery(
      "UPDATE subscriptions SET status = 'canceled', updated_at = datetime('now') WHERE workspace_id = ? AND status = 'active'",
      [auth.workspaceId]
    );

    return ok({ message: "Subscription cancelled. You retain access until end of billing period." });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
