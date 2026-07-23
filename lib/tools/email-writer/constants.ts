import {
  Briefcase,
  Heart,
  Scale,
  Coffee,
  Megaphone,
  HandHeart,
  Sparkles,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import type { EmailTone, ToneOption, LengthOption } from "./types";

export const TONE_OPTIONS: ToneOption[] = [
  {
    value: "professional",
    label: "Professional",
    description: "Polished and business-appropriate",
  },
  {
    value: "friendly",
    label: "Friendly",
    description: "Warm, approachable, easygoing",
  },
  {
    value: "formal",
    label: "Formal",
    description: "Reserved, precise, traditional",
  },
  {
    value: "casual",
    label: "Casual",
    description: "Relaxed, conversational",
  },
  {
    value: "persuasive",
    label: "Persuasive",
    description: "Confident and compelling",
  },
  {
    value: "apology",
    label: "Apology",
    description: "Sincere and accountable",
  },
  {
    value: "thank-you",
    label: "Thank You",
    description: "Grateful and genuine",
  },
  {
    value: "follow-up",
    label: "Follow-up",
    description: "Direct and courteous nudge",
  },
];

export const TONE_ICONS: Record<EmailTone, LucideIcon> = {
  professional: Briefcase,
  friendly: Heart,
  formal: Scale,
  casual: Coffee,
  persuasive: Megaphone,
  apology: HandHeart,
  "thank-you": Sparkles,
  "follow-up": RefreshCw,
};

export const LENGTH_OPTIONS: LengthOption[] = [
  {
    value: "short",
    label: "Short",
    description: "Quick and to the point",
    wordRange: "~60-90 words",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Balanced detail",
    wordRange: "~120-180 words",
  },
  {
    value: "long",
    label: "Long",
    description: "Thorough and detailed",
    wordRange: "~220-320 words",
  },
];

export const MAX_TOPIC_LENGTH = 500;
export const MAX_NAME_LENGTH = 100;
