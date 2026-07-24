import type { TenureUnit } from "@/lib/finance/types";
import type { WithdrawalYearlyRow } from "@/lib/finance/withdrawal";

export type { TenureUnit, WithdrawalYearlyRow };

export interface SwpFormValues {
  initialInvestment: number;
  monthlyWithdrawal: number;
  expectedReturnRate: number;
  tenure: number;
  tenureUnit: TenureUnit;
}

export interface SwpCalculationResult {
  totalWithdrawn: number;
  totalInterestEarned: number;
  finalBalance: number;
  depletedAtMonth: number | null;
  tenureInMonths: number;
  yearlySchedule: WithdrawalYearlyRow[];
}
