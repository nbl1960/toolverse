import { z } from "zod";
import {
  MAX_INFLATION_RATE,
  MAX_MONTHLY_INVESTMENT,
  MAX_RETURN_RATE,
  MAX_STEP_UP_PERCENT,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_INFLATION_RATE,
  MIN_MONTHLY_INVESTMENT,
  MIN_RETURN_RATE,
  MIN_STEP_UP_PERCENT,
  MIN_TENURE_MONTHS,
} from "./constants";

export const sipFormSchema = z
  .object({
    monthlyInvestment: z
      .number()
      .min(
        MIN_MONTHLY_INVESTMENT,
        `Monthly investment must be at least ${MIN_MONTHLY_INVESTMENT.toLocaleString()}.`
      )
      .max(
        MAX_MONTHLY_INVESTMENT,
        `Monthly investment must be under ${MAX_MONTHLY_INVESTMENT.toLocaleString()}.`
      ),
    expectedReturnRate: z
      .number()
      .min(MIN_RETURN_RATE, `Expected return must be at least ${MIN_RETURN_RATE}%.`)
      .max(MAX_RETURN_RATE, `Expected return must be under ${MAX_RETURN_RATE}%.`),
    tenure: z.number().positive("Investment period must be greater than zero."),
    tenureUnit: z.enum(["months", "years"]),
    stepUpPercent: z
      .number()
      .min(MIN_STEP_UP_PERCENT, "Step-up can't be negative.")
      .max(MAX_STEP_UP_PERCENT, `Step-up must be under ${MAX_STEP_UP_PERCENT}%.`),
    inflationRate: z
      .number()
      .min(MIN_INFLATION_RATE, "Inflation rate can't be negative.")
      .max(MAX_INFLATION_RATE, `Inflation rate must be under ${MAX_INFLATION_RATE}%.`),
  })
  .refine(
    (values) => {
      const months = values.tenureUnit === "years" ? values.tenure * 12 : values.tenure;
      return months >= MIN_TENURE_MONTHS && months <= MAX_TENURE_MONTHS;
    },
    {
      message: `Investment period must be between 1 month and ${MAX_TENURE_YEARS} years.`,
      path: ["tenure"],
    }
  );

export type SipFormSchema = z.infer<typeof sipFormSchema>;
