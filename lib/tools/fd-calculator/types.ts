import type { TenureUnit } from "@/lib/finance/types";
import type { CompoundGrowthYearlyRow, CompoundingFrequency } from "@/lib/finance/interest";

export type { TenureUnit, CompoundGrowthYearlyRow, CompoundingFrequency };

export interface FdFormValues {
  depositAmount: number;
  interestRate: number;
  tenure: number;
  tenureUnit: TenureUnit;
  compoundingFrequency: CompoundingFrequency;
}

export interface FdCalculationResult {
  principal: number;
  maturityValue: number;
  totalInterest: number;
  yearlySchedule: CompoundGrowthYearlyRow[];
}
