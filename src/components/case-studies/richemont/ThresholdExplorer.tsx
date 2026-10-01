"use client";

import { useId, useState } from "react";
import { IllustrativeBadge } from "../shared";

type Dist = { mean: number; sd: number };
type Props = { ok: Dist; ko: Dist; koTarget: number };

const BLUE = "#2a78d6";
const ORANGE = "#eb6834";

const W = 480;
const H = 220;
const PAD = { top: 22, side: 16, bottom: 34 };
const BASE = H - PAD.bottom;
const Y_MAX = 3.6;

const x = (s: number) => PAD.side + s * (W - 2 * PAD.side);
const y = (d: number) => BASE - (d / Y_MAX) * (BASE - PAD.top);

const pdf = (s: number, { mean, sd }: Dist) => Math.exp(-0.5 * ((s - mean) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));

// Normal CDF (Abramowitz-Stegun erf approximation).
function cdf(s: number, { mean, sd }: Dist) {
  const z = (s - mean) / (sd * Math.SQRT2);
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const erf =
    1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z);
  return 0.5 * (1 + (z >= 0 ? erf : -erf));
}

// Rounded so server and client render identical strings.
function curve(d: Dist) {
  return Array.from({ length: 101 })
    .map((_, i) => `${x(i / 100).toFixed(1)},${y(pdf(i / 100, d)).toFixed(1)}`)
    .join(" L ");
}

// Threshold at which the given share of KO pieces falls below it.
function thresholdFor(ko: Dist, share: number) {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (cdf(mid, ko) < share) lo = mid;
    else hi = mid;
  }
  return Math.round(lo * 1000);
}

export function ThresholdExplorer({ ok, ko, koTarget }: Props) {
  const preset = thresholdFor(ko, koTarget);
  const [value, setValue] = useState(preset);
  const clipId = useId();

  const t = value / 1000;
  const koThrough = Math.round(cdf(t, ko) * 100);
  const okAccepted = Math.round(cdf(t, ok) * 100);
  const okPath = curve(ok);
  const koPath = curve(ko);
  const area = (p: string) => `M ${x(0)},${BASE} L ${p} L ${x(1)},${BASE} Z`;

  return (
    <figure className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">Anomaly scores on a test set</span>
        <IllustrativeBadge />
      </figcaption>

      <div className="mx-auto max-w-xl">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Two score distributions: good pieces score low, defective pieces score high. With the threshold at ${t.toFixed(2)}, ${koThrough}% of defective pieces fall below it and ${okAccepted}% of good pieces are accepted.`}
        >
          <defs>
            <clipPath id={clipId}>
              <rect x={0} y={0} width={x(t)} height={H} />
            </clipPath>
          </defs>

          <path d={area(okPath)} fill={BLUE} opacity={0.15} />
          <path d={area(koPath)} fill={ORANGE} opacity={0.15} />
          {/* Defects that slip under the threshold. */}
          <path d={area(koPath)} fill={ORANGE} opacity={0.75} clipPath={`url(#${clipId})`} />
          <path d={`M ${okPath}`} fill="none" stroke={BLUE} strokeWidth={2} />
          <path d={`M ${koPath}`} fill="none" stroke={ORANGE} strokeWidth={2} />

          <line x1={x(0)} x2={x(1)} y1={BASE} y2={BASE} stroke="#d4d4d4" />
          <line x1={x(t)} x2={x(t)} y1={PAD.top - 8} y2={BASE} stroke="#171717" strokeWidth={1.5} />

          <text x={x(ok.mean)} y={y(pdf(ok.mean, ok)) - 8} textAnchor="middle" className="fill-foreground text-[13px] font-medium">
            OK pieces
          </text>
          <text x={x(ko.mean) + 14} y={y(pdf(ko.mean, ko)) - 8} textAnchor="middle" className="fill-foreground text-[13px] font-medium">
            Defective pieces
          </text>
          <text x={x(0)} y={H - 10} className="fill-muted text-[12px]">
            looks normal
          </text>
          <text x={x(1)} y={H - 10} textAnchor="end" className="fill-muted text-[12px]">
            anomaly score →
          </text>
        </svg>

        <input
          type="range"
          min={100}
          max={900}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Decision threshold"
          className="mt-2 w-full accent-accent"
        />
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <span>Drag to move the threshold. Left of it is accepted, right of it goes to an inspector.</span>
          <button
            type="button"
            onClick={() => setValue(preset)}
            className="rounded-md border border-border bg-white px-2 py-1 text-foreground"
          >
            Reset to {Math.round(koTarget * 100)}% KO
          </button>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2" aria-live="polite">
        <div className="rounded-lg border border-border bg-white p-3">
          <dd className="text-2xl font-semibold text-foreground tabular-nums">{koThrough}%</dd>
          <dt className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: ORANGE }} />
            of defective pieces slip through
          </dt>
        </div>
        <div className="rounded-lg border border-border bg-white p-3">
          <dd className="text-2xl font-semibold text-foreground tabular-nums">{okAccepted}%</dd>
          <dt className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: BLUE }} />
            of good pieces need no human look
          </dt>
        </div>
      </dl>
    </figure>
  );
}
