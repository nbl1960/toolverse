"use client";

import * as React from "react";
import { Check, Copy, Mail, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TONE_ICONS } from "@/lib/tools/email-writer/constants";
import type { EmailTone, GeneratedEmail } from "@/lib/tools/email-writer/types";
import { cn, copyToClipboard, countCharacters } from "@/lib/utils";

interface EmailOutputProps {
  email: GeneratedEmail | null;
  tone: EmailTone;
  isGenerating: boolean;
  onRegenerate: () => void;
}

export function EmailOutput({ email, tone, isGenerating, onRegenerate }: EmailOutputProps) {
  const [copied, setCopied] = React.useState(false);
  const ToneIcon = TONE_ICONS[tone];

  const fullText = email ? `Subject: ${email.subject}\n\n${email.body}` : "";
  const charCount = countCharacters(email?.body);

  async function handleCopy() {
    if (!email) return;
    const success = await copyToClipboard(fullText);
    if (success) {
      setCopied(true);
      toast.success("Copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Couldn't copy to clipboard.");
    }
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "deckle-edge relative overflow-hidden rounded-lg border border-border bg-card shadow-sm",
          "min-h-[420px] pt-4"
        )}
      >
        {/* Wax-seal badge indicating the active tone / generation state */}
        <div
          className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-brass bg-primary text-primary-foreground shadow-md"
          style={{ transform: "rotate(-8deg)" }}
          aria-hidden="true"
        >
          {isGenerating ? (
            <span className="h-3 w-3 animate-ink-pulse rounded-full bg-primary-foreground" />
          ) : email ? (
            <ToneIcon className="h-5 w-5 animate-stamp-press" strokeWidth={2} />
          ) : (
            <Mail className="h-5 w-5 opacity-60" strokeWidth={2} />
          )}
        </div>

        <div className="flex h-full flex-col px-6 pb-6 pt-2 sm:px-8">
          {isGenerating ? (
            <EmailSkeleton />
          ) : email ? (
            <div className="flex flex-1 flex-col gap-4 animate-fade-up">
              <div className="border-b border-dashed border-border pb-4 pr-14">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Subject
                </p>
                <h3 className="font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
                  {email.subject}
                </h3>
              </div>
              <div className="scrollbar-thin flex-1 overflow-y-auto pr-1">
                <p className="whitespace-pre-line font-sans text-[15px] leading-relaxed text-foreground/90">
                  {email.body}
                </p>
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {email && !isGenerating && (
        <div className="mt-4 flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center">
          <span className="font-mono text-xs text-muted-foreground">
            {charCount.toLocaleString()} characters
          </span>
          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={onRegenerate}
              disabled={isGenerating}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerate
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy email"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground">
        <Mail className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="max-w-[26ch]">
        <p className="font-display text-base font-medium text-foreground">
          Your draft will appear here
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in a topic on the left and press Generate to write your first draft.
        </p>
      </div>
    </div>
  );
}

function EmailSkeleton() {
  return (
    <div
      className="flex flex-1 flex-col gap-4 pr-14"
      role="status"
      aria-label="Generating your email"
    >
      <div className="space-y-2 border-b border-dashed border-border pb-4">
        <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
      </div>
      <div className="space-y-3">
        {[100, 92, 96, 60, 88, 84, 40].map((width, i) => (
          <div
            key={i}
            className="h-3 animate-pulse rounded bg-muted"
            style={{ width: `${width}%`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
      <span className="sr-only">Generating your email, please wait…</span>
    </div>
  );
}
