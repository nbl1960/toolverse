import { z } from "zod";
import { numberRangeField, isTenureWithinBounds, tenureBoundsMessage } from "@/lib/finance/validation";
import {
  MAX_INTEREST_RATE,
  MAX_LOAN_AMOUNT,
  MAX_TARGET_EMI,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_INTEREST_RATE,
  MIN_LOAN_AMOUNT,
  MIN_TARGET_EMI,
  MIN_TENURE_MONTHS,
} from "./constants";

export const loanFormSchema = z
  .object({
    mode: z.enum(["find-emi", "find-amount"]),
    loanAmount: numberRangeField(MIN_LOAN_AMOUNT, MAX_LOAN_AMOUNT, "Loan amount"),
    targetEmi: numberRangeField(MIN_TARGET_EMI, MAX_TARGET_EMI, "Target EMI"),
    interestRate: numberRangeField(MIN_INTEREST_RATE, MAX_INTEREST_RATE, "Interest rate"),
    tenure: z.number().positive("Tenure must be greater than zero."),
    tenureUnit: z.enum(["months", "years"]),
  })
  .refine((values) => isTenureWithinBounds(values.tenure, values.tenureUnit, MIN_TENURE_MONTHS, MAX_TENURE_MONTHS), {
    message: tenureBoundsMessage(MAX_TENURE_YEARS, MIN_TENURE_MONTHS),
    path: ["tenure"],
  });

export type LoanFormSchema = z.infer<typeof loanFormSchema>;
