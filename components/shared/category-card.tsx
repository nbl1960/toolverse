import Link from "next/link";
import type { Category } from "@/lib/types";
import { getToolsByCategory } from "@/lib/tools-registry";
import { resolveIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

/** Card representing one category on the homepage and the categories index. */
export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = resolveIcon(category.iconName);
  const tools = getToolsByCategory(category.slug);
  const liveCount = tools.filter((tool) => tool.status === "live").length;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-150",
        "hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass/40 bg-accent text-accent-foreground transition-colors group-hover:border-brass">
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-display text-base font-semibold text-foreground">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
      </div>
      <p className="mt-auto font-mono text-xs text-brass">
        {liveCount > 0
          ? `${liveCount} tool${liveCount === 1 ? "" : "s"} live`
          : `${tools.length} tool${tools.length === 1 ? "" : "s"} coming soon`}
      </p>
    </Link>
  );
}
