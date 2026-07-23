import type { FaqItem, ToolExample, ToolFormula } from "@/lib/types";
import type { TenureUnit } from "@/lib/finance/types";
import type { CompoundingFrequency } from "@/lib/finance/interest";

export const DEFAULT_DEPOSIT_AMOUNT = 10_000;
export const DEFAULT_INTEREST_RATE = 7;
export const DEFAULT_TENURE = 5;
export const DEFAULT_TENURE_UNIT: TenureUnit = "years";
export const DEFAULT_COMPOUNDING_FREQUENCY: CompoundingFrequency = "quarterly";

export const MIN_DEPOSIT_AMOUNT = 100;
export const MAX_DEPOSIT_AMOUNT = 10_000_000;

export const MIN_INTEREST_RATE = 0.1;
export const MAX_INTEREST_RATE = 20;

export const MIN_TENURE_MONTHS = 1;
export const MAX_TENURE_MONTHS = 360; // 30 years
export const MAX_TENURE_YEARS = 30;

export const COMPOUNDING_FREQUENCY_OPTIONS: { value: CompoundingFrequency; label: string }[] = [
  { value: "annually", label: "Annually" },
  { value: "semi-annually", label: "Semi-annually" },
  { value: "quarterly", label: "Quarterly" },
  { value: "monthly", label: "Monthly" },
];

export const FD_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is a Fixed Deposit (FD)?",
    answer:
      "A Fixed Deposit is a lump sum you deposit with a bank for a fixed term at a fixed interest rate. Unlike a savings account, the rate and term are locked in upfront, and the money typically can't be withdrawn early without a penalty.",
  },
  {
    question: "Why does compounding frequency matter?",
    answer:
      "More frequent compounding means interest is calculated and added to your principal more often, so each subsequent interest calculation is on a slightly larger base. Quarterly compounding (the most common FD convention) yields a bit more than annual compounding at the same stated rate.",
  },
  {
    question: "Is FD interest taxed?",
    answer:
      "This calculator shows gross maturity value and interest before any taxes. Actual tax treatment of FD interest depends on your local tax rules and isn't accounted for here.",
  },
  {
    question: "How is FD different from a Recurring Deposit (RD)?",
    answer:
      "An FD is a single lump-sum deposit that compounds untouched until maturity. An RD involves depositing a fixed amount every month instead — see the RD Calculator for that.",
  },
  {
    question: "Can I export the year-by-year growth?",
    answer:
      "Yes — use the \"Export CSV\" button above the schedule table to download the full year-by-year breakdown of your FD's growth.",
  },
];

export const FD_FORMULA: ToolFormula = {
  title: "How FD maturity value is calculated",
  expression: "A = P × (1 + r/n)^(n × t)",
  description:
    "Standard compound interest formula. Your principal compounds at the given rate, applied n times per year, for t years — the more frequent the compounding, the faster it grows.",
  variables: [
    { symbol: "A", meaning: "Maturity value" },
    { symbol: "P", meaning: "Principal (deposit amount)" },
    { symbol: "r", meaning: "Annual interest rate (as a decimal)" },
    { symbol: "n", meaning: "Compounding periods per year" },
    { symbol: "t", meaning: "Time in years" },
  ],
};

export const FD_EXAMPLE: ToolExample = {
  title: "Example: a 5-year fixed deposit",
  summary: "Depositing $10,000 at 7% per annum, compounded quarterly, for 5 years:",
  inputs: [
    { label: "Deposit amount", value: "$10,000" },
    { label: "Interest rate", value: "7% p.a." },
    { label: "Tenure", value: "5 years" },
    { label: "Compounding", value: "Quarterly" },
  ],
  outputs: [
    { label: "Maturity value", value: "≈ $14,148" },
    { label: "Total interest", value: "≈ $4,148" },
  ],
};
