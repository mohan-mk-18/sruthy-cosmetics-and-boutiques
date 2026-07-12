/**
 * Renders a JSON-LD <script> tag from a schema object built in /lib/schema.ts.
 * Server component — safe to render directly inside any page or the root layout.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
