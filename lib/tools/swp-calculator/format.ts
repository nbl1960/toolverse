import { formatCurrency, formatTenureText } from "@/lib/finance/format";
import type { SwpCalculationResult, SwpFormValues } from "./types";

export { formatCurrency };

/** Plain-text summary used by the Copy Results / Share actions. */
export function buildSwpResultSummary(values: SwpFormValues, result: SwpCalculationResult): string {
  const lines = [
    "SWP Calculator results",
    `Initial investment: ${formatCurrency(values.initialInvestment)}`,
    `Monthly withdrawal: ${formatCurrency(values.monthlyWithdrawal)}`,
    `Expected return: ${values.expectedReturnRate}% per annum`,
    `Time period: ${formatTenureText(values.tenure, values.tenureUnit)}`,
    `Total withdrawn: ${formatCurrency(result.totalWithdrawn, true)}`,
    `Total interest earned: ${formatCurrency(result.totalInterestEarned, true)}`,
    `Final balance: ${formatCurrency(result.finalBalance, true)}`,
  ];

  if (result.depletedAtMonth !== null) {
    lines.push(`Note: corpus was fully depleted in month ${result.depletedAtMonth}.`);
  }

  return lines.join("\n");
}
