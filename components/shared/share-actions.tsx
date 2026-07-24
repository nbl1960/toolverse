"use client";

import * as React from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

interface ShareActionsProps {
  /** Used as the shared title (Web Share API) and as a fallback toast label. */
  title: string;
  /** Plain-text summary copied to the clipboard / included in the share sheet. */
  text: string;
  className?: string;
}

/**
 * Share + Copy Results, in one place. Uses the native Web Share API where
 * available (mobile browsers, most desktop browsers) and falls back to
 * copying a link. Any tool with shareable output can drop this in instead
 * of re-implementing clipboard/share logic per tool.
 */
export function ShareActions({ title, text, className }: ShareActionsProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.href });
      } catch {
        // User cancelled the native share sheet — nothing to do.
      }
      return;
    }

    const success = await copyToClipboard(window.location.href);
    if (success) {
      toast.success("Link copied to clipboard.");
    } else {
      toast.error("Couldn't share or copy the link.");
    }
  }

  async function handleCopy() {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      toast.success("Results copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Couldn't copy results.");
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
          Share
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy results"}
        </Button>
      </div>
    </div>
  );
}
