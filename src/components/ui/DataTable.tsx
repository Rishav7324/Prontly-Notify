"use client";

import { useState, useMemo, type ReactNode } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortable?: boolean;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  keyExtractor: (item: T) => string;
}

export function DataTable<T extends object>({
  columns,
  data,
  sortable = false,
  onSort,
  loading = false,
  emptyMessage = "No data available.",
  className,
  keyExtractor,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (!sortable) return;
    const dir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDir(dir);
    onSort?.(key, dir);
  };

  const sortedData = useMemo(() => {
    if (!sortKey || onSort) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp =
        typeof aVal === "string"
          ? aVal.localeCompare(String(bVal))
          : Number(aVal) - Number(bVal);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir, onSort]);

  const SortIcon = ({ column }: { column: Column<T> }) => {
    if (!column.sortable) return null;
    if (sortKey !== column.key) return <ArrowUpDown className="size-3.5 text-text-muted" />;
    return sortDir === "asc" ? (
      <ArrowUp className="size-3.5 text-primary" />
    ) : (
      <ArrowDown className="size-3.5 text-primary" />
    );
  };

  if (loading) {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="table-row" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border", className)}>
      {/* Desktop table */}
      <table className="hidden w-full md:table">
        <thead>
          <tr className="border-b border-border bg-white/[0.02]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted",
                  col.sortable && "cursor-pointer select-none hover:text-text-secondary",
                  col.hideOnMobile && "hidden lg:table-cell"
                )}
                onClick={() => handleSort(col.key)}
              >
                <div className="flex items-center gap-1.5">
                  {col.label}
                  <SortIcon column={col} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-sm text-text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="border-b border-border last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-sm text-text-secondary",
                      col.hideOnMobile && "hidden lg:table-cell"
                    )}
                  >
                    {col.render
                      ? col.render(item)
                      : String(item[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Mobile card view */}
      <div className="divide-y divide-border md:hidden">
        {sortedData.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-text-muted">
            {emptyMessage}
          </div>
        ) : (
          sortedData.map((item) => (
            <div key={keyExtractor(item)} className="p-4 space-y-2">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={cn(
                    "flex items-center justify-between",
                    col.hideOnMobile && "hidden"
                  )}
                >
                  <span className="text-xs font-medium text-text-muted">
                    {col.label}
                  </span>
                  <span className="text-sm text-text-secondary text-right">
                    {col.render
                      ? col.render(item)
                      : String(item[col.key] ?? "")}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
