"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const ease = [0.16, 1, 0.3, 1];
const noopSubscribe = () => () => {};

export function MobileMenu(props) {
  const pathname = usePathname();
  return <MobileMenuView {...props} pathname={pathname} />;
}

export function MobileMenuView({ items, menus, cta, email, pathname = "" }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState(null);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const close = () => {
    setOpen(false);
    setSection(null);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      delete root.dataset.menu;
      root.style.overflow = "";
      return;
    }
    root.dataset.menu = "open";
    root.style.overflow = "hidden";
    requestAnimationFrame(() => panelRef.current?.querySelector("a")?.focus());

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = [buttonRef.current, ...panelRef.current.querySelectorAll("a, button")].filter(
        (element) => element.offsetParent !== null,
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      delete root.dataset.menu;
      root.style.overflow = "";
    };
  }, [open]);

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-mobile"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-tone="dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-30 overflow-y-auto bg-surface-dark bg-grid-dark pt-12 pb-6 text-on-dark lg:hidden"
        >
          <nav aria-label="Menu principal" className="px-2 sm:px-3">
            <ul className="border-t border-border-dark">
              {items.map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const menu = item.mega ? menus[item.mega] : null;
                const expanded = section === item.mega;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease }}
                    className="border-b border-border-dark"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className="flex flex-1 items-center gap-2 py-2 text-2xl font-semibold"
                      >
                        <span className={cn("font-mono text-xs", active ? "text-primary-on-dark" : "text-on-dark-muted")}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                      {menu && (
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={`mobile-${item.mega}`}
                          aria-label={`${expanded ? "Recolher" : "Expandir"} ${item.label}`}
                          onClick={() => setSection((value) => (value === item.mega ? null : item.mega))}
                          className="flex size-6 items-center justify-center rounded-md border border-border-dark"
                        >
                          <ChevronDown
                            aria-hidden="true"
                            strokeWidth={1.75}
                            className={cn("size-2.5 transition-transform duration-300", expanded && "rotate-180")}
                          />
                        </button>
                      )}
                    </div>
                    {menu && (
                      <div id={`mobile-${item.mega}`} hidden={!expanded} className="pb-2">
                        <ul className="grid gap-0.5 sm:grid-cols-2">
                          {menu.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={close}
                                className="flex min-h-6 items-center gap-1 py-0.5 text-sm text-silver transition-colors hover:text-on-dark"
                              >
                                <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-2 shrink-0 text-primary-on-dark" />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <Link href={cta.href} onClick={close} className={buttonClasses({ className: "w-full" })}>
                {cta.label}
                <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-[20px]" />
              </Link>
              <a href={`mailto:${email}`} className="font-mono text-sm text-on-dark-muted">
                {email}
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => (open ? close() : setOpen(true))}
        className="relative flex h-6 items-center gap-1 rounded-md px-1.5 text-sm font-medium"
      >
        {open ? (
          <X aria-hidden="true" strokeWidth={1.75} className="size-3" />
        ) : (
          <Menu aria-hidden="true" strokeWidth={1.75} className="size-3" />
        )}
        <span>{open ? "Fechar" : "Menu"}</span>
      </button>
      {mounted && createPortal(panel, document.body)}
    </div>
  );
}
