import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SummaryCardItem {
  key: string;
  label: string;
  value: string;
  icon: LucideIcon;
  /** Highlights the card as the headline metric (e.g. Final Corpus, Monthly EMI). */
  emphasis?: boolean;
}

interface SummaryCardsProps {
  items: SummaryCardItem[];
  /** Tailwind grid-cols class for the largest breakpoint, since card counts vary by tool (3 to 5+). */
  columnsClassName?: string;
}

/**
 * Generic result-summary card grid, shared by every finance calculator.
 * Each tool builds its own array of `SummaryCardItem`s (label, value,
 * icon) and passes it in — the card markup itself is written once.
 */
export function SummaryCards({ items, columnsClassName = "lg:grid-cols-3" }: SummaryCardsProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", columnsClassName)}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.key} className={item.emphasis ? "border-brass/50 bg-accent" : undefined}>
            <CardContent className="flex items-start justify-between gap-3 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1.5 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {item.value}
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-primary text-primary-foreground">
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
