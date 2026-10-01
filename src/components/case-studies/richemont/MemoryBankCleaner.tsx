"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IllustrativeBadge } from "../shared";

const BLUE = "#2a78d6";
const ORANGE = "#eb6834";
const GRAY = "#a3a3a3";

const W = 320;
const H = 250;
const THRESHOLD = 0.5;
const SCALE = 150;

// Small deterministic generator so the scatter is identical on server and client.
function cluster(seed: number, cx: number, cy: number, spread: number, n: number) {
  let s = seed;
  const next = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: n }).map(() => [
    Math.round(cx + (next() - 0.5) * 2 * spread),
    Math.round(cy + (next() - 0.5) * 2 * spread),
  ]);
}

const NORMAL = [...cluster(7, 95, 150, 38, 16), ...cluster(21, 170, 190, 28, 12)];
// Defect patches hiding in the "OK" training images.
const HIDDEN = [
  [244, 52],
  [264, 66],
  [250, 80],
  [272, 46],
];
const TEST = [258, 60];

const MODES = ["Raw memory bank", "After outlier cleaning"];

export function MemoryBankCleaner({ steps, assumption }: { steps: string[]; assumption: string }) {
  const [cleaned, setCleaned] = useState(false);

  const bank = cleaned ? NORMAL : [...NORMAL, ...HIDDEN];
  const nearest = bank.reduce((best, p) =>
    Math.hypot(p[0] - TEST[0], p[1] - TEST[1]) < Math.hypot(best[0] - TEST[0], best[1] - TEST[1]) ? p : best,
  );
  const score = Math.min(1, Math.hypot(nearest[0] - TEST[0], nearest[1] - TEST[1]) / SCALE);
  const flagged = score >= THRESHOLD;

  return (
    <div className="grid gap-6 rounded-2xl border border-border bg-surface p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_16rem]">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-md border border-border bg-white p-0.5">
            {MODES.map((m, i) => (
              <button
                key={m}
                type="button"
                aria-pressed={cleaned === (i === 1)}
                onClick={() => setCleaned(i === 1)}
                className={cn(
                  "rounded px-3 py-1 text-sm transition-colors",
                  cleaned === (i === 1) ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {m}
              </button>
            ))}
          </div>
          <IllustrativeBadge />
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mx-auto h-auto w-full max-w-md"
          role="img"
          aria-label={
            cleaned
              ? "Patch features in two dimensions. The isolated group of hidden defects has been removed, so the new defect patch is far from the memory bank."
              : "Patch features in two dimensions. A small isolated group of hidden defects sits in the memory bank, right next to the new defect patch."
          }
        >
          <rect x={0.5} y={0.5} width={W - 1} height={H - 1} rx={12} fill="#ffffff" stroke="#e5e5e5" />
          <text x={12} y={H - 10} className="fill-muted text-[10px]">
            Patch features, projected to 2D
          </text>

          <line
            x1={TEST[0]}
            y1={TEST[1]}
            x2={nearest[0]}
            y2={nearest[1]}
            stroke={flagged ? ORANGE : GRAY}
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />

          {NORMAL.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={5} fill={BLUE} stroke="#ffffff" strokeWidth={1.5} />
          ))}
          {HIDDEN.map(([x, y], i) =>
            cleaned ? (
              <circle key={i} cx={x} cy={y} r={5} fill="#ffffff" stroke={GRAY} strokeWidth={1.5} strokeDasharray="2 2" />
            ) : (
              <circle key={i} cx={x} cy={y} r={5} fill={BLUE} stroke="#ffffff" strokeWidth={1.5} />
            ),
          )}

          <rect
            x={TEST[0] - 5}
            y={TEST[1] - 5}
            width={10}
            height={10}
            fill={ORANGE}
            stroke="#ffffff"
            strokeWidth={1.5}
            transform={`rotate(45 ${TEST[0]} ${TEST[1]})`}
          />
          <text x={TEST[0] - 12} y={TEST[1] - 30} textAnchor="end" className="fill-foreground text-[11px]">
            {cleaned ? "outliers removed" : "hidden defects"}
          </text>
          <text x={70} y={92} className="fill-muted text-[11px]">
            normal patches
          </text>
        </svg>

        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: BLUE }} /> In the memory bank
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-dashed" style={{ borderColor: GRAY }} /> Removed
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rotate-45" style={{ background: ORANGE }} /> New defect patch
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 text-sm">
        <div className="rounded-lg border border-border bg-white p-3" aria-live="polite">
          <p className="flex items-center justify-between gap-2 text-muted">
            Anomaly score of the new patch
            <span className="font-medium text-foreground tabular-nums">{score.toFixed(2)}</span>
          </p>
          <div className="mt-2 h-2 rounded-full bg-neutral-100">
            <div className="h-full rounded-full" style={{ width: `${score * 100}%`, background: flagged ? ORANGE : BLUE }} />
          </div>
          <p className="mt-2 leading-relaxed text-foreground">
            {flagged
              ? "Its closest neighbor is now a real normal patch, far away. The defect is caught."
              : "Its closest neighbor is a defect the bank memorized. The defect passes as normal."}
          </p>
        </div>
        <ol className="space-y-2">
          {steps.map((s, k) => (
            <li key={s} className="flex gap-2 leading-relaxed text-muted">
              <span className="text-accent tabular-nums">{k + 1}.</span>
              {s}
            </li>
          ))}
        </ol>
        <p className="text-xs leading-relaxed text-muted">{assumption}</p>
      </div>
    </div>
  );
}
