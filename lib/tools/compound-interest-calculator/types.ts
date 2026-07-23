import type { CompoundGrowthYearlyRow, CompoundingFrequency } from "@/lib/finance/interest";

export type { CompoundGrowthYearlyRow, CompoundingFrequency };

export interface CompoundInterestFormValues {
  principal: number;
  annualRate: number;
  years: number;
  compoundingFrequency: CompoundingFrequency;
}

export interface CompoundInterestCalculationResult {
  principal: number;
  maturityValue: number;
  totalInterest: number;
  yearlySchedule: CompoundGrowthYearlyRow[];
}
