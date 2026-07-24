import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { getCategoryBySlug } from "@/lib/categories";
import { resolveIcon } from "@/lib/icon-map";
import type { ToolDefinition } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: ToolDefinition;
  /** Show the category pill on the card. Defaults to true. */
  showCategory?: boolean;
  className?: string;
}

/**
 * The single card representation of a tool, used on the homepage, the
 * all-tools page, category pages, and the related-tools rail. Keeping one
 * implementation here means a visual tweak (spacing, hover state, badge)
 * only has to happen once no matter how many places render tools.
 */
export function ToolCard({ tool, showCategory = true, className }: ToolCardProps) {
  const category = getCategoryBySlug(tool.category);
  const Icon = resolveIcon(tool.iconName);
  const isLive = tool.status === "live";

  const cardBody = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/50 bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </span>
        {isLive ? (
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            aria-hidden="true"
          />
        ) : (
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            <Clock className="h-3 w-3" aria-hidden="true" />
            Coming soon
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-display text-base font-semibold leading-snug text-foreground">
          {tool.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{tool.tagline}</p>
      </div>

      {showCategory && category && (
        <div className="mt-4">
          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
            {category.name}
          </span>
        </div>
      )}
    </>
  );

  const baseClasses = cn(
    "group flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-150",
    className
  );

  if (!isLive) {
    return (
      <div className={cn(baseClasses, "opacity-70")} aria-disabled="true">
        {cardBody}
      </div>
    );
  }

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        baseClasses,
        "hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {cardBody}
    </Link>
  );
}
