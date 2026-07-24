/**
 * Shared "recurring contribution that compounds" engine — the math behind
 * SIP, RD, and Retirement projections. Each contribution is added at the
 * start of the month (annuity-due convention), then the whole balance
 * grows by one month of the expected return. Supports an optional annual
 * step-up and an optional starting lump sum, so one engine covers all
 * three tools without duplicating the simulation loop.
 */

export interface AnnuityYearlyRow {
  year: number;
  contributedThisYear: number;
  cumulativeContributed: number;
  interestThisYear: number;
  cumulativeInterest: number;
  balance: number;
}

export interface AnnuityCalculationResult {
  totalInvestment: number;
  estimatedReturns: number;
  finalCorpus: number;
  wealthGained: number;
  cagr: number;
  tenureInMonths: number;
  yearlySchedule: AnnuityYearlyRow[];
}

export interface SimulateAnnuityInput {
  /** Lump sum already invested at month 0, before any recurring contributions. */
  initialLumpSum?: number;
  monthlyContribution: number;
  annualReturnRate: number;
  tenureInMonths: number;
  /** Annual increase applied to the monthly contribution, as a percentage. */
  stepUpPercent?: number;
  /** Annual inflation rate used to express the final corpus in today's purchasing power. */
  inflationRate?: number;
}

export function simulateAnnuity(input: SimulateAnnuityInput): AnnuityCalculationResult {
  const {
    initialLumpSum = 0,
    monthlyContribution,
    annualReturnRate,
    tenureInMonths,
    stepUpPercent = 0,
    inflationRate = 0,
  } = input;

  const monthlyRate = annualReturnRate / 12 / 100;

  let currentMonthly = monthlyContribution;
  let balance = initialLumpSum;
  let totalInvested = initialLumpSum;
  let contributedThisYear = 0;
  let previousCumulativeInterest = 0;

  const yearlySchedule: AnnuityYearlyRow[] = [];

  for (let month = 1; month <= tenureInMonths; month++) {
    if (stepUpPercent > 0 && month > 1 && (month - 1) % 12 === 0) {
      currentMonthly *= 1 + stepUpPercent / 100;
    }

    balance += currentMonthly;
    totalInvested += currentMonthly;
    contributedThisYear += currentMonthly;
    balance *= 1 + monthlyRate;

    const isYearEnd = month % 12 === 0 || month === tenureInMonths;
    if (isYearEnd) {
      const cumulativeInterest = balance - totalInvested;
      yearlySchedule.push({
        year: Math.ceil(month / 12),
        contributedThisYear,
        cumulativeContributed: totalInvested,
        interestThisYear: cumulativeInterest - previousCumulativeInterest,
        cumulativeInterest,
        balance,
      });
      previousCumulativeInterest = cumulativeInterest;
      contributedThisYear = 0;
    }
  }

  const finalCorpus = balance;
  const estimatedReturns = finalCorpus - totalInvested;
  const years = tenureInMonths / 12;

  const cagr =
    totalInvested > 0 && years > 0 && finalCorpus > 0
      ? (Math.pow(finalCorpus / totalInvested, 1 / years) - 1) * 100
      : 0;

  const realFinalCorpus =
    inflationRate > 0 ? finalCorpus / Math.pow(1 + inflationRate / 100, years) : finalCorpus;
  const wealthGained = realFinalCorpus - totalInvested;

  return {
    totalInvestment: totalInvested,
    estimatedReturns,
    finalCorpus,
    wealthGained,
    cagr,
    tenureInMonths,
    yearlySchedule,
  };
}
