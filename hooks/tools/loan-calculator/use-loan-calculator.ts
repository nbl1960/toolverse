"use client";

import * as React from "react";
import { calculateLoanResult } from "@/lib/tools/loan-calculator/calculations";
import { loanFormSchema } from "@/lib/tools/loan-calculator/validations";
import { toMonths } from "@/lib/finance/types";
import {
  DEFAULT_INTEREST_RATE,
  DEFAULT_LOAN_AMOUNT,
  DEFAULT_TARGET_EMI,
  DEFAULT_TENURE,
  DEFAULT_TENURE_UNIT,
} from "@/lib/tools/loan-calculator/constants";
import type { LoanCalculatorResult, LoanFormValues } from "@/lib/tools/loan-calculator/types";

const DEFAULT_VALUES: LoanFormValues = {
  mode: "find-emi",
  loanAmount: DEFAULT_LOAN_AMOUNT,
  targetEmi: DEFAULT_TARGET_EMI,
  interestRate: DEFAULT_INTEREST_RATE,
  tenure: DEFAULT_TENURE,
  tenureUnit: DEFAULT_TENURE_UNIT,
};

interface UseLoanCalculatorResult {
  values: LoanFormValues;
  setField: <K extends keyof LoanFormValues>(key: K, value: LoanFormValues[K]) => void;
  result: LoanCalculatorResult | null;
  errorMessage: string | null;
  reset: () => void;
}

/** Drives the Loan Calculator: live-updating, like EMI Calculator. */
export function useLoanCalculator(): UseLoanCalculatorResult {
  const [values, setValues] = React.useState<LoanFormValues>(DEFAULT_VALUES);

  const setField = React.useCallback(
    <K extends keyof LoanFormValues>(key: K, value: LoanFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = React.useCallback(() => setValues(DEFAULT_VALUES), []);

  const { result, errorMessage } = React.useMemo(() => {
    const parsed = loanFormSchema.safeParse(values);
    if (!parsed.success) {
      return {
        result: null,
        errorMessage: parsed.error.issues[0]?.message ?? "Enter valid loan details.",
      };
    }

    const tenureInMonths = toMonths(parsed.data.tenure, parsed.data.tenureUnit);
    return { result: calculateLoanResult(parsed.data, tenureInMonths), errorMessage: null };
  }, [values]);

  return { values, setField, result, errorMessage, reset };
}
