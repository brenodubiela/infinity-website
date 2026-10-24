"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Cpu, FileText, Handshake, Inbox, ScanSearch } from "lucide-react";
import { cn } from "@/utils/cn";

const icons = [Inbox, ScanSearch, Cpu, FileText, Handshake];

export function MethodSteps({ steps, label }) {
  const listRef = useRef(null);
  const [active, setActive] = useState(-1);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(value <= 0 ? -1 : Math.min(steps.length - 1, Math.floor(value * steps.length)));
  });

  return (
    <ol ref={listRef} aria-label={label} className="relative">
      <span aria-hidden="true" className="absolute top-3 bottom-3 left-[23px] w-px bg-border-dark" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: scrollYProgress }}
        className="absolute top-3 bottom-3 left-[23px] w-px origin-top bg-primary-on-dark"
      />
      {steps.map((step, i) => {
        const Icon = icons[i] ?? Inbox;
        const reached = i <= active;
        return (
          <li key={step.title} className="relative grid grid-cols-[48px_1fr] gap-3 pb-4 last:pb-0">
            <span
              className={cn(
                "relative z-10 flex size-6 items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-500 ease-out-expo",
                reached
                  ? "scale-110 border-primary-on-dark bg-primary-on-dark text-white"
                  : "border-border-dark bg-surface-dark text-on-dark",
              )}
            >
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-2.5" />
            </span>
            <div
              className={cn(
                "rounded-md border p-3 transition-[border-color,background-color] duration-500",
                reached ? "border-white/25 bg-white/[0.04]" : "border-border-dark",
              )}
            >
              <p className={cn("font-mono text-label", reached ? "text-primary-on-dark" : "text-on-dark-muted")}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-on-dark">{step.title}</h3>
              <p className="mt-1.5 text-base text-on-dark-muted">{step.content}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
