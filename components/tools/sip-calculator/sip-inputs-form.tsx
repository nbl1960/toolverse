"use client";

import type { FormEvent } from "react";
import { CalendarRange, Percent, TrendingUp, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TenureToggle } from "@/components/shared/tenure-toggle";
import {
  MAX_INFLATION_RATE,
  MAX_MONTHLY_INVESTMENT,
  MAX_RETURN_RATE,
  MAX_STEP_UP_PERCENT,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_INFLATION_RATE,
  MIN_MONTHLY_INVESTMENT,
  MIN_RETURN_RATE,
  MIN_STEP_UP_PERCENT,
} from "@/lib/tools/sip-calculator/constants";
import type { SipFormValues } from "@/lib/tools/sip-calculator/types";
import type { TenureUnit } from "@/lib/finance/types";

interface SipInputsFormProps {
  values: SipFormValues;
  errorMessage: string | null;
  setField: <K extends keyof SipFormValues>(key: K, value: SipFormValues[K]) => void;
  onCalculate: () => void;
  onReset: () => void;
}

function parseNumber(raw: string): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function SipInputsForm({
  values,
  errorMessage,
  setField,
  onCalculate,
  onReset,
}: SipInputsFormProps) {
  const maxTenure = values.tenureUnit === "years" ? MAX_TENURE_YEARS : MAX_TENURE_MONTHS;

  function handleTenureUnitChange(unit: TenureUnit) {
    if (unit === values.tenureUnit) return;
    const converted =
      unit === "years" ? Math.round((values.tenure / 12) * 10) / 10 : Math.round(values.tenure * 12);
    setField("tenureUnit", unit);
    setField("tenure", converted);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCalculate();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7"
      noValidate
    >
      <div>
        <Label htmlFor="monthlyInvestment">Monthly investment</Label>
        <div className="relative mt-2">
          <Wallet
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="monthlyInvestment"
            type="number"
            inputMode="decimal"
            min={MIN_MONTHLY_INVESTMENT}
            max={MAX_MONTHLY_INVESTMENT}
            step={10}
            value={values.monthlyInvestment}
            onChange={(e) => setField("monthlyInvestment", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "sip-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="expectedReturnRate">Expected annual return</Label>
        <div className="relative mt-2">
          <TrendingUp
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="expectedReturnRate"
            type="number"
            inputMode="decimal"
            min={MIN_RETURN_RATE}
            max={MAX_RETURN_RATE}
            step={0.5}
            value={values.expectedReturnRate}
            onChange={(e) => setField("expectedReturnRate", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "sip-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="tenure">Investment period</Label>
          <span className="font-mono text-[11px] text-muted-foreground">
            max {maxTenure} {values.tenureUnit}
          </span>
        </div>
        <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <div className="relative">
            <CalendarRange
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="tenure"
              type="number"
              inputMode="decimal"
              min={0}
              max={maxTenure}
              step={1}
              value={values.tenure}
              onChange={(e) => setField("tenure", parseNumber(e.target.value))}
              className="pl-9"
              aria-describedby={errorMessage ? "sip-form-error" : undefined}
            />
          </div>
          <TenureToggle
            value={values.tenureUnit}
            onChange={handleTenureUnitChange}
            label="Investment period unit"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="stepUpPercent">Annual step-up (optional)</Label>
          <div className="relative mt-2">
            <Percent
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="stepUpPercent"
              type="number"
              inputMode="decimal"
              min={MIN_STEP_UP_PERCENT}
              max={MAX_STEP_UP_PERCENT}
              step={1}
              value={values.stepUpPercent}
              onChange={(e) => setField("stepUpPercent", parseNumber(e.target.value))}
              className="pl-9"
              aria-describedby={errorMessage ? "sip-form-error" : undefined}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="inflationRate">Inflation rate (optional)</Label>
          <div className="relative mt-2">
            <Percent
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="inflationRate"
              type="number"
              inputMode="decimal"
              min={MIN_INFLATION_RATE}
              max={MAX_INFLATION_RATE}
              step={0.5}
              value={values.inflationRate}
              onChange={(e) => setField("inflationRate", parseNumber(e.target.value))}
              className="pl-9"
              aria-describedby={errorMessage ? "sip-form-error" : undefined}
            />
          </div>
        </div>
      </div>

      {errorMessage && (
        <p id="sip-form-error" role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}

      <div className="mt-1 flex flex-col-reverse gap-2 sm:flex-row">
        <Button type="button" variant="outline" onClick={onReset} className="sm:flex-none">
          Reset
        </Button>
        <Button type="submit" className="flex-1">
          Calculate
        </Button>
      </div>
    </form>
  );
}
