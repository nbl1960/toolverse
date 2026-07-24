import { formatCurrency, formatPercent } from "@/lib/finance/format";
import type { CagrCalculationResult, CagrFormValues } from "./types";

export { formatCurrency };

/** Plain-text summary used by the Copy Results / Share actions. */
export function buildCagrResultSummary(values: CagrFormValues, result: CagrCalculationResult): string {
  return [
    "CAGR Calculator results",
    `Initial value: ${formatCurrency(values.initialValue)}`,
    `Final value: ${formatCurrency(values.finalValue)}`,
    `Time period: ${values.years} year${values.years === 1 ? "" : "s"}`,
    `CAGR: ${formatPercent(result.cagrPercent)}`,
    `Absolute growth: ${formatCurrency(result.absoluteGrowth, true)}`,
    `Growth multiple: ${result.growthMultiple.toFixed(2)}x`,
  ].join("\n");
}
