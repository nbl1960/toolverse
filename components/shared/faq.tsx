"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FaqProps {
  items: FaqItem[];
  title?: string;
  className?: string;
}

/**
 * Accessible FAQ accordion. Any tool can opt in just by supplying a `faq`
 * array on its registry entry — `ToolPageShell` renders this component
 * automatically, so the markup is written once, not per tool.
 */
export function Faq({ items, title = "Frequently asked questions", className }: FaqProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className={cn("mt-16", className)}>
      <h2 id="faq-heading" className="font-display text-xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-button-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <div key={item.question}>
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  {item.question}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground"
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
