import { z } from "zod";
import type { TenureUnit } from "./types";

/** A required numeric field bounded to [min, max], with a friendly error message. */
export function numberRangeField(min: number, max: number, label: string) {
  return z
    .number()
    .min(min, `${label} must be at least ${min.toLocaleString()}.`)
    .max(max, `${label} must be under ${max.toLocaleString()}.`);
}

/**
 * Converts a tenure + unit pair to months and checks it falls within
 * bounds. Pulled out as a plain boolean check (rather than a zod
 * `.refine()` wrapper) so every tool's validation schema can reuse the
 * exact same bounds logic while keeping its own `.refine()` call simple
 * and easy for TypeScript to infer correctly.
 */
export function isTenureWithinBounds(
  tenure: number,
  unit: TenureUnit,
  minMonths: number,
  maxMonths: number
): boolean {
  const months = unit === "years" ? tenure * 12 : tenure;
  return months >= minMonths && months <= maxMonths;
}

/** Standard error message for a tenure-bounds refinement. */
export function tenureBoundsMessage(maxYears: number, minMonths = 1): string {
  return `Tenure must be between ${minMonths} month${minMonths === 1 ? "" : "s"} and ${maxYears} years.`;
}
