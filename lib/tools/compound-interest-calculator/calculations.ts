import { calculateCompoundInterest } from "@/lib/finance/interest";
import type { CompoundInterestCalculationResult, CompoundInterestFormValues } from "./types";

/** Delegates entirely to the shared compound-interest engine (same one FD Calculator uses). */
export function calculateCompoundInterestResult(
  values: CompoundInterestFormValues
): CompoundInterestCalculationResult {
  const result = calculateCompoundInterest({
    principal: values.principal,
    annualRatePercent: values.annualRate,
    years: values.years,
    compoundingFrequency: values.compoundingFrequency,
  });

  return {
    principal: result.principal,
    maturityValue: result.maturityValue,
    totalInterest: result.totalInterest,
    yearlySchedule: result.yearlySchedule,
  };
}
