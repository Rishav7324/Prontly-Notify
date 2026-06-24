import { describe, it, expect } from "vitest";
import * as billing from "@/lib/db/queries/billing";
import * as campaigns from "@/lib/db/queries/campaigns";

describe("Billing query builders", () => {
  it("export expected functions", () => {
    expect(typeof billing.getPlans).toBe("function");
    expect(typeof billing.getPlanById).toBe("function");
    expect(typeof billing.createSubscription).toBe("function");
    expect(typeof billing.cancelSubscription).toBe("function");
  });
});

describe("Campaign query builders", () => {
  it("export expected functions", () => {
    expect(typeof campaigns.getCampaignById).toBe("function");
    expect(typeof campaigns.createCampaign).toBe("function");
    expect(typeof campaigns.duplicateCampaign).toBe("function");
  });
});
