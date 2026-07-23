"use client";

import { EmiInputsForm } from "@/components/tools/emi-calculator/emi-inputs-form";
import { PaymentSummaryCards } from "@/components/tools/emi-calculator/payment-summary-cards";
import { EmiCharts } from "@/components/tools/emi-calculator/emi-charts";
import { AmortizationTable } from "@/components/tools/emi-calculator/amortization-table";
import { ShareActions } from "@/components/shared/share-actions";
import { useEmiCalculator } from "@/hooks/tools/emi-calculator/use-emi-calculator";
import { buildResultSummary } from "@/lib/tools/emi-calculator/format";

export function EmiCalculator() {
  const { values, setField, result, errorMessage } = useEmiCalculator();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8 lg:items-start">
      {/* Inputs */}
      <div className="lg:sticky lg:top-20">
        <EmiInputsForm values={values} errorMessage={errorMessage} setField={setField} />
      </div>

      {/* Results */}
      <div className="flex flex-col gap-6">
        {result ? (
          <>
            <PaymentSummaryCards result={result} />
            <ShareActions title="EMI Calculator results" text={buildResultSummary(values, result)} />
            <EmiCharts result={result} />
            <AmortizationTable result={result} />
          </>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {errorMessage ?? "Enter your loan details to see the EMI breakdown."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
