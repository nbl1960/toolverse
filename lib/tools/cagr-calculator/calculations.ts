import { calculateCagr } from "@/lib/finance/cagr";
import type { CagrCalculationResult, CagrFormValues } from "./types";

/** Delegates entirely to the shared CAGR engine. */
export function calculateCagrResult(values: CagrFormValues): CagrCalculationResult {
  const result = calculateCagr({
    initialValue: values.initialValue,
    finalValue: values.finalValue,
    years: values.years,
  });

  return {
    cagrPercent: result.cagrPercent,
    absoluteGrowth: result.absoluteGrowth,
    growthMultiple: result.growthMultiple,
    yearlyProjection: result.yearlyProjection,
  };
}
