import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const palettes = {
  light: {
    frame: "stroke-ink",
    frameBg: "fill-canvas",
    road: "stroke-signature-line",
    car: "stroke-ink",
    ref: "stroke-ink-soft",
    measure: "stroke-muted",
    text: "fill-muted",
    strong: "fill-ink",
    track: "stroke-border",
    tick: "stroke-ink-soft",
    accent: "stroke-primary",
    accentFill: "fill-primary",
  },
  dark: {
    frame: "stroke-white/60",
    frameBg: "fill-surface-dark",
    road: "stroke-white/20",
    car: "stroke-white",
    ref: "stroke-silver",
    measure: "stroke-on-dark-muted",
    text: "fill-on-dark-muted",
    strong: "fill-on-dark",
    track: "stroke-white/10",
    tick: "stroke-silver",
    accent: "stroke-primary-on-dark",
    accentFill: "fill-primary-on-dark",
  },
};

const frames = [
  { n: "0001", t: "0,000 s", car: 18 },
  { n: "0002", t: "0,033 s", car: 42 },
  { n: "0003", t: "0,067 s", car: 66 },
  { n: "0004", t: "0,100 s", car: 90 },
];

export function VideoFrames({ tone = "light", className }) {
  const p = palettes[tone];

  return (
    <svg viewBox="0 0 560 320" className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      {frames.map((f, i) => {
        const fx = 8 + i * 138;
        const impact = i === frames.length - 1;
        return (
          <g key={f.n} className={cn("animate-fade-up", play)} style={{ animationDelay: `${i * 220}ms` }}>
            <text x={fx} y="28" fontSize="10" letterSpacing="1" className={cn("font-mono", impact ? p.accentFill : p.strong)}>
              QUADRO {f.n}
            </text>
            <rect x={fx} y="40" width="128" height="96" rx="2" strokeWidth="1.5" className={cn(p.frame, p.frameBg)} />
            <line x1={fx} x2={fx + 128} y1="112" y2="112" strokeWidth="1" className={p.road} />
            <line x1={fx} x2={fx + 128} y1="88" y2="88" strokeWidth="1" strokeDasharray="6 5" className={p.road} />
            <line x1={fx + 104} x2={fx + 104} y1="64" y2="112" strokeWidth="2" className={p.ref} />
            <g transform={`translate(${fx + f.car} 100)`}>
              <rect x="-14" y="-7" width="28" height="14" rx="3" fill="none" strokeWidth="1.5" className={p.car} />
            </g>
            <line
              x1={fx + f.car + 14}
              x2={fx + 104}
              y1="124"
              y2="124"
              strokeWidth="1"
              strokeDasharray="3 2"
              className={p.measure}
            />
            {impact && (
              <circle cx={fx + 104} cy="100" r="4" fill="none" strokeWidth="1.5" className={p.accent} />
            )}
            <text x={fx} y="156" fontSize="10" className={cn("font-mono", p.text)}>
              t = {f.t}
            </text>
          </g>
        );
      })}

      <g className="font-mono" fontSize="10" letterSpacing="1">
        {["CÂMERA 1", "CÂMERA 2"].map((cam, row) => {
          const y = 208 + row * 48;
          return (
            <g key={cam} className={cn("animate-fade-in", play)} style={{ animationDelay: `${900 + row * 200}ms` }}>
              <text x="8" y={y - 12} className={p.strong}>
                {cam}
              </text>
              <line x1="8" x2="552" y1={y} y2={y} strokeWidth="1" className={p.track} />
              {Array.from({ length: 23 }, (_, k) => (
                <line
                  key={k}
                  x1={8 + k * 24 + row * 9}
                  x2={8 + k * 24 + row * 9}
                  y1={y - 6}
                  y2={y + 6}
                  strokeWidth="1"
                  className={p.tick}
                />
              ))}
            </g>
          );
        })}
        <g className={cn("animate-fade-in", play)} style={{ animationDelay: "1500ms" }}>
          <line x1="422" x2="422" y1="184" y2="270" strokeWidth="1.5" className={p.accent} />
          <text x="430" y="296" className={p.accentFill}>
            SINCRONIZAÇÃO
          </text>
        </g>
        <line
          x1="8"
          x2="8"
          y1="184"
          y2="270"
          strokeWidth="1"
          className={cn(p.measure, "motion-reduce:hidden")}
        >
          <animate attributeName="x1" values="8;552" dur="5s" repeatCount="indefinite" />
          <animate attributeName="x2" values="8;552" dur="5s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}
