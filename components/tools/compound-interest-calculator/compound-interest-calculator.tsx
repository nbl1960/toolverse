"use client";

import * as React from "react";
import { Landmark, PiggyBank, Wallet } from "lucide-react";
import { CompoundInterestInputsForm } from "@/components/tools/compound-interest-calculator/compound-interest-inputs-form";
import { SummaryCards, type SummaryCardItem } from "@/components/shared/finance/summary-cards";
import { CompositionDonutChart } from "@/components/shared/finance/composition-donut-chart";
import { GrowthAreaChart } from "@/components/shared/finance/growth-area-chart";
import { ScheduleTable, type ScheduleColumn } from "@/components/shared/finance/schedule-table";
import { ShareActions } from "@/components/shared/share-actions";
import { useCompoundInterestCalculator } from "@/hooks/tools/compound-interest-calculator/use-compound-interest-calculator";
import {
  buildCompoundInterestResultSummary,
  formatCurrency,
} from "@/lib/tools/compound-interest-calculator/format";
import { CHART_COLORS } from "@/lib/finance/chart-colors";
import type { CompoundGrowthYearlyRow } from "@/lib/tools/compound-interest-calculator/types";

export function CompoundInterestCalculator() {
  const { values, setField, result, errorMessage } = useCompoundInterestCalculator();

  const summaryItems: SummaryCardItem[] = React.useMemo(() => {
    if (!result) return [];
    return [
      { key: "principal", label: "Principal", value: formatCurrency(result.principal, true), icon: Wallet },
      {
        key: "amount",
        label: "Final amount",
        value: formatCurrency(result.maturityValue, true),
        icon: Landmark,
        emphasis: true,
      },
      {
        key: "interest",
        label: "Total interest",
        value: formatCurrency(result.totalInterest, true),
        icon: PiggyBank,
      },
    ];
  }, [result]);

  const growthChartData = React.useMemo(() => {
    if (!result) return [];
    return [
      { year: 0, value: Math.round(result.principal) },
      ...result.yearlySchedule.map((row) => ({ year: row.year, value: Math.round(row.closingValue) })),
    ];
  }, [result]);

  const scheduleColumns: ScheduleColumn<CompoundGrowthYearlyRow>[] = [
    { key: "year", header: "Year", isRowHeader: true, render: (row) => row.year },
    {
      key: "opening",
      header: "Opening value",
      align: "right",
      render: (row) => formatCurrency(row.openingValue, true),
    },
    {
      key: "interest",
      header: "Interest earned",
      align: "right",
      render: (row) => formatCurrency(row.interestThisYear, true),
    },
    {
      key: "closing",
      header: "Closing value",
      align: "right",
      render: (row) => formatCurrency(row.closingValue, true),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8 lg:items-start">
      <div className="lg:sticky lg:top-20">
        <CompoundInterestInputsForm values={values} errorMessage={errorMessage} setField={setField} />
      </div>

      <div className="flex flex-col gap-6">
        {result ? (
          <>
            <SummaryCards items={summaryItems} />
            <ShareActions
              title="Compound Interest Calculator results"
              text={buildCompoundInterestResultSummary(values, result)}
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CompositionDonutChart
                title="Principal vs. interest"
                description="Share of your final amount that's principal vs. compounded interest."
                data={[
                  { name: "Principal", value: Math.round(result.principal) },
                  { name: "Interest", value: Math.round(result.totalInterest) },
                ]}
                ariaLabel="Pie chart of principal versus total interest"
              />
              <GrowthAreaChart
                title="Growth over time"
                description="How your principal compounds year by year."
                data={growthChartData}
                xKey="year"
                xTickPrefix="Y"
                series={[{ dataKey: "value", name: "Value", color: CHART_COLORS.primary, kind: "area" }]}
                ariaLabel="Area chart of value growing over time"
              />
            </div>
            <ScheduleTable
              title="Year-by-year growth"
              description={`${result.yearlySchedule.length} year${result.yearlySchedule.length === 1 ? "" : "s"} of compounding.`}
              rows={result.yearlySchedule}
              columns={scheduleColumns}
              getRowKey={(row) => row.year}
              csvFilename="compound-interest-schedule.csv"
              csvHeaders={["Year", "Opening value", "Interest earned", "Closing value"]}
              csvRow={(row) => [
                row.year,
                row.openingValue.toFixed(2),
                row.interestThisYear.toFixed(2),
                row.closingValue.toFixed(2),
              ]}
            />
          </>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {errorMessage ?? "Enter your values to see the growth breakdown."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
