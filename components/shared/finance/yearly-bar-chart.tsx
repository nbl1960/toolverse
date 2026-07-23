"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/finance/currency";
import { CHART_COLORS, CHART_LEGEND_TEXT_STYLE, CHART_TOOLTIP_STYLE } from "@/lib/finance/chart-colors";

export interface BarSeries {
  dataKey: string;
  name: string;
  color: string;
}

interface YearlyBarChartProps {
  title: string;
  description: string;
  data: Array<Record<string, number>>;
  xKey: string;
  series: [BarSeries, BarSeries];
  ariaLabel: string;
}

/**
 * Grouped bar chart comparing two per-period values (e.g. amount
 * contributed vs. interest earned, each year). Shared by every finance
 * calculator with a "year-wise breakdown" chart.
 */
export function YearlyBarChart({ title, description, data, xKey, series, ariaLabel }: YearlyBarChartProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      <div className="mt-4 h-64" role="img" aria-label={ariaLabel}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey}
              tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
              tickFormatter={(value) => `Y${Number(value)}`}
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
              labelFormatter={(value) => `Year ${Number(value)}`}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Legend formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>} />
            {series.map((s) => (
              <Bar key={s.dataKey} dataKey={s.dataKey} name={s.name} fill={s.color} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
