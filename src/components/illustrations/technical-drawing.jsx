import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const palettes = {
  light: {
    line: "stroke-ink",
    soft: "stroke-ink-soft",
    faint: "stroke-signature-line",
    dim: "stroke-muted",
    text: "fill-muted",
    strong: "fill-ink",
    accent: "stroke-primary",
    accentFill: "fill-primary",
  },
  dark: {
    line: "stroke-white",
    soft: "stroke-silver",
    faint: "stroke-white/20",
    dim: "stroke-on-dark-muted",
    text: "fill-on-dark-muted",
    strong: "fill-on-dark",
    accent: "stroke-primary-on-dark",
    accentFill: "fill-primary-on-dark",
  },
};

function gearPath(cx, cy, teeth, outer, root) {
  const step = (Math.PI * 2) / teeth;
  const points = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const corners = [
      [root, a],
      [outer, a + step * 0.18],
      [outer, a + step * 0.48],
      [root, a + step * 0.66],
    ];
    for (const [r, angle] of corners) {
      points.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
    }
  }
  return `M ${points.join(" L ")} Z`;
}

const GEAR = gearPath(508, 150, 28, 84, 74);

export function TechnicalDrawing({ tone = "light", className }) {
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
      <path d="M24 150 H400 M508 40 V260 M398 150 H618" strokeWidth="0.75" strokeDasharray="10 3 2 3" {...fade(0, p.faint)} />

      <g fill="none" strokeWidth="1.5" strokeLinejoin="round" className={p.line}>
        <path d="M40 126 H130 V110 H290 V122 H380 V178 H290 V190 H130 V174 H40 Z" {...draw(200, 1600)} />
        <path d="M130 110 V190 M290 110 V190" {...draw(900, 700, p.soft)} />
        <path d="M170 110 V118 H250 V110" {...draw(1100, 600, p.soft)} />
        <path d={GEAR} {...draw(600, 2000, p.line)} />
        <circle cx="508" cy="150" r="40" {...draw(1200, 900, p.soft)} />
        <circle cx="508" cy="150" r="22" {...draw(1400, 700)} />
        <path d="M498 128 H518 V136 H498 Z" {...draw(1600, 400, p.soft)} />
      </g>

      <g fill="none" strokeWidth="1" {...fade(1700, p.dim)}>
        <path d="M40 182 V236 M380 182 V236 M48 230 H372" />
        <path d="M48 226 L40 230 L48 234 M372 226 L380 230 L372 234" />
        <path d="M130 106 V72 M290 106 V72 M138 78 H282" />
        <path d="M138 74 L130 78 L138 82 M282 74 L290 78 L282 82" />
        <path d="M400 110 H436 M400 190 H436 M428 118 V182" />
        <path d="M424 118 L428 110 L432 118 M424 182 L428 190 L432 182" />
        <path d="M508 66 V30 M592 150 H612" />
      </g>

      <g className="font-mono" fontSize="11" letterSpacing="0.5" textAnchor="middle">
        <text x="210" y="248" {...fade(1900, p.text)}>340</text>
        <text x="210" y="68" {...fade(1900, p.text)}>160</text>
        <text x="446" y="154" textAnchor="start" {...fade(1900, p.text)}>Ø 80</text>
        <text x="508" y="22" {...fade(2000, p.text)}>Z = 28</text>
      </g>

      <g {...fade(2300)}>
        <path d="M290 110 l-6 10 l8 6 l-6 10 l8 6 l-6 10 l8 6 l-6 10 l8 6 l-6 10 l8 6" fill="none" strokeWidth="1.5" className={p.accent} />
        <circle cx="290" cy="150" r="28" fill="none" strokeWidth="1.5" strokeDasharray="4 3" className={p.accent} />
        <circle
          cx="290"
          cy="150"
          r="28"
          fill="none"
          strokeWidth="1"
          className={cn(p.accent, "origin-center animate-ping-soft [transform-box:fill-box]")}
          style={{ animationDuration: "3200ms" }}
        />
        <path d="M310 170 L346 214 H392" fill="none" strokeWidth="1" className={p.accent} />
        <text x="398" y="218" fontSize="11" letterSpacing="1" className={cn("font-mono", p.accentFill)}>
          DETALHE A
        </text>
      </g>

      <g fill="none" strokeWidth="1" {...fade(2500, p.line)}>
        <rect x="352" y="300" width="264" height="76" />
        <path d="M352 326 H616 M352 351 H616 M440 351 V376 M528 351 V376" />
      </g>
      <g className="font-mono" fontSize="10" letterSpacing="0.5" {...fade(2600)}>
        <text x="360" y="317" fontWeight="600" className={p.strong}>INFINITY ENGENHARIA E PERÍCIAS</text>
        <text x="360" y="343" className={p.strong}>ANÁLISE TÉCNICA DE COMPONENTE</text>
        <text x="360" y="368" className={p.text}>ESC 1:2</text>
        <text x="448" y="368" className={p.text}>UNID. mm</text>
        <text x="536" y="368" className={p.text}>FL 01/01</text>
      </g>

      <g className="font-mono" fontSize="10" letterSpacing="0.5" {...fade(2400, p.text)}>
        <text x="24" y="316">EIXO DE SAÍDA</text>
        <text x="24" y="340">ENGRENAGEM</text>
      </g>
    </svg>
  );
}
