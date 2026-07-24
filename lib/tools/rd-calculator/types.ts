import type { TenureUnit } from "@/lib/finance/types";
import type { AnnuityYearlyRow } from "@/lib/finance/annuity";

export type { TenureUnit, AnnuityYearlyRow };

export interface RdFormValues {
  monthlyDeposit: number;
  interestRate: number;
  tenure: number;
  tenureUnit: TenureUnit;
}

export interface RdCalculationResult {
  totalInvestment: number;
  totalInterest: number;
  maturityValue: number;
  tenureInMonths: number;
  yearlySchedule: AnnuityYearlyRow[];
}
