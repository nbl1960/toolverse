"use client";

import { SipInputsForm } from "@/components/tools/sip-calculator/sip-inputs-form";
import { SipSummaryCards } from "@/components/tools/sip-calculator/sip-summary-cards";
import { SipCharts } from "@/components/tools/sip-calculator/sip-charts";
import { SipScheduleTable } from "@/components/tools/sip-calculator/sip-schedule-table";
import { ShareActions } from "@/components/shared/share-actions";
import { useSipCalculator } from "@/hooks/tools/sip-calculator/use-sip-calculator";
import { buildSipResultSummary } from "@/lib/tools/sip-calculator/format";

export function SipCalculator() {
  const { values, setField, result, errorMessage, hasCalculated, calculate, reset } =
    useSipCalculator();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8 lg:items-start">
      {/* Inputs */}
      <div className="lg:sticky lg:top-20">
        <SipInputsForm
          values={values}
          errorMessage={errorMessage}
          setField={setField}
          onCalculate={calculate}
          onReset={reset}
        />
      </div>

      {/* Results */}
      <div className="flex flex-col gap-6">
        {result ? (
          <>
            <SipSummaryCards result={result} values={values} />
            <ShareActions title="SIP Calculator results" text={buildSipResultSummary(values, result)} />
            <SipCharts result={result} />
            <SipScheduleTable result={result} />
          </>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {errorMessage ??
                (hasCalculated
                  ? "Enter valid SIP details and press Calculate."
                  : "Enter your SIP details and press Calculate to see your projected corpus.")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
