"use client";

import * as React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/finance/currency";
import { CHART_COLORS, CHART_LEGEND_TEXT_STYLE, CHART_TOOLTIP_STYLE } from "@/lib/finance/chart-colors";

export interface GrowthSeries {
  dataKey: string;
  name: string;
  color: string;
  kind: "area" | "line";
}

interface GrowthAreaChartProps {
  title: string;
  description: string;
  data: Array<Record<string, number>>;
  xKey: string;
  xTickPrefix?: string;
  series: GrowthSeries[];
  ariaLabel: string;
  heightClassName?: string;
}

/**
 * Generic "value over time" chart supporting one or more area/line
 * series on a shared x-axis (month or year). Shared by every finance
 * calculator that plots a balance, corpus, or projection over time —
 * Loan Balance, Corpus Growth, Cumulative Investment vs. Value, and so on.
 */
export function GrowthAreaChart({
  title,
  description,
  data,
  xKey,
  xTickPrefix = "",
  series,
  ariaLabel,
  heightClassName = "h-64",
}: GrowthAreaChartProps) {
  const gradientId = React.useId().replace(/:/g, "");

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      <div className={`mt-4 ${heightClassName}`} role="img" aria-label={ariaLabel}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              {series
                .filter((s) => s.kind === "area")
                .map((s) => (
                  <linearGradient key={s.dataKey} id={`${gradientId}-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
            </defs>
            <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey}
              tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
              tickFormatter={(value) => `${xTickPrefix}${Number(value)}`}
              axisLine={{ stroke: CHART_COLORS.grid }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
              tickFormatter={(value) => formatCurrency(Number(value))}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value), true)}
              labelFormatter={(value) => `${xTickPrefix}${Number(value)}`}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {series.length > 1 && (
              <Legend formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>} />
            )}
            {series.map((s) =>
              s.kind === "area" ? (
                <Area
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name}
                  stroke={s.color}
                  strokeWidth={2}
                  fill={`url(#${gradientId}-${s.dataKey})`}
                />
              ) : (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={false}
                />
              )
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
