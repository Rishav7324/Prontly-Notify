import { describe, it, expect } from "vitest";
import {
  campaignSchema,
  siteSchema,
  segmentSchema,
  subscriberSchema,
  apiKeySchema,
  teamInviteSchema,
  updateUserSchema,
} from "@/lib/validation";

describe("campaignSchema", () => {
  const validCampaign = {
    title: "Test Campaign",
    body: "This is a test notification body",
    click_url: "https://example.com",
  };

  it("accepts a valid campaign", () => {
    const result = campaignSchema.safeParse(validCampaign);
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, title: "" });
    expect(result.success).toBe(false);
  });

  it("rejects title longer than 65 characters", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, title: "a".repeat(66) });
    expect(result.success).toBe(false);
  });

  it("rejects empty body", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, body: "" });
    expect(result.success).toBe(false);
  });

  it("rejects body longer than 240 characters", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, body: "a".repeat(241) });
    expect(result.success).toBe(false);
  });

  it("rejects invalid click_url", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, click_url: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("accepts optional icon_url as valid url", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, icon_url: "https://example.com/icon.png" });
    expect(result.success).toBe(true);
  });

  it("accepts empty string for icon_url", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, icon_url: "" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid icon_url", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, icon_url: "bad-url" });
    expect(result.success).toBe(false);
  });

  it("accepts up to 2 action buttons", () => {
    const result = campaignSchema.safeParse({
      ...validCampaign,
      action_buttons: [
        { label: "Read", url: "https://example.com/1" },
        { label: "Buy", url: "https://example.com/2" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejects more than 2 action buttons", () => {
    const result = campaignSchema.safeParse({
      ...validCampaign,
      action_buttons: [
        { label: "A", url: "https://example.com/a" },
        { label: "B", url: "https://example.com/b" },
        { label: "C", url: "https://example.com/c" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("rejects action button with empty label", () => {
    const result = campaignSchema.safeParse({
      ...validCampaign,
      action_buttons: [{ label: "", url: "https://example.com" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects action button with label longer than 30 chars", () => {
    const result = campaignSchema.safeParse({
      ...validCampaign,
      action_buttons: [{ label: "a".repeat(31), url: "https://example.com" }],
    });
    expect(result.success).toBe(false);
  });

  it("accepts optional segment_id as uuid", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, segment_id: "550e8400-e29b-41d4-a716-446655440000" });
    expect(result.success).toBe(true);
  });

  it("rejects non-uuid segment_id", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, segment_id: "not-a-uuid" });
    expect(result.success).toBe(false);
  });

  it("accepts nullable segment_id", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, segment_id: null });
    expect(result.success).toBe(true);
  });

  it("accepts valid scheduled_at datetime", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, scheduled_at: "2026-07-09T12:00:00Z" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid scheduled_at", () => {
    const result = campaignSchema.safeParse({ ...validCampaign, scheduled_at: "not-a-date" });
    expect(result.success).toBe(false);
  });
});

describe("siteSchema", () => {
  const validSite = {
    name: "My Blog",
    domain: "blog.example.com",
  };

  it("accepts a valid site", () => {
    const result = siteSchema.safeParse(validSite);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = siteSchema.safeParse({ ...validSite, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects name longer than 100 characters", () => {
    const result = siteSchema.safeParse({ ...validSite, name: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("rejects invalid domain", () => {
    const result = siteSchema.safeParse({ ...validSite, domain: "not-a-domain" });
    expect(result.success).toBe(false);
  });

  it("rejects domain without TLD", () => {
    const result = siteSchema.safeParse({ ...validSite, domain: "example" });
    expect(result.success).toBe(false);
  });

  it("accepts valid category", () => {
    const result = siteSchema.safeParse({ ...validSite, category: "blog" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid category", () => {
    const result = siteSchema.safeParse({ ...validSite, category: "invalid-cat" });
    expect(result.success).toBe(false);
  });

  it("accepts valid platform", () => {
    const result = siteSchema.safeParse({ ...validSite, platform: "wordpress" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid platform", () => {
    const result = siteSchema.safeParse({ ...validSite, platform: "invalid-platform" });
    expect(result.success).toBe(false);
  });
});

describe("segmentSchema", () => {
  const validSegment = {
    name: "Active Users",
  };

  it("accepts a valid segment", () => {
    const result = segmentSchema.safeParse(validSegment);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = segmentSchema.safeParse({ name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects name longer than 100 characters", () => {
    const result = segmentSchema.safeParse({ name: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("accepts valid segment type", () => {
    const result = segmentSchema.safeParse({ ...validSegment, type: "dynamic" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid segment type", () => {
    const result = segmentSchema.safeParse({ ...validSegment, type: "invalid" });
    expect(result.success).toBe(false);
  });

  it("accepts valid rule_json structure", () => {
    const result = segmentSchema.safeParse({
      ...validSegment,
      rule_json: {
        operator: "AND",
        conditions: [
          { attribute: "country", operator: "eq", value: "US" },
          { attribute: "status", operator: "eq", value: "active" },
        ],
      },
    });
    expect(result.success).toBe(true);
  });

  it("accepts nested rule groups", () => {
    const result = segmentSchema.safeParse({
      ...validSegment,
      rule_json: {
        operator: "OR",
        conditions: [
          {
            operator: "AND",
            conditions: [
              { attribute: "country", operator: "eq", value: "US" },
              { attribute: "browser", operator: "eq", value: "chrome" },
            ],
          },
          { attribute: "country", operator: "eq", value: "IN" },
        ],
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid attribute in rule condition", () => {
    const result = segmentSchema.safeParse({
      ...validSegment,
      rule_json: {
        operator: "AND",
        conditions: [{ attribute: "nonexistent", operator: "eq", value: "x" }],
      },
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid operator in rule condition", () => {
    const result = segmentSchema.safeParse({
      ...validSegment,
      rule_json: {
        operator: "AND",
        conditions: [{ attribute: "country", operator: "bad_op", value: "x" }],
      },
    });
    expect(result.success).toBe(false);
  });
});

describe("subscriberSchema", () => {
  it("accepts valid subscriber with fcm_token", () => {
    const result = subscriberSchema.safeParse({ fcm_token: "token-123" });
    expect(result.success).toBe(true);
  });

  it("rejects missing fcm_token", () => {
    const result = subscriberSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("accepts optional fields", () => {
    const result = subscriberSchema.safeParse({
      fcm_token: "token-123",
      browser: "chrome",
      os: "windows",
      country: "US",
      city: "New York",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid browser", () => {
    const result = subscriberSchema.safeParse({ fcm_token: "token-123", browser: "safari" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid os", () => {
    const result = subscriberSchema.safeParse({ fcm_token: "token-123", os: "ios" });
    expect(result.success).toBe(false);
  });
});

describe("apiKeySchema", () => {
  it("accepts valid api key input", () => {
    const result = apiKeySchema.safeParse({
      name: "My Key",
      scopes: ["campaigns:read", "analytics:read"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty scopes", () => {
    const result = apiKeySchema.safeParse({ name: "My Key", scopes: [] });
    expect(result.success).toBe(false);
  });

  it("rejects invalid scope", () => {
    const result = apiKeySchema.safeParse({ name: "My Key", scopes: ["invalid:scope"] });
    expect(result.success).toBe(false);
  });
});

describe("teamInviteSchema", () => {
  it("accepts valid invite", () => {
    const result = teamInviteSchema.safeParse({ email: "user@example.com", role: "admin" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = teamInviteSchema.safeParse({ email: "not-an-email", role: "member" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid role", () => {
    const result = teamInviteSchema.safeParse({ email: "user@example.com", role: "superadmin" });
    expect(result.success).toBe(false);
  });
});

describe("updateUserSchema", () => {
  it("accepts partial update", () => {
    const result = updateUserSchema.safeParse({ name: "New Name" });
    expect(result.success).toBe(true);
  });

  it("accepts notification prefs", () => {
    const result = updateUserSchema.safeParse({
      notification_prefs: { product_updates: true, weekly_digest: false },
    });
    expect(result.success).toBe(true);
  });

  it("rejects non-url avatar_url", () => {
    const result = updateUserSchema.safeParse({ avatar_url: "bad-url" });
    expect(result.success).toBe(false);
  });
});
