"use client";

import { DollarSign, Percent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TenureToggle } from "@/components/shared/tenure-toggle";
import {
  COMPOUNDING_FREQUENCY_OPTIONS,
  MAX_DEPOSIT_AMOUNT,
  MAX_INTEREST_RATE,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_DEPOSIT_AMOUNT,
  MIN_INTEREST_RATE,
} from "@/lib/tools/fd-calculator/constants";
import type { CompoundingFrequency, FdFormValues } from "@/lib/tools/fd-calculator/types";

interface FdInputsFormProps {
  values: FdFormValues;
  errorMessage: string | null;
  setField: <K extends keyof FdFormValues>(key: K, value: FdFormValues[K]) => void;
}

function parseNumber(raw: string): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function FdInputsForm({ values, errorMessage, setField }: FdInputsFormProps) {
  const maxTenure = values.tenureUnit === "years" ? MAX_TENURE_YEARS : MAX_TENURE_MONTHS;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7">
      <div>
        <Label htmlFor="depositAmount">Deposit amount</Label>
        <div className="relative mt-2">
          <DollarSign
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="depositAmount"
            type="number"
            inputMode="decimal"
            min={MIN_DEPOSIT_AMOUNT}
            max={MAX_DEPOSIT_AMOUNT}
            step={100}
            value={values.depositAmount}
            onChange={(e) => setField("depositAmount", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "fd-form-error" : undefined}
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
            aria-describedby={errorMessage ? "fd-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="compoundingFrequency">Compounding frequency</Label>
        <Select
          value={values.compoundingFrequency}
          onValueChange={(value) => setField("compoundingFrequency", value as CompoundingFrequency)}
        >
          <SelectTrigger id="compoundingFrequency" className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COMPOUNDING_FREQUENCY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            aria-describedby={errorMessage ? "fd-form-error" : undefined}
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
        <p id="fd-form-error" role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
