import type { ToolDefinition } from "./types";
import { EMI_FAQ_ITEMS, EMI_FORMULA, EMI_EXAMPLE } from "./tools/emi-calculator/constants";
import { SIP_FAQ_ITEMS, SIP_FORMULA, SIP_EXAMPLE } from "./tools/sip-calculator/constants";
import { LOAN_FAQ_ITEMS, LOAN_FORMULA, LOAN_EXAMPLE } from "./tools/loan-calculator/constants";
import { FD_FAQ_ITEMS, FD_FORMULA, FD_EXAMPLE } from "./tools/fd-calculator/constants";
import { RD_FAQ_ITEMS, RD_FORMULA, RD_EXAMPLE } from "./tools/rd-calculator/constants";
import { SWP_FAQ_ITEMS, SWP_FORMULA, SWP_EXAMPLE } from "./tools/swp-calculator/constants";
import {
  COMPOUND_INTEREST_FAQ_ITEMS,
  COMPOUND_INTEREST_FORMULA,
  COMPOUND_INTEREST_EXAMPLE,
} from "./tools/compound-interest-calculator/constants";
import {
  RETIREMENT_FAQ_ITEMS,
  RETIREMENT_FORMULA,
  RETIREMENT_EXAMPLE,
} from "./tools/retirement-calculator/constants";
import { CAGR_FAQ_ITEMS, CAGR_FORMULA, CAGR_EXAMPLE } from "./tools/cagr-calculator/constants";

/**
 * The tool catalog. To add tool #101, add one object here and drop its
 * component under `components/tools/<slug>/` (registering its loader in
 * `lib/tool-components.ts`). Nothing else — routing, the homepage grid,
 * category pages, search, breadcrumbs, and related tools — needs to
 * change.
 *
 * Every field here is plain, serializable data (strings, numbers,
 * booleans, arrays, and plain objects) — no component references, no
 * functions — so this array is safe to read from Client Components
 * (search, the tools browser) as well as Server Components.
 */
