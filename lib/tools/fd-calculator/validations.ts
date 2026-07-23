import { z } from "zod";
import { numberRangeField, isTenureWithinBounds, tenureBoundsMessage } from "@/lib/finance/validation";
import {
  MAX_DEPOSIT_AMOUNT,
  MAX_INTEREST_RATE,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_DEPOSIT_AMOUNT,
  MIN_INTEREST_RATE,
  MIN_TENURE_MONTHS,
} from "./constants";

export const fdFormSchema = z
  .object({
    depositAmount: numberRangeField(MIN_DEPOSIT_AMOUNT, MAX_DEPOSIT_AMOUNT, "Deposit amount"),
    interestRate: numberRangeField(MIN_INTEREST_RATE, MAX_INTEREST_RATE, "Interest rate"),
    tenure: z.number().positive("Tenure must be greater than zero."),
    tenureUnit: z.enum(["months", "years"]),
    compoundingFrequency: z.enum(["annually", "semi-annually", "quarterly", "monthly"]),
  })
  .refine((values) => isTenureWithinBounds(values.tenure, values.tenureUnit, MIN_TENURE_MONTHS, MAX_TENURE_MONTHS), {
    message: tenureBoundsMessage(MAX_TENURE_YEARS, MIN_TENURE_MONTHS),
    path: ["tenure"],
  });

export type FdFormSchema = z.infer<typeof fdFormSchema>;
