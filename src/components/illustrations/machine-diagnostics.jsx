import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const palettes = {
  light: {
    line: "stroke-ink",
    soft: "stroke-ink-soft",
    faint: "stroke-signature-line",
    grid: "stroke-border",
    axis: "stroke-muted",
    text: "fill-muted",
    strong: "fill-ink",
    bar: "fill-ink-soft",
    surface: "fill-canvas",
    accent: "stroke-primary",
    accentFill: "fill-primary",
  },
  dark: {
    line: "stroke-white",
    soft: "stroke-silver",
    faint: "stroke-white/20",
    grid: "stroke-white/10",
    axis: "stroke-on-dark-muted",
    text: "fill-on-dark-muted",
    strong: "fill-on-dark",
    bar: "fill-silver/70",
    surface: "fill-surface-dark",
    accent: "stroke-primary-on-dark",
    accentFill: "fill-primary-on-dark",
  },
};

const WAVE = Array.from({ length: 64 }, (_, i) => {
  const t = i / 63;
  const v = Math.sin(t * Math.PI * 10) * 18 + Math.sin(t * Math.PI * 34) * 7 + Math.sin(t * Math.PI * 3) * 4;
  return `${(40 + t * 248).toFixed(1)},${(306 - v).toFixed(1)}`;
}).join(" ");

const SPECTRUM = [8, 14, 46, 12, 9, 22, 7, 88, 18, 10, 30, 8, 6, 16, 5, 11, 7, 4];
const CRITICAL = 7;

const sensors = [
  { id: "P1", x: 172, y: 92 },
  { id: "P2", x: 258, y: 72 },
  { id: "P3", x: 382, y: 72, critical: true },
  { id: "P4", x: 468, y: 86 },
];

export function MachineDiagnostics({ tone = "light", className }) {
  const p = palettes[tone];
  const draw = (delay, duration = 1400, extra) => ({
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
        <rect x="40" y="84" width="140" height="84" rx="6" {...draw(0, 1100)} />
        <path d="M60 84 V168 M80 84 V168 M100 84 V168 M120 84 V168 M140 84 V168 M160 84 V168" {...draw(300, 900, p.faint)} />
        <path d="M180 126 H206 M228 126 H244" {...draw(500, 600)} />
        <rect x="206" y="112" width="22" height="28" rx="3" {...draw(600, 500)} />
        <rect x="244" y="64" width="150" height="124" rx="6" {...draw(700, 1200)} />
        <circle cx="300" cy="126" r="38" {...draw(1000, 1000, p.soft)} />
        <circle cx="300" cy="126" r="30" strokeDasharray="4 4" className={p.faint} />
        <circle cx="358" cy="126" r="22" {...draw(1100, 900, p.soft)} />
        <circle cx="358" cy="126" r="16" strokeDasharray="3 3" className={p.faint} />
        <path d="M394 126 H420 M442 126 H452" {...draw(1300, 500)} />
        <rect x="420" y="112" width="22" height="28" rx="3" {...draw(1350, 400)} />
        <circle cx="500" cy="126" r="48" {...draw(1400, 1100)} />
        <path d="M500 78 V48 H560 V40 M548 126 H600" {...draw(1700, 700)} />
        <path d="M24 196 H616" {...draw(200, 1400, p.soft)} />
        <path d="M24 196 l8 8 M56 196 l8 8 M88 196 l8 8 M120 196 l8 8 M584 196 l8 8 M552 196 l8 8" className={p.faint} />
      </g>

      <g className="font-mono" fontSize="10" letterSpacing="1">
        <text x="110" y="186" textAnchor="middle" {...fade(900, p.text)}>MOTOR</text>
        <text x="319" y="206" textAnchor="middle" {...fade(1200, p.text)}>REDUTOR</text>
        <text x="500" y="206" textAnchor="middle" {...fade(1600, p.text)}>BOMBA</text>
      </g>

      {sensors.map((sensor, i) => (
        <g key={sensor.id} {...fade(1600 + i * 180)}>
          <path d={`M ${sensor.x} ${sensor.y} V ${sensor.y - 26}`} strokeWidth="1" className={sensor.critical ? p.accent : p.axis} />
          {sensor.critical && (
            <circle
              cx={sensor.x}
              cy={sensor.y}
              r="6"
              fill="none"
              strokeWidth="1.5"
              className={cn(p.accent, "origin-center animate-ping-soft [transform-box:fill-box]")}
            />
          )}
          <circle cx={sensor.x} cy={sensor.y} r="5" strokeWidth="1.5" className={cn(p.surface, sensor.critical ? p.accent : p.line)} />
          <text
            x={sensor.x}
            y={sensor.y - 32}
            textAnchor="middle"
            fontSize="10"
            letterSpacing="1"
            className={cn("font-mono", sensor.critical ? p.accentFill : p.strong)}
          >
            {sensor.id}
          </text>
        </g>
      ))}

      <g className="font-mono" fontSize="10" letterSpacing="1">
        <text x="40" y="250" {...fade(1800, p.strong)}>VIBRAÇÃO · P3</text>
        <text x="352" y="250" {...fade(1800, p.strong)}>ESPECTRO</text>
        <text x="600" y="384" textAnchor="end" {...fade(2000, p.text)}>FREQUÊNCIA (Hz)</text>
        <text x="288" y="384" textAnchor="end" {...fade(2000, p.text)}>TEMPO (s)</text>
      </g>

      <g strokeWidth="1">
        <path d="M40 306 H288" className={p.grid} />
        <path d="M40 262 V350 H288" fill="none" className={p.axis} />
        <path d="M352 262 V360 H600" fill="none" className={p.axis} />
        <path d="M352 290 H600" strokeDasharray="4 3" className={p.faint} />
      </g>

      <polyline points={WAVE} fill="none" strokeWidth="2" strokeLinejoin="round" {...draw(1900, 1800, p.line)} />
      <line x1="40" x2="40" y1="262" y2="350" strokeWidth="1" className={cn(p.accent, "motion-reduce:hidden")}>
        <animate attributeName="x1" values="40;288" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="40;288" dur="4s" repeatCount="indefinite" />
      </line>

      {SPECTRUM.map((value, i) => {
        const h = (value / 100) * 92;
        const critical = i === CRITICAL;
        return (
          <rect
            key={i}
            x={360 + i * 13.4}
            y={360 - h}
            width="8"
            height={h}
            className={cn(
              critical ? p.accentFill : p.bar,
              "origin-bottom animate-fade-up [transform-box:fill-box]",
              play,
            )}
            style={{ animationDelay: `${2000 + i * 50}ms` }}
          />
        );
      })}
      <g {...fade(2700)}>
        <path d={`M ${364 + CRITICAL * 13.4} 272 V 262 H 470`} fill="none" strokeWidth="1" className={p.accent} />
        <text x="476" y="266" fontSize="10" letterSpacing="1" className={cn("font-mono", p.accentFill)}>
          PICO CRÍTICO
        </text>
      </g>
    </svg>
  );
}
