import type { AnnuityYearlyRow } from "@/lib/finance/annuity";

export type { AnnuityYearlyRow };

export interface RetirementFormValues {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturnRate: number;
}

export interface RetirementCalculationResult {
  yearsToRetirement: number;
  totalInvestment: number;
  retirementCorpus: number;
  totalGrowth: number;
  tenureInMonths: number;
  yearlySchedule: AnnuityYearlyRow[];
}
