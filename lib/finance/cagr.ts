/**
 * Shared CAGR (Compound Annual Growth Rate) engine — powers the CAGR
 * Calculator, and is the same annualization approach used to label the
 * "Approx. CAGR" figure on SIP/RD/Retirement results.
 */

export interface CagrYearlyRow {
  year: number;
  projectedValue: number;
}

export interface CagrCalculationResult {
  cagrPercent: number;
  absoluteGrowth: number;
  growthMultiple: number;
  yearlyProjection: CagrYearlyRow[];
}

export interface CalculateCagrInput {
  initialValue: number;
  finalValue: number;
  years: number;
}

export function calculateCagr(input: CalculateCagrInput): CagrCalculationResult {
  const { initialValue, finalValue, years } = input;

  const cagrPercent =
    initialValue > 0 && years > 0
      ? (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100
      : 0;

  const growthRate = cagrPercent / 100;
  const wholeYears = Math.max(1, Math.round(years));

  const yearlyProjection: CagrYearlyRow[] = [];
  for (let year = 0; year <= wholeYears; year++) {
    yearlyProjection.push({
      year,
      projectedValue: initialValue * Math.pow(1 + growthRate, year),
    });
  }

  return {
    cagrPercent,
    absoluteGrowth: finalValue - initialValue,
    growthMultiple: initialValue > 0 ? finalValue / initialValue : 0,
    yearlyProjection,
  };
}
