import { z } from "zod";
import { numberRangeField } from "@/lib/finance/validation";
import { MAX_VALUE, MAX_YEARS, MIN_VALUE, MIN_YEARS } from "./constants";

export const cagrFormSchema = z.object({
  initialValue: numberRangeField(MIN_VALUE, MAX_VALUE, "Initial value"),
  finalValue: numberRangeField(MIN_VALUE, MAX_VALUE, "Final value"),
  years: numberRangeField(MIN_YEARS, MAX_YEARS, "Time period"),
});

export type CagrFormSchema = z.infer<typeof cagrFormSchema>;
