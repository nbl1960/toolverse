/**
 * Shared reducing-balance loan/amortization engine. Used by both the EMI
 * Calculator (fixed amount+rate+tenure -> EMI) and the Loan Calculator
 * (which can additionally solve for loan amount or tenure given the other
 * two). One engine, no duplicated loan math anywhere in the app.
 */

export interface LoanAmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanCalculationResult {
  emi: number;
  principal: number;
  totalInterest: number;
  totalPayment: number;
  tenureInMonths: number;
  schedule: LoanAmortizationRow[];
}

/** Monthly rate from an annual percentage rate. */
export function monthlyRateFromAnnual(annualRatePercent: number): number {
  return annualRatePercent / 12 / 100;
}

/** Standard EMI formula for a reducing-balance loan. */
export function calculateEmiAmount(
  principal: number,
  annualRatePercent: number,
  tenureInMonths: number
): number {
  const monthlyRate = monthlyRateFromAnnual(annualRatePercent);
  if (monthlyRate === 0) return principal / tenureInMonths;
  const factor = Math.pow(1 + monthlyRate, tenureInMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

/** Full amortization calculation: EMI, totals, and the month-by-month schedule. */
export function calculateLoan(
  principal: number,
  annualRatePercent: number,
  tenureInMonths: number
): LoanCalculationResult {
  const monthlyRate = monthlyRateFromAnnual(annualRatePercent);
  const emi = calculateEmiAmount(principal, annualRatePercent, tenureInMonths);

  const schedule: LoanAmortizationRow[] = [];
  let balance = principal;
  let totalInterest = 0;

  for (let period = 1; period <= tenureInMonths; period++) {
    const interestForPeriod = monthlyRate === 0 ? 0 : balance * monthlyRate;
    let principalForPeriod = emi - interestForPeriod;
    balance -= principalForPeriod;

    if (period === tenureInMonths) {
      principalForPeriod += balance;
      balance = 0;
    }

    totalInterest += interestForPeriod;

    schedule.push({
      period,
      payment: principalForPeriod + interestForPeriod,
      principal: principalForPeriod,
      interest: interestForPeriod,
      balance: Math.max(balance, 0),
    });
  }

  return {
    emi,
    principal,
    totalInterest,
    totalPayment: principal + totalInterest,
    tenureInMonths,
    schedule,
  };
}

/** Solves for the maximum loan principal supportable by a given EMI budget. */
export function solveLoanAmountFromEmi(
  emi: number,
  annualRatePercent: number,
  tenureInMonths: number
): number {
  const monthlyRate = monthlyRateFromAnnual(annualRatePercent);
  if (monthlyRate === 0) return emi * tenureInMonths;
  const factor = Math.pow(1 + monthlyRate, tenureInMonths);
  return (emi * (factor - 1)) / (monthlyRate * factor);
}

/** Solves for the tenure (in months) needed to pay off a loan at a given EMI. */
export function solveTenureFromEmi(
  principal: number,
  annualRatePercent: number,
  emi: number
): number | null {
  const monthlyRate = monthlyRateFromAnnual(annualRatePercent);
  if (monthlyRate === 0) return principal / emi;
  const minEmi = principal * monthlyRate;
  if (emi <= minEmi) return null; // EMI too low to ever cover interest
  const months = Math.log(emi / (emi - principal * monthlyRate)) / Math.log(1 + monthlyRate);
  return months;
}
