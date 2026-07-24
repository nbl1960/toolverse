import { z } from "zod";
import { numberRangeField } from "@/lib/finance/validation";
import {
  MAX_AGE,
  MAX_CURRENT_SAVINGS,
  MAX_MONTHLY_CONTRIBUTION,
  MAX_RETURN_RATE,
  MIN_AGE,
  MIN_CURRENT_SAVINGS,
  MIN_MONTHLY_CONTRIBUTION,
  MIN_RETURN_RATE,
} from "./constants";

export const retirementFormSchema = z
  .object({
    currentAge: numberRangeField(MIN_AGE, MAX_AGE, "Current age"),
    retirementAge: numberRangeField(MIN_AGE, MAX_AGE, "Retirement age"),
    currentSavings: numberRangeField(MIN_CURRENT_SAVINGS, MAX_CURRENT_SAVINGS, "Current savings"),
    monthlyContribution: numberRangeField(
      MIN_MONTHLY_CONTRIBUTION,
      MAX_MONTHLY_CONTRIBUTION,
      "Monthly contribution"
    ),
    expectedReturnRate: numberRangeField(MIN_RETURN_RATE, MAX_RETURN_RATE, "Expected return"),
  })
  .refine((values) => values.retirementAge > values.currentAge, {
    message: "Retirement age must be after your current age.",
    path: ["retirementAge"],
  });

export type RetirementFormSchema = z.infer<typeof retirementFormSchema>;
