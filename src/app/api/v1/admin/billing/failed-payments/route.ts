import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

const STORAGE_KEY = "razorpay_failed_payments";

export async function GET() {
  try {
    const auth = await requireAuth();
    const user = await executeQuery<any>("SELECT is_staff FROM users WHERE id = ?", [auth.userId]);
    if (user.length === 0 || !user[0].is_staff) return err("Staff access required", 403);

    const failed = await executeQuery<any>(
      `SELECT s.id, s.workspace_id, s.status, s.current_period_end,
        w.name as workspace_name, w.owner_user_id,
        u.email as owner_email,
        COALESCE(p.price_monthly, 0) as amount,
        (SELECT COUNT(*) FROM invoices WHERE workspace_id = w.id AND status = 'uncollectible') as retry_count
       FROM subscriptions s
       JOIN workspaces w ON w.id = s.workspace_id
       JOIN users u ON w.owner_user_id = u.id
       JOIN plans p ON w.plan_id = p.id
       WHERE s.status = 'past_due' ORDER BY s.current_period_end DESC`
    );
    return ok({ failedPayments: failed });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
