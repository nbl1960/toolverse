"use client";

import type { ReactNode } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { arrayToCsv, downloadCsv } from "@/lib/csv-export";
import { cn } from "@/lib/utils";

export interface ScheduleColumn<T> {
  key: string;
  header: string;
  align?: "left" | "right";
  render: (row: T) => ReactNode;
  /** Renders this column as the row's <th scope="row"> (e.g. Year or Month). */
  isRowHeader?: boolean;
}

interface ScheduleTableProps<T> {
  title: string;
  description: string;
  rows: T[];
  columns: ScheduleColumn<T>[];
  getRowKey: (row: T) => string | number;
  csvFilename: string;
  csvHeaders: string[];
  csvRow: (row: T) => Array<string | number>;
}

/**
 * Generic responsive, scrollable schedule table with CSV export — shared
 * by every finance calculator that shows a period-by-period breakdown
 * (amortization, yearly investment growth, withdrawal schedule, etc.).
 * Each tool supplies its own column definitions and CSV mapping; the
 * table chrome, sticky header, and export button are written once.
 */
export function ScheduleTable<T>({
  title,
  description,
  rows,
  columns,
  getRowKey,
  csvFilename,
  csvHeaders,
  csvRow,
}: ScheduleTableProps<T>) {
  function handleExport() {
    const csvRows = rows.map((row) => csvRow(row));
    const csv = arrayToCsv(csvHeaders, csvRows);
    downloadCsv(csvFilename, csv);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Export CSV
        </Button>
      </div>

      <div className="scrollbar-thin mt-4 max-h-96 overflow-auto rounded-md border border-border">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <caption className="sr-only">{description}</caption>
          <thead className="sticky top-0 bg-muted/60 backdrop-blur">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-3 py-2.5 font-medium text-muted-foreground",
                    column.align === "right" ? "text-right" : "text-left"
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={getRowKey(row)} className="border-t border-border">
                {columns.map((column) =>
                  column.isRowHeader ? (
                    <th
                      key={column.key}
                      scope="row"
                      className="px-3 py-2 text-left font-normal text-foreground"
                    >
                      {column.render(row)}
                    </th>
                  ) : (
                    <td
                      key={column.key}
                      className={cn(
                        "px-3 py-2 font-mono text-xs text-foreground",
                        column.align === "right" ? "text-right" : "text-left"
                      )}
                    >
                      {column.render(row)}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
