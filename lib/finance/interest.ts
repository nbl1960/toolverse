/**
 * Shared compound-interest engine — the math behind both the Fixed
 * Deposit Calculator and the standalone Compound Interest Calculator. A
 * single lump sum compounds at a fixed rate, with a configurable
 * compounding frequency (annually, semi-annually, quarterly, or monthly).
 */

export type CompoundingFrequency = "annually" | "semi-annually" | "quarterly" | "monthly";

export const COMPOUNDING_PERIODS_PER_YEAR: Record<CompoundingFrequency, number> = {
  annually: 1,
  "semi-annually": 2,
  quarterly: 4,
  monthly: 12,
};

export interface CompoundGrowthYearlyRow {
  year: number;
  openingValue: number;
  interestThisYear: number;
  closingValue: number;
}

export interface CompoundInterestResult {
  principal: number;
  maturityValue: number;
  totalInterest: number;
  yearlySchedule: CompoundGrowthYearlyRow[];
}

export interface CalculateCompoundInterestInput {
  principal: number;
  annualRatePercent: number;
  years: number;
  compoundingFrequency: CompoundingFrequency;
}

export function calculateCompoundInterest(
  input: CalculateCompoundInterestInput
): CompoundInterestResult {
  const { principal, annualRatePercent, years, compoundingFrequency } = input;
  const periodsPerYear = COMPOUNDING_PERIODS_PER_YEAR[compoundingFrequency];
  const ratePerPeriod = annualRatePercent / 100 / periodsPerYear;

  const yearlySchedule: CompoundGrowthYearlyRow[] = [];
  let value = principal;

  // Whole years for the schedule; fractional final year handled separately below.
  const wholeYears = Math.floor(years);
  const fractionalYear = years - wholeYears;

  for (let year = 1; year <= wholeYears; year++) {
    const openingValue = value;
    value *= Math.pow(1 + ratePerPeriod, periodsPerYear);
    yearlySchedule.push({
      year,
      openingValue,
      interestThisYear: value - openingValue,
      closingValue: value,
    });
  }

  if (fractionalYear > 0) {
    const openingValue = value;
    const periodsInFraction = periodsPerYear * fractionalYear;
    value *= Math.pow(1 + ratePerPeriod, periodsInFraction);
    yearlySchedule.push({
      year: wholeYears + 1,
      openingValue,
      interestThisYear: value - openingValue,
      closingValue: value,
    });
  }

  return {
    principal,
    maturityValue: value,
    totalInterest: value - principal,
    yearlySchedule,
  };
}
