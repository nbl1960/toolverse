"use client";

import * as React from "react";
import { CalendarClock, PiggyBank, Wallet } from "lucide-react";
import { LoanInputsForm } from "@/components/tools/loan-calculator/loan-inputs-form";
import { SummaryCards, type SummaryCardItem } from "@/components/shared/finance/summary-cards";
import { CompositionDonutChart } from "@/components/shared/finance/composition-donut-chart";
import { GrowthAreaChart } from "@/components/shared/finance/growth-area-chart";
import { ScheduleTable, type ScheduleColumn } from "@/components/shared/finance/schedule-table";
import { ShareActions } from "@/components/shared/share-actions";
import { useLoanCalculator } from "@/hooks/tools/loan-calculator/use-loan-calculator";
import { buildLoanResultSummary, formatCurrency } from "@/lib/tools/loan-calculator/format";
import { CHART_COLORS } from "@/lib/finance/chart-colors";
import type { LoanAmortizationRow } from "@/lib/tools/loan-calculator/types";

export function LoanCalculator() {
  const { values, setField, result, errorMessage } = useLoanCalculator();

  const summaryItems: SummaryCardItem[] = React.useMemo(() => {
    if (!result) return [];
    const items: SummaryCardItem[] = [];
    if (result.mode === "find-amount") {
      items.push({
        key: "amount",
        label: "Affordable loan amount",
        value: formatCurrency(result.loanAmount, true),
        icon: Wallet,
        emphasis: true,
      });
    } else {
      items.push({
        key: "emi",
        label: "Monthly EMI",
        value: formatCurrency(result.emi, true),
        icon: Wallet,
        emphasis: true,
      });
    }
    items.push(
      {
        key: "interest",
        label: "Total interest",
        value: formatCurrency(result.totalInterest, true),
        icon: PiggyBank,
      },
      {
        key: "payment",
        label: "Total payment",
        value: formatCurrency(result.totalPayment, true),
        icon: CalendarClock,
      }
    );
    return items;
  }, [result]);

  const balanceChartData = React.useMemo(() => {
    if (!result) return [];
    const step = Math.max(1, Math.ceil(result.schedule.length / 40));
    const points = result.schedule
      .filter((row) => row.period % step === 0 || row.period === result.schedule.length)
      .map((row) => ({ month: row.period, balance: Math.round(row.balance) }));
    return [{ month: 0, balance: Math.round(result.loanAmount) }, ...points];
  }, [result]);

  const scheduleColumns: ScheduleColumn<LoanAmortizationRow>[] = [
    { key: "period", header: "Month", isRowHeader: true, render: (row) => row.period },
    {
      key: "payment",
      header: "Payment",
      align: "right",
      render: (row) => formatCurrency(row.payment, true),
    },
    {
      key: "principal",
      header: "Principal",
      align: "right",
      render: (row) => formatCurrency(row.principal, true),
    },
    {
      key: "interest",
      header: "Interest",
      align: "right",
      render: (row) => formatCurrency(row.interest, true),
    },
    {
      key: "balance",
      header: "Balance",
      align: "right",
      render: (row) => formatCurrency(row.balance, true),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8 lg:items-start">
      <div className="lg:sticky lg:top-20">
        <LoanInputsForm values={values} errorMessage={errorMessage} setField={setField} />
      </div>

      <div className="flex flex-col gap-6">
        {result ? (
          <>
            <SummaryCards items={summaryItems} />
            <ShareActions title="Loan Calculator results" text={buildLoanResultSummary(values, result)} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CompositionDonutChart
                title="Principal vs. interest"
                description="Share of your total payment that goes to principal vs. interest."
                data={[
                  { name: "Principal", value: Math.round(result.loanAmount) },
                  { name: "Total interest", value: Math.round(result.totalInterest) },
                ]}
                ariaLabel="Pie chart of principal versus total interest"
              />
              <GrowthAreaChart
                title="Loan balance over time"
                description="Remaining principal as the loan is paid down, month by month."
                data={balanceChartData}
                xKey="month"
                xTickPrefix=""
                series={[{ dataKey: "balance", name: "Balance", color: CHART_COLORS.primary, kind: "area" }]}
                ariaLabel="Area chart of loan balance declining over time"
              />
            </div>
            <ScheduleTable
              title="Amortization schedule"
              description={`${result.schedule.length} monthly installments, principal and interest broken out.`}
              rows={result.schedule}
              columns={scheduleColumns}
              getRowKey={(row) => row.period}
              csvFilename="loan-amortization-schedule.csv"
              csvHeaders={["Month", "Payment", "Principal", "Interest", "Remaining balance"]}
              csvRow={(row) => [
                row.period,
                row.payment.toFixed(2),
                row.principal.toFixed(2),
                row.interest.toFixed(2),
                row.balance.toFixed(2),
              ]}
            />
          </>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {errorMessage ?? "Enter your loan details to see the breakdown."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
