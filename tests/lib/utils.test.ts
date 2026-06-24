import { describe, it, expect } from "vitest";
import { cn, generateId } from "@/lib/utils";

describe("cn (classname utility)", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", true && "visible")).toBe("base visible");
  });

  it("resolves tailwind conflicts (last wins)", () => {
    const result = cn("px-4", "px-6");
    expect(result).toContain("px-6");
    expect(result).not.toContain("px-4");
  });
});

describe("generateId", () => {
  it("generates a UUID-like string", () => {
    const id = generateId();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("accepts an optional prefix", () => {
    const id = generateId("test_");
    expect(id.startsWith("test_")).toBe(true);
  });
});
