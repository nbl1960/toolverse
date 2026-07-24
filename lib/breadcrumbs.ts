import { getCategoryBySlug } from "./categories";
import type { BreadcrumbItem, ToolDefinition } from "./types";

/**
 * Builds the Category → Tool breadcrumb trail for a tool page. Shared by
 * `ToolPageShell` (visible breadcrumbs) and the tool page's JSON-LD so the
 * two never drift out of sync.
 */
export function buildToolBreadcrumbs(tool: ToolDefinition): BreadcrumbItem[] {
  const category = getCategoryBySlug(tool.category);
  return [
    ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
    { label: tool.name },
  ];
}
