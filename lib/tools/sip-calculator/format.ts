import { formatCurrency } from "@/lib/finance/currency";
import type { SipCalculationResult, SipFormValues } from "./types";

export { formatCurrency };

export function formatSipTenure(values: SipFormValues): string {
  const unit = values.tenureUnit === "years" ? "year" : "month";
  const plural = values.tenure === 1 ? "" : "s";
  return `${values.tenure} ${unit}${plural}`;
}

/** Plain-text summary used by the Copy Results / Share actions. */
export function buildSipResultSummary(values: SipFormValues, result: SipCalculationResult): string {
  const lines = [
    "SIP Calculator results",
    `Monthly investment: ${formatCurrency(values.monthlyInvestment)}`,
    `Expected annual return: ${values.expectedReturnRate}%`,
    `Investment period: ${formatSipTenure(values)}`,
  ];

  if (values.stepUpPercent > 0) {
    lines.push(`Annual step-up: ${values.stepUpPercent}%`);
  }
  if (values.inflationRate > 0) {
    lines.push(`Inflation rate: ${values.inflationRate}%`);
  }

  lines.push(
    `Total investment: ${formatCurrency(result.totalInvestment, true)}`,
    `Estimated returns: ${formatCurrency(result.estimatedReturns, true)}`,
    `Final corpus: ${formatCurrency(result.finalCorpus, true)}`,
    `Wealth gained${values.inflationRate > 0 ? " (inflation-adjusted)" : ""}: ${formatCurrency(result.wealthGained, true)}`,
    `Approx. CAGR: ${result.cagr.toFixed(1)}%`
  );

  return lines.join("\n");
}
