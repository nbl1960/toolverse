"use client";

import * as React from "react";
import { toast } from "sonner";
import { emailFormSchema } from "@/lib/tools/email-writer/validations";
import type {
  EmailFormValues,
  GeneratedEmail,
  GenerateEmailResponse,
} from "@/lib/tools/email-writer/types";

const DEFAULT_VALUES: EmailFormValues = {
  topic: "",
  recipientName: "",
  senderName: "",
  tone: "professional",
  length: "medium",
};

interface UseEmailGeneratorResult {
  values: EmailFormValues;
  errors: Partial<Record<keyof EmailFormValues, string>>;
  email: GeneratedEmail | null;
  isGenerating: boolean;
  setField: <K extends keyof EmailFormValues>(key: K, value: EmailFormValues[K]) => void;
  generate: () => Promise<void>;
  regenerate: () => Promise<void>;
  clear: () => void;
}

/** Encapsulates form state, validation, and API calls for the email writer. */
export function useEmailGenerator(): UseEmailGeneratorResult {
  const [values, setValues] = React.useState<EmailFormValues>(DEFAULT_VALUES);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof EmailFormValues, string>>
  >({});
  const [email, setEmail] = React.useState<GeneratedEmail | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const setField = React.useCallback(
    <K extends keyof EmailFormValues>(key: K, value: EmailFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  const runGeneration = React.useCallback(async (currentValues: EmailFormValues) => {
    const parsed = emailFormSchema.safeParse(currentValues);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof EmailFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof EmailFormValues | undefined;
        if (field) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/tools/email-writer/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as GenerateEmailResponse;

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      setEmail(data.email);
      toast.success("Email drafted successfully.");
    } catch {
      toast.error("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const generate = React.useCallback(() => runGeneration(values), [runGeneration, values]);
  const regenerate = React.useCallback(() => runGeneration(values), [runGeneration, values]);

  const clear = React.useCallback(() => {
    setValues(DEFAULT_VALUES);
    setErrors({});
    setEmail(null);
  }, []);

  return { values, errors, email, isGenerating, setField, generate, regenerate, clear };
}
