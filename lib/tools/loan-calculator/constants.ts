import type { FaqItem, ToolExample, ToolFormula } from "@/lib/types";
import type { TenureUnit } from "@/lib/finance/types";

export const DEFAULT_LOAN_AMOUNT = 250_000;
export const DEFAULT_TARGET_EMI = 2_000;
export const DEFAULT_INTEREST_RATE = 8.5;
export const DEFAULT_TENURE = 20;
export const DEFAULT_TENURE_UNIT: TenureUnit = "years";

export const MIN_LOAN_AMOUNT = 1_000;
export const MAX_LOAN_AMOUNT = 100_000_000;

export const MIN_TARGET_EMI = 10;
export const MAX_TARGET_EMI = 1_000_000;

export const MIN_INTEREST_RATE = 0.1;
export const MAX_INTEREST_RATE = 40;

export const MIN_TENURE_MONTHS = 1;
export const MAX_TENURE_MONTHS = 480;
export const MAX_TENURE_YEARS = 40;

export const LOAN_FAQ_ITEMS: FaqItem[] = [
  {
    question: "How is this different from the EMI Calculator?",
    answer:
      "The EMI Calculator answers one question: given a loan amount, what's my monthly payment? This Loan Calculator adds a second mode — given the EMI you can afford, how large a loan does that support? Both use the same underlying loan math.",
  },
  {
    question: "How does 'Find loan amount' work?",
    answer:
      "It solves the standard EMI formula in reverse: instead of computing EMI from principal, rate, and tenure, it computes the maximum principal that a given EMI, rate, and tenure combination can support.",
  },
  {
    question: "Why might my affordable loan amount seem lower than expected?",
    answer:
      "Interest compounds against you over the full tenure — a large share of an EMI budget on a long loan goes to interest, not principal, which caps how much you can actually borrow for a given monthly payment.",
  },
  {
    question: "Does a longer tenure let me borrow more for the same EMI?",
    answer:
      "Yes, generally — spreading the same EMI over more months lets it cover a larger principal, though you'll pay more total interest over the life of the loan.",
  },
  {
    question: "Can I export the full payment schedule?",
    answer:
      "Yes — use the \"Export CSV\" button above the amortization table to download the complete month-by-month schedule for whichever mode you calculated.",
  },
];

export const LOAN_FORMULA: ToolFormula = {
  title: "How the loan amount is solved",
  expression: "P = EMI × [ (1 + r)ⁿ − 1 ] / [ r × (1 + r)ⁿ ]",
  description:
    "This is the EMI formula rearranged to solve for principal (P) instead of EMI. Given the EMI you can afford, the interest rate, and the tenure, it tells you the largest loan that payment can support.",
  variables: [
    { symbol: "P", meaning: "Loan principal (what you can borrow)" },
    { symbol: "EMI", meaning: "Your monthly payment budget" },
    { symbol: "r", meaning: "Monthly interest rate (annual rate ÷ 12 ÷ 100)" },
    { symbol: "n", meaning: "Total number of monthly installments" },
  ],
};

export const LOAN_EXAMPLE: ToolExample = {
  title: "Example: how much can a $2,000 EMI borrow?",
  summary:
    "Switching to \"Find loan amount\" mode with an $2,000 monthly budget at 8.5% over 20 years:",
  inputs: [
    { label: "Target EMI", value: "$2,000/month" },
    { label: "Interest rate", value: "8.5% p.a." },
    { label: "Tenure", value: "20 years" },
  ],
  outputs: [
    { label: "Affordable loan amount", value: "≈ $230,600" },
    { label: "Total interest", value: "≈ $249,400" },
    { label: "Total payment", value: "≈ $480,000" },
  ],
};
