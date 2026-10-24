import { useId } from "react";
import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const palettes = {
  dark: {
    road: "stroke-white/25",
    lane: "stroke-white/15",
    a: "stroke-white",
    aFill: "fill-white",
    b: "stroke-silver",
    ghost: "stroke-white/50",
    label: "fill-on-dark-muted",
    strong: "fill-on-dark",
    impact: "stroke-primary-on-dark",
    impactFill: "fill-primary-on-dark",
    scale: "fill-white/70",
  },
  light: {
    road: "stroke-signature-line",
    lane: "stroke-border",
    a: "stroke-ink",
    aFill: "fill-ink",
    b: "stroke-ink-soft",
    ghost: "stroke-ink/40",
    label: "fill-muted",
    strong: "fill-ink",
    impact: "stroke-primary",
    impactFill: "fill-primary",
    scale: "fill-ink/70",
  },
};

const A_PRE = "M 24 304 L 340 304";
const A_POST = "M 340 304 C 392 312, 452 352, 492 412";
const B_PRE = "M 356 16 L 356 288";
const B_POST = "M 356 288 C 404 290, 470 300, 540 336";

function CarA({ x, y, rotate = 0, className, style }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} className={className} style={style}>
      <rect x="-22" y="-10" width="44" height="20" rx="4" fill="none" strokeWidth="1.5" />
      <path d="M 8 -8 L 8 8 M -12 -8 L -12 8" fill="none" strokeWidth="1" />
    </g>
  );
}

function CarB({ x, y, rotate = 0, className, style }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} className={className} style={style}>
      <rect x="-10" y="-22" width="20" height="44" rx="4" fill="none" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M -8 8 L 8 8 M -8 -12 L 8 -12" fill="none" strokeWidth="1" />
    </g>
  );
}

export function ReconstructionScene({ tone = "dark", className, motionPath = true }) {
  const id = useId().replace(/:/g, "");
  const p = palettes[tone];
  const fade = (delay, extra) => ({
    className: cn("animate-fade-in", play, extra),
    style: { animationDelay: `${delay}ms` },
  });
  const draw = (delay, duration = 1400) => ({
    pathLength: 1,
    className: cn("draw-path animate-draw", play),
    style: { animationDelay: `${delay}ms`, animationDuration: `${duration}ms` },
  });

  return (
    <svg
      viewBox="0 0 640 520"
      className={cn("h-auto w-full overflow-visible", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id={`mb-pre-${id}`} maskUnits="userSpaceOnUse">
          <path d={B_PRE} fill="none" stroke="white" strokeWidth="6" {...draw(500, 1300)} />
        </mask>
        <mask id={`mb-post-${id}`} maskUnits="userSpaceOnUse">
          <path d={B_POST} fill="none" stroke="white" strokeWidth="6" {...draw(2100, 1200)} />
        </mask>
      </defs>

      <g fill="none" strokeWidth="1" {...fade(0)}>
        <path className={p.road} d="M 0 232 H 332 M 428 232 H 640 M 0 328 H 332 M 428 328 H 640" />
        <path className={p.road} d="M 332 0 V 232 M 428 0 V 232 M 332 328 V 520 M 428 328 V 520" />
        <path
          className={p.lane}
          strokeDasharray="12 10"
          d="M 0 280 H 332 M 428 280 H 640 M 380 0 V 232 M 380 328 V 520"
        />
        <path className={p.lane} d="M 340 236 V 324 M 346 236 V 324 M 352 236 V 324 M 412 236 V 324 M 418 236 V 324" />
      </g>

      <g strokeWidth="1.5" className={p.ghost}>
        <CarA x={84} y={304} {...fade(700)} />
        <CarA x={184} y={304} {...fade(950)} />
        <CarA x={284} y={304} {...fade(1200)} />
        <CarB x={356} y={64} {...fade(800)} />
        <CarB x={356} y={140} {...fade(1050)} />
        <CarB x={356} y={210} {...fade(1300)} />
      </g>

      <g fill="none" strokeWidth="2" strokeLinecap="round">
        <path d={A_PRE} className={cn(p.a, "draw-path animate-draw", play)} pathLength={1} style={{ animationDelay: "400ms", animationDuration: "1400ms" }} />
        <path d={B_PRE} className={p.b} strokeDasharray="8 6" mask={`url(#mb-pre-${id})`} />
        <path d={A_POST} className={cn(p.a, "draw-path animate-draw", play)} pathLength={1} style={{ animationDelay: "2000ms", animationDuration: "1300ms" }} />
        <path d={B_POST} className={p.b} strokeDasharray="8 6" mask={`url(#mb-post-${id})`} />
      </g>

      <g className={p.a}>
        <CarA x={492} y={412} rotate={58} {...fade(3100)} />
      </g>
      <g className={p.b}>
        <CarB x={540} y={336} rotate={-64} {...fade(3200)} />
      </g>

      <g {...fade(1800)}>
        <circle cx="348" cy="296" r="6" className={p.impactFill} />
        <circle
          cx="348"
          cy="296"
          r="6"
          fill="none"
          strokeWidth="1.5"
          className={cn(p.impact, "origin-center animate-ping-soft [transform-box:fill-box]")}
        />
        <path d="M 348 276 V 286 M 348 306 V 316 M 328 296 H 338 M 358 296 H 368" className={p.impact} strokeWidth="1.5" />
        <path d="M 356 288 L 452 200 H 600" fill="none" className={p.impact} strokeWidth="1" />
      </g>

      {motionPath && (
        <g className="motion-reduce:hidden">
          <circle r="4" className={p.aFill}>
            <animateMotion dur="6s" repeatCount="indefinite" path={`${A_PRE} ${A_POST.replace("M 340 304", "")}`} />
          </circle>
        </g>
      )}

      <g className="font-mono" fontSize="11" letterSpacing="1.2">
        <text x="460" y="192" {...fade(2000, p.strong)}>
          PONTO DE IMPACTO
        </text>
        <text x="24" y="216" {...fade(600, p.label)}>
          PRÉ-IMPACTO
        </text>
        <text x="24" y="356" {...fade(800, p.strong)}>
          VEÍCULO A
        </text>
        <text x="320" y="24" textAnchor="end" {...fade(900, p.strong)}>
          VEÍCULO B
        </text>
        <text x="516" y="468" {...fade(3300, p.label)}>
          PÓS-IMPACTO
        </text>
      </g>

      <g {...fade(1000)}>
        <g transform="translate(32 476)">
          <rect x="0" y="0" width="40" height="6" className={p.aFill} />
          <rect x="40" y="0" width="40" height="6" fill="none" strokeWidth="1" className={p.a} />
          <g className={cn("font-mono", p.scale)} fontSize="10">
            <text x="0" y="22" textAnchor="middle">0</text>
            <text x="40" y="22" textAnchor="middle">5</text>
            <text x="80" y="22" textAnchor="middle">10 m</text>
          </g>
        </g>
        <g transform="translate(600 40)" className={p.a} fill="none" strokeWidth="1.5">
          <path d="M 0 16 L 0 -12 M -6 -4 L 0 -12 L 6 -4" />
          <text x="0" y="32" textAnchor="middle" fontSize="11" stroke="none" className={cn("font-mono", p.strong)}>
            N
          </text>
        </g>
      </g>
    </svg>
  );
}
