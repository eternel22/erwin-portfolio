"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GearPart } from "./GearPart";

type Option = { label: string; cells: number; resolution: number; cost: number; generalization: number; note: string };

const S = 240;
const BLUE = "#2a78d6";
const LEVELS = ["", "Low", "Medium", "High"];

function Meter({ label, level }: { label: string; level: number }) {
  return (
    <li className="grid grid-cols-[1fr_auto_3.5rem] items-center gap-3">
      <span className="text-muted">{label}</span>
      <span className="flex gap-1" aria-hidden>
        {[1, 2, 3].map((k) => (
          <span key={k} className="h-2.5 w-7 rounded-sm" style={{ background: k <= level ? BLUE : "#e5e5e5" }} />
        ))}
      </span>
      <span className="text-right font-medium text-foreground">{LEVELS[level]}</span>
    </li>
  );
}

export function TilingExplorer({ options }: { options: Option[] }) {
  const [active, setActive] = useState(0);
  const o = options[active];
  const lines = Array.from({ length: o.cells - 1 }).map((_, i) => ((i + 1) * S) / o.cells);

  return (
    <div className="grid items-center gap-8 rounded-2xl border border-border bg-surface p-4 sm:p-8 md:grid-cols-[minmax(0,16rem)_1fr]">
      <svg
        viewBox={`0 0 ${S} ${S}`}
        className="mx-auto h-auto w-full max-w-[16rem]"
        role="img"
        aria-label={`A drawn watch wheel split into ${o.cells * o.cells} cell${o.cells > 1 ? "s" : ""}.`}
      >
        <GearPart defect />
        <rect x={1} y={1} width={S - 2} height={S - 2} fill="none" stroke="#4338ca" strokeWidth={2} />
        {lines.map((p) => (
          <g key={p} stroke="#4338ca" strokeWidth={1.5} strokeDasharray="5 4">
            <line x1={p} x2={p} y1={0} y2={S} />
            <line x1={0} x2={S} y1={p} y2={p} />
          </g>
        ))}
      </svg>

      <div>
        <div className="inline-flex flex-wrap rounded-md border border-border bg-white p-0.5">
          {options.map((opt, i) => (
            <button
              key={opt.label}
              type="button"
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "rounded px-3 py-1 text-sm transition-colors",
                active === i ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div aria-live="polite">
          <p className="mt-5 text-sm text-muted">
            Memory banks:{" "}
            <span className="font-medium text-foreground tabular-nums">{o.cells * o.cells}</span>
          </p>
          <ul className="mt-3 space-y-2.5 text-sm">
            <Meter label="Detail per defect" level={o.resolution} />
            <Meter label="Compute cost" level={o.cost} />
            <Meter label="Generalization" level={o.generalization} />
          </ul>
          <p className="mt-4 min-h-16 leading-relaxed text-foreground/90">{o.note}</p>
        </div>
        <p className="text-xs text-muted">Qualitative trend, not measurements.</p>
      </div>
    </div>
  );
}
