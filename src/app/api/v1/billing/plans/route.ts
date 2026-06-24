import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    const plans = await executeQuery<any>(
      "SELECT * FROM plans WHERE is_active = TRUE ORDER BY sort_order"
    );
    return Response.json({ success: true, data: plans });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
