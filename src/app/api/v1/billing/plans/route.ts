import { executeQuery } from "@/lib/db";

export async function GET() {
  try {
    const plans = await executeQuery<any>(
      "SELECT * FROM plans ORDER BY sort_order"
    );
    return Response.json({ success: true, data: plans });
  } catch {
    return Response.json({ success: true, data: [] });
  }
}
