import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const palettes = {
  light: {
    wall: "stroke-ink",
    item: "stroke-ink-soft",
    faint: "stroke-signature-line",
    hatch: "stroke-border",
    text: "fill-muted",
    strong: "fill-ink",
    char: "fill-ink/10",
    accent: "stroke-primary",
    accentFill: "fill-primary",
    surface: "fill-canvas",
  },
  dark: {
    wall: "stroke-white",
    item: "stroke-silver",
    faint: "stroke-white/20",
    hatch: "stroke-white/10",
    text: "fill-on-dark-muted",
    strong: "fill-on-dark",
    char: "fill-white/10",
    accent: "stroke-primary-on-dark",
    accentFill: "fill-primary-on-dark",
    surface: "fill-surface-dark",
  },
};

const ORIGIN = { x: 432, y: 132 };

export function FireOriginPlan({ tone = "light", className }) {
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
      <g {...fade(1400)}>
        <ellipse cx={ORIGIN.x} cy={ORIGIN.y} rx="150" ry="104" className={p.char} />
        <ellipse cx={ORIGIN.x} cy={ORIGIN.y} rx="96" ry="66" className={p.char} />
        <ellipse cx={ORIGIN.x} cy={ORIGIN.y} rx="48" ry="34" className={p.char} />
      </g>

      <g fill="none" strokeWidth="3" strokeLinejoin="round" className={p.wall}>
        <path d="M40 40 H600 V328 H360 M300 328 H40 Z" {...draw(0, 1800)} />
        <path d="M232 40 V150 M232 200 V328" strokeWidth="2" {...draw(500, 900)} />
      </g>

      <g fill="none" strokeWidth="1.5" className={p.item}>
        <rect x="64" y="64" width="140" height="36" {...draw(800, 700)} />
        <rect x="64" y="124" width="140" height="36" {...draw(900, 700)} />
        <rect x="64" y="184" width="140" height="36" {...draw(1000, 700)} />
        <rect x="64" y="244" width="140" height="36" {...draw(1100, 700)} />
        <rect x="270" y="210" width="120" height="70" rx="4" {...draw(1000, 800)} />
        <circle cx="330" cy="245" r="20" {...draw(1200, 600)} />
        <rect x="470" y="210" width="100" height="80" rx="4" {...draw(1100, 800)} />
        <rect x="404" y="56" width="56" height="26" {...draw(1300, 500)} />
      </g>
      <g className={p.hatch} strokeWidth="1">
        <path d="M64 100 l140 -36 M64 160 l140 -36 M64 220 l140 -36 M64 280 l140 -36" {...fade(1200)} />
      </g>

      <g className="font-mono" fontSize="10" letterSpacing="1">
        <text x="134" y="304" textAnchor="middle" {...fade(1300, p.text)}>ESTOQUE</text>
        <text x="330" y="300" textAnchor="middle" {...fade(1300, p.text)}>LINHA DE PRODUÇÃO</text>
        <text x="520" y="310" textAnchor="middle" {...fade(1300, p.text)}>COMPRESSOR</text>
        <text x="432" y="50" textAnchor="middle" {...fade(1500, p.strong)}>QUADRO ELÉTRICO</text>
      </g>

      <g fill="none" strokeWidth="1.5" strokeLinecap="round" className={p.accent}>
        {[
          "M432 132 C 380 150, 330 170, 300 200",
          "M432 132 C 470 170, 500 190, 520 206",
          "M432 132 C 380 110, 300 100, 250 96",
          "M432 132 C 500 116, 560 112, 584 110",
        ].map((d, i) => (
          <path key={d} d={d} strokeDasharray="6 5" {...fade(1900 + i * 150)} />
        ))}
      </g>

      <g {...fade(1700)}>
        {[0, 900, 1800].map((delay) => (
          <circle
            key={delay}
            cx={ORIGIN.x}
            cy={ORIGIN.y}
            r="12"
            fill="none"
            strokeWidth="1.5"
            className={cn(p.accent, "origin-center animate-ping-soft [transform-box:fill-box]")}
            style={{ animationDelay: `${delay}ms`, animationDuration: "2700ms" }}
          />
        ))}
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="14" className={p.surface} />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="7" className={p.accentFill} />
        <path d={`M ${ORIGIN.x - 22} ${ORIGIN.y} H ${ORIGIN.x - 12} M ${ORIGIN.x + 12} ${ORIGIN.y} H ${ORIGIN.x + 22} M ${ORIGIN.x} ${ORIGIN.y - 22} V ${ORIGIN.y - 12} M ${ORIGIN.x} ${ORIGIN.y + 12} V ${ORIGIN.y + 22}`} strokeWidth="1.5" className={p.accent} />
        <path d={`M ${ORIGIN.x + 16} ${ORIGIN.y + 16} L 520 168 H 588`} fill="none" strokeWidth="1" className={p.accent} />
        <text x="588" y="160" textAnchor="end" fontSize="11" letterSpacing="1" className={cn("font-mono", p.accentFill)}>
          ORIGEM
        </text>
      </g>

      <g {...fade(1000)}>
        <g transform="translate(40 360)">
          <rect x="0" y="0" width="48" height="6" className={p.strong} />
          <rect x="48" y="0" width="48" height="6" fill="none" strokeWidth="1" className={p.wall} />
          <g className={cn("font-mono", p.text)} fontSize="10">
            <text x="0" y="22" textAnchor="middle">0</text>
            <text x="48" y="22" textAnchor="middle">5</text>
            <text x="96" y="22" textAnchor="middle">10 m</text>
          </g>
        </g>
        <g transform="translate(176 362)" fontSize="10" letterSpacing="1" className="font-mono">
          <circle cx="4" cy="2" r="4" className={p.accentFill} />
          <text x="14" y="6" className={p.text}>ZONA DE ORIGEM</text>
          <path d="M140 2 H170" strokeWidth="1.5" strokeDasharray="6 5" className={p.accent} />
          <text x="178" y="6" className={p.text}>PROPAGAÇÃO</text>
        </g>
        <g transform="translate(584 356)" className={p.wall} fill="none" strokeWidth="1.5">
          <path d="M0 16 L0 -12 M-6 -4 L0 -12 L6 -4" />
          <text x="0" y="32" textAnchor="middle" fontSize="11" stroke="none" className={cn("font-mono", p.strong)}>
            N
          </text>
        </g>
      </g>
    </svg>
  );
}
