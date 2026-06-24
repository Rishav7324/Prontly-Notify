import { describe, it, expect } from "vitest";
import { getSubscriberCount, getSubscriberBrowserBreakdown } from "@/lib/db/queries/subscribers";
import { getDashboardSummary } from "@/lib/db/queries/analytics";

describe("Query builders", () => {
  it("export expected functions", () => {
    expect(typeof getSubscriberCount).toBe("function");
    expect(typeof getSubscriberBrowserBreakdown).toBe("function");
    expect(typeof getDashboardSummary).toBe("function");
  });
});
