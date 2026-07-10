import { describe, it, expect, vi, beforeEach } from "vitest";

const mockVerifyIdToken = vi.fn();
const mockGetUser = vi.fn();

vi.mock("@/lib/auth/firebase-admin", () => ({
  verifyIdToken: mockVerifyIdToken,
  getUser: mockGetUser,
}));

describe("AuthError", () => {
  it("creates error with message and status code", async () => {
    const { AuthError } = await import("@/lib/auth/guards");
    const err = new AuthError("Unauthorized", 401);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe("Unauthorized");
    expect(err.statusCode).toBe(401);
    expect(err.name).toBe("AuthError");
  });

  it("defaults to 401", async () => {
    const { AuthError } = await import("@/lib/auth/guards");
    const err = new AuthError("Oops");
    expect(err.statusCode).toBe(401);
  });
});

describe("verifyIdToken", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("resolves decoded token on success", async () => {
    const decoded = { uid: "abc123", email: "test@example.com" };
    mockVerifyIdToken.mockResolvedValue(decoded);
    const { verifyIdToken } = await import("@/lib/auth/firebase-admin");
    await expect(verifyIdToken("some-token")).resolves.toEqual(decoded);
    expect(mockVerifyIdToken).toHaveBeenCalledWith("some-token");
  });

  it("throws on verification failure", async () => {
    mockVerifyIdToken.mockRejectedValue(new Error("Token expired"));
    const { verifyIdToken } = await import("@/lib/auth/firebase-admin");
    await expect(verifyIdToken("bad-token")).rejects.toThrow("Token expired");
  });
});

describe("getUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("resolves user record on success", async () => {
    const record = { uid: "abc123", email: "test@example.com" };
    mockGetUser.mockResolvedValue(record);
    const { getUser } = await import("@/lib/auth/firebase-admin");
    await expect(getUser("abc123")).resolves.toEqual(record);
    expect(mockGetUser).toHaveBeenCalledWith("abc123");
  });

  it("throws on user fetch failure", async () => {
    mockGetUser.mockRejectedValue(new Error("User not found"));
    const { getUser } = await import("@/lib/auth/firebase-admin");
    await expect(getUser("nonexistent")).rejects.toThrow("User not found");
  });
});

describe("requireRole", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passes when role is in allowed roles", async () => {
    const { requireRole } = await import("@/lib/auth/guards");
    const auth = {
      userId: "1", firebaseUid: "abc", email: "a@b.com", name: "Test",
      isStaff: false, staffRole: null, workspaceId: "w1", workspaceRole: "admin", siteAccess: [],
    };
    await expect(requireRole(auth, ["admin", "manager"])).resolves.toBeUndefined();
  });

  it("throws when role is not in allowed roles", async () => {
    const { requireRole } = await import("@/lib/auth/guards");
    const auth = {
      userId: "1", firebaseUid: "abc", email: "a@b.com", name: "Test",
      isStaff: false, staffRole: null, workspaceId: "w1", workspaceRole: "member", siteAccess: [],
    };
    await expect(requireRole(auth, ["admin"])).rejects.toThrow("Insufficient permissions");
  });

  it("throws when workspaceRole is null", async () => {
    const { requireRole } = await import("@/lib/auth/guards");
    const auth = {
      userId: "1", firebaseUid: "abc", email: "a@b.com", name: "Test",
      isStaff: false, staffRole: null, workspaceId: null, workspaceRole: null, siteAccess: [],
    };
    await expect(requireRole(auth, ["admin"])).rejects.toThrow("Insufficient permissions");
  });
});

describe("requireStaff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passes when user is staff", async () => {
    const { requireStaff } = await import("@/lib/auth/guards");
    const auth = {
      userId: "1", firebaseUid: "abc", email: "a@b.com", name: "Test",
      isStaff: true, staffRole: "admin", workspaceId: null, workspaceRole: null, siteAccess: [],
    };
    await expect(requireStaff(auth)).resolves.toBeUndefined();
  });

  it("throws when user is not staff", async () => {
    const { requireStaff } = await import("@/lib/auth/guards");
    const auth = {
      userId: "1", firebaseUid: "abc", email: "a@b.com", name: "Test",
      isStaff: false, staffRole: null, workspaceId: null, workspaceRole: null, siteAccess: [],
    };
    await expect(requireStaff(auth)).rejects.toThrow("Staff access required");
  });
});

describe("requireSiteAccess", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passes when user is staff", async () => {
    const { requireSiteAccess } = await import("@/lib/auth/guards");
    const auth = {
      userId: "1", firebaseUid: "abc", email: "a@b.com", name: "Test",
      isStaff: true, staffRole: "admin", workspaceId: null, workspaceRole: null, siteAccess: [],
    };
    await expect(requireSiteAccess(auth, "site-1")).resolves.toBeUndefined();
  });

  it("passes when siteAccess is 'all'", async () => {
    const { requireSiteAccess } = await import("@/lib/auth/guards");
    const auth = {
      userId: "1", firebaseUid: "abc", email: "a@b.com", name: "Test",
      isStaff: false, staffRole: null, workspaceId: "w1", workspaceRole: "admin", siteAccess: "all",
    };
    await expect(requireSiteAccess(auth, "site-1")).resolves.toBeUndefined();
  });

  it("passes when siteId is in siteAccess array", async () => {
    const { requireSiteAccess } = await import("@/lib/auth/guards");
    const auth = {
      userId: "1", firebaseUid: "abc", email: "a@b.com", name: "Test",
      isStaff: false, staffRole: null, workspaceId: "w1", workspaceRole: "admin", siteAccess: ["site-1", "site-2"],
    };
    await expect(requireSiteAccess(auth, "site-1")).resolves.toBeUndefined();
  });

  it("throws when siteId is not in siteAccess array", async () => {
    const { requireSiteAccess } = await import("@/lib/auth/guards");
    const auth = {
      userId: "1", firebaseUid: "abc", email: "a@b.com", name: "Test",
      isStaff: false, staffRole: null, workspaceId: "w1", workspaceRole: "admin", siteAccess: ["site-2"],
    };
    await expect(requireSiteAccess(auth, "site-1")).rejects.toThrow("No access to this site");
  });
});
