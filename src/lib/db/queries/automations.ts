import { executeQuery, generateUUID } from "@/lib/db";

export interface AutomationRow {
  id: string;
  site_id: string;
  name: string;
  trigger_type: string;
  trigger_config: string;
  status: "active" | "paused" | "draft";
  created_at: string;
  updated_at: string;
}

export interface AutomationStepRow {
  id: string;
  automation_id: string;
  step_order: number;
  type: "wait" | "send" | "condition";
  config: string;
}

export interface AutomationRunRow {
  id: string;
  automation_id: string;
  subscriber_id: string;
  current_step_id: string | null;
  status: "active" | "completed" | "exited";
  next_action_at: string | null;
  started_at: string;
  completed_at: string | null;
}

export async function getAutomationById(id: string) {
  const rows = await executeQuery<AutomationRow[]>("SELECT * FROM automations WHERE id = ?", [id]);
  return rows[0] ?? null;
}

export async function getAutomationsBySite(siteId: string) {
  return executeQuery<AutomationRow[]>("SELECT * FROM automations WHERE site_id = ? ORDER BY created_at DESC", [siteId]);
}

export async function createAutomation(data: { site_id: string; name: string; trigger_type: string; trigger_config?: Record<string, unknown> }) {
  const id = generateUUID();
  await executeQuery(
    "INSERT INTO automations (id, site_id, name, trigger_type, trigger_config) VALUES (?, ?, ?, ?, ?)",
    [id, data.site_id, data.name, data.trigger_type, JSON.stringify(data.trigger_config ?? {})]
  );
  return getAutomationById(id);
}

export async function updateAutomation(id: string, data: Partial<Pick<AutomationRow, "name" | "status" | "trigger_type" | "trigger_config">>) {
  const sets: string[] = [];
  const params: unknown[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) { sets.push(`${k} = ?`); params.push(typeof v === "object" ? JSON.stringify(v) : v); }
  }
  if (sets.length === 0) return getAutomationById(id);
  sets.push("updated_at = datetime('now')");
  params.push(id);
  await executeQuery(`UPDATE automations SET ${sets.join(", ")} WHERE id = ?`, params);
  return getAutomationById(id);
}

export async function deleteAutomation(id: string) {
  await executeQuery("DELETE FROM automation_steps WHERE automation_id = ?", [id]);
  await executeQuery("DELETE FROM automation_runs WHERE automation_id = ?", [id]);
  await executeQuery("DELETE FROM automations WHERE id = ?", [id]);
}

export async function getStepsByAutomation(automationId: string) {
  return executeQuery<AutomationStepRow[]>(
    "SELECT * FROM automation_steps WHERE automation_id = ? ORDER BY step_order", [automationId]
  );
}

export async function addStep(data: { automation_id: string; step_order: number; type: string; config?: Record<string, unknown> }) {
  const id = generateUUID();
  await executeQuery(
    "INSERT INTO automation_steps (id, automation_id, step_order, type, config) VALUES (?, ?, ?, ?, ?)",
    [id, data.automation_id, data.step_order, data.type, JSON.stringify(data.config ?? {})]
  );
  return id;
}

export async function removeStep(id: string) {
  await executeQuery("DELETE FROM automation_steps WHERE id = ?", [id]);
}

export async function getPendingAutomationRuns() {
  return executeQuery<AutomationRunRow[]>(
    "SELECT * FROM automation_runs WHERE status = 'active' AND next_action_at <= datetime('now') ORDER BY next_action_at LIMIT 100"
  );
}

export async function getActiveAutomationRunsForSubscriber(automationId: string, subscriberId: string) {
  return executeQuery<AutomationRunRow[]>(
    "SELECT * FROM automation_runs WHERE automation_id = ? AND subscriber_id = ? AND status = 'active'",
    [automationId, subscriberId]
  );
}

export async function startAutomationRun(data: { automation_id: string; subscriber_id: string; current_step_id?: string }) {
  const id = generateUUID();
  await executeQuery(
    "INSERT INTO automation_runs (id, automation_id, subscriber_id, current_step_id) VALUES (?, ?, ?, ?)",
    [id, data.automation_id, data.subscriber_id, data.current_step_id ?? null]
  );
  return id;
}
