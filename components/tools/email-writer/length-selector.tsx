"use client";

import { LENGTH_OPTIONS } from "@/lib/tools/email-writer/constants";
import type { EmailLength } from "@/lib/tools/email-writer/types";
import { cn } from "@/lib/utils";

interface LengthSelectorProps {
  value: EmailLength;
  onChange: (length: EmailLength) => void;
}

/** Three-way segmented control for choosing the target email length. */
export function LengthSelector({ value, onChange }: LengthSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Email length"
      className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-muted/40 p-1"
    >
      {LENGTH_OPTIONS.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            title={option.wordRange}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-md px-2 py-2 text-center transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              isSelected
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="text-sm font-medium">{option.label}</span>
            <span className="text-[11px] text-muted-foreground">{option.wordRange}</span>
          </button>
        );
      })}
    </div>
  );
}
