import { z } from "zod";
import { numberRangeField } from "@/lib/finance/validation";
import {
  MAX_ANNUAL_RATE,
  MAX_PRINCIPAL,
  MAX_YEARS,
  MIN_ANNUAL_RATE,
  MIN_PRINCIPAL,
  MIN_YEARS,
} from "./constants";

export const compoundInterestFormSchema = z.object({
  principal: numberRangeField(MIN_PRINCIPAL, MAX_PRINCIPAL, "Principal"),
  annualRate: numberRangeField(MIN_ANNUAL_RATE, MAX_ANNUAL_RATE, "Annual rate"),
  years: numberRangeField(MIN_YEARS, MAX_YEARS, "Time"),
  compoundingFrequency: z.enum(["annually", "semi-annually", "quarterly", "monthly"]),
});

export type CompoundInterestFormSchema = z.infer<typeof compoundInterestFormSchema>;
