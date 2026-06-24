import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("accepts className", () => {
    const { container } = render(<Button className="custom-class">Styled</Button>);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
