"use client";

import type { TenureUnit } from "@/lib/finance/types";
import { cn } from "@/lib/utils";

interface TenureToggleProps {
  value: TenureUnit;
  onChange: (unit: TenureUnit) => void;
  /** Accessible label for the control, e.g. "Tenure unit" or "Investment period unit". */
  label?: string;
}

const OPTIONS: { value: TenureUnit; label: string }[] = [
  { value: "years", label: "Years" },
  { value: "months", label: "Months" },
];

/**
 * Two-way segmented control for choosing whether a duration is expressed
 * in months or years. Shared by every finance tool with a tenure/period
 * input (EMI Calculator, SIP Calculator, and any future one).
 */
export function TenureToggle({ value, onChange, label = "Tenure unit" }: TenureToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid grid-cols-2 gap-1 rounded-md border border-border bg-muted/40 p-1"
    >
      {OPTIONS.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
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
  );
}
