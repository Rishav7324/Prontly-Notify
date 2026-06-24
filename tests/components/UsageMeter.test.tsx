import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UsageMeter } from "@/components/ui/UsageMeter";

describe("UsageMeter", () => {
  it("displays usage text", () => {
    render(<UsageMeter label="Subscribers" used={500} limit={1000} />);
    expect(screen.getByText("Subscribers")).toBeInTheDocument();
    expect(screen.getByText(/500/)).toBeInTheDocument();
    expect(screen.getByText(/1,000/)).toBeInTheDocument();
  });

  it("shows warning state at 80%", () => {
    render(<UsageMeter label="Test" used={800} limit={1000} />);
    const text = screen.getByText(/800/);
    expect(text.className).toContain("text-warning");
  });

  it("shows error state at 100%", () => {
    render(<UsageMeter label="Test" used={1000} limit={1000} />);
    const text = screen.getByText(/1,000/);
    expect(text.className).toContain("text-error");
  });

  it("handles unlimited limit", () => {
    render(<UsageMeter label="Test" used={500} limit={-1} />);
    expect(screen.getByText(/Unlimited/)).toBeInTheDocument();
  });
});
