"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Mode = { stride: number; status: string };

const W = 400;
const H = 172;
const X0 = 20;
const TOP = 10;
const PATCH = 120; // 512 px
const STRIP = 3 * PATCH;
const ACCENT = "#4338ca";
const ORANGE = "#eb6834";

// The building of interest straddles the border between the first two patches.
const TARGET = { x: 118, y: 58, w: 48, h: 36 };
const OTHERS = [
  [40, 28, 34, 24],
  [56, 92, 30, 22],
  [214, 30, 40, 28],
  [226, 88, 32, 24],
  [300, 44, 44, 30],
  [318, 96, 30, 22],
];

export function PatchStride({ modes }: { modes: Mode[] }) {
  const [active, setActive] = useState(0);
  const { stride, status } = modes[active];

  const step = (stride / 512) * PATCH;
  const starts: number[] = [];
  for (let x = X0; x + PATCH <= X0 + STRIP; x += step) starts.push(x);
  const contains = (s: number) => s <= TARGET.x && s + PATCH >= TARGET.x + TARGET.w;
  const cuts = (s: number) => !contains(s) && s < TARGET.x + TARGET.w && s + PATCH > TARGET.x;
  const whole = starts.some(contains);

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <div className="mb-4 inline-flex rounded-md border border-border bg-white p-0.5">
        {modes.map((m, i) => (
          <button
            key={m.stride}
            type="button"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            className={cn(
              "rounded px-3 py-1 text-sm transition-colors",
              active === i ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground",
            )}
          >
            Stride {m.stride}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto h-auto w-full max-w-2xl"
        role="img"
        aria-label={`A strip of satellite image cut into ${starts.length} patches with a stride of ${stride} pixels. ${status}`}
      >
        <rect x={X0} y={TOP} width={STRIP} height={PATCH} fill="#dfe8d6" />
        {OTHERS.map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill="#d2ccc3" stroke="#9a938a" strokeWidth={0.75} />
        ))}
        <rect {...{ x: TARGET.x, y: TARGET.y, width: TARGET.w, height: TARGET.h }} fill="#c9b8a4" stroke="#171717" strokeWidth={1.5} />

        {/* Patch borders on the image. */}
        {starts.map((s) => (
          <rect
            key={s}
            x={s}
            y={TOP}
            width={PATCH}
            height={PATCH}
            fill={contains(s) ? ACCENT : "none"}
            fillOpacity={0.1}
            stroke={contains(s) ? ACCENT : whole ? "#a3a3a3" : cuts(s) ? ORANGE : "#a3a3a3"}
            strokeWidth={contains(s) || (!whole && cuts(s)) ? 2 : 1}
            strokeDasharray={contains(s) ? undefined : "5 4"}
          />
        ))}

        {/* One bar per patch, on two rows when they overlap. */}
        {starts.map((s, i) => (
          <rect
            key={s}
            x={s + 2}
            y={TOP + PATCH + 12 + (step < PATCH ? (i % 2) * 12 : 0)}
            width={PATCH - 4}
            height={7}
            rx={3.5}
            fill={contains(s) ? ACCENT : !whole && cuts(s) ? ORANGE : "#c4c4c4"}
          />
        ))}
      </svg>

      <p className="mt-3 text-sm leading-relaxed text-foreground" aria-live="polite">
        <span className="font-medium tabular-nums">{starts.length} patches.</span> <span className="text-muted">{status}</span>
      </p>
    </div>
  );
}
