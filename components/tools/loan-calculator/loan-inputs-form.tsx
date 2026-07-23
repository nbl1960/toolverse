"use client";

import { DollarSign, Percent, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TenureToggle } from "@/components/shared/tenure-toggle";
import {
  MAX_INTEREST_RATE,
  MAX_LOAN_AMOUNT,
  MAX_TARGET_EMI,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_INTEREST_RATE,
  MIN_LOAN_AMOUNT,
  MIN_TARGET_EMI,
} from "@/lib/tools/loan-calculator/constants";
import type { LoanCalculatorMode, LoanFormValues } from "@/lib/tools/loan-calculator/types";
import { cn } from "@/lib/utils";

interface LoanInputsFormProps {
  values: LoanFormValues;
  errorMessage: string | null;
  setField: <K extends keyof LoanFormValues>(key: K, value: LoanFormValues[K]) => void;
}

const MODE_OPTIONS: { value: LoanCalculatorMode; label: string }[] = [
  { value: "find-emi", label: "Find my EMI" },
  { value: "find-amount", label: "Find loan amount" },
];

function parseNumber(raw: string): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function LoanInputsForm({ values, errorMessage, setField }: LoanInputsFormProps) {
  const maxTenure = values.tenureUnit === "years" ? MAX_TENURE_YEARS : MAX_TENURE_MONTHS;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7">
      <div
        role="radiogroup"
        aria-label="Calculation mode"
        className="grid grid-cols-2 gap-1 rounded-md border border-border bg-muted/40 p-1"
      >
        {MODE_OPTIONS.map((option) => {
          const isSelected = values.mode === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setField("mode", option.value)}
              className={cn(
                "rounded px-2 py-1.5 text-sm font-medium transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                isSelected
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {values.mode === "find-emi" ? (
        <div>
          <Label htmlFor="loanAmount">Loan amount</Label>
          <div className="relative mt-2">
            <DollarSign
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="loanAmount"
              type="number"
              inputMode="decimal"
              min={MIN_LOAN_AMOUNT}
              max={MAX_LOAN_AMOUNT}
              step={1000}
              value={values.loanAmount}
              onChange={(e) => setField("loanAmount", parseNumber(e.target.value))}
              className="pl-9"
              aria-describedby={errorMessage ? "loan-form-error" : undefined}
            />
          </div>
        </div>
      ) : (
        <div>
          <Label htmlFor="targetEmi">Target EMI (monthly budget)</Label>
          <div className="relative mt-2">
            <Wallet
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="targetEmi"
              type="number"
              inputMode="decimal"
              min={MIN_TARGET_EMI}
              max={MAX_TARGET_EMI}
              step={50}
              value={values.targetEmi}
              onChange={(e) => setField("targetEmi", parseNumber(e.target.value))}
              className="pl-9"
              aria-describedby={errorMessage ? "loan-form-error" : undefined}
            />
          </div>
        </div>
      )}

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
            aria-describedby={errorMessage ? "loan-form-error" : undefined}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="tenure">Loan tenure</Label>
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
            aria-describedby={errorMessage ? "loan-form-error" : undefined}
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
        <p id="loan-form-error" role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
