import type { TenureUnit } from "@/lib/finance/types";
import type { LoanAmortizationRow } from "@/lib/finance/loan";

export type { TenureUnit, LoanAmortizationRow };

export type LoanCalculatorMode = "find-emi" | "find-amount";

export interface LoanFormValues {
  mode: LoanCalculatorMode;
  /** Used in "find-emi" mode. */
  loanAmount: number;
  /** Used in "find-amount" mode. */
  targetEmi: number;
  interestRate: number;
  tenure: number;
  tenureUnit: TenureUnit;
}

export interface LoanCalculatorResult {
  mode: LoanCalculatorMode;
  loanAmount: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
  tenureInMonths: number;
  schedule: LoanAmortizationRow[];
}
