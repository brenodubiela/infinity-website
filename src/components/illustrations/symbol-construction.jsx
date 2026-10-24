import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const SYMBOL = "M276,142 A60,60 0 1 0 276,238 L404,142 A60,60 0 1 1 404,238 Z";

const palettes = {
  dark: {
    grid: "stroke-white/10",
    construction: "stroke-silver/60",
    dimension: "stroke-on-dark-muted/70",
    symbol: "stroke-white",
    accent: "stroke-primary-on-dark",
    accentText: "fill-primary-on-dark",
    text: "fill-on-dark-muted",
  },
  light: {
    grid: "stroke-border",
    construction: "stroke-graphic",
    dimension: "stroke-muted",
    symbol: "stroke-ink",
    accent: "stroke-primary",
    accentText: "fill-primary",
    text: "fill-ink-soft",
  },
};

function drawProps(delay, duration = 1400, extra) {
  return {
    pathLength: 1,
    className: cn("draw-path animate-draw", play, extra),
    style: { animationDelay: `${delay}ms`, animationDuration: `${duration}ms` },
  };
}

function fadeProps(delay, extra) {
  return { className: cn("animate-fade-in", play, extra), style: { animationDelay: `${delay}ms` } };
}

export function SymbolConstruction({ tone = "dark", className }) {
  const p = palettes[tone];
  const gridX = Array.from({ length: 17 }, (_, i) => 180 + i * 20);
  const gridY = Array.from({ length: 7 }, (_, i) => 130 + i * 20);

  return (
    <svg viewBox="96 64 512 288" className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      <g {...fadeProps(0, p.grid)} strokeWidth="0.75" fill="none">
        {gridX.map((x) => (
          <line key={`x${x}`} x1={x} x2={x} y1="130" y2="250" />
        ))}
        {gridY.map((y) => (
          <line key={`y${y}`} x1="180" x2="500" y1={y} y2={y} />
        ))}
      </g>

      <g fill="none" strokeWidth="1" className={p.construction}>
        <line x1="150" y1="190" x2="530" y2="190" strokeDasharray="8 3 2 3" {...fadeProps(200)} />
        <circle cx="240" cy="190" r="60" {...drawProps(300, 1200)} />
        <circle cx="440" cy="190" r="60" {...drawProps(500, 1200)} />
        <line x1="264" y1="133" x2="416" y2="247" {...drawProps(1100, 900)} />
        <line x1="264" y1="247" x2="416" y2="133" {...drawProps(1250, 900)} />
        <path d="M234,190 H246 M240,184 V196 M434,190 H446 M440,184 V196" {...fadeProps(900)} />
      </g>

      <g fill="none" strokeWidth="1" {...fadeProps(1500, p.dimension)}>
        <line x1="240" y1="130" x2="128" y2="130" />
        <line x1="240" y1="250" x2="128" y2="250" />
        <line x1="240" y1="190" x2="240" y2="296" />
        <line x1="440" y1="190" x2="440" y2="296" />
        <line x1="180" y1="190" x2="180" y2="328" />
        <line x1="500" y1="190" x2="500" y2="328" />
        <path d="M444,114 L505,88 L551,88" />
        <path d="M135,134 V246 M131,138 L135,130 L139,138 M131,242 L135,250 L139,242" />
        <path d="M244,290 H436 M248,286 L240,290 L248,294 M432,286 L440,290 L432,294" />
        <path d="M184,322 H496 M188,318 L180,322 L188,326 M492,318 L500,322 L492,326" />
      </g>

      <path
        d={SYMBOL}
        fill="none"
        strokeWidth="20"
        {...drawProps(1700, 2600, p.symbol)}
      />

      <g fill="none" strokeWidth="1.5" className={p.accent}>
        <path d="M240,190 L340,190 L276,142 Z" {...drawProps(2600, 1000)} />
        <path d="M306,190 A34,34 0 0 0 312.8,210.4" {...drawProps(3200, 500)} />
      </g>

      <g className="font-mono" fontSize="12" letterSpacing="0.5">
        <g textAnchor="middle" {...fadeProps(3000, p.accentText)}>
          <text x="248" y="159">3m</text>
          <text x="267" y="204">5m</text>
          <text x="315" y="156">4m</text>
          <text x="330" y="232">36,87°</text>
        </g>
        <g {...fadeProps(1700, p.text)}>
          <text x="127" y="194" textAnchor="end">6m</text>
          <text x="340" y="284" textAnchor="middle">10m</text>
          <text x="340" y="316" textAnchor="middle">16m</text>
          <text x="557" y="92">e = 1m</text>
        </g>
      </g>
    </svg>
  );
}
