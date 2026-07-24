"use client";

import * as React from "react";
import { AlertTriangle, Landmark, PiggyBank, Wallet } from "lucide-react";
import { SwpInputsForm } from "@/components/tools/swp-calculator/swp-inputs-form";
import { SummaryCards, type SummaryCardItem } from "@/components/shared/finance/summary-cards";
import { CompositionDonutChart } from "@/components/shared/finance/composition-donut-chart";
import { GrowthAreaChart } from "@/components/shared/finance/growth-area-chart";
import { ScheduleTable, type ScheduleColumn } from "@/components/shared/finance/schedule-table";
import { ShareActions } from "@/components/shared/share-actions";
import { useSwpCalculator } from "@/hooks/tools/swp-calculator/use-swp-calculator";
import { buildSwpResultSummary, formatCurrency } from "@/lib/tools/swp-calculator/format";
import { CHART_COLORS } from "@/lib/finance/chart-colors";
import type { WithdrawalYearlyRow } from "@/lib/tools/swp-calculator/types";

export function SwpCalculator() {
  const { values, setField, result, errorMessage } = useSwpCalculator();

  const summaryItems: SummaryCardItem[] = React.useMemo(() => {
    if (!result) return [];
    return [
      {
        key: "withdrawn",
        label: "Total withdrawn",
        value: formatCurrency(result.totalWithdrawn, true),
        icon: Wallet,
      },
      {
        key: "interest",
        label: "Total interest earned",
        value: formatCurrency(result.totalInterestEarned, true),
        icon: PiggyBank,
      },
      {
        key: "balance",
        label: "Final balance",
        value: formatCurrency(result.finalBalance, true),
        icon: Landmark,
        emphasis: true,
      },
    ];
  }, [result]);

  const balanceChartData = React.useMemo(() => {
    if (!result) return [];
    return [
      { year: 0, balance: Math.round(values.initialInvestment) },
      ...result.yearlySchedule.map((row) => ({ year: row.year, balance: Math.round(row.closingBalance) })),
    ];
  }, [result, values.initialInvestment]);

  const scheduleColumns: ScheduleColumn<WithdrawalYearlyRow>[] = [
    { key: "year", header: "Year", isRowHeader: true, render: (row) => row.year },
    {
      key: "opening",
      header: "Opening balance",
      align: "right",
      render: (row) => formatCurrency(row.openingBalance, true),
    },
    {
      key: "withdrawn",
      header: "Withdrawn",
      align: "right",
      render: (row) => formatCurrency(row.withdrawnThisYear, true),
    },
    {
      key: "interest",
      header: "Interest earned",
      align: "right",
      render: (row) => formatCurrency(row.interestThisYear, true),
    },
    {
      key: "closing",
      header: "Closing balance",
      align: "right",
      render: (row) => formatCurrency(row.closingBalance, true),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8 lg:items-start">
      <div className="lg:sticky lg:top-20">
        <SwpInputsForm values={values} errorMessage={errorMessage} setField={setField} />
      </div>

      <div className="flex flex-col gap-6">
        {result ? (
          <>
            {result.depletedAtMonth !== null && (
              <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p>
                  This withdrawal rate depletes the corpus in month {result.depletedAtMonth} —
                  before the end of your selected time period. Consider a smaller monthly
                  withdrawal or a higher expected return.
                </p>
              </div>
            )}
            <SummaryCards items={summaryItems} />
            <ShareActions title="SWP Calculator results" text={buildSwpResultSummary(values, result)} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CompositionDonutChart
                title="Withdrawn vs. interest earned"
                description="How much of your total withdrawals came from growth vs. your original investment."
                data={[
                  { name: "Total withdrawn", value: Math.round(result.totalWithdrawn) },
                  { name: "Interest earned", value: Math.round(Math.max(result.totalInterestEarned, 0)) },
                ]}
                ariaLabel="Pie chart of total withdrawn versus interest earned"
              />
              <GrowthAreaChart
                title="Balance over time"
                description="How your remaining balance changes as you withdraw and it keeps growing."
                data={balanceChartData}
                xKey="year"
                xTickPrefix="Y"
                series={[{ dataKey: "balance", name: "Balance", color: CHART_COLORS.primary, kind: "area" }]}
                ariaLabel="Area chart of remaining balance over time"
              />
            </div>
            <ScheduleTable
              title="Yearly withdrawal schedule"
              description={`${result.yearlySchedule.length} year${result.yearlySchedule.length === 1 ? "" : "s"}, opening/closing balance and withdrawals.`}
              rows={result.yearlySchedule}
              columns={scheduleColumns}
              getRowKey={(row) => row.year}
              csvFilename="swp-withdrawal-schedule.csv"
              csvHeaders={["Year", "Opening balance", "Withdrawn", "Interest earned", "Closing balance"]}
              csvRow={(row) => [
                row.year,
                row.openingBalance.toFixed(2),
                row.withdrawnThisYear.toFixed(2),
                row.interestThisYear.toFixed(2),
                row.closingBalance.toFixed(2),
              ]}
            />
          </>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {errorMessage ?? "Enter your withdrawal plan details to see the projection."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
