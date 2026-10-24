"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

export function HeaderShell({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const menuOpen = document.documentElement.dataset.menu === "open";
        setScrolled(y > 16);
        if (!menuOpen && y > 480 && y > lastY.current + 4) {
          setHidden(true);
          document.documentElement.dataset.header = "hidden";
        } else if (y < lastY.current - 4 || y <= 480) {
          setHidden(false);
          document.documentElement.dataset.header = "shown";
        }
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      onFocusCapture={() => {
        setHidden(false);
        document.documentElement.dataset.header = "shown";
      }}
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "group/header fixed inset-x-0 top-0 z-40 transition-[transform,background-color,border-color,color] duration-300 ease-out-expo",
        "border-b text-on-dark [--logo-line:var(--color-muted)] [--logo-main:var(--color-white)] [--logo-sub:var(--color-silver)] [--nav-accent:var(--color-primary-on-dark)]",
        "has-[[data-mega-open=true]]:border-border has-[[data-mega-open=true]]:bg-canvas has-[[data-mega-open=true]]:text-ink has-[[data-mega-open=true]]:backdrop-blur-none has-[[data-mega-open=true]]:[--logo-line:var(--color-signature-line)] has-[[data-mega-open=true]]:[--logo-main:var(--color-ink)] has-[[data-mega-open=true]]:[--logo-sub:var(--color-muted)] has-[[data-mega-open=true]]:[--nav-accent:var(--color-primary)]",
        scrolled
          ? "border-border bg-canvas/95 text-ink backdrop-blur-md [--logo-line:var(--color-signature-line)] [--logo-main:var(--color-ink)] [--logo-sub:var(--color-muted)] [--nav-accent:var(--color-primary)]"
          : "border-transparent bg-transparent",
        hidden && "-translate-y-full",
      )}
    >
      {children}
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-primary" />
    </header>
  );
}
