import Link from "next/link";
import type { ReactNode } from "react";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Patrones", href: "/patterns" },
  { label: "Estructuras", href: "/data-structures" },
];

export type DocsSidebarSection = {
  title: string;
  items: {
    label: string;
    href: string;
    active?: boolean;
  }[];
};

export type DocsShellProps = {
  title: string;
  subtitle: string;
  searchPlaceholder?: string;
  sidebar: DocsSidebarSection[];
  children: ReactNode;
};

export function DocsShell({
  title,
  subtitle,
  searchPlaceholder = "Buscar…",
  sidebar,
  children,
}: DocsShellProps) {
  const flatMobileNav = sidebar.flatMap((section) => section.items);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-6 py-6 sm:px-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  PatternKit
                </p>
                <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
                <p className="text-sm text-slate-500">{subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <nav className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      className="rounded-full px-3 py-1 transition hover:bg-slate-900/5 hover:text-slate-900"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <form className="w-full max-w-md" role="search">
              <label className="sr-only" htmlFor="docs-search">
                Buscar
              </label>
              <input
                id="docs-search"
                name="q"
                type="search"
                placeholder={searchPlaceholder}
                autoComplete="off"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              />
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-6 py-10 sm:px-10">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 space-y-8">
            {sidebar.map((section) => (
              <div key={section.title} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {section.title}
                </p>
                <ul className="space-y-1 text-sm text-slate-600">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <a
                        className={`flex items-center rounded-lg px-3 py-2 transition hover:bg-white ${
                          item.active
                            ? "border border-slate-300 bg-white text-slate-900 shadow-sm"
                            : "border border-transparent"
                        }`}
                        href={item.href}
                        aria-current={item.active ? "page" : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 space-y-10">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-3 text-xs text-slate-500 lg:hidden">
            <div className="flex flex-wrap gap-2">
              {flatMobileNav.map((item) => (
                <a key={`mobile-${item.href}`} className="rounded-full border border-slate-200 px-3 py-1" href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
