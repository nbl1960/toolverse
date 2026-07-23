import { formatCurrency, formatTenureText } from "@/lib/finance/format";
import type { RdCalculationResult, RdFormValues } from "./types";

export { formatCurrency };

/** Plain-text summary used by the Copy Results / Share actions. */
export function buildRdResultSummary(values: RdFormValues, result: RdCalculationResult): string {
  return [
    "RD Calculator results",
    `Monthly deposit: ${formatCurrency(values.monthlyDeposit)}`,
    `Interest rate: ${values.interestRate}% per annum`,
    `Tenure: ${formatTenureText(values.tenure, values.tenureUnit)}`,
    `Total investment: ${formatCurrency(result.totalInvestment, true)}`,
    `Maturity value: ${formatCurrency(result.maturityValue, true)}`,
    `Total interest: ${formatCurrency(result.totalInterest, true)}`,
  ].join("\n");
}
