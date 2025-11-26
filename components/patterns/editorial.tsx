import type { ReactNode } from "react";

type BadgeTone = "neutral" | "primary" | "accent";

type Badge = {
  label: string;
  tone?: BadgeTone;
};

type PatternIntroProps = {
  title: string;
  category: string;
  level: string;
  summary: string;
  problem: string;
  badges?: Badge[];
  cta?: {
    label: string;
    href: string;
  };
};

type PatternNarrativeSectionProps = {
  label: string;
  title: string;
  body: string;
  bullets?: string[];
  aside?: ReactNode;
};

type PatternDualListProps = {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
  footnote?: string;
};

const badgeToneClass: Record<BadgeTone, string> = {
  neutral: "border-slate-200 bg-white text-slate-600",
  primary: "border-indigo-200 bg-indigo-50 text-indigo-600",
  accent: "border-emerald-200 bg-emerald-50 text-emerald-600",
};

export function PatternIntro({
  title,
  category,
  level,
  summary,
  problem,
  badges = [],
  cta,
}: PatternIntroProps) {
  const normalizedBadges: Badge[] = badges.length
    ? badges
    : [
        { label: category, tone: "primary" },
        { label: `Nivel ${level}`, tone: "neutral" },
      ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap gap-2">
        {normalizedBadges.map(({ label, tone = "neutral" }) => (
          <span
            key={label}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${badgeToneClass[tone]}`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h1>
        <p className="text-base text-slate-600">{summary}</p>
      </div>
      <div className="mt-8 grid gap-6 rounded-2xl border border-slate-100 bg-slate-50/60 p-6 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Qué problema resuelve
          </p>
          <p className="mt-2 text-sm text-slate-700">{problem}</p>
        </div>
        {cta && (
          <a
            className="self-start rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white"
            href={cta.href}
          >
            {cta.label} →
          </a>
        )}
      </div>
    </section>
  );
}

export function PatternNarrativeSection({
  label,
  title,
  body,
  bullets,
  aside,
}: PatternNarrativeSectionProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-100 bg-white/70 p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          {label}
        </p>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{body}</p>
      </div>
      {bullets && bullets.length > 0 && (
        <ul className="list-disc space-y-1 pl-4 text-sm text-slate-600">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {aside && <div className="text-xs text-slate-500">{aside}</div>}
    </section>
  );
}

export function PatternDualList({
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
  footnote,
}: PatternDualListProps) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white/90 p-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <PatternListColumn title={leftTitle} items={leftItems} />
        <PatternListColumn title={rightTitle} items={rightItems} variant="right" />
      </div>
      {footnote && <p className="mt-4 text-xs text-slate-500">{footnote}</p>}
    </section>
  );
}

type PatternListColumnProps = {
  title: string;
  items: string[];
  variant?: "left" | "right";
};

function PatternListColumn({ title, items, variant = "left" }: PatternListColumnProps) {
  const accent = variant === "left" ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50";

  return (
    <div className="space-y-3">
      <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold text-slate-700 ${accent}`}>
        {title}
      </p>
      <ul className="space-y-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item} className="rounded-xl border border-slate-100 bg-white/70 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PatternEditorialExample() {
  return (
    <div className="space-y-6">
      <PatternIntro
        title="Singleton"
        category="Creacional"
        level="básico"
        summary="Garantiza una única instancia global y provee una forma controlada de acceder a ella."
        problem="Cuando múltiples componentes intentan crear sus propias instancias, se duplican recursos y se rompen invariantes compartidos."
        cta={{ label: "Ver ejemplos", href: "/patrones/singleton#ejemplos" }}
      />
      <PatternNarrativeSection
        label="Por qué existe"
        title="Coordinación centralizada"
        body="Aparece cuando un recurso debe ser único — ya sea una conexión, un logger o un registro de configuración." 
        bullets={["Evita doble inicialización", "Ofrece punto de acceso controlado"]}
      />
      <PatternDualList
        leftTitle="Ventajas"
        leftItems={["Reduce consumo de memoria", "Simplifica orquestación"]}
        rightTitle="Desventajas"
        rightItems={["Aumenta acoplamiento", "Complica pruebas"]}
        footnote="Evalúa alternativas como inyección de dependencias antes de adoptarlo."
      />
    </div>
  );
}
