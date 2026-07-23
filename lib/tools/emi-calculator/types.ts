import type { TenureUnit } from "@/lib/finance/types";

export type { TenureUnit };

/** The user's raw form inputs. */
export interface EmiFormValues {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  tenureUnit: TenureUnit;
}

/** One row of the amortization schedule. */
export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/** Full result of an EMI calculation. */
export interface EmiCalculationResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
  tenureInMonths: number;
  schedule: AmortizationRow[];
}
