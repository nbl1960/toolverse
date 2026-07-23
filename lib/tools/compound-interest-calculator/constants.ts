import type { FaqItem, ToolExample, ToolFormula } from "@/lib/types";
import type { CompoundingFrequency } from "@/lib/finance/interest";

export const DEFAULT_PRINCIPAL = 10_000;
export const DEFAULT_ANNUAL_RATE = 8;
export const DEFAULT_YEARS = 10;
export const DEFAULT_COMPOUNDING_FREQUENCY: CompoundingFrequency = "annually";

export const MIN_PRINCIPAL = 100;
export const MAX_PRINCIPAL = 100_000_000;

export const MIN_ANNUAL_RATE = 0.1;
export const MAX_ANNUAL_RATE = 30;

export const MIN_YEARS = 0.5;
export const MAX_YEARS = 50;

export const COMPOUNDING_FREQUENCY_OPTIONS: { value: CompoundingFrequency; label: string }[] = [
  { value: "annually", label: "Annually" },
  { value: "semi-annually", label: "Semi-annually" },
  { value: "quarterly", label: "Quarterly" },
  { value: "monthly", label: "Monthly" },
];

export const COMPOUND_INTEREST_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is compound interest?",
    answer:
      "Compound interest is interest calculated on both the original principal and the interest that's already accumulated. Because each period's interest is added to the base for the next period, growth accelerates over time compared to simple interest.",
  },
  {
    question: "How does compounding frequency affect the result?",
    answer:
      "More frequent compounding (monthly vs. annually, for example) means interest is added to the principal more often, so it starts earning its own interest sooner. At the same stated annual rate, monthly compounding yields more than annual compounding.",
  },
  {
    question: "What's the difference between this and the FD Calculator?",
    answer:
      "They use the exact same compound-interest math. This calculator is the general-purpose version — useful for any lump-sum growth scenario, not just bank fixed deposits.",
  },
  {
    question: "Does this account for additional contributions over time?",
    answer:
      "No — this calculator models a single lump sum compounding untouched. If you're adding money regularly (e.g. monthly), see the SIP or RD calculators instead.",
  },
  {
    question: "Can I export the year-by-year growth?",
    answer:
      "Yes — use the \"Export CSV\" button above the schedule table to download the full year-by-year breakdown.",
  },
];

export const COMPOUND_INTEREST_FORMULA: ToolFormula = {
  title: "The compound interest formula",
  expression: "A = P × (1 + r/n)^(n × t)",
  description:
    "Your principal (P) compounds at rate r, applied n times per year, for t years. The result (A) is your final amount; subtracting P gives total interest earned.",
  variables: [
    { symbol: "A", meaning: "Final amount" },
    { symbol: "P", meaning: "Principal (starting amount)" },
    { symbol: "r", meaning: "Annual interest rate (as a decimal)" },
    { symbol: "n", meaning: "Compounding periods per year" },
    { symbol: "t", meaning: "Time in years" },
  ],
};

export const COMPOUND_INTEREST_EXAMPLE: ToolExample = {
  title: "Example: $10,000 compounding for 10 years",
  summary: "Investing $10,000 at 8% per annum, compounded annually, for 10 years:",
  inputs: [
    { label: "Principal", value: "$10,000" },
    { label: "Annual rate", value: "8%" },
    { label: "Time", value: "10 years" },
    { label: "Compounding", value: "Annually" },
  ],
  outputs: [
    { label: "Final amount", value: "≈ $21,589" },
    { label: "Total interest", value: "≈ $11,589" },
  ],
};
