import type { CagrYearlyRow } from "@/lib/finance/cagr";

export type { CagrYearlyRow };

export interface CagrFormValues {
  initialValue: number;
  finalValue: number;
  years: number;
}

export interface CagrCalculationResult {
  cagrPercent: number;
  absoluteGrowth: number;
  growthMultiple: number;
  yearlyProjection: CagrYearlyRow[];
}
