import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StepsIndicator } from "@/components/ui/StepsIndicator";

describe("StepsIndicator", () => {
  const steps = [
    { label: "Step 1", description: "First step" },
    { label: "Step 2" },
    { label: "Step 3", description: "Last step" },
  ];

  it("renders all steps", () => {
    render(<StepsIndicator steps={steps} currentStep={0} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("shows descriptions", () => {
    render(<StepsIndicator steps={steps} currentStep={0} />);
    expect(screen.getByText("First step")).toBeInTheDocument();
    expect(screen.getByText("Last step")).toBeInTheDocument();
  });

  it("marks completed steps with check icon", () => {
    const { container } = render(<StepsIndicator steps={steps} currentStep={2} />);
    const checkIcons = container.querySelectorAll("svg");
    expect(checkIcons.length).toBeGreaterThan(0);
  });
});
