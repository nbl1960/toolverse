import type { FaqItem, ToolExample, ToolFormula } from "@/lib/types";
import type { TenureUnit } from "@/lib/finance/types";

export const DEFAULT_MONTHLY_DEPOSIT = 200;
export const DEFAULT_INTEREST_RATE = 6.5;
export const DEFAULT_TENURE = 3;
export const DEFAULT_TENURE_UNIT: TenureUnit = "years";

export const MIN_MONTHLY_DEPOSIT = 10;
export const MAX_MONTHLY_DEPOSIT = 500_000;

export const MIN_INTEREST_RATE = 0.1;
export const MAX_INTEREST_RATE = 20;

export const MIN_TENURE_MONTHS = 3;
export const MAX_TENURE_MONTHS = 120; // 10 years
export const MAX_TENURE_YEARS = 10;

export const RD_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is a Recurring Deposit (RD)?",
    answer:
      "A Recurring Deposit is a bank product where you deposit a fixed amount every month for a fixed term, and the whole balance earns compound interest. It's a disciplined way to save toward a short-to-medium-term goal.",
  },
  {
    question: "How is RD different from a SIP?",
    answer:
      "They're mathematically similar — both involve a fixed monthly contribution that compounds. RDs are typically bank deposits with a fixed, guaranteed rate over a shorter term (usually under 10 years), while SIPs invest in market-linked mutual funds with variable, projected returns.",
  },
  {
    question: "Can I change my monthly deposit partway through?",
    answer:
      "This calculator assumes a flat monthly deposit for the full tenure, matching how most bank RD accounts work — the deposit amount is fixed when you open the account.",
  },
  {
    question: "Is the interest rate compounded monthly?",
    answer:
      "This calculator compounds monthly, which is the most common convention for projecting RD growth and closely matches how most banks calculate RD maturity value.",
  },
  {
    question: "Can I export the year-by-year growth?",
    answer:
      "Yes — use the \"Export CSV\" button above the schedule table to download the full year-by-year breakdown of deposits and interest.",
  },
];

export const RD_FORMULA: ToolFormula = {
  title: "How RD maturity value is calculated",
  expression: "M = R × [ (1 + i)ⁿ − 1 ] / i × (1 + i)",
  description:
    "The standard recurring-deposit formula: each monthly deposit compounds for the remaining months of the term. This calculator simulates it month by month, which produces the same result and also generates the yearly schedule directly.",
  variables: [
    { symbol: "M", meaning: "Maturity value" },
    { symbol: "R", meaning: "Monthly deposit amount" },
    { symbol: "i", meaning: "Monthly interest rate (annual rate ÷ 12 ÷ 100)" },
    { symbol: "n", meaning: "Total number of monthly deposits" },
  ],
};

export const RD_EXAMPLE: ToolExample = {
  title: "Example: a 3-year recurring deposit",
  summary: "Depositing $200 every month at 6.5% per annum for 3 years:",
  inputs: [
    { label: "Monthly deposit", value: "$200" },
    { label: "Interest rate", value: "6.5% p.a." },
    { label: "Tenure", value: "3 years" },
  ],
  outputs: [
    { label: "Total investment", value: "$7,200" },
    { label: "Maturity value", value: "≈ $7,967" },
    { label: "Total interest", value: "≈ $767" },
  ],
};
