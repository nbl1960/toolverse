import type { FaqItem, ToolExample, ToolFormula } from "@/lib/types";
import type { TenureUnit } from "@/lib/finance/types";

export const DEFAULT_MONTHLY_INVESTMENT = 500;
export const DEFAULT_RETURN_RATE = 12;
export const DEFAULT_TENURE = 15;
export const DEFAULT_TENURE_UNIT: TenureUnit = "years";
export const DEFAULT_STEP_UP_PERCENT = 0;
export const DEFAULT_INFLATION_RATE = 0;

export const MIN_MONTHLY_INVESTMENT = 10;
export const MAX_MONTHLY_INVESTMENT = 1_000_000;

export const MIN_RETURN_RATE = 1;
export const MAX_RETURN_RATE = 30;

export const MIN_TENURE_MONTHS = 1;
export const MAX_TENURE_MONTHS = 480; // 40 years
export const MAX_TENURE_YEARS = 40;

export const MIN_STEP_UP_PERCENT = 0;
export const MAX_STEP_UP_PERCENT = 50;

export const MIN_INFLATION_RATE = 0;
export const MAX_INFLATION_RATE = 20;

export const SIP_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is a SIP?",
    answer:
      "A SIP (Systematic Investment Plan) is a way of investing a fixed amount at regular intervals — typically monthly — instead of investing a lump sum all at once. It smooths out market ups and downs over time and builds a habit of consistent investing.",
  },
  {
    question: "How is the SIP future value calculated?",
    answer:
      "This calculator simulates your investment month by month: each month's contribution is added, then the running portfolio grows by one month of your expected return. That's mathematically equivalent to the standard SIP future value formula, and it also lets the calculator handle an annual step-up correctly.",
  },
  {
    question: "What does the annual step-up option do?",
    answer:
      "A step-up SIP increases your monthly contribution by a fixed percentage every year — for example, matching an expected annual raise. Even a modest step-up can meaningfully grow your final corpus compared to keeping the contribution flat.",
  },
  {
    question: "What does CAGR mean here?",
    answer:
      "CAGR (Compound Annual Growth Rate) is shown as an approximate, easy-to-compare annualized growth rate of your corpus relative to your total investment. Because SIP contributions happen periodically rather than as a single lump sum, this is a simplified approximation rather than a precise internal rate of return (XIRR).",
  },
  {
    question: "What's the difference between Estimated Returns and Wealth Gained?",
    answer:
      "Estimated Returns is your nominal gain — final corpus minus total investment, in future dollars. Wealth Gained adjusts the final corpus for inflation first, so it reflects your gain in today's purchasing power. If you leave the inflation rate at 0, the two figures are identical.",
  },
  {
    question: "Can I export the full investment schedule?",
    answer:
      "Yes — use the \"Export CSV\" button above the yearly schedule to download a full year-by-year breakdown of amount invested, interest earned, and portfolio value.",
  },
];

export const SIP_FORMULA: ToolFormula = {
  title: "How SIP future value is calculated",
  expression: "FV = P × [ ((1 + i)ⁿ − 1) / i ] × (1 + i)",
  description:
    "This is the standard SIP future value formula for a flat (non-step-up) monthly investment, assuming each contribution is made at the start of the month. When you set an annual step-up, the calculator instead simulates month by month, increasing the contribution by your step-up percentage at the start of each new year — the results match this formula exactly when step-up is 0%.",
  variables: [
    { symbol: "FV", meaning: "Future value — the final corpus" },
    { symbol: "P", meaning: "Monthly investment amount" },
    { symbol: "i", meaning: "Expected monthly rate of return (annual rate ÷ 12 ÷ 100)" },
    { symbol: "n", meaning: "Total number of monthly investments" },
  ],
};

export const SIP_EXAMPLE: ToolExample = {
  title: "Example: investing $500/month for 15 years",
  summary: "Investing $500 every month at an expected 12% annual return, for 15 years, no step-up:",
  inputs: [
    { label: "Monthly investment", value: "$500" },
    { label: "Expected return", value: "12% p.a." },
    { label: "Investment period", value: "15 years" },
  ],
  outputs: [
    { label: "Total investment", value: "$90,000" },
    { label: "Final corpus", value: "≈ $252,300" },
    { label: "Estimated returns", value: "≈ $162,300" },
  ],
};
