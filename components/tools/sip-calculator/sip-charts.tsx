"use client";

import * as React from "react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/finance/currency";
import { CHART_COLORS, CHART_LEGEND_TEXT_STYLE, CHART_TOOLTIP_STYLE } from "@/lib/finance/chart-colors";
import type { SipCalculationResult } from "@/lib/tools/sip-calculator/types";

interface SipChartsProps {
  result: SipCalculationResult;
}

const INVESTED_COLOR = CHART_COLORS.primary;
const RETURNS_COLOR = CHART_COLORS.brass;
const GRID_COLOR = CHART_COLORS.grid;
const AXIS_COLOR = CHART_COLORS.axis;

export function SipCharts({ result }: SipChartsProps) {
  const compositionData = React.useMemo(
    () => [
      { name: "Total investment", value: Math.round(result.totalInvestment) },
      { name: "Estimated returns", value: Math.round(Math.max(result.estimatedReturns, 0)) },
    ],
    [result]
  );

  const yearlyGrowthData = React.useMemo(
    () =>
      result.yearlySchedule.map((row) => ({
        year: row.year,
        invested: Math.round(row.investedThisYear),
        interest: Math.round(row.interestThisYear),
      })),
    [result]
  );

  const cumulativeData = React.useMemo(
    () =>
      result.yearlySchedule.map((row) => ({
        year: row.year,
        invested: Math.round(row.cumulativeInvested),
        value: Math.round(row.portfolioValue),
      })),
    [result]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h3 className="font-display text-base font-semibold text-foreground">
            Investment vs. wealth
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            How much of your final corpus is money you put in vs. growth.
          </p>
          <div
            className="mt-4 h-64"
            role="img"
            aria-label="Pie chart of total investment versus estimated returns"
          >
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
                  <Cell fill={INVESTED_COLOR} />
                  <Cell fill={RETURNS_COLOR} />
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value), true)}
                  contentStyle={CHART_TOOLTIP_STYLE}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h3 className="font-display text-base font-semibold text-foreground">Year-wise growth</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Amount invested vs. interest earned in each year.
          </p>
          <div
            className="mt-4 h-64"
            role="img"
            aria-label="Bar chart of yearly invested amount versus yearly interest earned"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyGrowthData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={GRID_COLOR} strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                  tickFormatter={(year) => `Y${Number(year)}`}
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
                  labelFormatter={(year) => `Year ${Number(year)}`}
                  contentStyle={CHART_TOOLTIP_STYLE}
                />
                <Legend
                  formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>}
                />
                <Bar dataKey="invested" name="Invested" fill={INVESTED_COLOR} radius={[3, 3, 0, 0]} />
                <Bar dataKey="interest" name="Interest" fill={RETURNS_COLOR} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <h3 className="font-display text-base font-semibold text-foreground">
          Cumulative investment vs. value
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          How your portfolio value pulls ahead of what you&apos;ve actually put in.
        </p>
        <div
          className="mt-4 h-72"
          role="img"
          aria-label="Chart of cumulative investment versus portfolio value over time"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={cumulativeData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="sipValueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={RETURNS_COLOR} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={RETURNS_COLOR} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={GRID_COLOR} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fill: AXIS_COLOR, fontSize: 11 }}
                tickFormatter={(year) => `Y${Number(year)}`}
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
                labelFormatter={(year) => `Year ${Number(year)}`}
                contentStyle={CHART_TOOLTIP_STYLE}
              />
              <Legend formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>} />
              <Area
                type="monotone"
                dataKey="value"
                name="Portfolio value"
                stroke={RETURNS_COLOR}
                strokeWidth={2}
                fill="url(#sipValueFill)"
              />
              <Line
                type="monotone"
                dataKey="invested"
                name="Cumulative invested"
                stroke={INVESTED_COLOR}
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
