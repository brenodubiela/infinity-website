"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  ChartColumn,
  ChevronDown,
  Cpu,
  Globe,
  Infinity as InfinityIcon,
  ListChecks,
  UsersRound,
  Video,
  Workflow,
} from "lucide-react";
import { TextLink } from "@/components/ui/text-link";
import { ServiceIcon } from "@/components/ui/service-icon";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/utils/cn";

const linkIcons = {
  origin: InfinityIcon,
  specialist: BadgeCheck,
  international: Globe,
  process: Workflow,
  structure: UsersRound,
  edr: Cpu,
  reconstruction: Box,
  montecarlo: ChartColumn,
  video: Video,
  method: ListChecks,
};

const noopSubscribe = () => () => {};

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MegaLink({ link, onNavigate }) {
  const Icon = link.icon ? linkIcons[link.icon] : null;
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="group/mega flex items-start gap-1.5 rounded-md p-1.5 transition-colors duration-200 hover:bg-surface-muted focus-visible:bg-surface-muted"
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-md border border-border bg-canvas text-ink transition-colors duration-200 group-hover/mega:border-primary group-hover/mega:bg-primary group-hover/mega:text-white">
        {link.service ? (
          <ServiceIcon name={link.service} className="size-[18px]" />
        ) : (
          Icon && <Icon aria-hidden="true" strokeWidth={1.5} className="size-[18px]" />
        )}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-0.5 text-sm font-semibold text-ink">
          {link.label}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.75}
            className="size-[14px] -translate-x-0.5 text-primary opacity-0 transition-[opacity,transform] duration-200 group-hover/mega:translate-x-0 group-hover/mega:opacity-100"
          />
        </span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-[16px] text-muted">{link.description}</span>
      </span>
    </Link>
  );
}

function MegaPanel({ id, menu, open, onNavigate, labelledBy }) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      className={cn(
        "absolute inset-x-0 top-full border-y border-border bg-canvas text-ink shadow-overlay transition-[opacity,transform,visibility] duration-300 ease-out-expo",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
      )}
    >
      <div className="mx-auto grid max-w-site grid-cols-12 gap-4 px-4 py-5">
        <div className="col-span-3 flex flex-col">
          <p className="flex items-center gap-1.5 font-mono text-label text-muted uppercase">
            <span aria-hidden="true" className="h-px w-3 bg-primary" />
            {menu.eyebrow}
          </p>
          <p className="mt-2 text-xl font-semibold text-ink">{menu.title}</p>
          <Link
            href={menu.cta.href}
            onClick={onNavigate}
            className={buttonClasses({ size: "sm", className: "mt-auto self-start" })}
          >
            {menu.cta.label}
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-[18px]" />
          </Link>
        </div>

        <ul
          className={cn(
            "grid content-start gap-0.5 border-x border-border px-3",
            menu.columns === 2 ? "col-span-6 grid-cols-2" : "col-span-5 grid-cols-1",
          )}
        >
          {menu.links.map((link) => (
            <li key={link.href}>
              <MegaLink link={link} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>

        <figure
          className={cn(
            "group/fig relative min-h-[280px] overflow-hidden rounded-md bg-surface-dark",
            menu.columns === 2 ? "col-span-3" : "col-span-4",
          )}
        >
          <Image
            src={menu.image.src}
            alt=""
            fill
            quality={90}
            sizes="(min-width: 1024px) 960px, 1px"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover/fig:scale-105"
          />
        </figure>
      </div>
    </div>
  );
}

export function DesktopNav(props) {
  const pathname = usePathname();
  return <DesktopNavView {...props} pathname={pathname} />;
}

export function DesktopNavView({ items, menus, pathname = "" }) {
  const [open, setOpen] = useState(null);
  const navRef = useRef(null);
  const triggerRefs = useRef({});
  const closeTimer = useRef(0);
  const openTimer = useRef(0);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const clearTimers = () => {
    clearTimeout(closeTimer.current);
    clearTimeout(openTimer.current);
  };

  const close = useCallback(() => {
    clearTimers();
    setOpen(null);
  }, []);

  const openWithIntent = (key) => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(key), open ? 0 : 120);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        triggerRefs.current[open]?.focus();
        close();
      }
    };
    const onPointer = (event) => {
      if (!navRef.current?.contains(event.target)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  useEffect(() => () => clearTimers(), []);

  return (
    <nav
      ref={navRef}
      aria-label="Principal"
      data-mega-open={open ? "true" : "false"}
      className="hidden lg:block"
      onMouseLeave={scheduleClose}
      onMouseEnter={() => clearTimeout(closeTimer.current)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <ul className="flex items-center gap-3 xl:gap-4">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          if (!item.mega) {
            return (
              <li key={item.href} onMouseEnter={scheduleClose}>
                <TextLink href={item.href} active={active}>
                  {item.label}
                </TextLink>
              </li>
            );
          }
          const expanded = open === item.mega;
          return (
            <li key={item.href}>
              <button
                ref={(node) => {
                  triggerRefs.current[item.mega] = node;
                }}
                id={`mega-trigger-${item.mega}`}
                type="button"
                aria-expanded={expanded}
                aria-controls={`mega-${item.mega}`}
                onClick={() => {
                  clearTimers();
                  setOpen((value) => (value === item.mega ? null : item.mega));
                }}
                onMouseEnter={() => openWithIntent(item.mega)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setOpen(item.mega);
                    requestAnimationFrame(() =>
                      document.getElementById(`mega-${item.mega}`)?.querySelector("a")?.focus(),
                    );
                  }
                }}
                className={cn(
                  "relative inline-flex h-6 items-center gap-0.5 text-sm font-medium transition-colors duration-200",
                  "after:absolute after:inset-x-0 after:bottom-1 after:h-[2px] after:origin-left after:bg-[var(--nav-accent,var(--color-primary))] after:transition-transform after:duration-300 after:ease-out-expo",
                  active || expanded ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {item.label}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={cn("size-[16px] transition-transform duration-300 ease-out-expo", expanded && "rotate-180")}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {items
        .filter((item) => item.mega)
        .map((item) => (
          <MegaPanel
            key={item.mega}
            id={`mega-${item.mega}`}
            labelledBy={`mega-trigger-${item.mega}`}
            menu={menus[item.mega]}
            open={open === item.mega}
            onNavigate={close}
          />
        ))}

      {mounted &&
        createPortal(
          <div
            aria-hidden="true"
            onClick={close}
            className={cn(
              "fixed inset-0 z-30 hidden bg-surface-dark/40 transition-opacity duration-300 lg:block",
              open ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          />,
          document.body,
        )}
    </nav>
  );
}
