import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getAllTools, getToolBySlug } from "@/lib/tools-registry";
import { getToolComponentLoader } from "@/lib/tool-components";
import { buildToolBreadcrumbs } from "@/lib/breadcrumbs";
import { ToolPageShell } from "@/components/layout/tool-page-shell";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildToolJsonLd } from "@/lib/structured-data";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-renders one static page per registry entry at build time. Adding
 * tool #101 to `TOOLS` is enough for it to show up here automatically —
 * no new route file, no new page component.
 */
export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return buildMetadata({
      title: "Tool not found",
      description: "This tool could not be found.",
      path: `/tools/${slug}`,
    });
  }

  return buildMetadata({
    title: tool.name,
    description: tool.description,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const breadcrumbItems = buildToolBreadcrumbs(tool);

  const loader = getToolComponentLoader(tool.slug);
  const ToolComponent = loader
    ? dynamic(loader, { loading: () => <ToolLoadingFallback /> })
    : null;

  return (
    <>
      <JsonLd data={buildToolJsonLd(tool)} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />
      {tool.faq && tool.faq.length > 0 && <JsonLd data={buildFaqJsonLd(tool.faq)} />}
      <ToolPageShell tool={tool}>{ToolComponent ? <ToolComponent /> : null}</ToolPageShell>
    </>
  );
}

function ToolLoadingFallback() {
  return (
    <div
      className="h-[420px] animate-pulse rounded-lg border border-border bg-card"
      role="status"
      aria-label="Loading tool"
    />
  );
}
