import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function GET() {
  try {
    const auth = await requireAuth();
    const user = await executeQuery<any>("SELECT is_staff FROM users WHERE id = ?", [auth.userId]);
    if (user.length === 0 || !user[0].is_staff) return err("Staff access required", 403);

    const errors = await executeQuery<any>(
      "SELECT * FROM audit_logs WHERE action LIKE '%error%' OR action LIKE '%fail%' OR action LIKE '%exception%' ORDER BY created_at DESC LIMIT 100"
    );

    const errorByType: Record<string, number> = {};
    for (const e of errors) {
      errorByType[e.action] = (errorByType[e.action] ?? 0) + 1;
    }

    return ok({
      totalErrors: errors.length,
      errorsByType: errorByType,
      recentErrors: errors.slice(0, 20),
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
