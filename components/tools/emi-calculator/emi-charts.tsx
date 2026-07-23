"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/tools/emi-calculator/format";
import { CHART_COLORS, CHART_LEGEND_TEXT_STYLE, CHART_TOOLTIP_STYLE } from "@/lib/finance/chart-colors";
import type { EmiCalculationResult } from "@/lib/tools/emi-calculator/types";

interface EmiChartsProps {
  result: EmiCalculationResult;
}

const PRINCIPAL_COLOR = CHART_COLORS.primary;
const INTEREST_COLOR = CHART_COLORS.brass;
const GRID_COLOR = CHART_COLORS.grid;
const AXIS_COLOR = CHART_COLORS.axis;

/** Downsamples the schedule so long tenures still render a legible chart (~40 points max). */
function buildBalanceSeries(result: EmiCalculationResult) {
  const { schedule } = result;
  const step = Math.max(1, Math.ceil(schedule.length / 40));

  const points = schedule
    .filter((row) => row.month % step === 0 || row.month === schedule.length)
    .map((row) => ({ month: row.month, balance: Math.round(row.balance) }));

  return [{ month: 0, balance: Math.round(result.principal) }, ...points];
}

export function EmiCharts({ result }: EmiChartsProps) {
  const compositionData = React.useMemo(
    () => [
      { name: "Principal", value: Math.round(result.principal) },
      { name: "Total interest", value: Math.round(result.totalInterest) },
    ],
    [result]
  );

  const balanceData = React.useMemo(() => buildBalanceSeries(result), [result]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <h3 className="font-display text-base font-semibold text-foreground">
          Principal vs. interest
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Share of your total payment that goes to principal vs. interest.
        </p>
        <div className="mt-4 h-64" role="img" aria-label="Pie chart of principal versus total interest">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={compositionData}
                dataKey="value"
                nameKey="name"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={2}
                stroke="none"
              >
                <Cell fill={PRINCIPAL_COLOR} />
                <Cell fill={INTEREST_COLOR} />
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(Number(value), true)}
                contentStyle={CHART_TOOLTIP_STYLE}
              />
              <Legend
                verticalAlign="bottom"
                height={32}
                formatter={(value) => (
                  <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <h3 className="font-display text-base font-semibold text-foreground">
          Loan balance over time
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Remaining principal as you pay down the loan, month by month.
        </p>
        <div className="mt-4 h-64" role="img" aria-label="Area chart of loan balance declining over time">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={balanceData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="emiBalanceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PRINCIPAL_COLOR} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={PRINCIPAL_COLOR} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={GRID_COLOR} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                tickFormatter={(month) => `${Number(month)}m`}
                axisLine={{ stroke: GRID_COLOR }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                tickFormatter={(value) => formatCurrency(Number(value))}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value), true)}
                labelFormatter={(month) => `Month ${Number(month)}`}
                contentStyle={CHART_TOOLTIP_STYLE}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke={PRINCIPAL_COLOR}
                strokeWidth={2}
                fill="url(#emiBalanceFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
