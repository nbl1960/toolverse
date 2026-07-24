"use client";

import * as React from "react";
import { Landmark, PiggyBank, Wallet } from "lucide-react";
import { FdInputsForm } from "@/components/tools/fd-calculator/fd-inputs-form";
import { SummaryCards, type SummaryCardItem } from "@/components/shared/finance/summary-cards";
import { CompositionDonutChart } from "@/components/shared/finance/composition-donut-chart";
import { GrowthAreaChart } from "@/components/shared/finance/growth-area-chart";
import { ScheduleTable, type ScheduleColumn } from "@/components/shared/finance/schedule-table";
import { ShareActions } from "@/components/shared/share-actions";
import { useFdCalculator } from "@/hooks/tools/fd-calculator/use-fd-calculator";
import { buildFdResultSummary, formatCurrency } from "@/lib/tools/fd-calculator/format";
import { CHART_COLORS } from "@/lib/finance/chart-colors";
import type { CompoundGrowthYearlyRow } from "@/lib/tools/fd-calculator/types";

export function FdCalculator() {
  const { values, setField, result, errorMessage } = useFdCalculator();

  const summaryItems: SummaryCardItem[] = React.useMemo(() => {
    if (!result) return [];
    return [
      { key: "principal", label: "Total investment", value: formatCurrency(result.principal, true), icon: Wallet },
      {
        key: "maturity",
        label: "Maturity value",
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
        <FdInputsForm values={values} errorMessage={errorMessage} setField={setField} />
      </div>

      <div className="flex flex-col gap-6">
        {result ? (
          <>
            <SummaryCards items={summaryItems} />
            <ShareActions title="FD Calculator results" text={buildFdResultSummary(values, result)} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CompositionDonutChart
                title="Deposit vs. interest"
                description="Share of your maturity value that's your original deposit vs. interest earned."
                data={[
                  { name: "Deposit", value: Math.round(result.principal) },
                  { name: "Interest", value: Math.round(result.totalInterest) },
                ]}
                ariaLabel="Pie chart of deposit versus interest earned"
              />
              <GrowthAreaChart
                title="Deposit growth over time"
                description="How your deposit's value compounds year by year."
                data={growthChartData}
                xKey="year"
                xTickPrefix="Y"
                series={[{ dataKey: "value", name: "Value", color: CHART_COLORS.primary, kind: "area" }]}
                ariaLabel="Area chart of deposit value growing over time"
              />
            </div>
            <ScheduleTable
              title="Year-by-year growth"
              description={`${result.yearlySchedule.length} year${result.yearlySchedule.length === 1 ? "" : "s"} of compounding.`}
              rows={result.yearlySchedule}
              columns={scheduleColumns}
              getRowKey={(row) => row.year}
              csvFilename="fd-growth-schedule.csv"
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
              {errorMessage ?? "Enter your deposit details to see the growth breakdown."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
