"use client";

import * as React from "react";
import { calculateEmi } from "@/lib/tools/emi-calculator/calculations";
import { emiFormSchema } from "@/lib/tools/emi-calculator/validations";
import { toMonths } from "@/lib/finance/types";
import {
  DEFAULT_INTEREST_RATE,
  DEFAULT_LOAN_AMOUNT,
  DEFAULT_TENURE,
  DEFAULT_TENURE_UNIT,
} from "@/lib/tools/emi-calculator/constants";
import type {
  EmiCalculationResult,
  EmiFormValues,
} from "@/lib/tools/emi-calculator/types";

const DEFAULT_VALUES: EmiFormValues = {
  loanAmount: DEFAULT_LOAN_AMOUNT,
  interestRate: DEFAULT_INTEREST_RATE,
  tenure: DEFAULT_TENURE,
  tenureUnit: DEFAULT_TENURE_UNIT,
};

interface UseEmiCalculatorResult {
  values: EmiFormValues;
  setField: <K extends keyof EmiFormValues>(key: K, value: EmiFormValues[K]) => void;
  result: EmiCalculationResult | null;
  errorMessage: string | null;
  reset: () => void;
}

/**
 * Drives the EMI calculator: holds form state and recomputes the full
 * amortization schedule live as inputs change. Pure client-side math — no
 * network round trip needed, so results update instantly.
 */
export function useEmiCalculator(): UseEmiCalculatorResult {
  const [values, setValues] = React.useState<EmiFormValues>(DEFAULT_VALUES);

  const setField = React.useCallback(
    <K extends keyof EmiFormValues>(key: K, value: EmiFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = React.useCallback(() => setValues(DEFAULT_VALUES), []);

  const { result, errorMessage } = React.useMemo(() => {
    const parsed = emiFormSchema.safeParse(values);
    if (!parsed.success) {
      return {
        result: null,
        errorMessage: parsed.error.issues[0]?.message ?? "Enter valid loan details.",
      };
    }

    const tenureInMonths = toMonths(parsed.data.tenure, parsed.data.tenureUnit);

    return {
      result: calculateEmi(parsed.data.loanAmount, parsed.data.interestRate, tenureInMonths),
      errorMessage: null,
    };
  }, [values]);

  return { values, setField, result, errorMessage, reset };
}
