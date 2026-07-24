/** Shared unit for expressing a duration as either months or years. */
export type TenureUnit = "months" | "years";

/** Converts a tenure value in the given unit to a whole number of months. */
export function toMonths(value: number, unit: TenureUnit): number {
  return Math.round(unit === "years" ? value * 12 : value);
}
