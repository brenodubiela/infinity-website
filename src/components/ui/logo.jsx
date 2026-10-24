import { altTexts } from "@/data/site";
import { cn } from "@/utils/cn";

export const SYMBOL_PATH =
  "M42.4,8.8 A24,24 0 1 0 42.4,47.2 L93.6,8.8 A24,24 0 1 1 93.6,47.2 Z";

const tones = {
  dark: "[--logo-main:var(--color-ink)] [--logo-line:var(--color-signature-line)] [--logo-sub:var(--color-muted)]",
  light:
    "[--logo-main:var(--color-white)] [--logo-line:var(--color-muted)] [--logo-sub:var(--color-silver)]",
  inherit: "",
};

const sansStyle = { fontFamily: "var(--font-plex-sans), 'Helvetica Neue', Arial, sans-serif" };
const monoStyle = { fontFamily: "var(--font-plex-mono), 'Courier New', monospace" };

export function Symbol({ className, title, tone = "inherit", strokeClassName }) {
  return (
    <svg
      viewBox="0 0 136 56"
      className={cn(tones[tone], className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path
        d={SYMBOL_PATH}
        fill="none"
        strokeWidth="8"
        className={cn("stroke-[var(--logo-main,currentColor)]", strokeClassName)}
      />
    </svg>
  );
}

export function Logo({ variant = "horizontal", tone = "dark", className, label = altTexts.logo }) {
  const reduced = variant === "reduzida";

  return (
    <svg
      viewBox="0 0 360 64"
      className={cn(tones[tone], "block h-auto", className)}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g transform="translate(0,4)">
        <path
          d={SYMBOL_PATH}
          fill="none"
          strokeWidth="8"
          className="stroke-[var(--logo-main)] transition-[stroke] duration-200"
        />
      </g>
      <line
        x1="168"
        x2="168"
        y1={reduced ? 15.25 : 8}
        y2={reduced ? 48.75 : 56}
        strokeWidth="1"
        className="stroke-[var(--logo-line)] transition-[stroke] duration-200"
      />
      <text
        x="200"
        y={reduced ? 48.75 : 38}
        fontSize="48"
        fontWeight="600"
        letterSpacing="-0.5"
        style={sansStyle}
        className="fill-[var(--logo-main)] transition-[fill] duration-200"
      >
        Infinity
      </text>
      {!reduced && (
        <text
          x="201.75"
          y="58"
          fontSize="9"
          letterSpacing="2.575"
          style={monoStyle}
          className="fill-[var(--logo-sub)] transition-[fill] duration-200"
        >
          ENGENHARIA E PERÍCIAS
        </text>
      )}
    </svg>
  );
}

export function Seal({ className, label }) {
  return (
    <svg
      viewBox="0 0 176 176"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect width="176" height="176" rx="16" className="fill-ink" />
      <g transform="translate(20,60)">
        <path d={SYMBOL_PATH} fill="none" strokeWidth="8" className="stroke-white" />
      </g>
    </svg>
  );
}