export const TOOLS: ToolDefinition[] = [
  {
    slug: "email-writer",
    name: "AI Email Writer",
    tagline: "Write the email. We'll find the words.",
    description:
      "Describe what you need to say, choose a tone and a length, and get a ready-to-send subject line and body in seconds.",
    category: "writing",
    iconName: "Mail",
    keywords: ["email", "writer", "generator", "ai", "professional email", "cover letter"],
    status: "live",
    addedAt: "2026-06-01",
  },
  {
    slug: "resume-builder",
    name: "AI Resume Builder",
    tagline: "A sharper resume in one pass.",
    description:
      "Turn a rough work history into a clean, recruiter-ready resume, tailored to the role you're applying for.",
    category: "writing",
    iconName: "FileText",
    keywords: ["resume", "cv", "job application", "career"],
    status: "coming-soon",
    addedAt: "2026-06-01",
  },
  {
    slug: "meeting-notes-summarizer",
    name: "Meeting Notes Summarizer",
    tagline: "Raw notes in, clear action items out.",
    description:
      "Paste messy meeting notes or a transcript and get a structured summary with decisions and action items.",
    category: "productivity",
    iconName: "ListChecks",
    keywords: ["meetings", "notes", "summary", "action items", "productivity"],
    status: "coming-soon",
    addedAt: "2026-06-01",
  },
  {
    slug: "regex-generator",
    name: "Regex Generator",
    tagline: "Describe the pattern, get the regex.",
    description:
      "Explain what you're trying to match in plain English and get a tested, explained regular expression.",
    category: "developer",
    iconName: "Braces",
    keywords: ["regex", "regular expression", "developer", "pattern matching"],
    status: "coming-soon",
    addedAt: "2026-06-01",
  },
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator",
    tagline: "A palette that actually goes together.",
    description:
      "Generate accessible, harmonious color palettes from a mood, a brand word, or a base color.",
    category: "design",
    iconName: "Palette",
    keywords: ["colors", "palette", "design", "branding", "ui"],
    status: "coming-soon",
    addedAt: "2026-06-01",
  },
  {
    slug: "seo-meta-generator",
    name: "SEO Meta Tag Generator",
    tagline: "Titles and descriptions that earn the click.",
    description:
      "Generate optimized title tags, meta descriptions, and Open Graph copy for any page.",
    category: "marketing",
    iconName: "Tags",
    keywords: ["seo", "meta tags", "marketing", "open graph"],
    status: "coming-soon",
    addedAt: "2026-06-01",
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON Converter",
    tagline: "Clean tabular data, structured instantly.",
    description:
      "Paste or upload a CSV and get well-formed, typed JSON out — no spreadsheet software required.",
    category: "data",
    iconName: "FileJson",
    keywords: ["csv", "json", "convert", "data", "file conversion"],
    status: "coming-soon",
    addedAt: "2026-06-01",
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    tagline: "Know your monthly payment before you sign.",
    description:
      "Calculate your monthly loan installment (EMI), total interest, and full amortization schedule from your loan amount, interest rate, and tenure.",
    category: "finance",
    iconName: "Calculator",
    keywords: [
      "emi",
      "emi calculator",
      "loan calculator",
      "amortization",
      "monthly installment",
      "interest calculator",
      "mortgage calculator",
    ],
    status: "live",
    addedAt: "2026-07-23",
    applicationCategory: "FinanceApplication",
    isCalculator: true,
    faq: EMI_FAQ_ITEMS,
    formula: EMI_FORMULA,
    example: EMI_EXAMPLE,
  },
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    tagline: "See what consistent investing actually adds up to.",
    description:
      "Project your SIP's final corpus, total returns, and CAGR from a monthly investment, expected return rate, and investment period — with optional annual step-up and inflation adjustment.",
    category: "finance",
    iconName: "TrendingUp",
    keywords: [
      "sip",
      "sip calculator",
      "systematic investment plan",
      "mutual fund calculator",
      "investment calculator",
      "compound interest",
      "wealth calculator",
      "step-up sip",
    ],
    status: "live",
    addedAt: "2026-07-24",
    applicationCategory: "FinanceApplication",
    isCalculator: true,
    faq: SIP_FAQ_ITEMS,
    formula: SIP_FORMULA,
    example: SIP_EXAMPLE,
  },
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    tagline: "Find your EMI, or find what you can borrow.",
    description:
      "Calculate your monthly payment for a given loan amount, or flip it around and find the loan amount a target monthly payment can support.",
    category: "finance",
    iconName: "Banknote",
    keywords: ["loan calculator", "borrowing calculator", "affordability calculator", "loan amount", "monthly payment"],
    status: "live",
    addedAt: "2026-07-25",
    applicationCategory: "FinanceApplication",
    isCalculator: true,
    faq: LOAN_FAQ_ITEMS,
    formula: LOAN_FORMULA,
    example: LOAN_EXAMPLE,
  },
  {
    slug: "fd-calculator",
    name: "FD Calculator",
    tagline: "See exactly what your fixed deposit will be worth.",
    description:
      "Calculate the maturity value and total interest on a fixed deposit from your deposit amount, interest rate, tenure, and compounding frequency.",
    category: "finance",
    iconName: "Lock",
    keywords: ["fd calculator", "fixed deposit calculator", "maturity value", "deposit calculator", "bank deposit"],
    status: "live",
    addedAt: "2026-07-26",
    applicationCategory: "FinanceApplication",
    isCalculator: true,
    faq: FD_FAQ_ITEMS,
    formula: FD_FORMULA,
    example: FD_EXAMPLE,
  },
  {
    slug: "rd-calculator",
    name: "RD Calculator",
    tagline: "Small monthly deposits, projected to maturity.",
    description:
      "Calculate your recurring deposit's maturity value and total interest from a monthly deposit amount, interest rate, and tenure.",
    category: "finance",
    iconName: "RefreshCw",
    keywords: ["rd calculator", "recurring deposit calculator", "maturity value", "monthly deposit"],
    status: "live",
    addedAt: "2026-07-27",
    applicationCategory: "FinanceApplication",
    isCalculator: true,
    faq: RD_FAQ_ITEMS,
    formula: RD_FORMULA,
    example: RD_EXAMPLE,
  },
  {
    slug: "swp-calculator",
    name: "SWP Calculator",
    tagline: "Turn a lump sum into a monthly income.",
    description:
      "Project how long a lump-sum investment lasts under a systematic withdrawal plan — see your final balance, total withdrawn, and interest earned.",
    category: "finance",
    iconName: "TrendingDown",
    keywords: ["swp calculator", "systematic withdrawal plan", "withdrawal calculator", "retirement income"],
    status: "live",
    addedAt: "2026-07-28",
    applicationCategory: "FinanceApplication",
    isCalculator: true,
    faq: SWP_FAQ_ITEMS,
    formula: SWP_FORMULA,
    example: SWP_EXAMPLE,
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    tagline: "See how your money grows on itself.",
    description:
      "Calculate compound growth on a lump sum from a principal, annual rate, time period, and compounding frequency.",
    category: "finance",
    iconName: "Percent",
    keywords: ["compound interest calculator", "interest calculator", "growth calculator", "compounding"],
    status: "live",
    addedAt: "2026-07-29",
    applicationCategory: "FinanceApplication",
    isCalculator: true,
    faq: COMPOUND_INTEREST_FAQ_ITEMS,
    formula: COMPOUND_INTEREST_FORMULA,
    example: COMPOUND_INTEREST_EXAMPLE,
  },
  {
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    tagline: "See what your savings could grow into by retirement.",
    description:
      "Project your retirement corpus from your current age, retirement age, current savings, monthly contribution, and expected return.",
    category: "finance",
    iconName: "PiggyBank",
    keywords: ["retirement calculator", "retirement corpus", "retirement planning", "nest egg calculator"],
    status: "live",
    addedAt: "2026-07-30",
    applicationCategory: "FinanceApplication",
    isCalculator: true,
    faq: RETIREMENT_FAQ_ITEMS,
    formula: RETIREMENT_FORMULA,
    example: RETIREMENT_EXAMPLE,
  },
  {
    slug: "cagr-calculator",
    name: "CAGR Calculator",
    tagline: "The one smoothed growth rate behind any two numbers.",
    description:
      "Calculate the Compound Annual Growth Rate between an initial and final value over a given time period.",
    category: "finance",
    iconName: "ArrowUpRight",
    keywords: ["cagr calculator", "compound annual growth rate", "growth rate calculator", "investment returns"],
    status: "live",
    addedAt: "2026-07-31",
    applicationCategory: "FinanceApplication",
    isCalculator: true,
    faq: CAGR_FAQ_ITEMS,
    formula: CAGR_FORMULA,
    example: CAGR_EXAMPLE,
  },
];

