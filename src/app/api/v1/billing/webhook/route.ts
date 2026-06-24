import { NextRequest } from "next/server";
import { executeQuery } from "@/lib/db";
import { verifyWebhookSignature } from "@/lib/billing/razorpay";
import { getEnv } from "@/lib/env";

function ok(data: any) {
  return Response.json({ success: true, data });
}
function err(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature") || "";
    const env = getEnv();

    if (!env.RAZORPAY_WEBHOOK_SECRET) {
      return err("Webhook secret not configured", 500);
    }

    const isValid = await verifyWebhookSignature(body, signature, env.RAZORPAY_WEBHOOK_SECRET);
    if (!isValid) {
      return err("Invalid webhook signature", 401);
    }

    const payload = JSON.parse(body);
    const event = payload.event;

    switch (event) {
      case "subscription.activated":
      case "subscription.updated": {
        const sub = payload.payload.subscription.entity;
        const razorpaySubId = sub.id;
        const status = sub.status === "active" ? "active" : sub.status === "cancelled" ? "canceled" : "past_due";

        await executeQuery(
          `UPDATE subscriptions SET status = ?, current_period_start = ?, current_period_end = ?,
           updated_at = CURRENT_TIMESTAMP WHERE razorpay_subscription_id = ?`,
          [status, new Date(sub.start_at * 1000).toISOString(), new Date(sub.end_at * 1000).toISOString(), razorpaySubId]
        );
        break;
      }

      case "subscription.cancelled": {
        const cancelSub = payload.payload.subscription.entity;
        await executeQuery(
          "UPDATE subscriptions SET status = 'canceled', updated_at = CURRENT_TIMESTAMP WHERE razorpay_subscription_id = ?",
          [cancelSub.id]
        );
        break;
      }

      case "payment.failed": {
        const payment = payload.payload.payment.entity;
        const subId = payment.subscription_id;
        if (subId) {
          await executeQuery(
            "UPDATE subscriptions SET status = 'past_due', updated_at = CURRENT_TIMESTAMP WHERE razorpay_subscription_id = ?",
            [subId]
          );
        }
        break;
      }

      case "invoice.paid": {
        const invoice = payload.payload.invoice.entity;
        const invId = invoice.id;
        const subDb = await executeQuery<any>(
          "SELECT workspace_id FROM subscriptions WHERE razorpay_subscription_id = ?",
          [invoice.subscription_id]
        );

        if (subDb.length > 0) {
          await executeQuery(
            "INSERT INTO invoices (id, workspace_id, razorpay_invoice_id, amount, currency, status, invoice_pdf_url) VALUES (?, ?, ?, ?, ?, 'paid', ?)",
            [crypto.randomUUID(), subDb[0].workspace_id, invId, invoice.amount, invoice.currency || "INR", invoice.short_url || null]
          );
        }
        break;
      }
    }

    return ok({ received: true });
  } catch (error: any) {
    return err(error.message, error.statusCode || 500);
  }
}
