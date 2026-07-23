"use client";

import * as React from "react";
import { Eraser, Feather, Loader2, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ToneSelector } from "@/components/tools/email-writer/tone-selector";
import { LengthSelector } from "@/components/tools/email-writer/length-selector";
import { EmailOutput } from "@/components/tools/email-writer/email-output";
import { useEmailGenerator } from "@/hooks/tools/email-writer/use-email-generator";
import { MAX_TOPIC_LENGTH } from "@/lib/tools/email-writer/constants";
import { countCharacters } from "@/lib/utils";

export function EmailWriter() {
  const { values, errors, email, isGenerating, setField, generate, regenerate, clear } =
    useEmailGenerator();

  const topicCount = countCharacters(values.topic);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void generate();
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,480px)_minmax(0,1fr)]">
      {/* Compose pane */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-7"
        noValidate
      >
        <div>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="topic">What&apos;s the email about?</Label>
            <span
              className="font-mono text-[11px] text-muted-foreground"
              aria-live="polite"
            >
              {topicCount}/{MAX_TOPIC_LENGTH}
            </span>
          </div>
          <Textarea
            id="topic"
            placeholder="e.g. Asking my manager for two days off next week to attend a family wedding"
            value={values.topic}
            onChange={(e) => setField("topic", e.target.value)}
            maxLength={MAX_TOPIC_LENGTH}
            rows={4}
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? "topic-error" : undefined}
            className="mt-2"
          />
          {errors.topic && (
            <p id="topic-error" className="mt-1.5 text-xs text-destructive">
              {errors.topic}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="recipientName">Recipient</Label>
            <div className="relative mt-2">
              <Users
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="recipientName"
                placeholder="Jordan"
                value={values.recipientName}
                onChange={(e) => setField("recipientName", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="senderName">Your name</Label>
            <div className="relative mt-2">
              <User
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="senderName"
                placeholder="Alex"
                value={values.senderName}
                onChange={(e) => setField("senderName", e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label>Tone</Label>
          <div className="mt-2">
            <ToneSelector value={values.tone} onChange={(tone) => setField("tone", tone)} />
          </div>
        </div>

        <div>
          <Label>Length</Label>
          <div className="mt-2">
            <LengthSelector
              value={values.length}
              onChange={(length) => setField("length", length)}
            />
          </div>
        </div>

        <div className="mt-1 flex flex-col-reverse gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={clear}
            disabled={isGenerating}
            className="sm:flex-none"
          >
            <Eraser className="h-4 w-4" />
            Clear
          </Button>
          <Button type="submit" disabled={isGenerating} className="flex-1">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Writing your email…
              </>
            ) : (
              <>
                <Feather className="h-4 w-4" />
                Generate email
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Output pane */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <EmailOutput
          email={email}
          tone={values.tone}
          isGenerating={isGenerating}
          onRegenerate={regenerate}
        />
      </div>
    </div>
  );
}
