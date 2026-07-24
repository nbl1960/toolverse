import { formatCurrency } from "@/lib/finance/currency";
import type { EmiCalculationResult, EmiFormValues } from "./types";

export { formatCurrency };

export function formatTenure(values: EmiFormValues): string {
  const unit = values.tenureUnit === "years" ? "year" : "month";
  const plural = values.tenure === 1 ? "" : "s";
  return `${values.tenure} ${unit}${plural}`;
}

/** Plain-text summary used by the Copy Results / Share actions. */
export function buildResultSummary(values: EmiFormValues, result: EmiCalculationResult): string {
  return [
    "EMI Calculator results",
    `Loan amount: ${formatCurrency(values.loanAmount)}`,
    `Interest rate: ${values.interestRate}% per annum`,
    `Tenure: ${formatTenure(values)}`,
    `Monthly EMI: ${formatCurrency(result.emi, true)}`,
    `Total interest: ${formatCurrency(result.totalInterest, true)}`,
    `Total payment: ${formatCurrency(result.totalPayment, true)}`,
  ].join("\n");
}
