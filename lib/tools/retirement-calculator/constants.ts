import type { FaqItem, ToolExample, ToolFormula } from "@/lib/types";

export const DEFAULT_CURRENT_AGE = 30;
export const DEFAULT_RETIREMENT_AGE = 60;
export const DEFAULT_CURRENT_SAVINGS = 20_000;
export const DEFAULT_MONTHLY_CONTRIBUTION = 500;
export const DEFAULT_RETURN_RATE = 9;

export const MIN_AGE = 16;
export const MAX_AGE = 80;

export const MIN_CURRENT_SAVINGS = 0;
export const MAX_CURRENT_SAVINGS = 100_000_000;

export const MIN_MONTHLY_CONTRIBUTION = 0;
export const MAX_MONTHLY_CONTRIBUTION = 1_000_000;

export const MIN_RETURN_RATE = 1;
export const MAX_RETURN_RATE = 25;

export const RETIREMENT_FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does this calculator project my retirement corpus?",
    answer:
      "It starts with your current savings, adds your monthly contribution every month between now and your retirement age, and grows the whole balance at your expected annual return — the same underlying engine as the SIP Calculator, just starting from an existing balance instead of zero.",
  },
  {
    question: "What return rate should I use?",
    answer:
      "That depends on your investment mix — a diversified stock-heavy portfolio has historically returned more than a conservative bond-heavy one, but with more year-to-year variation. This calculator uses a single flat rate as a simplification; real returns vary year to year.",
  },
  {
    question: "Does this account for inflation?",
    answer:
      "No — the projected corpus is in future (nominal) dollars, not adjusted for inflation. A dollar at retirement will buy less than a dollar today, so consider that when judging whether a projected corpus is \"enough.\"",
  },
  {
    question: "What if I increase my contribution over time?",
    answer:
      "This calculator assumes a flat monthly contribution for simplicity. If you expect to increase contributions with raises over time, the SIP Calculator's step-up feature can model that instead.",
  },
  {
    question: "Can I export the year-by-year projection?",
    answer:
      "Yes — use the \"Export CSV\" button above the schedule table to download the full year-by-year breakdown of contributions and growth.",
  },
];

export const RETIREMENT_FORMULA: ToolFormula = {
  title: "How your retirement corpus is projected",
  expression: "Corpus = S₀ + Σ [ Cₘ × (1 + i)^(n − m + 1) ]",
  description:
    "Your current savings (S₀) grows for the full period, and each monthly contribution (C) compounds for the months remaining until retirement. This calculator simulates it month by month, which produces the same result and also generates the yearly schedule directly.",
  variables: [
    { symbol: "S₀", meaning: "Current savings" },
    { symbol: "C", meaning: "Monthly contribution" },
    { symbol: "i", meaning: "Monthly rate of return (annual rate ÷ 12 ÷ 100)" },
    { symbol: "n", meaning: "Total months until retirement" },
  ],
};

export const RETIREMENT_EXAMPLE: ToolExample = {
  title: "Example: saving from age 30 to 60",
  summary:
    "Starting with $20,000 saved, contributing $500/month, at an expected 9% return, from age 30 to age 60:",
  inputs: [
    { label: "Current age", value: "30" },
    { label: "Retirement age", value: "60" },
    { label: "Current savings", value: "$20,000" },
    { label: "Monthly contribution", value: "$500" },
    { label: "Expected return", value: "9% p.a." },
  ],
  outputs: [
    { label: "Total invested", value: "$200,000" },
    { label: "Retirement corpus", value: "≈ $1,187,600" },
    { label: "Total growth", value: "≈ $987,600" },
  ],
};
