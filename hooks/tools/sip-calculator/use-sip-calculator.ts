"use client";

import * as React from "react";
import { calculateSip } from "@/lib/tools/sip-calculator/calculations";
import { sipFormSchema } from "@/lib/tools/sip-calculator/validations";
import { toMonths } from "@/lib/finance/types";
import {
  DEFAULT_INFLATION_RATE,
  DEFAULT_MONTHLY_INVESTMENT,
  DEFAULT_RETURN_RATE,
  DEFAULT_STEP_UP_PERCENT,
  DEFAULT_TENURE,
  DEFAULT_TENURE_UNIT,
} from "@/lib/tools/sip-calculator/constants";
import type { SipCalculationResult, SipFormValues } from "@/lib/tools/sip-calculator/types";

const DEFAULT_VALUES: SipFormValues = {
  monthlyInvestment: DEFAULT_MONTHLY_INVESTMENT,
  expectedReturnRate: DEFAULT_RETURN_RATE,
  tenure: DEFAULT_TENURE,
  tenureUnit: DEFAULT_TENURE_UNIT,
  stepUpPercent: DEFAULT_STEP_UP_PERCENT,
  inflationRate: DEFAULT_INFLATION_RATE,
};

interface UseSipCalculatorResult {
  values: SipFormValues;
  setField: <K extends keyof SipFormValues>(key: K, value: SipFormValues[K]) => void;
  result: SipCalculationResult | null;
  errorMessage: string | null;
  hasCalculated: boolean;
  calculate: () => void;
  reset: () => void;
}

/**
 * Drives the SIP calculator. Unlike the live-updating EMI calculator, this
 * one calculates on an explicit action (matching the "Calculate" / "Reset"
 * button requirement): editing inputs doesn't recompute results until
 * `calculate()` runs, and `reset()` clears both the form and any result.
 */
export function useSipCalculator(): UseSipCalculatorResult {
  const [values, setValues] = React.useState<SipFormValues>(DEFAULT_VALUES);
  const [submittedValues, setSubmittedValues] = React.useState<SipFormValues | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const setField = React.useCallback(
    <K extends keyof SipFormValues>(key: K, value: SipFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const calculate = React.useCallback(() => {
    const parsed = sipFormSchema.safeParse(values);
    if (!parsed.success) {
      setErrorMessage(parsed.error.issues[0]?.message ?? "Enter valid SIP details.");
      setSubmittedValues(null);
      return;
    }
    setErrorMessage(null);
    setSubmittedValues(parsed.data);
  }, [values]);

  const reset = React.useCallback(() => {
    setValues(DEFAULT_VALUES);
    setSubmittedValues(null);
    setErrorMessage(null);
  }, []);

  const result = React.useMemo<SipCalculationResult | null>(() => {
    if (!submittedValues) return null;
    const tenureInMonths = toMonths(submittedValues.tenure, submittedValues.tenureUnit);
    return calculateSip({
      monthlyInvestment: submittedValues.monthlyInvestment,
      annualReturnRate: submittedValues.expectedReturnRate,
      tenureInMonths,
      stepUpPercent: submittedValues.stepUpPercent,
      inflationRate: submittedValues.inflationRate,
    });
  }, [submittedValues]);

  return {
    values,
    setField,
    result,
    errorMessage,
    hasCalculated: submittedValues !== null,
    calculate,
    reset,
  };
}
