"use client";

import { CalendarRange, DollarSign, Percent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  COMPOUNDING_FREQUENCY_OPTIONS,
  MAX_ANNUAL_RATE,
  MAX_PRINCIPAL,
  MAX_YEARS,
  MIN_ANNUAL_RATE,
  MIN_PRINCIPAL,
  MIN_YEARS,
} from "@/lib/tools/compound-interest-calculator/constants";
import type {
  CompoundInterestFormValues,
  CompoundingFrequency,
} from "@/lib/tools/compound-interest-calculator/types";

interface CompoundInterestInputsFormProps {
  values: CompoundInterestFormValues;
  errorMessage: string | null;
  setField: <K extends keyof CompoundInterestFormValues>(
    key: K,
    value: CompoundInterestFormValues[K]
  ) => void;
}

function parseNumber(raw: string): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function CompoundInterestInputsForm({
  values,
  errorMessage,
  setField,
}: CompoundInterestInputsFormProps) {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7">
      <div>
        <Label htmlFor="principal">Principal</Label>
        <div className="relative mt-2">
          <DollarSign
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="principal"
            type="number"
            inputMode="decimal"
            min={MIN_PRINCIPAL}
            max={MAX_PRINCIPAL}
            step={100}
            value={values.principal}
            onChange={(e) => setField("principal", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "ci-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="annualRate">Annual interest rate</Label>
        <div className="relative mt-2">
          <Percent
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="annualRate"
            type="number"
            inputMode="decimal"
            min={MIN_ANNUAL_RATE}
            max={MAX_ANNUAL_RATE}
            step={0.1}
            value={values.annualRate}
            onChange={(e) => setField("annualRate", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "ci-form-error" : undefined}
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
        <Label htmlFor="years">Time (years)</Label>
        <div className="relative mt-2">
          <CalendarRange
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="years"
            type="number"
            inputMode="decimal"
            min={MIN_YEARS}
            max={MAX_YEARS}
            step={0.5}
            value={values.years}
            onChange={(e) => setField("years", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "ci-form-error" : undefined}
          />
        </div>
      </div>

      {errorMessage && (
        <p id="ci-form-error" role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
