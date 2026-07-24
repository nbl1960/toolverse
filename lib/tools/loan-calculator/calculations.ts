import { calculateLoan, solveLoanAmountFromEmi } from "@/lib/finance/loan";
import type { LoanCalculatorResult, LoanFormValues } from "./types";

/**
 * Computes either "given a loan amount, what's my EMI" or "given an EMI
 * budget, how much can I borrow" — both delegate entirely to the shared
 * loan engine in `lib/finance/loan.ts` (the same one EMI Calculator uses).
 */
export function calculateLoanResult(
  values: LoanFormValues,
  tenureInMonths: number
): LoanCalculatorResult {
  if (values.mode === "find-emi") {
    const result = calculateLoan(values.loanAmount, values.interestRate, tenureInMonths);
    return {
      mode: "find-emi",
      loanAmount: result.principal,
      emi: result.emi,
      totalInterest: result.totalInterest,
      totalPayment: result.totalPayment,
      tenureInMonths,
      schedule: result.schedule,
    };
  }

  const solvedAmount = solveLoanAmountFromEmi(values.targetEmi, values.interestRate, tenureInMonths);
  const result = calculateLoan(solvedAmount, values.interestRate, tenureInMonths);
  return {
    mode: "find-amount",
    loanAmount: solvedAmount,
    emi: result.emi,
    totalInterest: result.totalInterest,
    totalPayment: result.totalPayment,
    tenureInMonths,
    schedule: result.schedule,
  };
}
