import Link from "next/link";

const brandName = "PatternKit";

const benefits = [
  "Mapas mentales por patrón",
  "Implementaciones paso a paso",
  "Visualizaciones guiadas de estructuras",
  "Casos reales y analogías claras",
  "Mini-retos para fijar conceptos",
];

const learningPaths = [
  {
    title: "Patrones de Diseño",
    description:
      "De Singleton a Observer, explicado como si estuviéramos aprendiendo juntos y viendo el porqué de cada paso.",
    cta: "Explorar patrones",
    href: "/patterns",
  },
  {
    title: "Estructuras de Datos",
    description:
      "Árboles AVL, grafos, colas y más con visuales animados y código sin drama, desde el primer nodo.",
    cta: "Dominar estructuras",
    href: "/data-structures",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,238,255,0.8),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-size-[200px_200px] opacity-60" />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-16 sm:px-10 lg:px-16">
        {/* Hero */}
        <section id="hero" className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-medium leading-tight text-slate-950 sm:text-6xl">
                {brandName}
              </h1>
              <p className="text-lg text-slate-600">
                Tu playground para patrones de diseño + estructuras de datos. Aprende con ejemplos reales, visuales sin rollo y hacks que puedes usar al instante.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                href="/patterns"
              >
                Explorar patrones
              </Link>
              <Link
                className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
                href="/data-structures"
              >
                Ver estructuras
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Playbook</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ruta editorial</h2>
                <p className="text-sm text-slate-500">
                  Micro-lecciones diseñadas para que entiendas el concepto, lo pruebes y lo cuentes como si fuera tuyo.
                </p>
              </div>
              <ul className="space-y-3 text-sm">
                {benefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-700"
                  >
                    <span className="h-2 w-2 rounded-full bg-slate-900" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ¿Qué aprenderás? */}
        <section id="learn" className="space-y-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              ¿Qué aprenderás?
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">Fundamentos sin vueltas.</h2>
            <p className="text-base text-slate-600">
              Historias visuales, retos mini y ejemplos cercanos para que cada patrón y estructura tenga contexto real, propósito y aplicación inmediata.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((item) => (
              <div
                key={`benefit-${item}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Rutas */}
        <section id="routes" className="space-y-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Dos rutas principales
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">Arma tu ruta.</h2>
            <p className="text-base text-slate-600">
              Currículas editoriales pensadas para aprender haciendo: patrones con historias útiles y estructuras con comparativas visuales para no perderte.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {learningPaths.map((path) => (
              <article
                key={path.title}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
                    Ruta
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">{path.title}</h3>
                  <p className="text-sm text-slate-600">
                    {path.description}
                  </p>
                </div>
                <a
                  className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                  href={path.href}
                >
                  {path.cta}
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
