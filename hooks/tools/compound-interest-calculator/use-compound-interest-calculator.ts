"use client";

import * as React from "react";
import { calculateCompoundInterestResult } from "@/lib/tools/compound-interest-calculator/calculations";
import { compoundInterestFormSchema } from "@/lib/tools/compound-interest-calculator/validations";
import {
  DEFAULT_ANNUAL_RATE,
  DEFAULT_COMPOUNDING_FREQUENCY,
  DEFAULT_PRINCIPAL,
  DEFAULT_YEARS,
} from "@/lib/tools/compound-interest-calculator/constants";
import type {
  CompoundInterestCalculationResult,
  CompoundInterestFormValues,
} from "@/lib/tools/compound-interest-calculator/types";

const DEFAULT_VALUES: CompoundInterestFormValues = {
  principal: DEFAULT_PRINCIPAL,
  annualRate: DEFAULT_ANNUAL_RATE,
  years: DEFAULT_YEARS,
  compoundingFrequency: DEFAULT_COMPOUNDING_FREQUENCY,
};

interface UseCompoundInterestCalculatorResult {
  values: CompoundInterestFormValues;
  setField: <K extends keyof CompoundInterestFormValues>(
    key: K,
    value: CompoundInterestFormValues[K]
  ) => void;
  result: CompoundInterestCalculationResult | null;
  errorMessage: string | null;
  reset: () => void;
}

export function useCompoundInterestCalculator(): UseCompoundInterestCalculatorResult {
  const [values, setValues] = React.useState<CompoundInterestFormValues>(DEFAULT_VALUES);

  const setField = React.useCallback(
    <K extends keyof CompoundInterestFormValues>(key: K, value: CompoundInterestFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = React.useCallback(() => setValues(DEFAULT_VALUES), []);

  const { result, errorMessage } = React.useMemo(() => {
    const parsed = compoundInterestFormSchema.safeParse(values);
    if (!parsed.success) {
      return {
        result: null,
        errorMessage: parsed.error.issues[0]?.message ?? "Enter valid values.",
      };
    }
    return { result: calculateCompoundInterestResult(parsed.data), errorMessage: null };
  }, [values]);

  return { values, setField, result, errorMessage, reset };
}
