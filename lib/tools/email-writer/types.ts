/** The available email tones a user can pick from. */
export type EmailTone =
  | "professional"
  | "friendly"
  | "formal"
  | "casual"
  | "persuasive"
  | "apology"
  | "thank-you"
  | "follow-up";

/** The available target lengths for the generated email. */
export type EmailLength = "short" | "medium" | "long";

/** Shape of the form the user fills out to request an email. */
export interface EmailFormValues {
  topic: string;
  recipientName: string;
  senderName: string;
  tone: EmailTone;
  length: EmailLength;
}

/** A single generated email, split into subject and body for display/copy. */
export interface GeneratedEmail {
  subject: string;
  body: string;
}

/** Request payload sent to POST /api/tools/email-writer/generate. */
export type GenerateEmailRequest = EmailFormValues;

/** Successful response payload from POST /api/tools/email-writer/generate. */
export interface GenerateEmailSuccessResponse {
  success: true;
  email: GeneratedEmail;
}

/** Error response payload from POST /api/tools/email-writer/generate. */
export interface GenerateEmailErrorResponse {
  success: false;
  error: string;
}

export type GenerateEmailResponse =
  | GenerateEmailSuccessResponse
  | GenerateEmailErrorResponse;

/** Static metadata describing a tone option for the UI. */
export interface ToneOption {
  value: EmailTone;
  label: string;
  description: string;
}

/** Static metadata describing a length option for the UI. */
export interface LengthOption {
  value: EmailLength;
  label: string;
  description: string;
  wordRange: string;
}
