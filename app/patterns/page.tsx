import type { Metadata } from "next";
import Link from "next/link";

import { DocsShell, type DocsSidebarSection } from "@/components/layouts/docs-shell";
import { getPatternSummaries } from "@/lib/patterns";

export const metadata: Metadata = {
  title: "Patrones de Diseño · PatternKit",
  description:
    "Explora todas las rutas de patrones con introducciones, diagramas y ejemplos multi-lenguaje.",
};

export default async function PatternsIndex() {
  const patterns = await getPatternSummaries();
  const sidebar: DocsSidebarSection[] = [
    {
      title: "Introducción",
      items: [{ label: "¿Por qué patrones?", href: "#intro" }],
    },
    {
      title: "Catálogo",
      items: patterns.map((pattern) => ({
        label: pattern.frontmatter.title,
        href: `/patterns/${pattern.slug}`,
      })),
    },
  ];

  return (
    <DocsShell
      title="Patrones de Diseño"
      subtitle="Rutas editoriales, diagramas y snippets multi-lenguaje."
      searchPlaceholder="Buscar patrón…"
      sidebar={sidebar}
    >
      <section
        id="intro"
        className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-slate-950">Introducción a los patrones</h2>
          <p className="text-base text-slate-600">
            Los patrones ayudan a comunicar soluciones probadas: ponen nombre a arquitecturas
            comunes, permiten discutir trade-offs y acelerar revisiones de código. Aquí verás
            diagramas UML, analogías visuales y código en múltiples lenguajes para que el
            aprendizaje sea tangible.
          </p>
          <p className="text-base text-slate-600">
            Cada patrón incluye: contexto del problema, razones para existir, ejemplos reales,
            ventajas/desventajas y un mini-quiz para validar conceptos.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-slate-950">Catálogo completo</h3>
          <p className="text-sm text-slate-500">{patterns.length} patrones disponibles</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {patterns.map((pattern) => (
            <article
              key={pattern.slug}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                  {pattern.frontmatter.category}
                </div>
                <h4 className="text-xl font-semibold text-slate-900">
                  {pattern.frontmatter.title}
                </h4>
                <p className="text-sm text-slate-600">{pattern.frontmatter.summary}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  Nivel {pattern.frontmatter.level}
                </span>
                {pattern.frontmatter.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                href={`/patterns/${pattern.slug}`}
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
