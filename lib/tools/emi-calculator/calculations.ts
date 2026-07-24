import { calculateLoan } from "@/lib/finance/loan";
import type { AmortizationRow, EmiCalculationResult } from "./types";

/**
 * Calculates the monthly EMI and full amortization schedule. Delegates to
 * the shared reducing-balance loan engine in `lib/finance/loan.ts` (also
 * used by the Loan Calculator) so the EMI formula exists in exactly one
 * place; this function just adapts the shared result to EMI Calculator's
 * own field names for backward compatibility with its existing UI.
 */
export function calculateEmi(
  principal: number,
  annualRatePercent: number,
  tenureInMonths: number
): EmiCalculationResult {
  const result = calculateLoan(principal, annualRatePercent, tenureInMonths);

  const schedule: AmortizationRow[] = result.schedule.map((row) => ({
    month: row.period,
    payment: row.payment,
    principal: row.principal,
    interest: row.interest,
    balance: row.balance,
  }));

  return {
    emi: result.emi,
    totalInterest: result.totalInterest,
    totalPayment: result.totalPayment,
    principal: result.principal,
    tenureInMonths: result.tenureInMonths,
    schedule,
  };
}
