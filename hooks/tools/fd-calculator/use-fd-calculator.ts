"use client";

import * as React from "react";
import { calculateFd } from "@/lib/tools/fd-calculator/calculations";
import { fdFormSchema } from "@/lib/tools/fd-calculator/validations";
import {
  DEFAULT_COMPOUNDING_FREQUENCY,
  DEFAULT_DEPOSIT_AMOUNT,
  DEFAULT_INTEREST_RATE,
  DEFAULT_TENURE,
  DEFAULT_TENURE_UNIT,
} from "@/lib/tools/fd-calculator/constants";
import type { FdCalculationResult, FdFormValues } from "@/lib/tools/fd-calculator/types";

const DEFAULT_VALUES: FdFormValues = {
  depositAmount: DEFAULT_DEPOSIT_AMOUNT,
  interestRate: DEFAULT_INTEREST_RATE,
  tenure: DEFAULT_TENURE,
  tenureUnit: DEFAULT_TENURE_UNIT,
  compoundingFrequency: DEFAULT_COMPOUNDING_FREQUENCY,
};

interface UseFdCalculatorResult {
  values: FdFormValues;
  setField: <K extends keyof FdFormValues>(key: K, value: FdFormValues[K]) => void;
  result: FdCalculationResult | null;
  errorMessage: string | null;
  reset: () => void;
}

/** Drives the FD Calculator: live-updating as inputs change. */
export function useFdCalculator(): UseFdCalculatorResult {
  const [values, setValues] = React.useState<FdFormValues>(DEFAULT_VALUES);

  const setField = React.useCallback(
    <K extends keyof FdFormValues>(key: K, value: FdFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = React.useCallback(() => setValues(DEFAULT_VALUES), []);

  const { result, errorMessage } = React.useMemo(() => {
    const parsed = fdFormSchema.safeParse(values);
    if (!parsed.success) {
      return {
        result: null,
        errorMessage: parsed.error.issues[0]?.message ?? "Enter valid deposit details.",
      };
    }

    const years = parsed.data.tenureUnit === "years" ? parsed.data.tenure : parsed.data.tenure / 12;
    return { result: calculateFd(parsed.data, years), errorMessage: null };
  }, [values]);

  return { values, setField, result, errorMessage, reset };
}
