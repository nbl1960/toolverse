import { simulateAnnuity } from "@/lib/finance/annuity";
import type { SipCalculationResult, SipYearlyRow } from "./types";

interface CalculateSipInput {
  monthlyInvestment: number;
  annualReturnRate: number;
  tenureInMonths: number;
  stepUpPercent: number;
  inflationRate: number;
}

/**
 * Calculates SIP growth, including step-up and inflation adjustment.
 * Delegates to the shared recurring-contribution engine in
 * `lib/finance/annuity.ts` (also used by RD and Retirement) so the
 * month-by-month simulation exists in exactly one place; this function
 * just adapts the shared result to SIP Calculator's own field names for
 * backward compatibility with its existing UI.
 */
export function calculateSip(input: CalculateSipInput): SipCalculationResult {
  const result = simulateAnnuity({
    monthlyContribution: input.monthlyInvestment,
    annualReturnRate: input.annualReturnRate,
    tenureInMonths: input.tenureInMonths,
    stepUpPercent: input.stepUpPercent,
    inflationRate: input.inflationRate,
  });

  const yearlySchedule: SipYearlyRow[] = result.yearlySchedule.map((row) => ({
    year: row.year,
    investedThisYear: row.contributedThisYear,
    cumulativeInvested: row.cumulativeContributed,
    interestThisYear: row.interestThisYear,
    cumulativeInterest: row.cumulativeInterest,
    portfolioValue: row.balance,
  }));

  return {
    totalInvestment: result.totalInvestment,
    estimatedReturns: result.estimatedReturns,
    finalCorpus: result.finalCorpus,
    wealthGained: result.wealthGained,
    cagr: result.cagr,
    tenureInMonths: result.tenureInMonths,
    yearlySchedule,
  };
}
