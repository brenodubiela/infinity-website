"use client";

import { useMemo, useState } from "react";
import { Check, Component, Copy, Eye, FileCode, Layers, Search } from "lucide-react";
import { cn } from "@/utils/cn";

export function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="overflow-hidden rounded-md bg-surface-deep">
      <div className="flex items-center justify-between border-b border-white/10 px-2 py-1">
        <span className="flex items-center gap-1 font-mono text-xs text-on-dark-muted">
          <FileCode aria-hidden="true" className="size-2" strokeWidth={1.5} />
          JSX
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-0.5 font-mono text-xs text-on-dark-muted transition-colors hover:text-on-dark"
        >
          {copied ? <Check aria-hidden="true" className="size-2" /> : <Copy aria-hidden="true" className="size-2" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto p-2 font-mono text-xs text-silver">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function LibraryComponentItem({ name, description, preview, code, dark = false }) {
  return (
    <article className="overflow-hidden rounded-md border border-border bg-canvas">
      <header className="flex items-start justify-between gap-2 border-b border-border p-2">
        <div>
          <h3 className="text-base font-semibold">{name}</h3>
          {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
        </div>
        <Eye aria-hidden="true" className="mt-0.5 size-2 shrink-0 text-graphic" strokeWidth={1.5} />
      </header>
      <div
        data-tone={dark ? "dark" : "light"}
        className={cn("p-3", dark ? "bg-surface-dark text-on-dark" : "bg-surface-muted/60")}
      >
        {preview}
      </div>
      {code && (
        <div className="border-t border-border p-2">
          <CodeBlock code={code} />
        </div>
      )}
    </article>
  );
}

export function LibraryShell({ project, version, categories }) {
  const [active, setActive] = useState(categories[0].id);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => categories.filter((category) => category.label.toLowerCase().includes(query.trim().toLowerCase())),
    [categories, query],
  );
  const current = categories.find((category) => category.id === active) ?? categories[0];

  return (
    <>
    <div aria-hidden="true" className="h-10 bg-surface-dark" />
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[288px_1fr]">
      <aside className="border-b border-border bg-surface-muted lg:sticky lg:top-10 lg:flex lg:h-[calc(100dvh-80px)] lg:flex-col lg:border-r lg:border-b-0">
        <div className="border-b border-border p-3">
          <p className="flex items-center gap-1 text-lg font-semibold">
            <Layers aria-hidden="true" className="size-2.5 text-primary" strokeWidth={1.5} />
            {project}
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted uppercase">Design System Library</p>
          <label className="relative mt-2 block">
            <span className="sr-only">Buscar categoria</span>
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1.5 size-2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar..."
              className="h-5 w-full rounded-md border border-border bg-canvas pr-1.5 pl-4 text-sm focus:border-ink focus:outline-none"
            />
          </label>
        </div>
        <nav aria-label="Categorias" className="flex-1 overflow-y-auto p-1.5">
          <ul className="flex gap-0.5 overflow-x-auto lg:flex-col">
            {filtered.map((category) => (
              <li key={category.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(category.id)}
                  aria-current={active === category.id ? "true" : undefined}
                  className={cn(
                    "flex h-5 w-full items-center gap-1 rounded-md border-l-2 px-1.5 text-left text-sm transition-colors",
                    active === category.id
                      ? "border-primary bg-canvas font-medium text-ink"
                      : "border-transparent text-muted hover:bg-canvas hover:text-ink",
                  )}
                >
                  <Component aria-hidden="true" className="size-2 shrink-0" strokeWidth={1.5} />
                  {category.label}
                </button>
              </li>
            ))}
            {filtered.length === 0 && <li className="px-1.5 py-1 text-sm text-muted">Nenhuma categoria encontrada.</li>}
          </ul>
        </nav>
        <p className="hidden border-t border-border p-3 font-mono text-xs text-muted lg:block">{version}</p>
      </aside>

      <section aria-label="Componentes" className="min-w-0 p-2 sm:p-4 lg:p-6">
        <p className="font-mono text-label text-primary uppercase">{current.label}</p>
        <h1 className="mt-1 text-3xl font-semibold">{current.title}</h1>
        {current.description && <p className="mt-2 max-w-text text-base text-muted">{current.description}</p>}
        <div className="mt-5 grid gap-3">
          {current.items.length ? (
            current.items.map((item) => <LibraryComponentItem key={item.name} {...item} />)
          ) : (
            <div className="rounded-md border border-dashed border-border p-6 text-center">
              <p className="font-medium">Nenhum componente cadastrado nesta categoria ainda.</p>
              <p className="mt-1 text-sm text-muted">Os primitivos serão injetados aqui conforme a biblioteca evolui.</p>
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
}
