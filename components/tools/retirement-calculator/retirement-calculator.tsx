"use client";

import * as React from "react";
import { Landmark, PiggyBank, Wallet } from "lucide-react";
import { RetirementInputsForm } from "@/components/tools/retirement-calculator/retirement-inputs-form";
import { SummaryCards, type SummaryCardItem } from "@/components/shared/finance/summary-cards";
import { CompositionDonutChart } from "@/components/shared/finance/composition-donut-chart";
import { GrowthAreaChart } from "@/components/shared/finance/growth-area-chart";
import { YearlyBarChart } from "@/components/shared/finance/yearly-bar-chart";
import { ScheduleTable, type ScheduleColumn } from "@/components/shared/finance/schedule-table";
import { ShareActions } from "@/components/shared/share-actions";
import { useRetirementCalculator } from "@/hooks/tools/retirement-calculator/use-retirement-calculator";
import { buildRetirementResultSummary, formatCurrency } from "@/lib/tools/retirement-calculator/format";
import { CHART_COLORS } from "@/lib/finance/chart-colors";
import type { AnnuityYearlyRow } from "@/lib/tools/retirement-calculator/types";

export function RetirementCalculator() {
  const { values, setField, result, errorMessage } = useRetirementCalculator();

  const summaryItems: SummaryCardItem[] = React.useMemo(() => {
    if (!result) return [];
    return [
      {
        key: "years",
        label: "Years to retirement",
        value: String(result.yearsToRetirement),
        icon: PiggyBank,
      },
      {
        key: "invested",
        label: "Total invested",
        value: formatCurrency(result.totalInvestment, true),
        icon: Wallet,
      },
      {
        key: "corpus",
        label: "Retirement corpus",
        value: formatCurrency(result.retirementCorpus, true),
        icon: Landmark,
        emphasis: true,
      },
      {
        key: "growth",
        label: "Total growth",
        value: formatCurrency(result.totalGrowth, true),
        icon: PiggyBank,
      },
    ];
  }, [result]);

  const growthChartData = React.useMemo(() => {
    if (!result) return [];
    return result.yearlySchedule.map((row) => ({
      year: row.year,
      invested: Math.round(row.cumulativeContributed + values.currentSavings),
      value: Math.round(row.balance),
    }));
  }, [result, values.currentSavings]);

  const yearlyBarData = React.useMemo(() => {
    if (!result) return [];
    return result.yearlySchedule.map((row) => ({
      year: row.year,
      contributed: Math.round(row.contributedThisYear),
      growth: Math.round(row.interestThisYear),
    }));
  }, [result]);

  const scheduleColumns: ScheduleColumn<AnnuityYearlyRow>[] = [
    { key: "year", header: "Year", isRowHeader: true, render: (row) => row.year },
    {
      key: "contributed",
      header: "Total invested",
      align: "right",
      render: (row) => formatCurrency(row.cumulativeContributed + values.currentSavings, true),
    },
    {
      key: "growth",
      header: "Growth",
      align: "right",
      render: (row) => formatCurrency(row.cumulativeInterest, true),
    },
    {
      key: "value",
      header: "Corpus",
      align: "right",
      render: (row) => formatCurrency(row.balance, true),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8 lg:items-start">
      <div className="lg:sticky lg:top-20">
        <RetirementInputsForm values={values} errorMessage={errorMessage} setField={setField} />
      </div>

      <div className="flex flex-col gap-6">
        {result ? (
          <>
            <SummaryCards items={summaryItems} columnsClassName="lg:grid-cols-4" />
            <ShareActions
              title="Retirement Calculator results"
              text={buildRetirementResultSummary(values, result)}
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CompositionDonutChart
                title="Invested vs. growth"
                description="How much of your retirement corpus is money you put in vs. investment growth."
                data={[
                  { name: "Total invested", value: Math.round(result.totalInvestment) },
                  { name: "Growth", value: Math.round(Math.max(result.totalGrowth, 0)) },
                ]}
                ariaLabel="Pie chart of total invested versus investment growth"
              />
              <YearlyBarChart
                title="Year-wise growth"
                description="Amount contributed vs. growth earned in each year."
                data={yearlyBarData}
                xKey="year"
                series={[
                  { dataKey: "contributed", name: "Contributed", color: CHART_COLORS.primary },
                  { dataKey: "growth", name: "Growth", color: CHART_COLORS.brass },
                ]}
                ariaLabel="Bar chart of yearly contributions versus yearly growth"
              />
            </div>
            <GrowthAreaChart
              title="Projected corpus over time"
              description="How your retirement corpus grows relative to what you've invested."
              data={growthChartData}
              xKey="year"
              xTickPrefix="Y"
              series={[
                { dataKey: "value", name: "Corpus", color: CHART_COLORS.brass, kind: "area" },
                { dataKey: "invested", name: "Invested", color: CHART_COLORS.primary, kind: "line" },
              ]}
              ariaLabel="Chart of projected retirement corpus versus total invested over time"
              heightClassName="h-72"
            />
            <ScheduleTable
              title="Yearly projection"
              description={`${result.yearlySchedule.length} year${result.yearlySchedule.length === 1 ? "" : "s"} until retirement.`}
              rows={result.yearlySchedule}
              columns={scheduleColumns}
              getRowKey={(row) => row.year}
              csvFilename="retirement-projection-schedule.csv"
              csvHeaders={["Year", "Total invested", "Growth", "Corpus"]}
              csvRow={(row) => [
                row.year,
                (row.cumulativeContributed + values.currentSavings).toFixed(2),
                row.cumulativeInterest.toFixed(2),
                row.balance.toFixed(2),
              ]}
            />
          </>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {errorMessage ?? "Enter your retirement plan details to see the projection."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
