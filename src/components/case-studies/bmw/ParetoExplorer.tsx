"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  prompts: string[];
  docs: string[];
  scores: number[][];
  explorationBonus: number;
};

const BLUE = "#2a78d6";
const GRAY = "#c4c4c4";

function dominates(a: number[], b: number[]) {
  return a.every((v, i) => v >= b[i]) && a.some((v, i) => v > b[i]);
}

// Light → dark single-hue ramp for the heatmap.
function cellColor(v: number) {
  const t = Math.min(1, Math.max(0, (v - 0.2) / 0.6));
  const from = [232, 241, 252];
  const to = [27, 90, 166];
  const c = from.map((f, i) => Math.round(f + (to[i] - f) * t));
  return { bg: `rgb(${c.join(",")})`, dark: t > 0.5 };
}

export function IllustrativeBadge() {
  return (
    <span className="rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs text-muted">
      Illustrative example
    </span>
  );
}

function SubHeading({ letter, title, children }: { letter: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 max-w-2xl">
      <h3 className="flex items-baseline gap-2 text-lg font-semibold text-foreground">
        <span className="text-sm font-medium text-accent">{letter}</span>
        {title}
      </h3>
      <p className="mt-1.5 leading-relaxed text-muted">{children}</p>
    </div>
  );
}

