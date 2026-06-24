import { executeQuery, generateUUID } from "@/lib/db";

export interface PlanRow {
  id: string;
  name: string;
  price_monthly: number;
  price_annual: number;
  subscriber_limit: number;
  site_limit: number;
  ai_credit_limit: number;
  team_seat_limit: number;
  features: string;
}

export interface SubscriptionRow {
  id: string;
  workspace_id: string;
  plan_id: string;
  razorpay_subscription_id: string | null;
  status: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceRow {
  id: string;
  workspace_id: string;
  razorpay_invoice_id: string | null;
  amount: number;
  currency: string;
  status: string;
  invoice_pdf_url: string | null;
  period_start: string | null;
  period_end: string | null;
  paid_at: string | null;
  created_at: string;
}

export async function getPlans() {
  return executeQuery<PlanRow[]>("SELECT * FROM plans ORDER BY price_monthly");
}

export async function getPlanById(id: string) {
  const rows = await executeQuery<PlanRow[]>("SELECT * FROM plans WHERE id = ?", [id]);
  return rows[0] ?? null;
}

export async function getSubscription(workspaceId: string) {
  const rows = await executeQuery<SubscriptionRow[]>(
    "SELECT * FROM subscriptions WHERE workspace_id = ? ORDER BY created_at DESC LIMIT 1", [workspaceId]
  );
  return rows[0] ?? null;
}

export async function createSubscription(data: {
  workspace_id: string; plan_id: string; razorpay_subscription_id?: string;
  status?: string; current_period_start?: string; current_period_end?: string;
}) {
  const id = generateUUID();
  const now = new Date().toISOString();
  const end = new Date(Date.now() + 30 * 86400000).toISOString();
  await executeQuery(
    "INSERT INTO subscriptions (id, workspace_id, plan_id, razorpay_subscription_id, status, current_period_start, current_period_end) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, data.workspace_id, data.plan_id, data.razorpay_subscription_id ?? null, data.status ?? "active",
     data.current_period_start ?? now, data.current_period_end ?? end]
  );
  return getSubscription(data.workspace_id);
}

export async function updateSubscriptionPlan(workspaceId: string, planId: string) {
  await executeQuery("UPDATE subscriptions SET plan_id = ?, updated_at = datetime('now') WHERE workspace_id = ?", [planId, workspaceId]);
}

export async function cancelSubscription(workspaceId: string) {
  await executeQuery(
    "UPDATE subscriptions SET status = 'canceled', updated_at = datetime('now') WHERE workspace_id = ? AND status = 'active'",
    [workspaceId]
  );
}

export async function getInvoices(workspaceId: string) {
  return executeQuery<InvoiceRow[]>(
    "SELECT * FROM invoices WHERE workspace_id = ? ORDER BY created_at DESC", [workspaceId]
  );
}

export async function createInvoice(data: {
  workspace_id: string; razorpay_invoice_id?: string; amount: number; currency?: string;
  status?: string; invoice_pdf_url?: string; period_start?: string; period_end?: string;
}) {
  const id = generateUUID();
  await executeQuery(
    "INSERT INTO invoices (id, workspace_id, razorpay_invoice_id, amount, currency, status, invoice_pdf_url, period_start, period_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id, data.workspace_id, data.razorpay_invoice_id ?? null, data.amount, data.currency ?? "INR",
     data.status ?? "open", data.invoice_pdf_url ?? null, data.period_start ?? null, data.period_end ?? null]
  );
  return id;
}
