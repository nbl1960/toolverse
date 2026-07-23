import { getRelatedTools } from "@/lib/tools-registry";
import type { ToolDefinition } from "@/lib/types";
import { ToolCard } from "@/components/shared/tool-card";

interface RelatedToolsProps {
  tool: ToolDefinition;
  limit?: number;
}

/** "You might also like" rail shown at the bottom of every tool page. */
export function RelatedTools({ tool, limit = 3 }: RelatedToolsProps) {
  const related = getRelatedTools(tool, limit);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-tools-heading" className="mt-16">
      <h2
        id="related-tools-heading"
        className="font-display text-xl font-semibold text-foreground"
      >
        Related tools
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((relatedTool) => (
          <ToolCard key={relatedTool.slug} tool={relatedTool} />
        ))}
      </div>
    </section>
  );
}
