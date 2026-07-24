import { formatCurrency, formatTenureText } from "@/lib/finance/format";
import type { LoanCalculatorResult, LoanFormValues } from "./types";

export { formatCurrency };

/** Plain-text summary used by the Copy Results / Share actions. */
export function buildLoanResultSummary(values: LoanFormValues, result: LoanCalculatorResult): string {
  const lines = ["Loan Calculator results"];

  if (result.mode === "find-emi") {
    lines.push(`Loan amount: ${formatCurrency(values.loanAmount)}`);
  } else {
    lines.push(`Target EMI: ${formatCurrency(values.targetEmi)}/month`);
  }

  lines.push(
    `Interest rate: ${values.interestRate}% per annum`,
    `Tenure: ${formatTenureText(values.tenure, values.tenureUnit)}`,
    result.mode === "find-amount"
      ? `Affordable loan amount: ${formatCurrency(result.loanAmount, true)}`
      : `Monthly EMI: ${formatCurrency(result.emi, true)}`,
    `Total interest: ${formatCurrency(result.totalInterest, true)}`,
    `Total payment: ${formatCurrency(result.totalPayment, true)}`
  );

  return lines.join("\n");
}
