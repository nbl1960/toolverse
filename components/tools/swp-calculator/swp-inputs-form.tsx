"use client";

import { DollarSign, Percent, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TenureToggle } from "@/components/shared/tenure-toggle";
import {
  MAX_INITIAL_INVESTMENT,
  MAX_MONTHLY_WITHDRAWAL,
  MAX_RETURN_RATE,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_INITIAL_INVESTMENT,
  MIN_MONTHLY_WITHDRAWAL,
  MIN_RETURN_RATE,
} from "@/lib/tools/swp-calculator/constants";
import type { SwpFormValues } from "@/lib/tools/swp-calculator/types";

interface SwpInputsFormProps {
  values: SwpFormValues;
  errorMessage: string | null;
  setField: <K extends keyof SwpFormValues>(key: K, value: SwpFormValues[K]) => void;
}

function parseNumber(raw: string): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function SwpInputsForm({ values, errorMessage, setField }: SwpInputsFormProps) {
  const maxTenure = values.tenureUnit === "years" ? MAX_TENURE_YEARS : MAX_TENURE_MONTHS;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7">
      <div>
        <Label htmlFor="initialInvestment">Initial investment</Label>
        <div className="relative mt-2">
          <DollarSign
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="initialInvestment"
            type="number"
            inputMode="decimal"
            min={MIN_INITIAL_INVESTMENT}
            max={MAX_INITIAL_INVESTMENT}
            step={1000}
            value={values.initialInvestment}
            onChange={(e) => setField("initialInvestment", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "swp-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="monthlyWithdrawal">Monthly withdrawal</Label>
        <div className="relative mt-2">
          <Wallet
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="monthlyWithdrawal"
            type="number"
            inputMode="decimal"
            min={MIN_MONTHLY_WITHDRAWAL}
            max={MAX_MONTHLY_WITHDRAWAL}
            step={50}
            value={values.monthlyWithdrawal}
            onChange={(e) => setField("monthlyWithdrawal", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "swp-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="expectedReturnRate">Expected annual return</Label>
        <div className="relative mt-2">
          <Percent
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
            aria-describedby={errorMessage ? "swp-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="tenure">Time period</Label>
          <span className="font-mono text-[11px] text-muted-foreground">
            max {maxTenure} {values.tenureUnit}
          </span>
        </div>
        <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <Input
            id="tenure"
            type="number"
            inputMode="decimal"
            min={0}
            max={maxTenure}
            step={1}
            value={values.tenure}
            onChange={(e) => setField("tenure", parseNumber(e.target.value))}
            aria-describedby={errorMessage ? "swp-form-error" : undefined}
          />
          <TenureToggle
            value={values.tenureUnit}
            onChange={(unit) => {
              if (unit === values.tenureUnit) return;
              const converted =
                unit === "years"
                  ? Math.round((values.tenure / 12) * 10) / 10
                  : Math.round(values.tenure * 12);
              setField("tenureUnit", unit);
              setField("tenure", converted);
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <p id="swp-form-error" role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
