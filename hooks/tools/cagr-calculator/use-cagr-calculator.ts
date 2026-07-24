"use client";

import * as React from "react";
import { calculateCagrResult } from "@/lib/tools/cagr-calculator/calculations";
import { cagrFormSchema } from "@/lib/tools/cagr-calculator/validations";
import { DEFAULT_FINAL_VALUE, DEFAULT_INITIAL_VALUE, DEFAULT_YEARS } from "@/lib/tools/cagr-calculator/constants";
import type { CagrCalculationResult, CagrFormValues } from "@/lib/tools/cagr-calculator/types";

const DEFAULT_VALUES: CagrFormValues = {
  initialValue: DEFAULT_INITIAL_VALUE,
  finalValue: DEFAULT_FINAL_VALUE,
  years: DEFAULT_YEARS,
};

interface UseCagrCalculatorResult {
  values: CagrFormValues;
  setField: <K extends keyof CagrFormValues>(key: K, value: CagrFormValues[K]) => void;
  result: CagrCalculationResult | null;
  errorMessage: string | null;
  reset: () => void;
}

export function useCagrCalculator(): UseCagrCalculatorResult {
  const [values, setValues] = React.useState<CagrFormValues>(DEFAULT_VALUES);

  const setField = React.useCallback(
    <K extends keyof CagrFormValues>(key: K, value: CagrFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = React.useCallback(() => setValues(DEFAULT_VALUES), []);

  const { result, errorMessage } = React.useMemo(() => {
    const parsed = cagrFormSchema.safeParse(values);
    if (!parsed.success) {
      return {
        result: null,
        errorMessage: parsed.error.issues[0]?.message ?? "Enter valid values.",
      };
    }
    return { result: calculateCagrResult(parsed.data), errorMessage: null };
  }, [values]);

  return { values, setField, result, errorMessage, reset };
}
