import { formatCurrency } from "@/lib/finance/format";
import type { RetirementCalculationResult, RetirementFormValues } from "./types";

export { formatCurrency };

/** Plain-text summary used by the Copy Results / Share actions. */
export function buildRetirementResultSummary(
  values: RetirementFormValues,
  result: RetirementCalculationResult
): string {
  return [
    "Retirement Calculator results",
    `Current age: ${values.currentAge}`,
    `Retirement age: ${values.retirementAge}`,
    `Current savings: ${formatCurrency(values.currentSavings)}`,
    `Monthly contribution: ${formatCurrency(values.monthlyContribution)}`,
    `Expected return: ${values.expectedReturnRate}% per annum`,
    `Years to retirement: ${result.yearsToRetirement}`,
    `Total invested: ${formatCurrency(result.totalInvestment, true)}`,
    `Retirement corpus: ${formatCurrency(result.retirementCorpus, true)}`,
    `Total growth: ${formatCurrency(result.totalGrowth, true)}`,
  ].join("\n");
}
