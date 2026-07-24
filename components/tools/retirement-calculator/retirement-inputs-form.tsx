"use client";

import { CalendarClock, DollarSign, Percent, User, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MAX_AGE,
  MAX_CURRENT_SAVINGS,
  MAX_MONTHLY_CONTRIBUTION,
  MAX_RETURN_RATE,
  MIN_AGE,
  MIN_CURRENT_SAVINGS,
  MIN_MONTHLY_CONTRIBUTION,
  MIN_RETURN_RATE,
} from "@/lib/tools/retirement-calculator/constants";
import type { RetirementFormValues } from "@/lib/tools/retirement-calculator/types";

interface RetirementInputsFormProps {
  values: RetirementFormValues;
  errorMessage: string | null;
  setField: <K extends keyof RetirementFormValues>(key: K, value: RetirementFormValues[K]) => void;
}

function parseNumber(raw: string): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function RetirementInputsForm({ values, errorMessage, setField }: RetirementInputsFormProps) {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentAge">Current age</Label>
          <div className="relative mt-2">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="currentAge"
              type="number"
              inputMode="numeric"
              min={MIN_AGE}
              max={MAX_AGE}
              step={1}
              value={values.currentAge}
              onChange={(e) => setField("currentAge", parseNumber(e.target.value))}
              className="pl-9"
              aria-describedby={errorMessage ? "retirement-form-error" : undefined}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="retirementAge">Retirement age</Label>
          <div className="relative mt-2">
            <CalendarClock
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="retirementAge"
              type="number"
              inputMode="numeric"
              min={MIN_AGE}
              max={MAX_AGE}
              step={1}
              value={values.retirementAge}
              onChange={(e) => setField("retirementAge", parseNumber(e.target.value))}
              className="pl-9"
              aria-describedby={errorMessage ? "retirement-form-error" : undefined}
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="currentSavings">Current savings</Label>
        <div className="relative mt-2">
          <Wallet
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="currentSavings"
            type="number"
            inputMode="decimal"
            min={MIN_CURRENT_SAVINGS}
            max={MAX_CURRENT_SAVINGS}
            step={500}
            value={values.currentSavings}
            onChange={(e) => setField("currentSavings", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "retirement-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="monthlyContribution">Monthly contribution</Label>
        <div className="relative mt-2">
          <DollarSign
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="monthlyContribution"
            type="number"
            inputMode="decimal"
            min={MIN_MONTHLY_CONTRIBUTION}
            max={MAX_MONTHLY_CONTRIBUTION}
            step={50}
            value={values.monthlyContribution}
            onChange={(e) => setField("monthlyContribution", parseNumber(e.target.value))}
            className="pl-9"
            aria-describedby={errorMessage ? "retirement-form-error" : undefined}
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
            aria-describedby={errorMessage ? "retirement-form-error" : undefined}
          />
        </div>
      </div>

      {errorMessage && (
        <p id="retirement-form-error" role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
