import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const palettes = {
  light: {
    grid: "stroke-border",
    axis: "stroke-muted",
    text: "fill-muted",
    strong: "fill-ink",
    series: "stroke-ink",
    seriesFill: "fill-ink",
    secondary: "fill-ink-soft",
    track: "fill-surface-muted",
    accent: "stroke-primary",
    accentFill: "fill-primary",
  },
  dark: {
    grid: "stroke-white/10",
    axis: "stroke-on-dark-muted",
    text: "fill-on-dark-muted",
    strong: "fill-on-dark",
    series: "stroke-white",
    seriesFill: "fill-white",
    secondary: "fill-silver",
    track: "fill-white/5",
    accent: "stroke-primary-on-dark",
    accentFill: "fill-primary-on-dark",
  },
};

const speed = [72, 72, 73, 72, 71, 71, 69, 62, 55, 50, 47];
const throttle = [18, 18, 20, 18, 16, 15, 0, 0, 0, 0, 0];
const brakeFrom = 6;

const X0 = 64;
const X1 = 536;
const Y0 = 24;
const Y1 = 200;
const x = (i) => X0 + (i / (speed.length - 1)) * (X1 - X0);
const y = (v) => Y1 - (v / 100) * (Y1 - Y0);

export function EdrChart({ tone = "light", compact = false, className }) {
  const p = palettes[tone];
  const height = compact ? 236 : 360;
  const points = speed.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const fade = (delay) => ({ className: cn("animate-fade-in", play), style: { animationDelay: `${delay}ms` } });

  return (
    <svg
      viewBox={`0 0 560 ${height}`}
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g className="font-mono" fontSize="10">
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={X0} x2={X1} y1={y(v)} y2={y(v)} className={p.grid} strokeWidth="1" />
            <text x={X0 - 12} y={y(v) + 3} textAnchor="end" className={p.text}>
              {v}
            </text>
          </g>
        ))}
        {[-5, -4, -3, -2, -1, 0].map((t, i) => (
          <text key={t} x={X0 + i * ((X1 - X0) / 5)} y={Y1 + 18} textAnchor="middle" className={p.text}>
            {t === 0 ? "0,0" : `${t},0`}
          </text>
        ))}
        <text x={X0} y="12" className={p.strong} letterSpacing="1">
          VELOCIDADE (km/h)
        </text>
        <text x={X1} y={Y1 + 34} textAnchor="end" className={p.text} letterSpacing="1">
          TEMPO (s)
        </text>
      </g>

      <line x1={X0} x2={X0} y1={Y0} y2={Y1} className={p.axis} strokeWidth="1" />
      <line x1={X0} x2={X1} y1={Y1} y2={Y1} className={p.axis} strokeWidth="1" />

      <g {...fade(1600)}>
        <line x1={X1} x2={X1} y1={Y0 - 8} y2={compact ? Y1 : height - 16} className={p.accent} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={X1 - 8} y={Y0 + 4} textAnchor="end" fontSize="10" letterSpacing="1" className={cn("font-mono", p.accentFill)}>
          IMPACTO
        </text>
      </g>

      <polyline
        points={points}
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
        pathLength={1}
        className={cn(p.series, "draw-path animate-draw", play)}
        style={{ animationDuration: "1800ms", animationDelay: "200ms" }}
      />
      {speed.map((v, i) => (
        <rect
          key={i}
          x={x(i) - 3}
          y={y(v) - 3}
          width="6"
          height="6"
          className={cn(p.seriesFill, "animate-fade-in", play)}
          style={{ animationDelay: `${300 + i * 140}ms` }}
        />
      ))}

      {!compact && (
        <g className="font-mono" fontSize="10">
          <text x="0" y="252" className={p.strong} letterSpacing="1">
            FREIO
          </text>
          <rect x={X0} y="240" width={X1 - X0} height="16" className={p.track} />
          <rect
            x={x(brakeFrom)}
            y="240"
            width={X1 - x(brakeFrom)}
            height="16"
            className={cn(p.secondary, "origin-left animate-fade-in [transform-box:fill-box]", play)}
            style={{ animationDelay: "1300ms" }}
          />

          <text x="0" y="300" className={p.strong} letterSpacing="1">
            ACEL. (%)
          </text>
          <rect x={X0} y="276" width={X1 - X0} height="40" className={p.track} />
          {throttle.map((v, i) =>
            v > 0 ? (
              <rect
                key={i}
                x={x(i) - 10}
                y={316 - (v / 40) * 40}
                width="20"
                height={(v / 40) * 40}
                className={cn(p.secondary, "animate-fade-in", play)}
                style={{ animationDelay: `${500 + i * 120}ms` }}
              />
            ) : null,
          )}
        </g>
      )}
    </svg>
  );
}
