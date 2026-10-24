import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const palettes = {
  light: {
    grid: "stroke-border",
    axis: "stroke-muted",
    text: "fill-muted",
    strong: "fill-ink",
    bar: "fill-ink-soft",
    band: "fill-surface-muted",
    median: "stroke-ink",
    tail: "stroke-graphic",
  },
  dark: {
    grid: "stroke-white/10",
    axis: "stroke-on-dark-muted",
    text: "fill-on-dark-muted",
    strong: "fill-on-dark",
    bar: "fill-silver/70",
    band: "fill-white/5",
    median: "stroke-white",
    tail: "stroke-on-dark-muted",
  },
};

const X0 = 48;
const X1 = 536;
const Y0 = 32;
const Y1 = 208;
const MIN = 40;
const MAX = 80;
const BINS = 32;
const MEAN = 60.8;
const SD = 4.6;

const bins = Array.from({ length: BINS }, (_, i) => {
  const center = MIN + ((i + 0.5) / BINS) * (MAX - MIN);
  return Math.exp(-((center - MEAN) ** 2) / (2 * SD ** 2));
});
const peak = Math.max(...bins);
const vx = (v) => X0 + ((v - MIN) / (MAX - MIN)) * (X1 - X0);
const P5 = MEAN - 1.645 * SD;
const P95 = MEAN + 1.645 * SD;

export function MonteCarloChart({ tone = "light", compact = false, className }) {
  const p = palettes[tone];
  const height = compact ? 248 : 272;
  const barW = (X1 - X0) / BINS;

  return (
    <svg viewBox={`0 0 560 ${height}`} className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      <rect
        x={vx(P5)}
        y={Y0}
        width={vx(P95) - vx(P5)}
        height={Y1 - Y0}
        className={cn(p.band, "animate-fade-in", play)}
        style={{ animationDelay: "900ms" }}
      />

      {bins.map((b, i) => {
        const h = (b / peak) * (Y1 - Y0 - 24);
        return (
          <rect
            key={i}
            x={X0 + i * barW + 1}
            y={Y1 - h}
            width={barW - 2}
            height={h}
            className={cn(p.bar, "origin-bottom animate-fade-up [transform-box:fill-box]", play)}
            style={{ animationDelay: `${i * 28}ms` }}
          />
        );
      })}

      <line x1={X0} x2={X1} y1={Y1} y2={Y1} className={p.axis} strokeWidth="1" />

      {[
        { v: P5, label: "P5", cls: p.tail, dash: "4 3" },
        { v: MEAN, label: "P50", cls: p.median, dash: undefined },
        { v: P95, label: "P95", cls: p.tail, dash: "4 3" },
      ].map((line, i) => (
        <g key={line.label} className={cn("animate-fade-in", play)} style={{ animationDelay: `${1100 + i * 160}ms` }}>
          <line
            x1={vx(line.v)}
            x2={vx(line.v)}
            y1={Y0 - 8}
            y2={Y1}
            className={line.cls}
            strokeWidth={line.label === "P50" ? 2 : 1.5}
            strokeDasharray={line.dash}
          />
          <text
            x={vx(line.v)}
            y={Y0 - 14}
            textAnchor="middle"
            fontSize="10"
            letterSpacing="1"
            className={cn("font-mono", line.label === "P50" ? p.strong : p.text)}
          >
            {line.label}
          </text>
        </g>
      ))}

      <g className="font-mono" fontSize="10">
        {[40, 50, 60, 70, 80].map((v) => (
          <text key={v} x={vx(v)} y={Y1 + 18} textAnchor="middle" className={p.text}>
            {v}
          </text>
        ))}
        <text x={X1} y={Y1 + 36} textAnchor="end" className={p.text} letterSpacing="1">
          VELOCIDADE NO IMPACTO (km/h)
        </text>
        {!compact && (
          <text x={X0} y={Y1 + 36} className={p.strong} letterSpacing="1">
            INTERVALO CENTRAL DE 90%
          </text>
        )}
      </g>
    </svg>
  );
}
