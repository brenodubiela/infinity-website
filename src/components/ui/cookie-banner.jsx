"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { buttonClasses } from "@/components/ui/button";
import { cookieBanner } from "@/data/legal-texts";
import { CONSENT_KEY, CONSENT_VERSION } from "@/lib/consent";
import { cn } from "@/utils/cn";

const OPEN_EVENT = "infinity:cookie-preferences";

const categories = [
  { id: "necessary", label: "Necessários", locked: true },
  { id: "analytics", label: "Análise de tráfego" },
  { id: "marketing", label: "Marketing" },
];

function readRaw() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) ?? "";
  } catch {
    return "";
  }
}

function parseConsent(raw) {
  try {
    return JSON.parse(raw || "null");
  } catch {
    return null;
  }
}

function readConsent() {
  return parseConsent(readRaw());
}

function subscribe(callback) {
  window.addEventListener("infinity:consent", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("infinity:consent", callback);
    window.removeEventListener("storage", callback);
  };
}

function saveConsent(consent) {
  const value = { ...consent, necessary: true, version: CONSENT_VERSION, updatedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {}
  window.dispatchEvent(new CustomEvent("infinity:consent", { detail: value }));
}

export function CookiePreferencesButton({ className }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {cookieBanner.preferences}
    </button>
  );
}

export function CookieBanner() {
  // No servidor o banner é renderizado (snapshot ""), para pintar junto com a página.
  const stored = useSyncExternalStore(subscribe, readRaw, () => "");
  const [forced, setForced] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [choices, setChoices] = useState({ analytics: false, marketing: false });
  const titleId = useId();
  const visible = forced || parseConsent(stored)?.version !== CONSENT_VERSION;

  useEffect(() => {
    const open = () => {
      const current = readConsent();
      if (current) setChoices({ analytics: !!current.analytics, marketing: !!current.marketing });
      delete document.documentElement.dataset.consent;
      setForced(true);
      setExpanded(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const acceptAll = () => {
    setChoices({ analytics: true, marketing: true });
    setForced(false);
    saveConsent({ analytics: true, marketing: true });
  };

  const rejectOptional = () => {
    setChoices({ analytics: false, marketing: false });
    setForced(false);
    saveConsent({ analytics: false, marketing: false });
  };

  const savePreferences = () => {
    setForced(false);
    saveConsent(choices);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          role="region"
          aria-labelledby={titleId}
          data-tone="dark"
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "cookie-banner fixed inset-x-0 bottom-0 z-50 p-1.5 sm:p-2",
            forced && "motion-safe:animate-[cookie-in_500ms_var(--ease-out-expo)_backwards]",
          )}
        >
          <div className="mx-auto max-w-site rounded-md border border-border-dark bg-surface-dark p-2 text-on-dark shadow-overlay sm:p-3">
            <h2 id={titleId} className="sr-only">
              {cookieBanner.preferences}
            </h2>
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              <p className="max-w-[760px] text-sm text-silver">
                {cookieBanner.text}{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="text-on-dark underline underline-offset-4 hover:text-primary-on-dark"
                >
                  {cookieBanner.linkLabel}
                </Link>
                .
              </p>
              <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`${titleId}-prefs`}
                  onClick={() => setExpanded((value) => !value)}
                  className={buttonClasses({ variant: "outline-light", size: "sm" })}
                >
                  {cookieBanner.preferences}
                </button>
                <button
                  type="button"
                  onClick={rejectOptional}
                  className={buttonClasses({ variant: "outline-light", size: "sm" })}
                >
                  {cookieBanner.rejectOptional}
                </button>
                <button type="button" onClick={acceptAll} className={buttonClasses({ variant: "primary", size: "sm" })}>
                  {cookieBanner.acceptAll}
                </button>
              </div>
            </div>

            {expanded && (
              <div id={`${titleId}-prefs`} className="mt-2 border-t border-border-dark pt-2">
                <fieldset>
                  <legend className="font-mono text-label text-on-dark-muted uppercase">{cookieBanner.preferences}</legend>
                  <ul className="mt-1.5 grid gap-1 sm:grid-cols-3">
                    {categories.map((category) => {
                      const checked = category.locked ? true : choices[category.id];
                      return (
                        <li key={category.id}>
                          <label
                            className={cn(
                              "flex h-6 items-center justify-between gap-2 rounded-md border border-border-dark px-1.5 text-sm",
                              category.locked ? "text-on-dark-muted" : "cursor-pointer text-on-dark",
                            )}
                          >
                            <span>{category.label}</span>
                            <input
                              type="checkbox"
                              role="switch"
                              checked={checked}
                              disabled={category.locked}
                              onChange={(event) =>
                                setChoices((value) => ({ ...value, [category.id]: event.target.checked }))
                              }
                              className="relative h-3 w-5 shrink-0 cursor-pointer appearance-none rounded-full bg-border-dark transition-colors before:absolute before:top-0.5 before:left-0.5 before:size-2 before:rounded-full before:bg-on-dark-muted before:transition-transform checked:bg-primary-on-dark checked:before:translate-x-2 checked:before:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                            />
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </fieldset>
                <div className="mt-2 flex justify-end">
                  <button type="button" onClick={savePreferences} className={buttonClasses({ variant: "primary", size: "sm" })}>
                    Salvar preferências
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
