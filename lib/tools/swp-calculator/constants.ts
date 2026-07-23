import type { FaqItem, ToolExample, ToolFormula } from "@/lib/types";
import type { TenureUnit } from "@/lib/finance/types";

export const DEFAULT_INITIAL_INVESTMENT = 100_000;
export const DEFAULT_MONTHLY_WITHDRAWAL = 800;
export const DEFAULT_RETURN_RATE = 7;
export const DEFAULT_TENURE = 15;
export const DEFAULT_TENURE_UNIT: TenureUnit = "years";

export const MIN_INITIAL_INVESTMENT = 1_000;
export const MAX_INITIAL_INVESTMENT = 100_000_000;

export const MIN_MONTHLY_WITHDRAWAL = 10;
export const MAX_MONTHLY_WITHDRAWAL = 1_000_000;

export const MIN_RETURN_RATE = 0;
export const MAX_RETURN_RATE = 30;

export const MIN_TENURE_MONTHS = 1;
export const MAX_TENURE_MONTHS = 480;
export const MAX_TENURE_YEARS = 40;

export const SWP_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is an SWP (Systematic Withdrawal Plan)?",
    answer:
      "An SWP is the reverse of a SIP: you invest a lump sum up front, then withdraw a fixed amount every month, while the remaining balance keeps growing at the expected rate of return. It's commonly used to generate a regular income from an investment corpus, e.g. in retirement.",
  },
  {
    question: "What happens if I withdraw more than the corpus can sustain?",
    answer:
      "If your monthly withdrawal exceeds what the corpus can support, the balance shrinks over time and may hit zero before your selected time period ends. This calculator flags that and shows exactly which month the corpus was depleted.",
  },
  {
    question: "Can my corpus actually grow even while I'm withdrawing?",
    answer:
      "Yes — if your expected return rate is higher than your withdrawal rate (withdrawal as a percentage of the corpus), the balance can grow over time even as you take regular withdrawals.",
  },
  {
    question: "Does this account for taxes on withdrawals?",
    answer:
      "No — this calculator shows gross figures only. Actual tax treatment of withdrawals depends on your local tax rules and the type of investment, and isn't accounted for here.",
  },
  {
    question: "Can I export the full withdrawal schedule?",
    answer:
      "Yes — use the \"Export CSV\" button above the schedule table to download the complete year-by-year breakdown of withdrawals, interest, and balance.",
  },
];

export const SWP_FORMULA: ToolFormula = {
  title: "How SWP balance is projected",
  expression: "Balanceₙ = (Balanceₙ₋₁ − W) × (1 + i)",
  description:
    "Each month, the fixed withdrawal is subtracted from the balance first, then the remaining balance grows by one month of the expected return. This calculator simulates that month by month across your full time period, which also produces the yearly schedule directly.",
  variables: [
    { symbol: "Balanceₙ", meaning: "Balance at the end of month n" },
    { symbol: "W", meaning: "Fixed monthly withdrawal" },
    { symbol: "i", meaning: "Monthly rate of return (annual rate ÷ 12 ÷ 100)" },
  ],
};

export const SWP_EXAMPLE: ToolExample = {
  title: "Example: withdrawing from a $100,000 corpus",
  summary:
    "Investing $100,000 up front, withdrawing $500/month at an expected 7% return, over 10 years — a withdrawal rate below the return rate, so the balance grows even while you withdraw:",
  inputs: [
    { label: "Initial investment", value: "$100,000" },
    { label: "Monthly withdrawal", value: "$500" },
    { label: "Expected return", value: "7% p.a." },
    { label: "Time period", value: "10 years" },
  ],
  outputs: [
    { label: "Total withdrawn", value: "$60,000" },
    { label: "Final balance", value: "≈ $113,900" },
    { label: "Total interest earned", value: "≈ $73,900" },
  ],
};
