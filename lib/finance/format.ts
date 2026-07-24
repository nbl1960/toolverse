import type { TenureUnit } from "./types";

export { formatCurrency, formatPercent } from "./currency";

/** Formats a tenure value + unit as readable text, e.g. "15 years" or "1 month". */
export function formatTenureText(tenure: number, unit: TenureUnit): string {
  const label = unit === "years" ? "year" : "month";
  const plural = tenure === 1 ? "" : "s";
  return `${tenure} ${label}${plural}`;
}
