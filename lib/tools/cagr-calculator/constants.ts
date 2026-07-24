import type { FaqItem, ToolExample, ToolFormula } from "@/lib/types";

export const DEFAULT_INITIAL_VALUE = 10_000;
export const DEFAULT_FINAL_VALUE = 25_000;
export const DEFAULT_YEARS = 5;

export const MIN_VALUE = 1;
export const MAX_VALUE = 1_000_000_000;

export const MIN_YEARS = 0.5;
export const MAX_YEARS = 50;

export const CAGR_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is CAGR?",
    answer:
      "CAGR (Compound Annual Growth Rate) is the smoothed, constant annual growth rate that would take an investment from its starting value to its ending value over a given period, as if it had grown steadily every year rather than fluctuating.",
  },
  {
    question: "Why use CAGR instead of just total percentage growth?",
    answer:
      "Total growth doesn't account for how long it took. CAGR lets you fairly compare two investments with different time periods — e.g. a 50% gain over 2 years is a much higher CAGR than the same 50% gain over 10 years.",
  },
  {
    question: "Does CAGR reflect actual year-to-year returns?",
    answer:
      "No — real investments rarely grow at a perfectly constant rate. CAGR is a smoothed average; some years may have been well above it, others well below, or even negative, while still averaging out to the calculated CAGR.",
  },
  {
    question: "Can CAGR be negative?",
    answer:
      "Yes — if the final value is lower than the initial value, CAGR will be negative, reflecting an average annual decline over the period.",
  },
  {
    question: "Can I export the projected growth path?",
    answer:
      "Yes — use the \"Export CSV\" button above the table to download the year-by-year value if it had grown at exactly the calculated CAGR every year.",
  },
];

export const CAGR_FORMULA: ToolFormula = {
  title: "How CAGR is calculated",
  expression: "CAGR = (Final Value / Initial Value)^(1/n) − 1",
  description:
    "Take the ratio of ending to starting value, take the n-th root (where n is the number of years), then subtract 1 to express it as a growth rate.",
  variables: [
    { symbol: "n", meaning: "Number of years between the initial and final value" },
  ],
};

export const CAGR_EXAMPLE: ToolExample = {
  title: "Example: growth from $10,000 to $25,000",
  summary: "An investment grows from $10,000 to $25,000 over 5 years:",
  inputs: [
    { label: "Initial value", value: "$10,000" },
    { label: "Final value", value: "$25,000" },
    { label: "Time period", value: "5 years" },
  ],
  outputs: [
    { label: "CAGR", value: "≈ 20.1%" },
    { label: "Absolute growth", value: "$15,000" },
    { label: "Growth multiple", value: "2.5×" },
  ],
};
