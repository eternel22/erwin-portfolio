"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IllustrativeBadge } from "../shared";
import { GearPart } from "./GearPart";

type Props = {
  steps: { name: string; body: string }[];
  patches: { grid: number; threshold: number; hot: { col: number; row: number; score: number }[] };
};

const S = 240;
const ORANGE = "#eb6834";

export function PatchPipeline({ steps, patches }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  const { grid, threshold, hot } = patches;
  const cell = S / grid;
  // Low, slightly varied scores everywhere except on the scratch.
  const scores = Array.from({ length: grid * grid }).map((_, i) => {
    const h = hot.find((p) => p.row * grid + p.col === i);
    return h ? h.score : 0.06 + ((i * 37) % 11) / 100;
  });
  const imageScore = Math.max(...scores);

  const score = active === null ? null : scores[active];
  const flagged = score !== null && score >= threshold;

  return (
    <div className="grid items-center gap-8 rounded-2xl border border-border bg-surface p-4 sm:p-8 md:grid-cols-[minmax(0,18rem)_1fr]">
      <div>
        <svg
          viewBox={`0 0 ${S} ${S}`}
          className="mx-auto h-auto w-full max-w-xs"
          role="img"
          aria-label="A drawn watch wheel with a small scratch, divided into a grid of patches. Patches on the scratch get a high anomaly score."
          onMouseLeave={() => setActive(null)}
        >
          <GearPart defect />
          {scores.map((v, i) => {
            const x = (i % grid) * cell;
            const y = Math.floor(i / grid) * cell;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={cell}
                height={cell}
                fill={showMap ? ORANGE : "transparent"}
                fillOpacity={showMap ? v * 0.75 : 0}
                stroke={active === i ? "#171717" : "#a3a3a3"}
                strokeOpacity={active === i ? 1 : 0.35}
                strokeWidth={active === i ? 2 : 0.5}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              />
            );
          })}
        </svg>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            aria-pressed={showMap}
            onClick={() => setShowMap((v) => !v)}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm transition-colors",
              showMap ? "border-accent bg-accent text-accent-foreground" : "border-border bg-white text-foreground",
            )}
          >
            {showMap ? "Hide anomaly map" : "Show anomaly map"}
          </button>
          <IllustrativeBadge />
        </div>
      </div>

      <div>
        <ol className="space-y-3">
          {steps.map((s, k) => (
            <li key={s.name} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                {k + 1}
              </span>
              <p className="leading-relaxed text-foreground/90">
                <span className="font-medium text-foreground">{s.name}.</span> <span className="text-muted">{s.body}</span>
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 min-h-24 rounded-lg border border-border bg-white p-3 text-sm" aria-live="polite">
          {score === null ? (
            <p className="leading-relaxed text-muted">
              Hover or tap a patch to see how far it is from the closest normal patch in the memory bank.
            </p>
          ) : (
            <>
              <p className="flex items-center justify-between gap-2 text-muted">
                Distance to nearest normal patch
                <span className="font-medium text-foreground tabular-nums">{score.toFixed(2)}</span>
              </p>
              <div className="mt-2 h-2 rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${score * 100}%`, background: flagged ? ORANGE : "#2a78d6" }}
                />
              </div>
              <p className="mt-2 leading-relaxed text-foreground">
                {flagged ? "Nothing like it in the memory bank: flagged." : "Close to patches seen on good parts: normal."}
              </p>
            </>
          )}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          The score of the whole image is its worst patch, here {imageScore.toFixed(2)}.
        </p>
      </div>
    </div>
  );
}
