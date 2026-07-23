/**
 * Shared "systematic withdrawal" engine — the math behind SWP. A lump sum
 * is invested up front, a fixed amount is withdrawn every month, and the
 * remaining balance keeps growing at the expected rate of return.
 */

export interface WithdrawalYearlyRow {
  year: number;
  openingBalance: number;
  withdrawnThisYear: number;
  interestThisYear: number;
  closingBalance: number;
}

export interface WithdrawalCalculationResult {
  totalWithdrawn: number;
  totalInterestEarned: number;
  finalBalance: number;
  /** Month the corpus hit zero, or null if it lasted the full tenure. */
  depletedAtMonth: number | null;
  tenureInMonths: number;
  yearlySchedule: WithdrawalYearlyRow[];
}

export interface SimulateWithdrawalInput {
  initialInvestment: number;
  monthlyWithdrawal: number;
  annualReturnRate: number;
  tenureInMonths: number;
}

export function simulateWithdrawal(input: SimulateWithdrawalInput): WithdrawalCalculationResult {
  const { initialInvestment, monthlyWithdrawal, annualReturnRate, tenureInMonths } = input;
  const monthlyRate = annualReturnRate / 12 / 100;

  let balance = initialInvestment;
  let totalWithdrawn = 0;
  let totalInterestEarned = 0;
  let depletedAtMonth: number | null = null;

  let yearOpeningBalance = balance;
  let withdrawnThisYear = 0;
  let interestThisYear = 0;

  const yearlySchedule: WithdrawalYearlyRow[] = [];

  for (let month = 1; month <= tenureInMonths; month++) {
    const withdrawal = Math.min(monthlyWithdrawal, Math.max(balance, 0));
    balance -= withdrawal;
    totalWithdrawn += withdrawal;
    withdrawnThisYear += withdrawal;

    const interestForMonth = balance > 0 ? balance * monthlyRate : 0;
    balance += interestForMonth;
    totalInterestEarned += interestForMonth;
    interestThisYear += interestForMonth;

    if (balance <= 0 && depletedAtMonth === null) {
      balance = 0;
      depletedAtMonth = month;
    }

    const isYearEnd = month % 12 === 0 || month === tenureInMonths;
    if (isYearEnd) {
      yearlySchedule.push({
        year: Math.ceil(month / 12),
        openingBalance: yearOpeningBalance,
        withdrawnThisYear,
        interestThisYear,
        closingBalance: balance,
      });
      yearOpeningBalance = balance;
      withdrawnThisYear = 0;
      interestThisYear = 0;
    }

    if (depletedAtMonth !== null) break;
  }

  return {
    totalWithdrawn,
    totalInterestEarned,
    finalBalance: balance,
    depletedAtMonth,
    tenureInMonths,
    yearlySchedule,
  };
}
