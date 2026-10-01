"use client";

import { useState } from "react";
import { IllustrativeBadge } from "../shared";

const BLUE = "#2a78d6";
const ORANGE = "#eb6834";
const GRAY = "#c4c4c4";

const W = 320;
const H = 250;

// Small deterministic generator so the scatter is identical on server and client.
function cluster(seed: number, cx: number, cy: number, spread: number, n: number) {
  let s = seed;
  const next = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: n }).map(() => [
    Math.round(cx + (next() - 0.5) * 2 * spread),
    Math.round(cy + (next() - 0.5) * 2 * spread),
  ]);
}

const CANDIDATES = [...cluster(5, 75, 75, 48, 20), ...cluster(11, 235, 85, 50, 20), ...cluster(17, 150, 185, 45, 20)];
const VALIDATION = [
  [228, 92],
  [258, 62],
  [158, 180],
];

function nearest(target: number[], k: number) {
  return CANDIDATES.map((p, i) => ({ i, d: Math.hypot(p[0] - target[0], p[1] - target[1]) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map((n) => n.i);
}

export function NeighborPicker({ k, features }: { k: number; features: { name: string; body: string }[] }) {
  const [active, setActive] = useState<number | null>(null);

  const neighbors = VALIDATION.map((v) => nearest(v, k));
  const selected = new Set(neighbors.flat());
  const shown = active === null ? selected : new Set(neighbors[active]);

  return (
    <div className="grid gap-6 rounded-2xl border border-border bg-surface p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_16rem]">
      <div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mx-auto h-auto w-full max-w-md"
          role="img"
          aria-label={`Candidate patches plotted by their features. The ${selected.size} patches closest to three validation images are selected for labeling.`}
          onMouseLeave={() => setActive(null)}
        >
          <rect x={0.5} y={0.5} width={W - 1} height={H - 1} rx={12} fill="#ffffff" stroke="#e5e5e5" />
          <text x={12} y={H - 10} className="fill-muted text-[10px]">
            Patch features, projected to 2D
          </text>

          {active !== null &&
            neighbors[active].map((i) => (
              <line
                key={i}
                x1={VALIDATION[active][0]}
                y1={VALIDATION[active][1]}
                x2={CANDIDATES[i][0]}
                y2={CANDIDATES[i][1]}
                stroke={BLUE}
                strokeWidth={1}
                opacity={0.6}
              />
            ))}

          {CANDIDATES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={shown.has(i) ? 5 : 4} fill={shown.has(i) ? BLUE : GRAY} stroke="#ffffff" strokeWidth={1.5} />
          ))}

          {VALIDATION.map(([x, y], i) => (
            <g key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className="cursor-default">
              <circle cx={x} cy={y} r={14} fill="transparent" />
              <rect
                x={x - 5.5}
                y={y - 5.5}
                width={11}
                height={11}
                fill={ORANGE}
                stroke={active === i ? "#171717" : "#ffffff"}
                strokeWidth={1.5}
                transform={`rotate(45 ${x} ${y})`}
              />
            </g>
          ))}
        </svg>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rotate-45" style={{ background: ORANGE }} /> Validation image
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: BLUE }} /> Selected for labeling
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: GRAY }} /> Skipped
          </span>
          <IllustrativeBadge />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 text-sm">
        <p className="min-h-16 rounded-lg border border-border bg-white p-3 leading-relaxed text-foreground" aria-live="polite">
          {active === null
            ? `${selected.size} of ${CANDIDATES.length} candidate patches are worth labeling. Hover or tap a validation image.`
            : `The ${k} training patches that look most like this validation image.`}
        </p>
        <ol className="space-y-3">
          {features.map((f) => (
            <li key={f.name}>
              <p className="font-mono text-xs font-semibold text-accent">{f.name}</p>
              <p className="mt-0.5 leading-relaxed text-muted">{f.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
