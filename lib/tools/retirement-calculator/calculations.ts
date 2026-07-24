import { simulateAnnuity } from "@/lib/finance/annuity";
import type { RetirementCalculationResult, RetirementFormValues } from "./types";

/**
 * Projects retirement corpus. Delegates to the shared recurring-
 * contribution engine (also used by SIP and RD), passing current savings
 * in as the starting lump sum.
 */
export function calculateRetirement(values: RetirementFormValues): RetirementCalculationResult {
  const yearsToRetirement = Math.max(values.retirementAge - values.currentAge, 0);
  const tenureInMonths = Math.round(yearsToRetirement * 12);

  const result = simulateAnnuity({
    initialLumpSum: values.currentSavings,
    monthlyContribution: values.monthlyContribution,
    annualReturnRate: values.expectedReturnRate,
    tenureInMonths,
  });

  return {
    yearsToRetirement,
    totalInvestment: result.totalInvestment,
    retirementCorpus: result.finalCorpus,
    totalGrowth: result.estimatedReturns,
    tenureInMonths,
    yearlySchedule: result.yearlySchedule,
  };
}
