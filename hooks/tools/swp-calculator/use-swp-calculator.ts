"use client";

import * as React from "react";
import { calculateSwp } from "@/lib/tools/swp-calculator/calculations";
import { swpFormSchema } from "@/lib/tools/swp-calculator/validations";
import { toMonths } from "@/lib/finance/types";
import {
  DEFAULT_INITIAL_INVESTMENT,
  DEFAULT_MONTHLY_WITHDRAWAL,
  DEFAULT_RETURN_RATE,
  DEFAULT_TENURE,
  DEFAULT_TENURE_UNIT,
} from "@/lib/tools/swp-calculator/constants";
import type { SwpCalculationResult, SwpFormValues } from "@/lib/tools/swp-calculator/types";

const DEFAULT_VALUES: SwpFormValues = {
  initialInvestment: DEFAULT_INITIAL_INVESTMENT,
  monthlyWithdrawal: DEFAULT_MONTHLY_WITHDRAWAL,
  expectedReturnRate: DEFAULT_RETURN_RATE,
  tenure: DEFAULT_TENURE,
  tenureUnit: DEFAULT_TENURE_UNIT,
};

interface UseSwpCalculatorResult {
  values: SwpFormValues;
  setField: <K extends keyof SwpFormValues>(key: K, value: SwpFormValues[K]) => void;
  result: SwpCalculationResult | null;
  errorMessage: string | null;
  reset: () => void;
}

export function useSwpCalculator(): UseSwpCalculatorResult {
  const [values, setValues] = React.useState<SwpFormValues>(DEFAULT_VALUES);

  const setField = React.useCallback(
    <K extends keyof SwpFormValues>(key: K, value: SwpFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = React.useCallback(() => setValues(DEFAULT_VALUES), []);

  const { result, errorMessage } = React.useMemo(() => {
    const parsed = swpFormSchema.safeParse(values);
    if (!parsed.success) {
      return {
        result: null,
        errorMessage: parsed.error.issues[0]?.message ?? "Enter valid withdrawal plan details.",
      };
    }
    const tenureInMonths = toMonths(parsed.data.tenure, parsed.data.tenureUnit);
    return { result: calculateSwp(parsed.data, tenureInMonths), errorMessage: null };
  }, [values]);

  return { values, setField, result, errorMessage, reset };
}
