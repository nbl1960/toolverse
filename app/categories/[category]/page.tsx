import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ToolCard } from "@/components/shared/tool-card";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import { getToolsByCategory } from "@/lib/tools-registry";
import { resolveIcon } from "@/lib/icon-map";
import { buildMetadata } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return buildMetadata({
      title: "Category not found",
      description: "This category could not be found.",
      path: `/categories/${slug}`,
    });
  }

  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.slug);
  const Icon = resolveIcon(category.iconName);

  return (
    <div className="container py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Categories", href: "/categories" }, { label: category.name }]} />

      <div className="mt-6 flex items-center gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brass bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {category.name}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground sm:text-base">
            {category.description}
          </p>
        </div>
      </div>

      <div className="mt-8">
        {tools.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border bg-card px-6 py-16 text-center text-sm text-muted-foreground">
            No tools in this category yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} showCategory={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
