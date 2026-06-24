import "server-only";
import { getEnv } from "@/lib/env";

function getClient() {
  const env = getEnv();
  if (!env.LLM_PROVIDER_API_KEY) {
    return null;
  }
  return {
    apiKey: env.LLM_PROVIDER_API_KEY,
    baseUrl: env.LLM_PROVIDER_API_KEY?.startsWith("sk-")
      ? "https://api.openai.com/v1"
      : "https://api.anthropic.com/v1",
  };
}

async function callLLM(prompt: string): Promise<string | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const res = await fetch(`${client.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${client.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("LLM API error:", err);
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error("LLM call failed:", err);
    return null;
  }
}

export async function generateTitles(
  body: string,
  count: number = 3
): Promise<string[]> {
  const prompt = `Generate ${count} push notification titles (max 65 chars each) for the following notification body. Return only the titles, one per line, numbered:\n\nBody: "${body}"`;
  const result = await callLLM(prompt);
  if (!result) return [];
  return result
    .split("\n")
    .filter((l) => l.trim() && /^\d+\./.test(l.trim()))
    .map((l) => l.replace(/^\d+\.\s*/, "").trim())
    .slice(0, count);
}

export async function optimizeCTR(
  draft: { title: string; body: string },
  context?: string
): Promise<{ title: string; body: string } | null> {
  const prompt = `Rewrite the following push notification to maximize click-through rate. Keep the title under 65 chars and body under 240 chars. Return format:\nTitle: <optimized title>\nBody: <optimized body>\n\nOriginal:\nTitle: ${draft.title}\nBody: ${draft.body}${context ? `\nContext: ${context}` : ""}`;
  const result = await callLLM(prompt);
  if (!result) return null;

  const titleMatch = result.match(/Title:\s*(.+)/);
  const bodyMatch = result.match(/Body:\s*(.+)/);
  if (!titleMatch || !bodyMatch) return null;

  return {
    title: titleMatch[1].trim().slice(0, 65),
    body: bodyMatch[1].trim().slice(0, 240),
  };
}

export async function suggestSendTime(
  history: { hour: number; ctr: number }[]
): Promise<{ hour: number; reason: string } | null> {
  if (history.length === 0) {
    return { hour: 10, reason: "Default optimal time based on industry benchmarks" };
  }

  const prompt = `Based on the following historical click-through rates by hour, suggest the best send time (hour in 0-23). Return only: Hour: <number>\nReason: <short explanation>\n\nHistory: ${JSON.stringify(history)}`;
  const result = await callLLM(prompt);
  if (!result) {
    const best = history.reduce((a, b) => (a.ctr > b.ctr ? a : b));
    return { hour: best.hour, reason: "Based on historical CTR data" };
  }

  const hourMatch = result.match(/Hour:\s*(\d+)/);
  const reasonMatch = result.match(/Reason:\s*(.+)/);
  return {
    hour: hourMatch ? parseInt(hourMatch[1]) : 10,
    reason: reasonMatch?.[1]?.trim() || "AI-suggested optimal time",
  };
}

export async function suggestSegments(
  subscriberSummary: Record<string, any>
): Promise<{ name: string; rule: any }[]> {
  const prompt = `Suggest 3 audience segments for a push notification platform based on this subscriber data summary. Return as JSON array with name and rule_json fields:\n\n${JSON.stringify(subscriberSummary)}`;
  const result = await callLLM(prompt);
  if (!result) return [];

  try {
    const parsed = JSON.parse(result);
    if (Array.isArray(parsed)) return parsed.slice(0, 3);
    return [];
  } catch {
    return [];
  }
}

export async function analyticsSummary(
  metrics: {
    sent: number;
    delivered: number;
    clicked: number;
    ctr: number;
    subscribers: { total: number; new: number; unsubscribed: number };
    period: { start: string; end: string };
  }
): Promise<string | null> {
  const prompt = `Write a 2-3 sentence plain-language summary of the following push notification performance metrics for a website owner. No jargon:\n\nPeriod: ${metrics.period.start} to ${metrics.period.end}\nSent: ${metrics.sent}\nDelivered: ${metrics.delivered}\nClicked: ${metrics.clicked}\nCTR: ${(metrics.ctr * 100).toFixed(1)}%\nTotal subscribers: ${metrics.subscribers.total}\nNew subscribers: ${metrics.subscribers.new}\nUnsubscribed: ${metrics.subscribers.unsubscribed}`;
  return await callLLM(prompt);
}
