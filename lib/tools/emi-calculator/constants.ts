import type { FaqItem, ToolExample, ToolFormula } from "@/lib/types";
import type { TenureUnit } from "./types";

export const DEFAULT_LOAN_AMOUNT = 250_000;
export const DEFAULT_INTEREST_RATE = 8.5;
export const DEFAULT_TENURE = 20;
export const DEFAULT_TENURE_UNIT: TenureUnit = "years";

export const MIN_LOAN_AMOUNT = 1_000;
export const MAX_LOAN_AMOUNT = 100_000_000;

export const MIN_INTEREST_RATE = 0.1;
export const MAX_INTEREST_RATE = 40;

export const MIN_TENURE_MONTHS = 1;
export const MAX_TENURE_MONTHS = 480; // 40 years
export const MAX_TENURE_YEARS = 40;

export const EMI_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is EMI?",
    answer:
      "EMI stands for Equated Monthly Installment — a fixed payment amount made toward a loan every month until it's fully paid off. Each installment covers a mix of interest and principal, with the interest portion shrinking and the principal portion growing over the life of the loan.",
  },
  {
    question: "How is EMI calculated?",
    answer:
      "EMI is calculated using the reducing-balance formula: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly installments. This calculator applies that formula directly to your inputs.",
  },
  {
    question: "Does a longer tenure always mean a smaller EMI?",
    answer:
      "Yes — spreading the same loan amount over more months lowers the monthly payment. However, a longer tenure also means you pay more total interest over the life of the loan, even though each individual installment is smaller.",
  },
  {
    question: "What's the difference between total interest and total payment?",
    answer:
      "Total payment is everything you'll pay back over the full tenure — principal plus interest. Total interest is just the interest portion of that: total payment minus the original loan amount.",
  },
  {
    question: "Can I export the full payment schedule?",
    answer:
      "Yes — use the \"Export CSV\" button above the amortization table to download the complete month-by-month schedule, including payment, principal, interest, and remaining balance for every installment.",
  },
];

export const EMI_FORMULA: ToolFormula = {
  title: "How EMI is calculated",
  expression: "EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)",
  description:
    "This is the standard reducing-balance EMI formula. Each month's payment stays the same, but the split between interest and principal shifts over time — early installments are interest-heavy, later ones are mostly principal.",
  variables: [
    { symbol: "P", meaning: "Loan principal (the amount borrowed)" },
    { symbol: "r", meaning: "Monthly interest rate (annual rate ÷ 12 ÷ 100)" },
    { symbol: "n", meaning: "Total number of monthly installments" },
  ],
};

export const EMI_EXAMPLE: ToolExample = {
  title: "Example: a $200,000 loan over 20 years",
  summary: "Borrowing $200,000 at 8% per annum, repaid over 20 years:",
  inputs: [
    { label: "Loan amount", value: "$200,000" },
    { label: "Interest rate", value: "8% p.a." },
    { label: "Tenure", value: "20 years" },
  ],
  outputs: [
    { label: "Monthly EMI", value: "≈ $1,673" },
    { label: "Total interest", value: "≈ $201,520" },
    { label: "Total payment", value: "≈ $401,520" },
  ],
};
