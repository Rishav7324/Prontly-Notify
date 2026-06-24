import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

describe("Breadcrumb", () => {
  it("renders breadcrumb items", () => {
    render(<Breadcrumb items={[{ label: "Campaigns", href: "/dashboard/campaigns" }, { label: "New" }]} />);
    expect(screen.getByText("Campaigns")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("shows home icon by default", () => {
    const { container } = render(<Breadcrumb items={[{ label: "Test" }]} />);
    const homeIcon = container.querySelector("svg");
    expect(homeIcon).toBeInTheDocument();
  });

  it("hides home when showHome is false", () => {
    const { container } = render(<Breadcrumb items={[{ label: "Test" }]} showHome={false} />);
    const homeIcon = container.querySelector("svg");
    expect(homeIcon).toBeNull();
  });
});
