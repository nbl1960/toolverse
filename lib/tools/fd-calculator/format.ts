import { formatCurrency, formatTenureText } from "@/lib/finance/format";
import { COMPOUNDING_FREQUENCY_OPTIONS } from "./constants";
import type { FdCalculationResult, FdFormValues } from "./types";

export { formatCurrency };

/** Plain-text summary used by the Copy Results / Share actions. */
export function buildFdResultSummary(values: FdFormValues, result: FdCalculationResult): string {
  const frequencyLabel =
    COMPOUNDING_FREQUENCY_OPTIONS.find((o) => o.value === values.compoundingFrequency)?.label ??
    values.compoundingFrequency;

  return [
    "FD Calculator results",
    `Deposit amount: ${formatCurrency(values.depositAmount)}`,
    `Interest rate: ${values.interestRate}% per annum`,
    `Tenure: ${formatTenureText(values.tenure, values.tenureUnit)}`,
    `Compounding: ${frequencyLabel}`,
    `Maturity value: ${formatCurrency(result.maturityValue, true)}`,
    `Total interest: ${formatCurrency(result.totalInterest, true)}`,
  ].join("\n");
}
