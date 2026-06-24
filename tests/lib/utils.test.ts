import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

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
