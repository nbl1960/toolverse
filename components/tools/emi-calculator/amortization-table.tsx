"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { arrayToCsv, downloadCsv } from "@/lib/csv-export";
import { formatCurrency } from "@/lib/tools/emi-calculator/format";
import type { EmiCalculationResult } from "@/lib/tools/emi-calculator/types";

interface AmortizationTableProps {
  result: EmiCalculationResult;
}

const CSV_HEADERS = ["Month", "Payment", "Principal", "Interest", "Remaining balance"];

export function AmortizationTable({ result }: AmortizationTableProps) {
  function handleExport() {
    const rows = result.schedule.map((row) => [
      row.month,
      row.payment.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
      row.balance.toFixed(2),
    ]);
    const csv = arrayToCsv(CSV_HEADERS, rows);
    downloadCsv("emi-amortization-schedule.csv", csv);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">
            Amortization schedule
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {result.schedule.length} monthly installments, principal and interest broken out.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Export CSV
        </Button>
      </div>

      <div className="scrollbar-thin mt-4 max-h-96 overflow-auto rounded-md border border-border">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <caption className="sr-only">
            Month-by-month payment, principal, interest, and remaining balance
          </caption>
          <thead className="sticky top-0 bg-muted/60 backdrop-blur">
            <tr>
              <th scope="col" className="px-3 py-2.5 text-left font-medium text-muted-foreground">
                Month
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                Payment
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                Principal
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                Interest
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-medium text-muted-foreground">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {result.schedule.map((row) => (
              <tr key={row.month} className="border-t border-border">
                <th scope="row" className="px-3 py-2 text-left font-normal text-foreground">
                  {row.month}
                </th>
                <td className="px-3 py-2 text-right font-mono text-xs text-foreground">
                  {formatCurrency(row.payment, true)}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs text-foreground">
                  {formatCurrency(row.principal, true)}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs text-foreground">
                  {formatCurrency(row.interest, true)}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs text-muted-foreground">
                  {formatCurrency(row.balance, true)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
