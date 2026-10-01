import { Check, MessageSquareText, X } from "lucide-react";

type Trace = { path: string; issue: string; detail: string; penalty: string; category: string };
type Weight = { label: string; value: number; color: string };

function Chip({ children, faded }: { children?: React.ReactNode; faded?: boolean }) {
  return (
    <span
      className={`inline-flex h-7 w-12 items-center justify-center rounded-md font-mono text-xs ${
        children ? "border border-border bg-white text-foreground" : "border border-dashed border-border text-muted"
      } ${faded ? "opacity-50" : ""}`}
    >
      {children ?? "–"}
    </span>
  );
}

function Pairing({ rows }: { rows: [string | null, string | null, boolean | string][] }) {
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-[3rem_1fr_3rem] gap-2 text-[11px] text-muted">
        <span className="text-center">Truth</span>
        <span />
        <span className="text-center">Model</span>
      </div>
      {rows.map(([a, b, ok], i) => (
        <div key={i} className="grid grid-cols-[3rem_1fr_3rem] items-center gap-2">
          <Chip>{a ?? undefined}</Chip>
          <span className="flex items-center gap-1">
            <span className="h-px flex-1 bg-border" />
            {ok === true ? (
              <Check className="h-4 w-4 text-foreground" aria-label="match" />
            ) : ok === false ? (
              <X className="h-4 w-4 text-foreground" aria-label="wrong pair" />
            ) : (
              <span className="text-[11px] whitespace-nowrap text-muted">{ok}</span>
            )}
            <span className="h-px flex-1 bg-border" />
          </span>
          <Chip>{b ?? undefined}</Chip>
        </div>
      ))}
    </div>
  );
}

export function EvaluatorTrace({ trace, diagnosis, weights }: { trace: Trace[]; diagnosis: string; weights: Weight[] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* Trace card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-neutral-900 text-neutral-200">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="font-mono text-xs text-neutral-400">evaluation report</span>
            <span className="rounded-full border border-dashed border-white/25 px-2.5 py-0.5 text-xs text-neutral-400">
              Illustrative example
            </span>
          </div>
          <div className="space-y-3 p-4 font-mono text-xs">
            <p>
              score <span className="text-white">0.41</span>
              <span className="text-neutral-500">{"  "}·{"  "}3 issues shown</span>
            </p>
            {trace.map((t) => (
              <div key={t.path} className="rounded-lg bg-white/5 p-3">
                <p className="flex flex-wrap justify-between gap-2">
                  <span className="text-sky-300">{t.path}</span>
                  <span className="text-neutral-400">
                    {t.penalty} {t.category}
                  </span>
                </p>
                <p className="mt-1 text-neutral-300">
                  <span className="mr-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] tracking-wide uppercase">{t.issue}</span>
                  {t.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 border-t border-white/10 bg-white/5 px-4 py-3 text-sm">
            <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
            <p>
              <span className="text-neutral-400">LLM diagnosis: </span>
              {diagnosis}
            </p>
          </div>
        </div>

        {/* Weights */}
        <div className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <p className="text-sm font-medium text-foreground">What the score is made of</p>
          <p className="mt-1 text-sm text-muted">BMW&apos;s scoring weights</p>
          <div className="mt-5 flex h-4 gap-0.5 overflow-hidden rounded-md">
            {weights.map((w) => (
              <div key={w.label} style={{ width: `${w.value}%`, background: w.color }} />
            ))}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {weights.map((w) => (
              <li key={w.label} className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-muted">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: w.color }} />
                  {w.label}
                </span>
                <span className="font-medium text-foreground tabular-nums">{w.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fixes */}
      <div>
        <p className="mb-1 font-medium text-foreground">Two fixes that made the grader fair</p>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted">
          Before these fixes, the loop was learning to please a flawed grader instead of reading documents better.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-5">
            <p className="font-medium text-foreground">Match sections by code, not by position</p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="mb-2 text-xs font-medium text-muted uppercase">Before</p>
                <Pairing rows={[["ASI", "ASI", true], ["BWO", "CSI", false], ["CSI", "JSI", false]]} />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted uppercase">After</p>
                <Pairing rows={[["ASI", "ASI", true], ["BWO", null, "missing"], ["CSI", "CSI", true], [null, "JSI", "extra"]]} />
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              One section out of order used to make every section after it look wrong.
            </p>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <p className="font-medium text-foreground">Normalize numbers before comparing</p>
            <div className="mt-4 space-y-3 font-mono text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-14 font-sans text-xs font-medium text-muted uppercase">Before</span>
                <span className="rounded-md border border-border bg-white px-2 py-1">&quot;10.50&quot;</span>
                <span className="text-muted">≠</span>
                <span className="rounded-md border border-border bg-white px-2 py-1">10.5</span>
                <X className="h-4 w-4 text-foreground" aria-label="counted as an error" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-14 font-sans text-xs font-medium text-muted uppercase">After</span>
                <span className="rounded-md border border-border bg-white px-2 py-1">10.5</span>
                <span className="text-muted">=</span>
                <span className="rounded-md border border-border bg-white px-2 py-1">10.5</span>
                <Check className="h-4 w-4 text-foreground" aria-label="match" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Formatting slips no longer drown out real extraction errors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

