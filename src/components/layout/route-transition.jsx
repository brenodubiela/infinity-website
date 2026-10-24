"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SYMBOL_PATH } from "@/components/ui/logo";

const COVER_MS = 450;
const REVEAL_MS = 650;
const MAX_WAIT_MS = 4000;

export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle");
  const [cycle, setCycle] = useState(0);
  const origin = useRef(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const reveal = useCallback(() => {
    clearTimers();
    delete document.documentElement.dataset.route;
    setPhase("reveal");
    timers.current.push(
      setTimeout(() => {
        setPhase("idle");
        origin.current = null;
      }, REVEAL_MS),
    );
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname.startsWith("/api/")) return;
      if (url.pathname === window.location.pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      if (origin.current) return;

      origin.current = window.location.pathname;
      document.documentElement.dataset.route = "busy";
      setCycle((value) => value + 1);
      setPhase("cover");
      timers.current.push(
        setTimeout(() => {
          setPhase("hold");
          router.push(`${url.pathname}${url.search}${url.hash}`);
        }, COVER_MS),
        setTimeout(reveal, MAX_WAIT_MS),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, reveal]);

  useEffect(() => {
    if (!origin.current || pathname === origin.current) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(reveal);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, reveal]);

  useEffect(() => () => clearTimers(), []);

  return (
    <div aria-hidden="true" className="route-curtain" data-phase={phase}>
      <div key={cycle} className="route-curtain__inner">
        <svg viewBox="0 0 136 56" className="route-curtain__symbol" focusable="false">
          <path d={SYMBOL_PATH} pathLength={1} />
        </svg>
        <span className="route-curtain__bar" />
      </div>
    </div>
  );
}
