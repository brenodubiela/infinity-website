"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { MapPin } from "lucide-react";
import { cn } from "@/utils/cn";

function EventCard({ event, active, abroad }) {
  return (
    <div
      className={cn(
        "flex min-h-[176px] flex-col rounded-md border p-2 transition-[border-color,background-color] duration-500",
        active ? "border-white/40 bg-white/[0.04]" : "border-border-dark",
      )}
    >
      <h3 className="text-base font-semibold text-on-dark">{event.name}</h3>
      <p className="mt-auto flex items-center gap-1 pt-2 font-mono text-xs text-on-dark-muted">
        <MapPin aria-hidden="true" strokeWidth={1.5} className={cn("size-2", abroad ? "text-primary-on-dark" : "text-silver")} />
        {event.place}
      </p>
    </div>
  );
}

const SCROLL_RATIO = 0.65;

function HorizontalTimeline({ events, label, heading }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [overflow, setOverflow] = useState(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const x = useTransform(smooth, (value) => -value * overflow);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(events.length - 1, Math.max(0, Math.round(value * (events.length - 1)))));
  });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setOverflow(Math.max(0, track.scrollWidth - window.innerWidth + 64));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const current = events[active];

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100svh + ${Math.round(overflow * SCROLL_RATIO)}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-10">
        <div className="mx-auto grid w-full max-w-site grid-cols-12 items-end gap-4 px-4">
          <div className="col-span-8">{heading}</div>
          <div className="col-span-4 text-right" aria-hidden="true">
            <p className="font-mono text-[96px] leading-none text-on-dark tabular-nums">{current.year}</p>
            <p className="mt-1 font-mono text-label text-on-dark-muted uppercase">
              {String(active + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")} · {current.place}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-6 w-full max-w-site px-4">
          <div className="relative h-[2px] overflow-hidden rounded-full bg-border-dark">
            <motion.span style={{ scaleX: smooth }} className="absolute inset-0 origin-left bg-primary-on-dark" />
          </div>
        </div>

        <motion.ol ref={trackRef} aria-label={label} style={{ x }} className="mt-4 flex w-max gap-2 px-[max(32px,calc((100vw-1280px)/2+32px))]">
          {events.map((event, i) => {
            const abroad = event.place.includes("EUA");
            const isActive = i === active;
            return (
              <li key={`${event.year}-${event.name}-${event.place}`} className="w-[320px] shrink-0">
                <span
                  className={cn(
                    "font-mono text-2xl transition-colors duration-500",
                    isActive ? "text-on-dark" : "text-on-dark-muted/50",
                  )}
                >
                  {event.year}
                </span>
                <div className="relative my-2 h-px bg-border-dark">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full border-2 transition-transform duration-500",
                      abroad ? "border-primary-on-dark bg-surface-dark" : "border-silver bg-surface-dark",
                      isActive && "scale-150",
                    )}
                  />
                </div>
                <EventCard event={event} active={isActive} abroad={abroad} />
              </li>
            );
          })}
        </motion.ol>
      </div>
    </div>
  );
}

function VerticalTimeline({ events, label, heading }) {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });

  return (
    <div className="mx-auto w-full max-w-site px-2 py-10 sm:px-3">
      {heading}
      <div className="relative mt-6">
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-px bg-border-dark" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: scrollYProgress }}
          className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-primary-on-dark"
        />
        <ol ref={listRef} aria-label={label} className="flex flex-col gap-3">
          {events.map((event) => {
            const abroad = event.place.includes("EUA");
            return (
              <li key={`${event.year}-${event.name}-${event.place}`} className="relative pl-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1 left-0 size-2 rounded-full border-2 bg-surface-dark",
                    abroad ? "border-primary-on-dark" : "border-silver",
                  )}
                />
                <span className="font-mono text-xl text-on-dark">{event.year}</span>
                <div className="mt-1">
                  <EventCard event={event} abroad={abroad} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

const DESKTOP = "(min-width: 1024px)";

function subscribe(callback) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function Timeline(props) {
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false);
  return desktop ? <HorizontalTimeline {...props} /> : <VerticalTimeline {...props} />;
}
