"use client";

import * as React from "react";
import { calculateRetirement } from "@/lib/tools/retirement-calculator/calculations";
import { retirementFormSchema } from "@/lib/tools/retirement-calculator/validations";
import {
  DEFAULT_CURRENT_AGE,
  DEFAULT_CURRENT_SAVINGS,
  DEFAULT_MONTHLY_CONTRIBUTION,
  DEFAULT_RETIREMENT_AGE,
  DEFAULT_RETURN_RATE,
} from "@/lib/tools/retirement-calculator/constants";
import type {
  RetirementCalculationResult,
  RetirementFormValues,
} from "@/lib/tools/retirement-calculator/types";

const DEFAULT_VALUES: RetirementFormValues = {
  currentAge: DEFAULT_CURRENT_AGE,
  retirementAge: DEFAULT_RETIREMENT_AGE,
  currentSavings: DEFAULT_CURRENT_SAVINGS,
  monthlyContribution: DEFAULT_MONTHLY_CONTRIBUTION,
  expectedReturnRate: DEFAULT_RETURN_RATE,
};

interface UseRetirementCalculatorResult {
  values: RetirementFormValues;
  setField: <K extends keyof RetirementFormValues>(key: K, value: RetirementFormValues[K]) => void;
  result: RetirementCalculationResult | null;
  errorMessage: string | null;
  reset: () => void;
}

export function useRetirementCalculator(): UseRetirementCalculatorResult {
  const [values, setValues] = React.useState<RetirementFormValues>(DEFAULT_VALUES);

  const setField = React.useCallback(
    <K extends keyof RetirementFormValues>(key: K, value: RetirementFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = React.useCallback(() => setValues(DEFAULT_VALUES), []);

  const { result, errorMessage } = React.useMemo(() => {
    const parsed = retirementFormSchema.safeParse(values);
    if (!parsed.success) {
      return {
        result: null,
        errorMessage: parsed.error.issues[0]?.message ?? "Enter valid retirement plan details.",
      };
    }
    return { result: calculateRetirement(parsed.data), errorMessage: null };
  }, [values]);

  return { values, setField, result, errorMessage, reset };
}
