import { simulateAnnuity } from "@/lib/finance/annuity";
import type { RdCalculationResult, RdFormValues } from "./types";

/**
 * Calculates RD maturity value. Delegates to the shared recurring-
 * contribution engine in `lib/finance/annuity.ts` (also used by SIP and
 * Retirement) with no step-up and no inflation adjustment — RD is simply
 * a flat monthly deposit that compounds.
 */
export function calculateRd(values: RdFormValues, tenureInMonths: number): RdCalculationResult {
  const result = simulateAnnuity({
    monthlyContribution: values.monthlyDeposit,
    annualReturnRate: values.interestRate,
    tenureInMonths,
  });

  return {
    totalInvestment: result.totalInvestment,
    totalInterest: result.estimatedReturns,
    maturityValue: result.finalCorpus,
    tenureInMonths: result.tenureInMonths,
    yearlySchedule: result.yearlySchedule,
  };
}
