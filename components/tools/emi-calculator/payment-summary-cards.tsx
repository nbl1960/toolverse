import { CalendarClock, PiggyBank, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/tools/emi-calculator/format";
import type { EmiCalculationResult } from "@/lib/tools/emi-calculator/types";

interface PaymentSummaryCardsProps {
  result: EmiCalculationResult;
}

const SUMMARY_ITEMS = (result: EmiCalculationResult) => [
  {
    key: "emi",
    label: "Monthly EMI",
    value: formatCurrency(result.emi, true),
    icon: Wallet,
    emphasis: true,
  },
  {
    key: "interest",
    label: "Total interest",
    value: formatCurrency(result.totalInterest, true),
    icon: PiggyBank,
    emphasis: false,
  },
  {
    key: "payment",
    label: "Total payment",
    value: formatCurrency(result.totalPayment, true),
    icon: CalendarClock,
    emphasis: false,
  },
];

/** Three-card payment summary: Monthly EMI, Total Interest, Total Payment. */
export function PaymentSummaryCards({ result }: PaymentSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {SUMMARY_ITEMS(result).map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.key}
            className={item.emphasis ? "border-brass/50 bg-accent" : undefined}
          >
            <CardContent className="flex items-start justify-between gap-3 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-foreground">
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
