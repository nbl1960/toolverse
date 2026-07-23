"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/finance/currency";
import { CHART_COLORS, CHART_LEGEND_TEXT_STYLE, CHART_TOOLTIP_STYLE } from "@/lib/finance/chart-colors";

export interface CompositionDatum {
  name: string;
  value: number;
}

interface CompositionDonutChartProps {
  title: string;
  description: string;
  data: [CompositionDatum, CompositionDatum];
  ariaLabel: string;
}

/**
 * Two-segment donut chart for "X vs. Y" composition breakdowns (Principal
 * vs. Interest, Investment vs. Wealth, Deposit vs. Interest, ...). Shared
 * by every finance calculator that needs this shape of chart — only the
 * data and copy change per tool.
 */
export function CompositionDonutChart({ title, description, data, ariaLabel }: CompositionDonutChartProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      <div className="mt-4 h-64" role="img" aria-label={ariaLabel}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={2}
              stroke="none"
            >
              <Cell fill={CHART_COLORS.primary} />
              <Cell fill={CHART_COLORS.brass} />
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
  );
}
