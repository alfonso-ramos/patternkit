"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CodeTab = {
  lang: string;
  label?: string;
  code: string;
};

type PatternCodeTabsProps = {
  samples: CodeTab[];
};

export function PatternCodeTabs({ samples }: PatternCodeTabsProps) {
  const normalizedSamples = useMemo(() => samples, [samples]);
  const [active, setActive] = useState(() => normalizedSamples[0]?.lang ?? "");
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<NodeJS.Timeout | null>(null);
  const [highlighted, setHighlighted] = useState<Record<string, string>>({});
  const hasSamples = normalizedSamples.length > 0;

  const activeSample =
    normalizedSamples.find((sample) => sample.lang === active) ?? normalizedSamples[0];

  useEffect(() => {
    if (!hasSamples) return;
    let mounted = true;
    async function loadHighlight() {
      const { codeToHtml } = await import("shiki");
      const entries = await Promise.all(
        normalizedSamples.map(async (sample) => {
          try {
            const html = await codeToHtml(sample.code, {
              lang: sample.lang,
              theme: "github-dark",
            });
            return [sample.lang, html] as const;
          } catch {
            return [sample.lang, sample.code] as const;
          }
        }),
      );
      if (mounted) {
        setHighlighted(Object.fromEntries(entries));
      }
    }
    loadHighlight();
    return () => {
      mounted = false;
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
        copyTimeout.current = null;
      }
    };
  }, [hasSamples, normalizedSamples]);

  const handleCopy = () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(activeSample.code).then(() => {
      setCopied(true);
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopied(false), 1500);
    });
  };

  if (!hasSamples) return null;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
        {normalizedSamples.map((sample) => {
          const isActive = sample.lang === active;
          return (
            <button
              key={sample.lang}
              type="button"
              onClick={() => setActive(sample.lang)}
              className={`rounded-full border px-3 py-1 transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              {sample.label ?? sample.lang.toUpperCase()}
            </button>
          );
        })}
      </div>
      <figure className="space-y-3 rounded-xl border border-slate-900/10 bg-slate-950 p-4 text-slate-50">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
          <figcaption>{activeSample.label ?? activeSample.lang.toUpperCase()}</figcaption>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-slate-700 px-3 py-1 text-[10px] font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <div
          className="prose prose-invert max-w-none text-sm leading-relaxed [&_pre]:m-0 [&_pre]:overflow-auto"
          dangerouslySetInnerHTML={{
            __html: highlighted[activeSample.lang] ?? `<pre><code>${activeSample.code}</code></pre>`,
          }}
        />
      </figure>
    </div>
  );
}