export function ParetoExplorer({ prompts, docs, scores, explorationBonus }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [xDoc, setXDoc] = useState(0);
  const [yDoc, setYDoc] = useState(1);

  const means = scores.map((row) => row.reduce((s, v) => s + v, 0) / row.length);
  const bestMean = means.indexOf(Math.max(...means));
  const colBest = docs.map((_, j) => {
    let best = 0;
    scores.forEach((row, i) => {
      if (row[j] > scores[best][j]) best = i;
    });
    return best;
  });
  const wins = prompts.map((_, i) => colBest.filter((b) => b === i).length);
  const onFront = scores.map((row, i) => !scores.some((other, k) => k !== i && dominates(other, row)));

  const weights = prompts.map((_, i) => (!onFront[i] ? 0 : wins[i] > 0 ? wins[i] : explorationBonus));
  const totalWeight = weights.reduce((s, v) => s + v, 0);

  // 2-document scatter.
  const pts = scores.map((row) => [row[xDoc], row[yDoc]]);
  const front2d = pts.map((p, i) => !pts.some((o, k) => k !== i && dominates(o, p)));
  const dominator = (i: number) => pts.findIndex((o, k) => k !== i && dominates(o, pts[i]));

  const S = 300;
  const PAD = 40;
  const sx = (v: number) => PAD + ((v - 0.2) / 0.65) * (S - PAD - 12);
  const sy = (v: number) => S - PAD - ((v - 0.2) / 0.65) * (S - PAD - 12);
  const frontPts = pts
    .map((p, i) => ({ p, i }))
    .filter(({ i }) => front2d[i])
    .sort((a, b) => a.p[0] - b.p[0]);
  // Staircase through the frontier points (sorted by x, y descends).
  const stair = frontPts
    .map(({ p }, k) => {
      const [x, y] = [sx(p[0]), sy(p[1])];
      if (k === 0) return `M ${sx(0.2)} ${y} L ${x} ${y}`;
      const prevX = sx(frontPts[k - 1].p[0]);
      return `L ${prevX} ${y} L ${x} ${y}`;
    })
    .join(" ")
    .concat(frontPts.length ? ` L ${sx(frontPts[frontPts.length - 1].p[0])} ${sy(0.2)}` : "");

  const status =
    active === null
      ? "Hover or tap a prompt to see where it stands."
      : front2d[active]
        ? `${prompts[active]} is on the frontier: nothing beats it on both documents.`
        : `${prompts[active]} is dominated by ${prompts[dominator(active)]}: it is at least as good on both documents.`;

  const docSelect = (value: number, onChange: (v: number) => void, other: number, axis: string) => (
    <label className="inline-flex items-center gap-1.5 text-sm text-muted">
      {axis}
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-md border border-border bg-white px-2 py-1 text-sm text-foreground"
      >
        {docs.map((d, j) => (
          <option key={d} value={j} disabled={j === other}>
            Doc {d}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="space-y-16">
      {/* a. Heatmap */}
      <div>
        <SubHeading letter="a" title="The best-on-average prompt still loses somewhere">
          Five candidate prompts, scored on six documents. {prompts[bestMean]} has the best average,
          yet another prompt beats it on four of the six documents.
        </SubHeading>
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground">Score per prompt and document</p>
            <IllustrativeBadge />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1 text-center text-sm tabular-nums">
              <thead>
                <tr className="text-xs text-muted">
                  <th />
                  {docs.map((d) => (
                    <th key={d} className="pb-1 font-medium">
                      <span className="hidden sm:inline">Doc </span>
                      {d}
                    </th>
                  ))}
                  <th className="pb-1 pl-2 font-medium">Avg</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((row, i) => (
                  <tr
                    key={prompts[i]}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(i)}
                    className={cn(
                      "cursor-default transition-opacity",
                      active !== null && active !== i && "opacity-40",
                    )}
                  >
                    <th className="pr-2 text-left font-mono text-xs font-medium text-foreground">{prompts[i]}</th>
                    {row.map((v, j) => {
                      const { bg, dark } = cellColor(v);
                      const isBest = colBest[j] === i;
                      return (
                        <td
                          key={j}
                          className={cn(
                            "h-10 rounded-md text-xs",
                            dark ? "text-white" : "text-foreground",
                            isBest && "font-semibold outline-2 -outline-offset-2 outline-foreground",
                          )}
                          style={{ background: bg }}
                        >
                          {v.toFixed(2)}
                        </td>
                      );
                    })}
                    <td className={cn("pl-2 text-xs", i === bestMean ? "font-semibold text-foreground" : "text-muted")}>
                      {means[i].toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted">
            <span className="inline-block h-3.5 w-3.5 shrink-0 rounded-sm outline-2 -outline-offset-2 outline-foreground" style={{ background: "rgb(27,90,166)" }} />
            Outlined cell: best prompt for that document. Darker cells mean higher scores.
          </p>
        </div>
      </div>

      {/* b. Scatter */}
      <div>
        <SubHeading letter="b" title="Keep every prompt that is best at something">
          One prompt <em>dominates</em> another only if it is at least as good on every document and
          strictly better on at least one. The non-dominated prompts form the Pareto frontier, and
          all of them are kept.
        </SubHeading>
        <div className="grid gap-6 rounded-2xl border border-border bg-surface p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_14rem]">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              {docSelect(xDoc, setXDoc, yDoc, "x:")}
              {docSelect(yDoc, setYDoc, xDoc, "y:")}
              <IllustrativeBadge />
            </div>
            <svg
              viewBox={`0 0 ${S} ${S}`}
              className="mx-auto h-auto w-full max-w-sm"
              role="img"
              aria-label={`Scores on Doc ${docs[xDoc]} versus Doc ${docs[yDoc]}; frontier prompts: ${prompts.filter((_, i) => front2d[i]).join(", ")}`}
            >
              {[0.2, 0.4, 0.6, 0.8].map((t) => (
                <g key={t}>
                  <line x1={sx(0.2)} x2={sx(0.85)} y1={sy(t)} y2={sy(t)} stroke="#e5e5e5" />
                  <line x1={sx(t)} x2={sx(t)} y1={sy(0.2)} y2={sy(0.85)} stroke="#e5e5e5" />
                  <text x={sx(0.2) - 6} y={sy(t)} textAnchor="end" dominantBaseline="middle" className="fill-muted text-[11px]">
                    {t.toFixed(1)}
                  </text>
                  <text x={sx(t)} y={sy(0.2) + 16} textAnchor="middle" className="fill-muted text-[11px]">
                    {t.toFixed(1)}
                  </text>
                </g>
              ))}
              <text x={sx(0.85)} y={S - 4} textAnchor="end" className="fill-muted text-[11px]">
                Doc {docs[xDoc]} →
              </text>
              <text x={8} y={sy(0.85)} className="fill-muted text-[11px]" dominantBaseline="middle">
                ↑ Doc {docs[yDoc]}
              </text>

              <path d={stair} fill="none" stroke={BLUE} strokeWidth={2} strokeDasharray="0" opacity={0.5} strokeLinejoin="round" />

              {pts.map(([x, y], i) => (
                <g
                  key={prompts[i]}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(i)}
                  className="cursor-default"
                >
                  <circle cx={sx(x)} cy={sy(y)} r={14} fill="transparent" />
                  <circle
                    cx={sx(x)}
                    cy={sy(y)}
                    r={active === i ? 8 : 6}
                    fill={front2d[i] ? BLUE : GRAY}
                    stroke="#fafafa"
                    strokeWidth={2}
                  />
                  <text x={sx(x) + 10} y={sy(y) - 8} className="fill-foreground font-mono text-[11px]">
                    {prompts[i]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="flex flex-col justify-center gap-4 text-sm">
            <p className="flex items-center gap-2 text-muted">
              <span className="h-3 w-3 rounded-full" style={{ background: BLUE }} /> On the frontier: kept
            </p>
            <p className="flex items-center gap-2 text-muted">
              <span className="h-3 w-3 rounded-full" style={{ background: GRAY }} /> Dominated: dropped
            </p>
            <p className="min-h-16 rounded-lg border border-border bg-white p-3 leading-relaxed text-foreground" aria-live="polite">
              {status}
            </p>
            <p className="text-xs leading-relaxed text-muted">
              Try other document pairs. With all six documents at once, only {prompts.filter((_, i) => !onFront[i]).join(", ")} is
              dominated.
            </p>
          </div>
        </div>
      </div>

      {/* c. Parent selection */}
      <div>
        <SubHeading letter="c" title="Pick the next parent by how many documents it wins">
          Each frontier prompt gets one vote per document where it scores best. A small bonus
          keeps zero-win prompts in play, so the search doesn&apos;t collapse onto a single idea.
        </SubHeading>
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground">Chance of being chosen as the next parent</p>
            <IllustrativeBadge />
          </div>
          <ul className="space-y-3">
            {prompts.map((p, i) => {
              const pct = totalWeight ? (weights[i] / totalWeight) * 100 : 0;
              return (
                <li
                  key={p}
                  className={cn(
                    "grid grid-cols-[2.5rem_1fr_3rem] items-center gap-3 transition-opacity",
                    active !== null && active !== i && "opacity-40",
                  )}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span className="font-mono text-xs font-medium text-foreground">{p}</span>
                  <div className="relative h-6 rounded-md bg-white">
                    {pct > 0 && (
                      <div
                        className="h-full rounded-r-md"
                        style={{ width: `${pct}%`, background: BLUE, opacity: wins[i] > 0 ? 1 : 0.45 }}
                      />
                    )}
                    <span className="absolute inset-y-0 left-2 flex items-center text-xs text-muted" style={{ left: `calc(${pct}% + 0.5rem)` }}>
                      {!onFront[i]
                        ? "dominated, not eligible"
                        : wins[i] > 0
                          ? `wins ${wins[i]} doc${wins[i] > 1 ? "s" : ""}`
                          : "0 wins, exploration bonus"}
                    </span>
                  </div>
                  <span className="text-right text-xs font-medium text-foreground tabular-nums">{Math.round(pct)}%</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted">
            <span className="font-medium text-foreground">Then:</span>{" "}the reflection step studies one of the
            parent&apos;s two weakest documents, picked at random, so the loop doesn&apos;t keep fixing the same failure.
          </p>
        </div>
      </div>
    </div>
  );
}
