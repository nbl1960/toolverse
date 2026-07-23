"use client";

import * as React from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackSectionProps {
  toolName: string;
}

/**
 * "Was this helpful?" widget shown at the bottom of every live tool page.
 * Client-only affordance (no backend yet) — a positive response thanks the
 * user immediately, a negative one offers a short comment box. Wired
 * through `ToolPageShell` so every tool gets it for free.
 */
export function FeedbackSection({ toolName }: FeedbackSectionProps) {
  const [response, setResponse] = React.useState<"yes" | "no" | null>(null);
  const [comment, setComment] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleResponse(value: "yes" | "no") {
    setResponse(value);
    if (value === "yes") {
      toast.success("Thanks for letting us know!");
      setSubmitted(true);
    }
  }

  function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Thanks for the feedback — we'll use it to improve this tool.");
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="feedback-heading"
      className="mt-16 rounded-lg border border-border bg-card px-6 py-8 text-center"
    >
      <h2 id="feedback-heading" className="font-display text-lg font-semibold text-foreground">
        Was {toolName} helpful?
      </h2>

      {submitted ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Thanks for your feedback — it genuinely helps.
        </p>
      ) : (
        <>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button
              type="button"
              variant={response === "yes" ? "default" : "outline"}
              size="sm"
              onClick={() => handleResponse("yes")}
            >
              <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
              Yes
            </Button>
            <Button
              type="button"
              variant={response === "no" ? "default" : "outline"}
              size="sm"
              onClick={() => handleResponse("no")}
            >
              <ThumbsDown className="h-3.5 w-3.5" aria-hidden="true" />
              No
            </Button>
          </div>

          {response === "no" && (
            <form
              onSubmit={handleCommentSubmit}
              className="mx-auto mt-4 flex max-w-md flex-col gap-3"
            >
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What could we improve?"
                rows={3}
                aria-label="Feedback details"
              />
              <Button type="submit" size="sm" className="self-center">
                Send feedback
              </Button>
            </form>
          )}
        </>
      )}
    </section>
  );
}
