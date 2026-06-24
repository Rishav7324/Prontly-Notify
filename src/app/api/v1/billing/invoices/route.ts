import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) { return Response.json({ success: true, data }); }
function err(message: string, status: number) { return Response.json({ success: false, error: message }, { status }); }

export async function GET() {
  try {
    const auth = await requireAuth();
    const invoices = await executeQuery<any>(
      `SELECT i.*, p.name as plan_name FROM invoices i
       LEFT JOIN subscriptions s ON s.workspace_id = i.workspace_id
       LEFT JOIN plans p ON p.id = s.plan_id
       WHERE i.workspace_id = ? ORDER BY i.created_at DESC`,
      [auth.workspaceId]
    );
    return ok({ invoices });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
