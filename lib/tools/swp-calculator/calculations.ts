import { simulateWithdrawal } from "@/lib/finance/withdrawal";
import type { SwpCalculationResult, SwpFormValues } from "./types";

/** Calculates SWP outcomes. Delegates entirely to the shared withdrawal engine. */
export function calculateSwp(values: SwpFormValues, tenureInMonths: number): SwpCalculationResult {
  const result = simulateWithdrawal({
    initialInvestment: values.initialInvestment,
    monthlyWithdrawal: values.monthlyWithdrawal,
    annualReturnRate: values.expectedReturnRate,
    tenureInMonths,
  });

  return {
    totalWithdrawn: result.totalWithdrawn,
    totalInterestEarned: result.totalInterestEarned,
    finalBalance: result.finalBalance,
    depletedAtMonth: result.depletedAtMonth,
    tenureInMonths: result.tenureInMonths,
    yearlySchedule: result.yearlySchedule,
  };
}
