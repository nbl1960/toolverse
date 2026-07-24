"use client";

import * as React from "react";
import { Landmark, PiggyBank, Wallet } from "lucide-react";
import { RdInputsForm } from "@/components/tools/rd-calculator/rd-inputs-form";
import { SummaryCards, type SummaryCardItem } from "@/components/shared/finance/summary-cards";
import { CompositionDonutChart } from "@/components/shared/finance/composition-donut-chart";
import { GrowthAreaChart } from "@/components/shared/finance/growth-area-chart";
import { ScheduleTable, type ScheduleColumn } from "@/components/shared/finance/schedule-table";
import { ShareActions } from "@/components/shared/share-actions";
import { useRdCalculator } from "@/hooks/tools/rd-calculator/use-rd-calculator";
import { buildRdResultSummary, formatCurrency } from "@/lib/tools/rd-calculator/format";
import { CHART_COLORS } from "@/lib/finance/chart-colors";
import type { AnnuityYearlyRow } from "@/lib/tools/rd-calculator/types";

export function RdCalculator() {
  const { values, setField, result, errorMessage } = useRdCalculator();

  const summaryItems: SummaryCardItem[] = React.useMemo(() => {
    if (!result) return [];
    return [
      {
        key: "investment",
        label: "Total investment",
        value: formatCurrency(result.totalInvestment, true),
        icon: Wallet,
      },
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
    return result.yearlySchedule.map((row) => ({
      year: row.year,
      invested: Math.round(row.cumulativeContributed),
      value: Math.round(row.balance),
    }));
  }, [result]);

  const scheduleColumns: ScheduleColumn<AnnuityYearlyRow>[] = [
    { key: "year", header: "Year", isRowHeader: true, render: (row) => row.year },
    {
      key: "invested",
      header: "Amount deposited",
      align: "right",
      render: (row) => formatCurrency(row.cumulativeContributed, true),
    },
    {
      key: "interest",
      header: "Interest earned",
      align: "right",
      render: (row) => formatCurrency(row.cumulativeInterest, true),
    },
    {
      key: "value",
      header: "Value",
      align: "right",
      render: (row) => formatCurrency(row.balance, true),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8 lg:items-start">
      <div className="lg:sticky lg:top-20">
        <RdInputsForm values={values} errorMessage={errorMessage} setField={setField} />
      </div>

      <div className="flex flex-col gap-6">
        {result ? (
          <>
            <SummaryCards items={summaryItems} />
            <ShareActions title="RD Calculator results" text={buildRdResultSummary(values, result)} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CompositionDonutChart
                title="Deposits vs. interest"
                description="Share of your maturity value that's deposits vs. interest earned."
                data={[
                  { name: "Deposits", value: Math.round(result.totalInvestment) },
                  { name: "Interest", value: Math.round(result.totalInterest) },
                ]}
                ariaLabel="Pie chart of total deposits versus interest earned"
              />
              <GrowthAreaChart
                title="Cumulative deposits vs. value"
                description="How your account value pulls ahead of what you've deposited."
                data={growthChartData}
                xKey="year"
                xTickPrefix="Y"
                series={[
                  { dataKey: "value", name: "Value", color: CHART_COLORS.brass, kind: "area" },
                  { dataKey: "invested", name: "Deposited", color: CHART_COLORS.primary, kind: "line" },
                ]}
                ariaLabel="Chart of cumulative deposits versus account value over time"
              />
            </div>
            <ScheduleTable
              title="Yearly deposit schedule"
              description={`${result.yearlySchedule.length} year${result.yearlySchedule.length === 1 ? "" : "s"}, cumulative deposits and interest earned.`}
              rows={result.yearlySchedule}
              columns={scheduleColumns}
              getRowKey={(row) => row.year}
              csvFilename="rd-deposit-schedule.csv"
              csvHeaders={["Year", "Amount deposited", "Interest earned", "Value"]}
              csvRow={(row) => [
                row.year,
                row.cumulativeContributed.toFixed(2),
                row.cumulativeInterest.toFixed(2),
                row.balance.toFixed(2),
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
