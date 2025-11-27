const primaryLinks: { label: string; href: string }[] = [];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/alfonso-ramos" },
  { label: "Twitter", href: "https://x.com/PonchoRamosDev" },
  { label: "YouTube", href: "https://www.youtube.com/@PonchoRamosDev" },
];

const toneStyles = {
  soft: {
    wrapper: "border-t border-slate-200 bg-white/80 text-slate-500 backdrop-blur",
    brand: "text-slate-900",
    link: "hover:text-slate-900",
  },
  contrast: {
    wrapper: "border-t border-slate-900/20 bg-slate-950/80 text-slate-300 backdrop-blur",
    brand: "text-white",
    link: "hover:text-white",
  },
};

export type SiteFooterTone = keyof typeof toneStyles;

export function SiteFooter({ tone = "soft" }: { tone?: SiteFooterTone }) {
  const styles = toneStyles[tone];

  return (
    <footer className={styles.wrapper}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <p className={`text-base font-semibold ${styles.brand}`}>PatternKit</p>
          <p>Comunidad de aprendizaje de patrones y estructuras.</p>
        </div>
        <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:gap-8">
          <div className="flex flex-wrap gap-4">
            {primaryLinks.map((link) => (
              <a key={link.href} className={`${styles.link} transition`} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em]">
            {socialLinks.map((link) => (
              <a key={link.href} className={`${styles.link} transition`} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
