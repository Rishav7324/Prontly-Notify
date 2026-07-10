import { describe, it, expect, vi, beforeEach } from "vitest";

const mockRequireAuth = vi.fn();
const mockExecuteQuery = vi.fn();

vi.mock("@/lib/auth/guards", () => ({
  requireAuth: mockRequireAuth,
}));

vi.mock("@/lib/db", () => ({
  executeQuery: mockExecuteQuery,
}));

async function callHealthGET() {
  const mod = await import("@/app/api/v1/admin/system/health/route");
  const response = await mod.GET();
  return response.json();
}

describe("Health API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns system stats for staff users", async () => {
    mockRequireAuth.mockResolvedValue({ userId: "staff-1" });

    mockExecuteQuery
      .mockResolvedValueOnce([{ is_staff: 1 }])
      .mockResolvedValueOnce([{ count: 10 }])
      .mockResolvedValueOnce([{ count: 5 }])
      .mockResolvedValueOnce([{ count: 8 }])
      .mockResolvedValueOnce([{ count: 100 }])
      .mockResolvedValueOnce([{ count: 25 }])
      .mockResolvedValueOnce([]);

    const result = await callHealthGET();

    expect(result.success).toBe(true);
    expect(result.data.stats).toEqual({
      totalUsers: 10,
      totalWorkspaces: 5,
      totalSites: 8,
      totalSubscribers: 100,
      totalCampaigns: 25,
    });
    expect(result.data.recentErrors).toEqual([]);
  });

  it("returns 403 for non-staff users", async () => {
    mockRequireAuth.mockResolvedValue({ userId: "user-1" });
    mockExecuteQuery.mockResolvedValueOnce([{ is_staff: 0 }]);

    const result = await callHealthGET();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Staff access required");
  });

  it("returns error when no user found", async () => {
    mockRequireAuth.mockResolvedValue({ userId: "nonexistent" });
    mockExecuteQuery.mockResolvedValueOnce([]);

    const result = await callHealthGET();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Staff access required");
  });

  it("returns 500 on unexpected error", async () => {
    mockRequireAuth.mockRejectedValue(new Error("Database connection failed"));

    const result = await callHealthGET();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Database connection failed");
  });

  it("handles zero counts gracefully", async () => {
    mockRequireAuth.mockResolvedValue({ userId: "staff-1" });

    mockExecuteQuery
      .mockResolvedValueOnce([{ is_staff: 1 }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const result = await callHealthGET();

    expect(result.success).toBe(true);
    expect(result.data.stats).toEqual({
      totalUsers: 0,
      totalWorkspaces: 0,
      totalSites: 0,
      totalSubscribers: 0,
      totalCampaigns: 0,
    });
  });
});
