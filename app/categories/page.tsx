import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CategoryCard } from "@/components/shared/category-card";
import { CATEGORIES } from "@/lib/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Categories",
  description: "Browse the ToolVerse catalog by category.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <div className="container py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Categories" }]} />
      <div className="mt-4">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Categories
        </h1>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground sm:text-base">
          Every tool in ToolVerse belongs to one of these {CATEGORIES.length} categories.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
