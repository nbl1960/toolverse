import { z } from "zod";
import {
  MAX_INTEREST_RATE,
  MAX_LOAN_AMOUNT,
  MAX_TENURE_MONTHS,
  MAX_TENURE_YEARS,
  MIN_INTEREST_RATE,
  MIN_LOAN_AMOUNT,
  MIN_TENURE_MONTHS,
} from "./constants";

export const emiFormSchema = z
  .object({
    loanAmount: z
      .number()
      .min(MIN_LOAN_AMOUNT, `Loan amount must be at least ${MIN_LOAN_AMOUNT.toLocaleString()}.`)
      .max(MAX_LOAN_AMOUNT, `Loan amount must be under ${MAX_LOAN_AMOUNT.toLocaleString()}.`),
    interestRate: z
      .number()
      .min(MIN_INTEREST_RATE, `Interest rate must be at least ${MIN_INTEREST_RATE}%.`)
      .max(MAX_INTEREST_RATE, `Interest rate must be under ${MAX_INTEREST_RATE}%.`),
    tenure: z.number().positive("Tenure must be greater than zero."),
    tenureUnit: z.enum(["months", "years"]),
  })
  .refine(
    (values) => {
      const months = values.tenureUnit === "years" ? values.tenure * 12 : values.tenure;
      return months >= MIN_TENURE_MONTHS && months <= MAX_TENURE_MONTHS;
    },
    {
      message: `Tenure must be between 1 month and ${MAX_TENURE_YEARS} years.`,
      path: ["tenure"],
    }
  );

export type EmiFormSchema = z.infer<typeof emiFormSchema>;
