import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function GET() {
  try {
    const auth = await requireAuth();
    const user = await executeQuery<any>("SELECT is_staff FROM users WHERE id = ?", [auth.userId]);
    if (user.length === 0 || !user[0].is_staff) return err("Staff access required", 403);

    const [totalRevenue, activeSubscriptions, failedPayments, planDistribution, monthlyMrr] = await Promise.all([
      executeQuery<any>("SELECT COALESCE(SUM(amount), 0) as total FROM invoices WHERE status = 'paid'"),
      executeQuery<any>("SELECT COUNT(*) as count FROM subscriptions WHERE status = 'active'"),
      executeQuery<any>("SELECT COUNT(*) as count FROM subscriptions WHERE status = 'past_due'"),
      executeQuery<any>("SELECT p.name, COUNT(*) as count FROM subscriptions s JOIN plans p ON p.id = s.plan_id WHERE s.status = 'active' GROUP BY p.id"),
      executeQuery<any>(`SELECT COALESCE(SUM(p.price_monthly), 0) as mrr FROM subscriptions s
        JOIN plans p ON p.id = s.plan_id WHERE s.status IN ('active', 'past_due')`),
    ]);

    return ok({
      totalRevenue: totalRevenue[0]?.total ?? 0,
      activeSubscriptions: activeSubscriptions[0]?.count ?? 0,
      failedPayments: failedPayments[0]?.count ?? 0,
      planDistribution,
      monthlyMrr: monthlyMrr[0]?.mrr ?? 0,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
