import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth/guards";
import { executeQuery } from "@/lib/db";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAuth();
    const { id } = await params;

    const tests = await executeQuery<any>(
      "SELECT * FROM ab_tests WHERE id = ?",
      [id]
    );
    if (tests.length === 0) return err("A/B test not found", 404);
    if (tests[0].workspace_id !== auth.workspaceId) {
      return err("No access to this A/B test", 403);
    }

    const body = await request.json();
    const variantIndex = parseInt(body.variant_index);
    const variants = JSON.parse(tests[0].variants);
    if (isNaN(variantIndex) || variantIndex < 0 || variantIndex >= variants.length) {
      return err("Invalid variant index", 400);
    }

    await executeQuery(
      "UPDATE ab_tests SET winner_variant_index = ?, status = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [variantIndex, id]
    );

    const row = (await executeQuery<any>("SELECT * FROM ab_tests WHERE id = ?", [id]))[0];
    let parsedVariants: any[] = [];
    try {
      parsedVariants = JSON.parse(row.variants);
    } catch {
      parsedVariants = [];
    }
    return ok({
      id: row.id,
      title: row.title,
      variants: parsedVariants,
      status: row.status,
      winnerId: row.winner_variant_index != null ? String(row.winner_variant_index) : null,
      durationHours: row.duration_hours,
      sentAt: row.sent_at,
      createdAt: row.created_at,
    });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
