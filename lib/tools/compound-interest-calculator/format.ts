import { formatCurrency } from "@/lib/finance/format";
import { COMPOUNDING_FREQUENCY_OPTIONS } from "./constants";
import type { CompoundInterestCalculationResult, CompoundInterestFormValues } from "./types";

export { formatCurrency };

/** Plain-text summary used by the Copy Results / Share actions. */
export function buildCompoundInterestResultSummary(
  values: CompoundInterestFormValues,
  result: CompoundInterestCalculationResult
): string {
  const frequencyLabel =
    COMPOUNDING_FREQUENCY_OPTIONS.find((o) => o.value === values.compoundingFrequency)?.label ??
    values.compoundingFrequency;

  return [
    "Compound Interest Calculator results",
    `Principal: ${formatCurrency(values.principal)}`,
    `Annual rate: ${values.annualRate}%`,
    `Time: ${values.years} year${values.years === 1 ? "" : "s"}`,
    `Compounding: ${frequencyLabel}`,
    `Final amount: ${formatCurrency(result.maturityValue, true)}`,
    `Total interest: ${formatCurrency(result.totalInterest, true)}`,
  ].join("\n");
}
