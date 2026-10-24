"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export function SectionNav({ items, label }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="sticky top-10 z-30 border-b border-border bg-canvas/95 backdrop-blur-md transition-[top] duration-300 ease-out-expo [html[data-header=hidden]_&]:top-0"
    >
      <ul className="mx-auto flex max-w-site gap-3 overflow-x-auto px-2 [scrollbar-width:none] sm:px-3 lg:px-4 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "relative flex h-7 items-center text-sm font-medium whitespace-nowrap transition-colors",
                "after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:bg-primary after:transition-transform after:duration-300",
                active === item.id ? "text-ink after:scale-x-100" : "text-muted after:scale-x-0 hover:text-ink",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
