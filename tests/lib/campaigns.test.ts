import { describe, it, expect, vi, beforeEach } from "vitest";

const mockExecuteQuery = vi.fn();
const mockGenerateUUID = vi.fn();

vi.mock("@/lib/db", () => ({
  executeQuery: mockExecuteQuery,
  generateUUID: mockGenerateUUID,
}));

describe("createCampaign", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerateUUID.mockReturnValue("new-uuid-123");
    mockExecuteQuery.mockResolvedValue([]);
  });

  it("inserts a campaign with correct values", async () => {
    const { createCampaign } = await import("@/lib/db/queries/campaigns");
    const data = {
      site_id: "site-1",
      title: "Test Campaign",
      body: "Hello world",
      click_url: "https://example.com",
    };
    mockExecuteQuery.mockResolvedValue([]);
    mockExecuteQuery.mockResolvedValueOnce([]);

    await createCampaign(data);

    expect(mockExecuteQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO campaigns"),
      expect.arrayContaining(["new-uuid-123", "site-1", "Test Campaign", "Hello world"])
    );
  });

  it("creates a campaign with optional fields", async () => {
    const { createCampaign } = await import("@/lib/db/queries/campaigns");
    mockExecuteQuery
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: "new-uuid-123", title: "Test" }]);

    const result = await createCampaign({
      site_id: "site-1",
      title: "Test Campaign",
      body: "Body text",
      click_url: "https://example.com",
      icon_url: "https://example.com/icon.png",
      image_url: "https://example.com/image.png",
      action_buttons: [{ label: "Learn More", url: "https://example.com" }],
      segment_id: "seg-1",
      scheduled_at: "2026-07-09T12:00:00Z",
      ai_generated: true,
      created_by_user_id: "user-1",
    });

    expect(mockGenerateUUID).toHaveBeenCalled();
    expect(result).toEqual({ id: "new-uuid-123", title: "Test" });
  });
});

describe("getCampaignById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns campaign when found", async () => {
    const campaign = { id: "camp-1", title: "Test", body: "Body" };
    mockExecuteQuery.mockResolvedValue([campaign]);
    const { getCampaignById } = await import("@/lib/db/queries/campaigns");
    const result = await getCampaignById("camp-1");
    expect(result).toEqual(campaign);
    expect(mockExecuteQuery).toHaveBeenCalledWith(
      "SELECT * FROM campaigns WHERE id = ?",
      ["camp-1"]
    );
  });

  it("returns null when not found", async () => {
    mockExecuteQuery.mockResolvedValue([]);
    const { getCampaignById } = await import("@/lib/db/queries/campaigns");
    const result = await getCampaignById("nonexistent");
    expect(result).toBeNull();
  });
});

describe("getCampaignsBySite", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns campaigns for a site", async () => {
    const campaigns = [
      { id: "camp-1", title: "First", site_id: "site-1" },
      { id: "camp-2", title: "Second", site_id: "site-1" },
    ];
    mockExecuteQuery.mockResolvedValue(campaigns);
    const { getCampaignsBySite } = await import("@/lib/db/queries/campaigns");
    const result = await getCampaignsBySite("site-1");
    expect(result).toEqual(campaigns);
    expect(mockExecuteQuery).toHaveBeenCalledWith(
      expect.stringContaining("WHERE site_id = ?"),
      expect.arrayContaining(["site-1", 20, 0])
    );
  });

  it("filters by status when provided", async () => {
    mockExecuteQuery.mockResolvedValue([]);
    const { getCampaignsBySite } = await import("@/lib/db/queries/campaigns");
    await getCampaignsBySite("site-1", { status: "draft" });
    expect(mockExecuteQuery).toHaveBeenCalledWith(
      expect.stringContaining("AND status = ?"),
      expect.arrayContaining(["site-1", "draft", 20, 0])
    );
  });
});

describe("duplicateCampaign", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerateUUID.mockReturnValue("duplicate-uuid");
  });

  it("duplicates an existing campaign with (copy) suffix", async () => {
    const original = {
      id: "camp-1",
      site_id: "site-1",
      title: "Original Campaign",
      body: "Body text",
      click_url: "https://example.com",
      icon_url: null,
      image_url: null,
      action_buttons: '[{"label":"Click","url":"https://example.com"}]',
      segment_id: null,
      ai_generated: false,
      created_by_user_id: "user-1",
    };
    mockExecuteQuery
      .mockResolvedValueOnce([original])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: "duplicate-uuid", title: "Original Campaign (copy)" }]);

    const { duplicateCampaign } = await import("@/lib/db/queries/campaigns");
    const result = await duplicateCampaign("camp-1");

    expect(mockExecuteQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO campaigns"),
      expect.arrayContaining(["duplicate-uuid", "site-1", "Original Campaign (copy)"])
    );
    expect(result?.title).toBe("Original Campaign (copy)");
  });

  it("returns null if original not found", async () => {
    mockExecuteQuery.mockResolvedValue([]);
    const { duplicateCampaign } = await import("@/lib/db/queries/campaigns");
    const result = await duplicateCampaign("nonexistent");
    expect(result).toBeNull();
  });
});

describe("updateCampaign", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates specified fields", async () => {
    mockExecuteQuery
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: "camp-1", title: "Updated", status: "scheduled" }]);

    const { updateCampaign } = await import("@/lib/db/queries/campaigns");
    const result = await updateCampaign("camp-1", { title: "Updated", status: "scheduled" });

    expect(mockExecuteQuery).toHaveBeenCalledWith(
      expect.stringContaining("UPDATE campaigns SET"),
      expect.arrayContaining(["Updated", "scheduled", "camp-1"])
    );
    expect(result?.title).toBe("Updated");
  });

  it("returns current campaign when no changes", async () => {
    const campaign = { id: "camp-1", title: "Same" };
    mockExecuteQuery.mockResolvedValue([campaign]);
    const { updateCampaign } = await import("@/lib/db/queries/campaigns");
    const result = await updateCampaign("camp-1", {});
    expect(result).toEqual(campaign);
  });
});

describe("getCampaignStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns stats when found", async () => {
    const stats = { campaign_id: "camp-1", sent_count: 100, delivered_count: 90, failed_count: 5, click_count: 20, updated_at: "2026-01-01" };
    mockExecuteQuery.mockResolvedValue([stats]);
    const { getCampaignStats } = await import("@/lib/db/queries/campaigns");
    const result = await getCampaignStats("camp-1");
    expect(result).toEqual(stats);
  });

  it("returns default stats when not found", async () => {
    mockExecuteQuery.mockResolvedValue([]);
    const { getCampaignStats } = await import("@/lib/db/queries/campaigns");
    const result = await getCampaignStats("camp-1");
    expect(result).toEqual({
      campaign_id: "camp-1",
      sent_count: 0,
      delivered_count: 0,
      failed_count: 0,
      click_count: 0,
      updated_at: "",
    });
  });
});

describe("incrementCampaignStat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("increments the specified stat field", async () => {
    mockExecuteQuery.mockResolvedValue([]);
    const { incrementCampaignStat } = await import("@/lib/db/queries/campaigns");
    await incrementCampaignStat("camp-1", "sent_count");
    expect(mockExecuteQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO campaign_stats"),
      ["camp-1"]
    );
  });
});
