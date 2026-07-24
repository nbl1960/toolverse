"use client";

import * as React from "react";
import { ArrowUpRight, DollarSign, TrendingUp } from "lucide-react";
import { CagrInputsForm } from "@/components/tools/cagr-calculator/cagr-inputs-form";
import { SummaryCards, type SummaryCardItem } from "@/components/shared/finance/summary-cards";
import { CompositionDonutChart } from "@/components/shared/finance/composition-donut-chart";
import { GrowthAreaChart } from "@/components/shared/finance/growth-area-chart";
import { ScheduleTable, type ScheduleColumn } from "@/components/shared/finance/schedule-table";
import { ShareActions } from "@/components/shared/share-actions";
import { useCagrCalculator } from "@/hooks/tools/cagr-calculator/use-cagr-calculator";
import { buildCagrResultSummary, formatCurrency } from "@/lib/tools/cagr-calculator/format";
import { formatPercent } from "@/lib/finance/currency";
import { CHART_COLORS } from "@/lib/finance/chart-colors";
import type { CagrYearlyRow } from "@/lib/tools/cagr-calculator/types";

export function CagrCalculator() {
  const { values, setField, result, errorMessage } = useCagrCalculator();

  const summaryItems: SummaryCardItem[] = React.useMemo(() => {
    if (!result) return [];
    return [
      {
        key: "cagr",
        label: "CAGR",
        value: formatPercent(result.cagrPercent),
        icon: TrendingUp,
        emphasis: true,
      },
      {
        key: "growth",
        label: "Absolute growth",
        value: formatCurrency(result.absoluteGrowth, true),
        icon: DollarSign,
      },
      {
        key: "multiple",
        label: "Growth multiple",
        value: `${result.growthMultiple.toFixed(2)}×`,
        icon: ArrowUpRight,
      },
    ];
  }, [result]);

  const projectionChartData = React.useMemo(() => {
    if (!result) return [];
    return result.yearlyProjection.map((row) => ({
      year: row.year,
      value: Math.round(row.projectedValue),
    }));
  }, [result]);

  const scheduleColumns: ScheduleColumn<CagrYearlyRow>[] = [
    { key: "year", header: "Year", isRowHeader: true, render: (row) => row.year },
    {
      key: "value",
      header: "Projected value",
      align: "right",
      render: (row) => formatCurrency(row.projectedValue, true),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8 lg:items-start">
      <div className="lg:sticky lg:top-20">
        <CagrInputsForm values={values} errorMessage={errorMessage} setField={setField} />
      </div>

      <div className="flex flex-col gap-6">
        {result ? (
          <>
            <SummaryCards items={summaryItems} />
            <ShareActions title="CAGR Calculator results" text={buildCagrResultSummary(values, result)} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CompositionDonutChart
                title="Initial value vs. growth"
                description="Share of your final value that's your starting point vs. growth."
                data={[
                  { name: "Initial value", value: Math.round(values.initialValue) },
                  { name: "Growth", value: Math.round(Math.max(result.absoluteGrowth, 0)) },
                ]}
                ariaLabel="Pie chart of initial value versus absolute growth"
              />
              <GrowthAreaChart
                title="Projected growth path"
                description="Value at each year if it grew at exactly the calculated CAGR every year."
                data={projectionChartData}
                xKey="year"
                xTickPrefix="Y"
                series={[{ dataKey: "value", name: "Value", color: CHART_COLORS.primary, kind: "area" }]}
                ariaLabel="Area chart of projected value at a constant CAGR over time"
              />
            </div>
            <ScheduleTable
              title="Yearly projection"
              description="Implied value at the end of each year, growing at a constant CAGR."
              rows={result.yearlyProjection}
              columns={scheduleColumns}
              getRowKey={(row) => row.year}
              csvFilename="cagr-projection.csv"
              csvHeaders={["Year", "Projected value"]}
              csvRow={(row) => [row.year, row.projectedValue.toFixed(2)]}
            />
          </>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {errorMessage ?? "Enter your values to see the CAGR breakdown."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
