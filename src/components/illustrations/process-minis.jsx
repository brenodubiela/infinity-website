import { cn } from "@/utils/cn";

const play = "[animation-play-state:var(--play,running)]";

function Frame({ children, className }) {
  return (
    <svg viewBox="0 0 160 72" className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export function MiniErp() {
  const nodes = [
    [24, 18],
    [24, 54],
    [136, 18],
    [136, 54],
  ];
  return (
    <Frame>
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <path
            d={`M${x} ${y} L80 36`}
            className={cn("stroke-signature-line draw-path animate-draw", play)}
            pathLength={1}
            strokeWidth="1.5"
            fill="none"
            style={{ animationDelay: `${i * 150}ms`, animationDuration: "900ms" }}
          />
          <rect x={x - 10} y={y - 7} width="20" height="14" rx="2" className="fill-canvas stroke-ink-soft" strokeWidth="1.5" />
          <circle r="2.5" className="fill-primary motion-reduce:hidden">
            <animateMotion dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={`M${x} ${y} L80 36`} />
          </circle>
        </g>
      ))}
      <rect x="64" y="22" width="32" height="28" rx="4" className="fill-ink" />
      <path d="M72 31 H88 M72 36 H88 M72 41 H82" className="stroke-white" strokeWidth="1.5" />
    </Frame>
  );
}

export function MiniLean() {
  const steps = [20, 60, 100, 140];
  return (
    <Frame>
      <path d="M20 36 H140" className="stroke-signature-line" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      {steps.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="36" r="10" className="fill-canvas stroke-ink" strokeWidth="1.5" />
          <text x={x} y="40" textAnchor="middle" fontSize="10" className="fill-ink font-mono">
            {i + 1}
          </text>
        </g>
      ))}
      <path
        d="M20 22 C 50 4, 110 4, 140 22"
        fill="none"
        strokeWidth="1.5"
        className={cn("stroke-primary draw-path animate-draw", play)}
        pathLength={1}
        style={{ animationDuration: "1400ms" }}
      />
      <path d="M134 16 L140 22 L132 24" fill="none" strokeWidth="1.5" className="stroke-primary" />
      <path d="M140 50 C 110 68, 50 68, 20 50" fill="none" strokeWidth="1.5" strokeDasharray="3 3" className="stroke-graphic" />
      <circle r="3" className="fill-primary motion-reduce:hidden">
        <animateMotion dur="3s" repeatCount="indefinite" path="M20 36 H140 C 110 68, 50 68, 20 50 Z" />
      </circle>
    </Frame>
  );
}

export function MiniChecklist() {
  const rows = [14, 32, 50];
  return (
    <Frame>
      <rect x="36" y="4" width="88" height="64" rx="4" className="fill-canvas stroke-ink-soft" strokeWidth="1.5" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect x="46" y={y} width="10" height="10" rx="2" className="fill-none stroke-ink" strokeWidth="1.5" />
          <path
            d={`M48 ${y + 5} l2.5 3 l4.5 -6`}
            fill="none"
            strokeWidth="2"
            className={cn("stroke-primary draw-path animate-draw", play)}
            pathLength={1}
            style={{ animationDelay: `${300 + i * 350}ms`, animationDuration: "500ms" }}
          />
          <path d={`M64 ${y + 5} H${108 - i * 10}`} className="stroke-signature-line" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <path d="M128 20 l10 0 M128 36 l14 0 M128 52 l8 0" className="stroke-border" strokeWidth="2" strokeLinecap="round" />
    </Frame>
  );
}

export function MiniAi() {
  const layers = [
    [24, [18, 36, 54]],
    [80, [12, 28, 44, 60]],
    [136, [24, 48]],
  ];
  const lines = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const [x1, ys1] = layers[l];
    const [x2, ys2] = layers[l + 1];
    for (const y1 of ys1) for (const y2 of ys2) lines.push([x1, y1, x2, y2]);
  }
  return (
    <Frame>
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-border" strokeWidth="1" />
      ))}
      {layers.map(([x, ys], l) =>
        ys.map((y, i) => (
          <circle
            key={`${l}-${y}`}
            cx={x}
            cy={y}
            r="5"
            strokeWidth="1.5"
            className={cn(
              "fill-canvas stroke-ink origin-center animate-[pulse-node_2.4s_ease-in-out_infinite] [transform-box:fill-box] motion-reduce:animate-none",
              l === 2 && i === 0 && "stroke-primary",
            )}
            style={{ animationDelay: `${(l * 4 + i) * 160}ms` }}
          />
        )),
      )}
      <circle r="2.5" className="fill-primary motion-reduce:hidden">
        <animateMotion dur="2s" repeatCount="indefinite" path="M24 36 L80 28 L136 24" />
      </circle>
    </Frame>
  );
}
