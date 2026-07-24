/**
 * Chart colors for finance tools, all sourced from the same CSS custom
 * properties as the rest of the UI — so charts automatically match
 * dark/light mode without any per-tool color logic.
 */
export const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  brass: "hsl(var(--brass))",
  success: "hsl(var(--success))",
  grid: "hsl(var(--border))",
  axis: "hsl(var(--muted-foreground))",
} as const;

/** Shared tooltip container style for recharts <Tooltip contentStyle>. */
export const CHART_TOOLTIP_STYLE = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "0.5rem",
  color: "hsl(var(--popover-foreground))",
  fontSize: "0.75rem",
} as const;

/** Shared legend label style for recharts <Legend formatter>. */
export const CHART_LEGEND_TEXT_STYLE = {
  color: "hsl(var(--muted-foreground))",
  fontSize: "0.75rem",
} as const;
