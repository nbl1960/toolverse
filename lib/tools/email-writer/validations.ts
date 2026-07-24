import { z } from "zod";
import { MAX_NAME_LENGTH, MAX_TOPIC_LENGTH } from "./constants";

const toneValues = [
  "professional",
  "friendly",
  "formal",
  "casual",
  "persuasive",
  "apology",
  "thank-you",
  "follow-up",
] as const;

const lengthValues = ["short", "medium", "long"] as const;

/** Validation schema for the email generation form / API request body. */
export const emailFormSchema = z.object({
  topic: z
    .string()
    .trim()
    .min(3, "Tell us a bit more about what the email is about.")
    .max(MAX_TOPIC_LENGTH, `Keep the topic under ${MAX_TOPIC_LENGTH} characters.`),
  recipientName: z
    .string()
    .trim()
    .max(MAX_NAME_LENGTH, `Keep the recipient name under ${MAX_NAME_LENGTH} characters.`)
    .optional()
    .default(""),
  senderName: z
    .string()
    .trim()
    .max(MAX_NAME_LENGTH, `Keep your name under ${MAX_NAME_LENGTH} characters.`)
    .optional()
    .default(""),
  tone: z.enum(toneValues, {
    errorMap: () => ({ message: "Choose a valid tone." }),
  }),
  length: z.enum(lengthValues, {
    errorMap: () => ({ message: "Choose a valid length." }),
  }),
});

export type EmailFormSchema = z.infer<typeof emailFormSchema>;
