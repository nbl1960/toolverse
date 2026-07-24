"use client";

import { TONE_OPTIONS, TONE_ICONS } from "@/lib/tools/email-writer/constants";
import type { EmailTone } from "@/lib/tools/email-writer/types";
import { cn } from "@/lib/utils";

interface ToneSelectorProps {
  value: EmailTone;
  onChange: (tone: EmailTone) => void;
}

/** Grid of tone chips. Each acts as a radio button for accessibility. */
export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Email tone"
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
    >
      {TONE_OPTIONS.map((tone) => {
        const Icon = TONE_ICONS[tone.value];
        const isSelected = value === tone.value;
        return (
          <button
            key={tone.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            title={tone.description}
            onClick={() => onChange(tone.value)}
            className={cn(
              "group flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              isSelected
                ? "border-brass bg-accent text-accent-foreground shadow-sm"
                : "border-border bg-transparent text-muted-foreground hover:border-brass/40 hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                isSelected
                  ? "border-brass bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground group-hover:text-brass"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="text-xs font-medium leading-tight">{tone.label}</span>
          </button>
        );
      })}
    </div>
  );
}
