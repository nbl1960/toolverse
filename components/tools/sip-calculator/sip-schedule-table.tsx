"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { arrayToCsv, downloadCsv } from "@/lib/csv-export";
import { formatCurrency } from "@/lib/finance/currency";
import type { SipCalculationResult } from "@/lib/tools/sip-calculator/types";

interface SipScheduleTableProps {
  result: SipCalculationResult;
}

const CSV_HEADERS = [
  "Year",
  "Invested this year",
  "Cumulative invested",
  "Interest this year",
  "Cumulative interest",
  "Portfolio value",
];

export function SipScheduleTable({ result }: SipScheduleTableProps) {
  function handleExport() {
    const rows = result.yearlySchedule.map((row) => [
      row.year,
      row.investedThisYear.toFixed(2),
      row.cumulativeInvested.toFixed(2),
      row.interestThisYear.toFixed(2),
      row.cumulativeInterest.toFixed(2),
      row.portfolioValue.toFixed(2),
    ]);
    const csv = arrayToCsv(CSV_HEADERS, rows);
    downloadCsv("sip-investment-schedule.csv", csv);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">
            Yearly investment schedule
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {result.yearlySchedule.length} year{result.yearlySchedule.length === 1 ? "" : "s"}, cumulative amount invested and interest earned.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Export CSV
        </Button>
      </div>

      <div className="scrollbar-thin mt-4 max-h-96 overflow-auto rounded-md border border-border">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <caption className="sr-only">
            Year-by-year amount invested, interest earned, and portfolio value
          </caption>
          <thead className="sticky top-0 bg-muted/60 backdrop-blur">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-medium text-muted-foreground">
                Year
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                Amount invested
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                Interest earned
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                Portfolio value
              </th>
            </tr>
          </thead>
          <tbody>
            {result.yearlySchedule.map((row) => (
              <tr key={row.year} className="border-t border-border">
                <th scope="row" className="px-3 py-2 text-left font-normal text-foreground">
                  {row.year}
                </th>
                <td className="px-3 py-2 text-right font-mono text-xs text-foreground">
                  {formatCurrency(row.cumulativeInvested, true)}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs text-foreground">
                  {formatCurrency(row.cumulativeInterest, true)}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs text-muted-foreground">
                  {formatCurrency(row.portfolioValue, true)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
