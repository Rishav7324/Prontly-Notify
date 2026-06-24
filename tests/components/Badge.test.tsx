import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders with text", () => {
    render(<Badge variant="info">Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Badge variant="info">Info</Badge>);
    expect(container.firstChild).toHaveClass("bg-primary/10");
  });

  it("applies size classes", () => {
    const { container } = render(<Badge variant="default" size="sm">Small</Badge>);
    expect(container.firstChild).toHaveClass("text-[10px]");
  });
});
