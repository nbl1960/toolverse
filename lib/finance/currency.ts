const CURRENCY = "USD";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

const preciseCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 2,
});

/** Formats a number as currency. Pass `precise` for cents-level results (e.g. in result cards). */
export function formatCurrency(value: number, precise = false): string {
  return (precise ? preciseCurrencyFormatter : currencyFormatter).format(value);
}

/** Formats a number as a percentage string, e.g. `formatPercent(8.5)` -> "8.5%". */
export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`;
}