/** All tools, live or upcoming. */
export function getAllTools(): ToolDefinition[] {
  return TOOLS;
}

/** Only tools that are actually usable right now. */
export function getLiveTools(): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.status === "live");
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(categorySlug: string): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.category === categorySlug);
}

/** Tools sorted newest-first by `addedAt`, for the homepage's "Recently added" rail. */
export function getRecentlyAddedTools(limit = 6): ToolDefinition[] {
  return [...TOOLS]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit);
}

/**
 * Tools related to the given one: same category first, excluding itself,
 * capped at `limit`. Falls back to other live tools if the category is thin.
 */
export function getRelatedTools(tool: ToolDefinition, limit = 3): ToolDefinition[] {
  const sameCategory = TOOLS.filter(
    (candidate) => candidate.category === tool.category && candidate.slug !== tool.slug
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const fillers = TOOLS.filter(
    (candidate) =>
      candidate.slug !== tool.slug && !sameCategory.includes(candidate)
  );

  return [...sameCategory, ...fillers].slice(0, limit);
}

/** Simple case-insensitive search across name, tagline, description, and keywords. */
export function searchTools(query: string): ToolDefinition[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return TOOLS;

  return TOOLS.filter((tool) => {
    const haystack = [tool.name, tool.tagline, tool.description, ...tool.keywords]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
