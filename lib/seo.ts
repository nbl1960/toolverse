import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site-config";

interface BuildMetadataOptions {
  /** Page title. The site name is appended automatically unless `raw` is true. */
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/tools/email-writer". */
  path: string;
  keywords?: string[];
  /** Open Graph content type. Defaults to "website". */
  type?: "website" | "article";
  /** If true, don't append " · SITE_NAME" to the title (used for the homepage). */
  raw?: boolean;
}

/**
 * Builds a consistent `Metadata` object (title, description, canonical URL,
 * Open Graph, Twitter card) for any page in the app. Every route calls this
 * from its own `generateMetadata`/`metadata` export instead of hand-rolling
 * tags, so SEO behavior stays uniform as the catalog grows to 100+ pages.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  raw = false,
}: BuildMetadataOptions): Metadata {
  const fullTitle = raw ? title : `${title} · ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords && keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
