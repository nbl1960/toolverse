/**
 * Renders a JSON-LD `<script>` tag for structured data. This is the shared
 * "SEO component": any page can drop in `<JsonLd data={buildXJsonLd(...)} />`
 * to get rich-result markup without duplicating the `<script>` boilerplate.
 *
 * Server component by design — structured data belongs in the initial HTML,
 * not injected client-side.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD must be inlined as raw JSON
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
