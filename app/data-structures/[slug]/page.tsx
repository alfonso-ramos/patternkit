import { DocsShell, type DocsSidebarSection } from "@/components/layouts/docs-shell";
import {
  getDataStructureBySlug,
  getDataStructureSlugs,
  getDataStructureSummaries,
} from "@/lib/data-structures";

type DataStructurePageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getDataStructureSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function DataStructurePage({ params }: DataStructurePageProps) {
  const { slug } = await params;
  const [structure, summaries] = await Promise.all([
    getDataStructureBySlug(slug),
    getDataStructureSummaries(),
  ]);
  const { frontmatter, content } = structure;

  const sidebar: DocsSidebarSection[] = [
    {
      title: "Introducción",
      items: [{ label: "Volver al índice", href: "/data-structures#intro" }],
    },
    {
      title: "Catálogo",
      items: summaries.map((item) => ({
        label: item.frontmatter.title,
        href: `/data-structures/${item.slug}`,
        active: item.slug === slug,
      })),
    },
  ];

  return (
    <DocsShell
      title={frontmatter.title}
      subtitle={frontmatter.summary}
      searchPlaceholder="Buscar estructura…"
      sidebar={sidebar}
    >
      <section
        id="data-structure-content"
        className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
      >
        <div className="space-y-6">
          <div className="inline-flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 px-3 py-1 uppercase tracking-[0.3em]">
              {frontmatter.type}
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
          {frontmatter.bigO && (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600">
              <p className="mb-2 font-semibold text-slate-500">Big-O express</p>
              <dl className="grid gap-3 sm:grid-cols-2">
                {Object.entries(frontmatter.bigO).map(([operation, cost]) => (
                  <div key={`${slug}-${operation}`}>
                    <dt className="text-[0.7rem] uppercase tracking-[0.3em] text-slate-400">
                      {operation}
                    </dt>
                    <dd className="text-sm text-slate-700">{cost}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <article className="space-y-8">{content}</article>
        </div>
      </section>

      {frontmatter.references && frontmatter.references.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Referencias</p>
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
