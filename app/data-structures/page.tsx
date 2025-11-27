import type { Metadata } from "next";
import Link from "next/link";

import { DocsShell, type DocsSidebarSection } from "@/components/layouts/docs-shell";
import { getDataStructureSummaries } from "@/lib/data-structures";

export const metadata: Metadata = {
  title: "Estructuras de Datos · PatternKit",
  description:
    "Explora rutas editoriales de estructuras de datos con comparativas visuales, Big-O y ejemplos listos para usar.",
};

export default async function DataStructuresIndex() {
  const structures = await getDataStructureSummaries();

  const sidebar: DocsSidebarSection[] = [
    {
      title: "Introducción",
      items: [{ label: "¿Por qué estructuras?", href: "#intro" }],
    },
    {
      title: "Catálogo",
      items: structures.map((structure) => ({
        label: structure.frontmatter.title,
        href: `/data-structures/${structure.slug}`,
      })),
    },
  ];

  const formatOperation = (operation: string) =>
    operation.charAt(0).toUpperCase() + operation.slice(1);

  return (
    <DocsShell
      title="Estructuras de Datos"
      subtitle="Rutas interactivas, Big-O comparativo y snippets multi-lenguaje."
      searchPlaceholder="Buscar estructura…"
      sidebar={sidebar}
    >
      <section
        id="intro"
        className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-slate-950">Introducción a las estructuras</h2>
          <p className="text-base text-slate-600">
            Las estructuras son el plano de cómo viaja y vive tu información. Aquí las abordamos con
            historias, visuales stacked y comparativas para que elijas la ideal según tu reto.
          </p>
          <p className="text-base text-slate-600">
            Cada ruta incluye: contexto del problema, operaciones clave con su costo, snippets paso a paso y
            referencias para seguir explorando.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-slate-950">Catálogo base</h3>
          <p className="text-sm text-slate-500">{structures.length} estructuras disponibles</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {structures.map((structure) => (
            <article
              key={structure.slug}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                  {structure.frontmatter.type}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-semibold text-slate-900">
                    {structure.frontmatter.title}
                  </h4>
                  <p className="text-sm text-slate-600">{structure.frontmatter.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="rounded-full border border-slate-200 px-3 py-1">
                    Nivel {structure.frontmatter.level}
                  </span>
                  {structure.frontmatter.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                {structure.frontmatter.bigO && (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600">
                    <p className="mb-2 font-semibold text-slate-500">Big-O express</p>
                    <dl className="grid grid-cols-2 gap-2">
                      {Object.entries(structure.frontmatter.bigO).map(([operation, cost]) => (
                        <div key={`${structure.slug}-${operation}`}>
                          <dt className="text-[0.7rem] uppercase tracking-[0.3em] text-slate-400">
                            {formatOperation(operation)}
                          </dt>
                          <dd className="text-sm text-slate-700">{cost}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
              <Link
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                href={`/data-structures/${structure.slug}`}
              >
                Ver detalle
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </DocsShell>
  );
}
