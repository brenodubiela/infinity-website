import brazil from "@svg-maps/brazil";
import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

const HQ = { x: 387.6, y: 513.3 };

function center(d) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g);
  let i = 0;
  let cmd = "";
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const num = () => parseFloat(tokens[i++]);
  const track = () => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  };
  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) {
      cmd = tokens[i++];
      if (cmd === "z" || cmd === "Z") {
        x = sx;
        y = sy;
        continue;
      }
    }
    if (cmd === "m") {
      x += num();
      y += num();
      sx = x;
      sy = y;
      cmd = "l";
    } else if (cmd === "M") {
      x = num();
      y = num();
      sx = x;
      sy = y;
      cmd = "L";
    } else if (cmd === "l") {
      x += num();
      y += num();
    } else if (cmd === "L") {
      x = num();
      y = num();
    } else if (cmd === "h") x += num();
    else if (cmd === "H") x = num();
    else if (cmd === "v") y += num();
    else if (cmd === "V") y = num();
    else i++;
    track();
  }
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}

const states = brazil.locations.map((state) => {
  const c = center(state.path);
  const distance = Math.hypot(c.x - HQ.x, c.y - HQ.y);
  return { ...state, delay: Math.round(distance * 2.2) };
});

const palettes = {
  dark: {
    state: "fill-white/[0.04] stroke-white/20",
    lit: "fill-white/[0.09]",
    ring: "stroke-primary-on-dark",
    dot: "fill-primary-on-dark",
    label: "fill-on-dark",
    sub: "fill-on-dark-muted",
    halo: "fill-surface-dark",
  },
  light: {
    state: "fill-surface-muted stroke-signature-line",
    lit: "fill-border",
    ring: "stroke-primary",
    dot: "fill-primary",
    label: "fill-ink",
    sub: "fill-muted",
    halo: "fill-canvas",
  },
};

export function BrazilMap({ tone = "dark", className, showLabel = true }) {
  const p = palettes[tone];

  return (
    <svg viewBox="0 0 613 639" className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      <g strokeWidth="1" strokeLinejoin="round">
        {states.map((state) => (
          <g key={state.id}>
            <path d={state.path} className={p.state} />
            <path
              d={state.path}
              className={cn(p.lit, "stroke-none animate-fade-in", play)}
              style={{ animationDelay: `${state.delay}ms`, animationDuration: "1200ms" }}
            />
          </g>
        ))}
      </g>

      <g className={cn("animate-fade-in", play)} style={{ animationDelay: "200ms" }}>
        {[0, 800, 1600].map((delay) => (
          <circle
            key={delay}
            cx={HQ.x}
            cy={HQ.y}
            r="10"
            fill="none"
            strokeWidth="1.5"
            className={cn(p.ring, "origin-center animate-ping-soft [transform-box:fill-box]")}
            style={{ animationDelay: `${delay}ms`, animationDuration: "2400ms" }}
          />
        ))}
        <circle cx={HQ.x} cy={HQ.y} r="12" className={p.halo} />
        <circle cx={HQ.x} cy={HQ.y} r="6" className={p.dot} />
      </g>

      {showLabel && (
        <g className={cn("font-mono animate-fade-in", play)} style={{ animationDelay: "600ms" }} letterSpacing="1.5">
          <path d={`M ${HQ.x + 14} ${HQ.y} H 470`} className={p.ring} strokeWidth="1" />
          <text x="478" y={HQ.y - 4} fontSize="13" className={p.label}>
            POMERODE, SC
          </text>
          <text x="478" y={HQ.y + 14} fontSize="11" className={p.sub}>
            SEDE
          </text>
        </g>
      )}
    </svg>
  );
}
