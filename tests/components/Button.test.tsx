import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders all variants", () => {
    const variants = [
      "primary", "secondary", "outline", "ghost", "destructive", "link", "icon-only",
    ] as const;
    for (const variant of variants) {
      const { container } = render(
        <Button variant={variant}>{variant === "icon-only" ? null : variant}</Button>
      );
      if (variant !== "icon-only") {
        expect(screen.getByText(variant)).toBeInTheDocument();
      }
      expect(container.firstChild).toBeInTheDocument();
    }
  });

  it("renders all sizes", () => {
    const sizes = ["sm", "md", "lg", "xl"] as const;
    for (const size of sizes) {
      const { container } = render(<Button size={size}>Size {size}</Button>);
      expect(screen.getByText(`Size ${size}`)).toBeInTheDocument();
    }
  });

  it("shows loading spinner and disables button", () => {
    const { container } = render(<Button loading>Loading</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    const spinner = container.querySelector("svg");
    expect(spinner).toBeInTheDocument();
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", async () => {
    const handleClick = vi.fn();
    render(<Button loading onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders icon when provided", () => {
    const { container } = render(<Button icon={<svg data-testid="icon" />}>With Icon</Button>);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("accepts className", () => {
    const { container } = render(<Button className="custom-class">Styled</Button>);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
