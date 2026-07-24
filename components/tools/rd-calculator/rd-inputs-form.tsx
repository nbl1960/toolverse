"use client";

import { DollarSign, Percent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TenureToggle } from "@/components/shared/tenure-toggle";
import {
  MAX_INTEREST_RATE,
  MAX_MONTHLY_DEPOSIT,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_INTEREST_RATE,
  MIN_MONTHLY_DEPOSIT,
} from "@/lib/tools/rd-calculator/constants";
import type { RdFormValues } from "@/lib/tools/rd-calculator/types";

interface RdInputsFormProps {
  values: RdFormValues;
  errorMessage: string | null;
  setField: <K extends keyof RdFormValues>(key: K, value: RdFormValues[K]) => void;
}

function parseNumber(raw: string): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function RdInputsForm({ values, errorMessage, setField }: RdInputsFormProps) {
  const maxTenure = values.tenureUnit === "years" ? MAX_TENURE_YEARS : MAX_TENURE_MONTHS;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7">
      <div>
        <Label htmlFor="monthlyDeposit">Monthly deposit</Label>
        <div className="relative mt-2">
          <DollarSign
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="monthlyDeposit"
            type="number"
            inputMode="decimal"
            min={MIN_MONTHLY_DEPOSIT}
            max={MAX_MONTHLY_DEPOSIT}
            step={10}
            value={values.monthlyDeposit}
            onChange={(e) => setField("monthlyDeposit", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "rd-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="interestRate">Interest rate (per annum)</Label>
        <div className="relative mt-2">
          <Percent
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="interestRate"
            type="number"
            inputMode="decimal"
            min={MIN_INTEREST_RATE}
            max={MAX_INTEREST_RATE}
            step={0.1}
            value={values.interestRate}
            onChange={(e) => setField("interestRate", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "rd-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="tenure">Tenure</Label>
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
            aria-describedby={errorMessage ? "rd-form-error" : undefined}
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
        <p id="rd-form-error" role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
