"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = { labels: string[]; rows: number[][]; readings: string[] };

// Light → dark single-hue ramp, same as the BMW heatmap.
function cellColor(v: number) {
  const t = Math.min(1, v / 90);
  const from = [232, 241, 252];
  const to = [27, 90, 166];
  const c = from.map((f, i) => Math.round(f + (to[i] - f) * t));
  return { bg: `rgb(${c.join(",")})`, dark: t > 0.5 };
}

export function ConfusionMatrix({ labels, rows, readings }: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <figure className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">Confusion matrix on the validation set</span>
        <span className="text-xs text-muted">Each row: how buildings of that true class were predicted</span>
      </figcaption>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] border-separate border-spacing-1 text-center text-sm tabular-nums">
          <thead>
            <tr className="text-xs text-muted">
              <th className="pb-1 text-left font-medium">Truth ↓ · Predicted →</th>
              {labels.map((l) => (
                <th key={l} className="w-[15%] pb-1 align-bottom font-medium">
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={labels[i]}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(i)}
                className={cn("cursor-default transition-opacity", active !== null && active !== i && "opacity-40")}
              >
                <th className="pr-2 text-left text-xs font-medium whitespace-nowrap text-foreground">{labels[i]}</th>
                {row.map((v, j) => {
                  const { bg, dark } = cellColor(v);
                  return (
                    <td
                      key={j}
                      className={cn(
                        "h-10 rounded-md text-xs",
                        dark ? "text-white" : "text-foreground",
                        i === j && "font-semibold outline-2 -outline-offset-2 outline-foreground",
                      )}
                      style={{ background: bg }}
                    >
                      {v}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 min-h-12 rounded-lg border border-border bg-white p-3 text-sm leading-relaxed text-foreground" aria-live="polite">
        {active === null ? (
          <span className="text-muted">Hover or tap a row to read it. Outlined cells are correct predictions.</span>
        ) : (
          readings[active]
        )}
      </p>
    </figure>
  );
}
