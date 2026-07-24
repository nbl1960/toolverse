import { z } from "zod";
import { numberRangeField, isTenureWithinBounds, tenureBoundsMessage } from "@/lib/finance/validation";
import {
  MAX_INTEREST_RATE,
  MAX_MONTHLY_DEPOSIT,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_INTEREST_RATE,
  MIN_MONTHLY_DEPOSIT,
  MIN_TENURE_MONTHS,
} from "./constants";

export const rdFormSchema = z
  .object({
    monthlyDeposit: numberRangeField(MIN_MONTHLY_DEPOSIT, MAX_MONTHLY_DEPOSIT, "Monthly deposit"),
    interestRate: numberRangeField(MIN_INTEREST_RATE, MAX_INTEREST_RATE, "Interest rate"),
    tenure: z.number().positive("Tenure must be greater than zero."),
    tenureUnit: z.enum(["months", "years"]),
  })
  .refine((values) => isTenureWithinBounds(values.tenure, values.tenureUnit, MIN_TENURE_MONTHS, MAX_TENURE_MONTHS), {
    message: tenureBoundsMessage(MAX_TENURE_YEARS, MIN_TENURE_MONTHS),
    path: ["tenure"],
  });

export type RdFormSchema = z.infer<typeof rdFormSchema>;
