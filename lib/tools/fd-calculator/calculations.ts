import { calculateCompoundInterest } from "@/lib/finance/interest";
import type { FdCalculationResult, FdFormValues } from "./types";

/** Calculates FD maturity value. Delegates to the shared compound-interest engine. */
export function calculateFd(values: FdFormValues, years: number): FdCalculationResult {
  const result = calculateCompoundInterest({
    principal: values.depositAmount,
    annualRatePercent: values.interestRate,
    years,
    compoundingFrequency: values.compoundingFrequency,
  });

  return {
    principal: result.principal,
    maturityValue: result.maturityValue,
    totalInterest: result.totalInterest,
    yearlySchedule: result.yearlySchedule,
  };
}
