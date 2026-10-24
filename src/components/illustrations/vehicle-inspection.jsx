import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const palettes = {
  light: {
    line: "stroke-ink",
    soft: "stroke-ink-soft",
    faint: "stroke-signature-line",
    text: "fill-muted",
    strong: "fill-ink",
    surface: "fill-canvas",
    accent: "stroke-primary",
    accentFill: "fill-primary",
  },
  dark: {
    line: "stroke-white",
    soft: "stroke-silver",
    faint: "stroke-white/20",
    text: "fill-on-dark-muted",
    strong: "fill-on-dark",
    surface: "fill-surface-dark",
    accent: "stroke-primary-on-dark",
    accentFill: "fill-primary-on-dark",
  },
};

const points = [
  { n: "01", label: "CHASSI", x: 300, y: 222, lx: 300, ly: 330, anchor: "middle" },
  { n: "02", label: "MOTOR", x: 168, y: 200, lx: 72, ly: 330, anchor: "middle" },
  { n: "03", label: "CÂMBIO", x: 236, y: 200, lx: 196, ly: 330, anchor: "middle" },
  { n: "04", label: "VIDROS", x: 262, y: 150, lx: 262, ly: 60, anchor: "middle" },
  { n: "05", label: "PLACAS", x: 92, y: 200, lx: 40, ly: 120, anchor: "start" },
  { n: "06", label: "LONGARINAS", x: 420, y: 150, lx: 470, ly: 60, anchor: "middle", critical: true },
];

export function VehicleInspection({ tone = "light", className }) {
  const p = palettes[tone];
  const draw = (delay, duration = 1300, extra) => ({
    pathLength: 1,
    className: cn("draw-path animate-draw", play, extra),
    style: { animationDelay: `${delay}ms`, animationDuration: `${duration}ms` },
  });
  const fade = (delay, extra) => ({
    className: cn("animate-fade-in", play, extra),
    style: { animationDelay: `${delay}ms` },
  });

  return (
    <svg viewBox="0 0 640 400" className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      <g fill="none" strokeWidth="1.5" strokeLinejoin="round" className={p.line}>
        <path
          d="M80 160 C 80 132, 96 120, 132 116 L 470 112 C 520 112, 560 126, 568 160 L 568 240 C 560 274, 520 288, 470 288 L 132 284 C 96 280, 80 268, 80 240 Z"
          {...draw(0, 1800)}
        />
        <path d="M232 128 C 250 160, 250 240, 232 272 M392 126 C 410 160, 410 240, 392 274" {...draw(600, 1000, p.soft)} />
        <path d="M232 128 L 392 126 M232 272 L 392 274" {...draw(900, 800, p.soft)} />
        <path d="M112 150 V250 M540 150 V250" {...draw(1000, 700, p.faint)} />
        <path d="M150 196 H210 V204 H150 Z" {...draw(1100, 600, p.soft)} />
      </g>
      <g className={p.line} strokeWidth="1.5" fill="none">
        {[
          [130, 104],
          [130, 286],
          [470, 100],
          [470, 290],
        ].map(([cx, cy], i) => (
          <rect key={i} x={cx - 28} y={cy - 9} width="56" height="18" rx="6" {...draw(800 + i * 100, 500)} />
        ))}
      </g>
      <path d="M110 200 H560" strokeWidth="1" strokeDasharray="10 3 2 3" {...fade(400, p.faint)} />

      <line x1="80" x2="80" y1="96" y2="304" strokeWidth="1.5" className={cn(p.accent, "motion-reduce:hidden")} opacity="0.7">
        <animate attributeName="x1" values="80;568;80" dur="6s" repeatCount="indefinite" />
        <animate attributeName="x2" values="80;568;80" dur="6s" repeatCount="indefinite" />
      </line>

      {points.map((point, i) => (
        <g key={point.n} {...fade(1500 + i * 220)}>
          <path
            d={`M ${point.x} ${point.y} L ${point.lx} ${point.ly + (point.ly > point.y ? -14 : 6)}`}
            fill="none"
            strokeWidth="1"
            className={point.critical ? p.accent : p.soft}
          />
          {point.critical && (
            <circle
              cx={point.x}
              cy={point.y}
              r="7"
              fill="none"
              strokeWidth="1.5"
              className={cn(p.accent, "origin-center animate-ping-soft [transform-box:fill-box]")}
            />
          )}
          <circle cx={point.x} cy={point.y} r="6" strokeWidth="1.5" className={cn(p.surface, point.critical ? p.accent : p.line)} />
          <text
            x={point.lx}
            y={point.ly}
            textAnchor={point.anchor}
            fontSize="10"
            letterSpacing="1"
            className={cn("font-mono", point.critical ? p.accentFill : p.strong)}
          >
            <tspan className={point.critical ? p.accentFill : p.text}>{point.n} </tspan>
            {point.label}
          </text>
        </g>
      ))}

      <g className="font-mono" fontSize="10" letterSpacing="1" {...fade(2900, p.text)}>
        <text x="600" y="380" textAnchor="end">CLASSIFICAÇÃO DE DANOS · CONTRAN</text>
      </g>
    </svg>
  );
}
