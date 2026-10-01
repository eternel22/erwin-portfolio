"use client";

import { useState } from "react";
import { IllustrativeBadge } from "../shared";

type ClassDef = { key: string; label: string; color: string };

const W = 320;
const H = 240;

// A made-up neighborhood seen from above: [x, y, width, height, class, confidence, roof color].
const BUILDINGS: [number, number, number, number, string, number, string][] = [
  [20, 24, 44, 32, "ur", 0.88, "#d9d4cc"],
  [84, 30, 38, 30, "ur", 0.85, "#c9b8a4"],
  [140, 22, 40, 36, "dr", 0.72, "#cfc6ba"],
  [226, 20, 78, 62, "uc", 0.81, "#e4e6ea"],
  [24, 76, 36, 26, "dr", 0.64, "#c7b5a0"],
  [92, 72, 42, 28, "ur", 0.9, "#dcd7d0"],
  [150, 74, 34, 26, "ur", 0.79, "#bfa890"],
  [18, 146, 46, 34, "ur", 0.87, "#d2ccc3"],
  [86, 150, 38, 30, "ur", 0.84, "#c4b29c"],
  [142, 144, 40, 40, "dr", 0.58, "#d0c8bd"],
  [224, 146, 80, 56, "dc", 0.43, "#dfe1e5"],
  [30, 196, 40, 28, "ur", 0.86, "#cbbba8"],
  [98, 194, 44, 30, "ur", 0.76, "#d8d3cb"],
];

const TREES = [
  [72, 18, 9],
  [130, 66, 8],
  [70, 92, 10],
  [190, 60, 8],
  [76, 180, 9],
  [134, 196, 8],
  [182, 208, 11],
  [170, 20, 6],
];

// Torn-roof shape, as fractions of the building's width and height.
const DAMAGE = [
  [0.15, 0.2],
  [0.55, 0.1],
  [0.72, 0.45],
  [0.45, 0.82],
  [0.2, 0.6],
];

export function SatelliteScene({ classes }: { classes: ClassDef[] }) {
  const [active, setActive] = useState<number | null>(null);
  const byKey = (k: string) => classes.find((c) => c.key === k)!;
  const hovered = active === null ? null : BUILDINGS[active];

  return (
    <div className="grid gap-6 rounded-2xl border border-border bg-surface p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_15rem]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto h-auto w-full max-w-lg rounded-lg"
        role="img"
        aria-label="A drawn satellite view of a neighborhood. Every building has a bounding box colored by its predicted class."
        onMouseLeave={() => setActive(null)}
      >
        <rect width={W} height={H} fill="#dfe8d6" />
        <rect x={0} y={112} width={W} height={20} fill="#c9c9c9" />
        <rect x={196} y={0} width={18} height={H} fill="#c9c9c9" />
        {TREES.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#aac79a" />
        ))}

        {BUILDINGS.map(([x, y, w, h, cls, , roof], i) => {
          const damaged = cls.startsWith("d");
          const color = byKey(cls).color;
          return (
            <g key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className="cursor-default">
              <rect x={x} y={y} width={w} height={h} fill={roof} stroke="#9a938a" strokeWidth={0.75} />
              {damaged ? (
                <polygon points={DAMAGE.map(([fx, fy]) => `${x + fx * w},${y + fy * h}`).join(" ")} fill="#6f5b4a" />
              ) : (
                <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#9a938a" strokeWidth={0.75} />
              )}
              <rect
                x={x - 4}
                y={y - 4}
                width={w + 8}
                height={h + 8}
                fill={color}
                fillOpacity={active === i ? 0.18 : 0}
                stroke={color}
                strokeWidth={active === i ? 3 : 2}
                opacity={active !== null && active !== i ? 0.45 : 1}
              />
            </g>
          );
        })}
      </svg>

      <div className="flex flex-col justify-center gap-4 text-sm">
        <ul className="space-y-2">
          {classes.map((c) => (
            <li key={c.key} className="flex items-center gap-2 text-muted">
              <span className="h-3 w-3 shrink-0 rounded-sm border-2" style={{ borderColor: c.color }} />
              {c.label}
            </li>
          ))}
        </ul>
        <p className="min-h-16 rounded-lg border border-border bg-white p-3 leading-relaxed text-foreground" aria-live="polite">
          {hovered ? (
            <>
              <span className="font-medium">{byKey(hovered[4]).label}</span>
              <br />
              <span className="text-muted">Confidence </span>
              <span className="tabular-nums">{hovered[5].toFixed(2)}</span>
            </>
          ) : (
            <span className="text-muted">Hover or tap a building to see what the model predicts.</span>
          )}
        </p>
        <div>
          <IllustrativeBadge />
        </div>
      </div>
    </div>
  );
}
