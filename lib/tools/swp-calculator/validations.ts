import { z } from "zod";
import { numberRangeField, isTenureWithinBounds, tenureBoundsMessage } from "@/lib/finance/validation";
import {
  MAX_INITIAL_INVESTMENT,
  MAX_MONTHLY_WITHDRAWAL,
  MAX_RETURN_RATE,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_INITIAL_INVESTMENT,
  MIN_MONTHLY_WITHDRAWAL,
  MIN_RETURN_RATE,
  MIN_TENURE_MONTHS,
} from "./constants";

export const swpFormSchema = z
  .object({
    initialInvestment: numberRangeField(MIN_INITIAL_INVESTMENT, MAX_INITIAL_INVESTMENT, "Initial investment"),
    monthlyWithdrawal: numberRangeField(MIN_MONTHLY_WITHDRAWAL, MAX_MONTHLY_WITHDRAWAL, "Monthly withdrawal"),
    expectedReturnRate: numberRangeField(MIN_RETURN_RATE, MAX_RETURN_RATE, "Expected return"),
    tenure: z.number().positive("Time period must be greater than zero."),
    tenureUnit: z.enum(["months", "years"]),
  })
  .refine((values) => isTenureWithinBounds(values.tenure, values.tenureUnit, MIN_TENURE_MONTHS, MAX_TENURE_MONTHS), {
    message: tenureBoundsMessage(MAX_TENURE_YEARS, MIN_TENURE_MONTHS),
    path: ["tenure"],
  });

export type SwpFormSchema = z.infer<typeof swpFormSchema>;
