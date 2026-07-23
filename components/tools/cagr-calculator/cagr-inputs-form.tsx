"use client";

import { CalendarRange, DollarSign, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MAX_VALUE, MAX_YEARS, MIN_VALUE, MIN_YEARS } from "@/lib/tools/cagr-calculator/constants";
import type { CagrFormValues } from "@/lib/tools/cagr-calculator/types";

interface CagrInputsFormProps {
  values: CagrFormValues;
  errorMessage: string | null;
  setField: <K extends keyof CagrFormValues>(key: K, value: CagrFormValues[K]) => void;
}

function parseNumber(raw: string): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function CagrInputsForm({ values, errorMessage, setField }: CagrInputsFormProps) {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7">
      <div>
        <Label htmlFor="initialValue">Initial value</Label>
        <div className="relative mt-2">
          <DollarSign
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="initialValue"
            type="number"
            inputMode="decimal"
            min={MIN_VALUE}
            max={MAX_VALUE}
            step={100}
            value={values.initialValue}
            onChange={(e) => setField("initialValue", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "cagr-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="finalValue">Final value</Label>
        <div className="relative mt-2">
          <TrendingUp
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="finalValue"
            type="number"
            inputMode="decimal"
            min={MIN_VALUE}
            max={MAX_VALUE}
            step={100}
            value={values.finalValue}
            onChange={(e) => setField("finalValue", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "cagr-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="years">Time period (years)</Label>
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
            aria-describedby={errorMessage ? "cagr-form-error" : undefined}
          />
        </div>
      </div>

      {errorMessage && (
        <p id="cagr-form-error" role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
