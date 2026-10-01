"use client";

import { useState } from "react";

type Point = { iteration: number; prompt: string; mean: number; min: number; front: number };

const W = 480;
const H = 260;
const PAD = { top: 16, right: 64, bottom: 40, left: 48 };
const TICKS = [0, 0.25, 0.5, 0.75, 1];

const SERIES = [
  { key: "mean", label: "Mean score", color: "#2a78d6" },
  { key: "min", label: "Worst document", color: "#eb6834" },
] as const;

export function ScoreChart({ data }: { data: Point[] }) {
  const [active, setActive] = useState<number | null>(null);

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const step = innerW / (data.length - 1);
  const x = (i: number) => PAD.left + i * step;
  const y = (v: number) => PAD.top + innerH * (1 - v);

  const hovered = active === null ? null : data[active];

  return (
    <figure className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">
          Score per GEPA iteration, 6 repair orders
        </span>
        <span className="flex gap-4 text-xs text-muted">
          {SERIES.map((s) => (
            <span key={s.key} className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded-full" style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </span>
      </figcaption>

      <div className="relative mx-auto max-w-xl">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Mean score rises from 0.328 to 0.826 over five iterations; worst-document score rises from 0.232 to 0.448."
          onMouseLeave={() => setActive(null)}
        >
          {TICKS.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="#e5e5e5" strokeWidth={1} />
              <text x={PAD.left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" className="fill-muted text-[14px]">
                {t.toFixed(2)}
              </text>
            </g>
          ))}
          {data.map((d, i) => (
            <text key={d.iteration} x={x(i)} y={H - 12} textAnchor="middle" className="fill-muted text-[14px]">
              {`Iter ${d.iteration}`}
            </text>
          ))}

          {active !== null && (
            <line x1={x(active)} x2={x(active)} y1={PAD.top} y2={PAD.top + innerH} stroke="#a3a3a3" strokeWidth={1} />
          )}

          {SERIES.map((s) => (
            <g key={s.key}>
              <polyline
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                points={data.map((d, i) => `${x(i)},${y(d[s.key])}`).join(" ")}
              />
              {data.map((d, i) => (
                <circle
                  key={d.iteration}
                  cx={x(i)}
                  cy={y(d[s.key])}
                  r={active === i || i === data.length - 1 ? 5 : 4}
                  fill={s.color}
                  stroke="#fafafa"
                  strokeWidth={2}
                />
              ))}
              <text
                x={x(data.length - 1) + 10}
                y={y(data[data.length - 1][s.key])}
                dominantBaseline="middle"
                className="fill-foreground text-[15px] font-medium"
              >
                {data[data.length - 1][s.key].toFixed(3)}
              </text>
            </g>
          ))}

          {data.map((d, i) => (
            <rect
              key={d.iteration}
              x={x(i) - step / 2}
              y={PAD.top}
              width={step}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
            />
          ))}
        </svg>

        {hovered && active !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 w-44 rounded-lg border border-border bg-white p-3 text-xs shadow-sm"
            style={
              active < data.length / 2
                ? { left: `${(x(active) / W) * 100}%`, marginLeft: 12 }
                : { right: `${100 - (x(active) / W) * 100}%`, marginRight: 12 }
            }
          >
            <p className="mb-2 font-medium text-foreground">
              Iteration {hovered.iteration} · prompt {hovered.prompt}
            </p>
            {SERIES.map((s) => (
              <p key={s.key} className="flex items-center justify-between gap-2 text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  {s.label}
                </span>
                <span className="font-medium text-foreground tabular-nums">{hovered[s.key].toFixed(3)}</span>
              </p>
            ))}
            <p className="mt-1 flex justify-between text-muted">
              Pareto front size
              <span className="font-medium text-foreground tabular-nums">{hovered.front}</span>
            </p>
          </div>
        )}
      </div>
    </figure>
  );
}
