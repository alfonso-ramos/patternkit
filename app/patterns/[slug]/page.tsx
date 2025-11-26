import { DocsShell, type DocsSidebarSection } from "@/components/layouts/docs-shell";
import { getPatternBySlug, getPatternSlugs, getPatternSummaries } from "@/lib/patterns";

type PatternPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getPatternSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PatternPage({ params }: PatternPageProps) {
  const { slug } = await params;
  const [pattern, summaries] = await Promise.all([
    getPatternBySlug(slug),
    getPatternSummaries(),
  ]);
  const { frontmatter, content } = pattern;
  const sidebar: DocsSidebarSection[] = [
    {
      title: "Introducción",
      items: [{ label: "Volver al índice", href: "/patterns#intro" }],
    },
    {
      title: "Catálogo",
      items: summaries.map((item) => ({
        label: item.frontmatter.title,
        href: `/patterns/${item.slug}`,
        active: item.slug === slug,
      })),
    },
  ];

  return (
    <DocsShell
      title={frontmatter.title}
      subtitle={frontmatter.summary}
      searchPlaceholder="Buscar patrón…"
      sidebar={sidebar}
    >
      <section
        id="pattern-content"
        className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
      >
        <div className="space-y-4">
          <div className="inline-flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 px-3 py-1 uppercase tracking-[0.3em]">
              {frontmatter.category}
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1">
              Nivel {frontmatter.level}
            </span>
            {frontmatter.tags?.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
          <article className="space-y-8">{content}</article>
        </div>
      </section>

      {frontmatter.references && frontmatter.references.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Referencias
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-600">
            {frontmatter.references.map((ref) => (
              <li key={ref.url}>
                <a className="text-slate-900 underline-offset-2 hover:underline" href={ref.url}>
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </DocsShell>
  );
}
