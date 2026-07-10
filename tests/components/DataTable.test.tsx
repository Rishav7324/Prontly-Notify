import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";

interface Item {
  id: string;
  name: string;
  email: string;
}

const columns: Column<Item>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email" },
];

const data: Item[] = [
  { id: "1", name: "Alice", email: "alice@test.com" },
  { id: "2", name: "Bob", email: "bob@test.com" },
  { id: "3", name: "Charlie", email: "charlie@test.com" },
];

describe("DataTable", () => {
  it("renders column headers", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(item) => item.id}
      />
    );
    expect(screen.getAllByText("Name")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Email")[0]).toBeInTheDocument();
  });

  it("renders data rows", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(item) => item.id}
      />
    );
    expect(screen.getAllByText("Alice")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Bob")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Charlie")[0]).toBeInTheDocument();
  });

  it("renders email values", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(item) => item.id}
      />
    );
    expect(screen.getAllByText("alice@test.com")[0]).toBeInTheDocument();
    expect(screen.getAllByText("bob@test.com")[0]).toBeInTheDocument();
    expect(screen.getAllByText("charlie@test.com")[0]).toBeInTheDocument();
  });

  it("shows empty message when no data", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        keyExtractor={(item) => item.id}
        emptyMessage="No items found"
      />
    );
    expect(screen.getAllByText("No items found")[0]).toBeInTheDocument();
  });

  it("shows default empty message when not provided", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        keyExtractor={(item) => item.id}
      />
    );
    expect(screen.getAllByText("No data available.")[0]).toBeInTheDocument();
  });

  it("sorts data when sortable column header is clicked", async () => {
    const onSort = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        sortable
        onSort={onSort}
        keyExtractor={(item) => item.id}
      />
    );
    // There are multiple "Name" elements (desktop + mobile); click the desktop one
    const [desktopSort] = screen.getAllByText("Name");
    await userEvent.click(desktopSort);
    expect(onSort).toHaveBeenCalledWith("name", "asc");
  });

  it("toggles sort direction on second click", async () => {
    const onSort = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        sortable
        onSort={onSort}
        keyExtractor={(item) => item.id}
      />
    );
    const [desktopSort] = screen.getAllByText("Name");
    await userEvent.click(desktopSort);
    await userEvent.click(desktopSort);
    expect(onSort).toHaveBeenCalledTimes(2);
    expect(onSort).toHaveBeenLastCalledWith("name", "desc");
  });

  it("sorts data internally when onSort is not provided", async () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        sortable
        keyExtractor={(item) => item.id}
      />
    );
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(0);
  });

  it("does not sort when sortable is false", async () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        sortable={false}
        keyExtractor={(item) => item.id}
      />
    );
  });

  it("uses custom render function for cells", () => {
    const colsWithRender: Column<Item>[] = [
      { key: "name", label: "Name", render: (item) => <strong>{item.name}</strong> },
      { key: "email", label: "Email" },
    ];
    render(
      <DataTable
        columns={colsWithRender}
        data={data}
        keyExtractor={(item) => item.id}
      />
    );
    const alices = screen.getAllByText("Alice");
    expect(alices.some((el) => el.tagName === "STRONG")).toBe(true);
  });

  it("shows sort icons on sortable columns", () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={data}
        sortable
        keyExtractor={(item) => item.id}
      />
    );
    const sortIcons = container.querySelectorAll("svg");
    expect(sortIcons.length).toBeGreaterThan(0);
  });
});
