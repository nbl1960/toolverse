import { Landmark, LineChart, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/finance/currency";
import type { SipCalculationResult, SipFormValues } from "@/lib/tools/sip-calculator/types";

interface SipSummaryCardsProps {
  result: SipCalculationResult;
  values: SipFormValues;
}

/** Five-card payment summary: Total Investment, Estimated Returns, Final Corpus, Wealth Gained, CAGR. */
export function SipSummaryCards({ result, values }: SipSummaryCardsProps) {
  const items = [
    {
      key: "investment",
      label: "Total investment",
      value: formatCurrency(result.totalInvestment, true),
      icon: Wallet,
      emphasis: false,
    },
    {
      key: "returns",
      label: "Estimated returns",
      value: formatCurrency(result.estimatedReturns, true),
      icon: TrendingUp,
      emphasis: false,
    },
    {
      key: "corpus",
      label: "Final corpus",
      value: formatCurrency(result.finalCorpus, true),
      icon: Landmark,
      emphasis: true,
    },
    {
      key: "wealth",
      label: values.inflationRate > 0 ? "Wealth gained (real)" : "Wealth gained",
      value: formatCurrency(result.wealthGained, true),
      icon: PiggyBank,
      emphasis: false,
    },
    {
      key: "cagr",
      label: "Approx. CAGR",
      value: formatPercent(result.cagr),
      icon: LineChart,
      emphasis: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
