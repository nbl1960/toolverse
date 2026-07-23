"use client";

import * as React from "react";
import { calculateRd } from "@/lib/tools/rd-calculator/calculations";
import { rdFormSchema } from "@/lib/tools/rd-calculator/validations";
import { toMonths } from "@/lib/finance/types";
import {
  DEFAULT_INTEREST_RATE,
  DEFAULT_MONTHLY_DEPOSIT,
  DEFAULT_TENURE,
  DEFAULT_TENURE_UNIT,
} from "@/lib/tools/rd-calculator/constants";
import type { RdCalculationResult, RdFormValues } from "@/lib/tools/rd-calculator/types";

const DEFAULT_VALUES: RdFormValues = {
  monthlyDeposit: DEFAULT_MONTHLY_DEPOSIT,
  interestRate: DEFAULT_INTEREST_RATE,
  tenure: DEFAULT_TENURE,
  tenureUnit: DEFAULT_TENURE_UNIT,
};

interface UseRdCalculatorResult {
  values: RdFormValues;
  setField: <K extends keyof RdFormValues>(key: K, value: RdFormValues[K]) => void;
  result: RdCalculationResult | null;
  errorMessage: string | null;
  reset: () => void;
}

export function useRdCalculator(): UseRdCalculatorResult {
  const [values, setValues] = React.useState<RdFormValues>(DEFAULT_VALUES);

  const setField = React.useCallback(
    <K extends keyof RdFormValues>(key: K, value: RdFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = React.useCallback(() => setValues(DEFAULT_VALUES), []);

  const { result, errorMessage } = React.useMemo(() => {
    const parsed = rdFormSchema.safeParse(values);
    if (!parsed.success) {
      return {
        result: null,
        errorMessage: parsed.error.issues[0]?.message ?? "Enter valid deposit details.",
      };
    }
    const tenureInMonths = toMonths(parsed.data.tenure, parsed.data.tenureUnit);
    return { result: calculateRd(parsed.data, tenureInMonths), errorMessage: null };
  }, [values]);

  return { values, setField, result, errorMessage, reset };
}
