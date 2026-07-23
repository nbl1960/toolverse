import type { TenureUnit } from "@/lib/finance/types";

export type { TenureUnit };

/** The user's raw form inputs. */
export interface SipFormValues {
  monthlyInvestment: number;
  expectedReturnRate: number;
  tenure: number;
  tenureUnit: TenureUnit;
  /** Annual increase applied to the monthly investment, as a percentage. 0 = no step-up. */
  stepUpPercent: number;
  /** Annual inflation rate used to express the final corpus in today's purchasing power. 0 = ignored. */
  inflationRate: number;
}

/** One row of the yearly investment schedule. */
export interface SipYearlyRow {
  year: number;
  investedThisYear: number;
  cumulativeInvested: number;
  interestThisYear: number;
  cumulativeInterest: number;
  portfolioValue: number;
}

/** Full result of a SIP calculation. */
export interface SipCalculationResult {
  totalInvestment: number;
  estimatedReturns: number;
  finalCorpus: number;
  /** Inflation-adjusted wealth gained (today's purchasing power). Equals estimatedReturns when inflationRate is 0. */
  wealthGained: number;
  /** Approximate compound annual growth rate of the corpus relative to total investment. */
  cagr: number;
  tenureInMonths: number;
  yearlySchedule: SipYearlyRow[];
}
