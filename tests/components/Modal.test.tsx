import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "@/components/ui/Modal";

describe("Modal", () => {

  it("renders content when open", () => {
    render(<Modal open={true} onClose={() => {}}>Content</Modal>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<Modal open={false} onClose={() => {}}>Content</Modal>);
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Modal open={true} onClose={() => {}} title="My Title">Content</Modal>);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    render(<Modal open={true} onClose={onClose} title="Title">Content</Modal>);
    await userEvent.click(screen.getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", async () => {
    const onClose = vi.fn();
    const { container } = render(<Modal open={true} onClose={onClose}>Content</Modal>);
    const backdrop = container.querySelector('[aria-hidden="true"]');
    expect(backdrop).toBeInTheDocument();
    if (backdrop) {
      await userEvent.click(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    render(<Modal open={true} onClose={onClose}>Content</Modal>);
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(event);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose for other key presses", () => {
    const onClose = vi.fn();
    render(<Modal open={true} onClose={onClose}>Content</Modal>);
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    document.dispatchEvent(event);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("accepts custom size", () => {
    render(<Modal open={true} onClose={() => {}} size="lg">Content</Modal>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<Modal open={true} onClose={() => {}} title="Accessible">Content</Modal>);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Accessible");
  });

  it("removes event listener when closed", () => {
    const onClose = vi.fn();
    const { rerender } = render(<Modal open={true} onClose={onClose}>Content</Modal>);
    rerender(<Modal open={false} onClose={onClose}>Content</Modal>);
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(event);
    expect(onClose).not.toHaveBeenCalled();
  });
});
