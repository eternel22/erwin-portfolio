import { ArrowRight } from "lucide-react";

const BLUE = "#2a78d6";

function PromptChip({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-md border px-2 font-mono text-xs ${
        muted ? "border-dashed border-border text-muted line-through" : "border-border bg-white text-foreground"
      }`}
    >
      {children}
    </span>
  );
}

export function FrontGrowth({ iterations }: { iterations: { iteration: number; front: number }[] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Greedy */}
        <div className="rounded-2xl border border-border p-5">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Greedy (our baseline)</p>
          <p className="mt-1 font-medium text-foreground">One prompt at a time</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <PromptChip>p1</PromptChip>
            <ArrowRight className="h-4 w-4 text-muted" aria-hidden />
            <PromptChip>p2</PromptChip>
            <ArrowRight className="h-4 w-4 text-muted" aria-hidden />
            <PromptChip>p3</PromptChip>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Each new prompt replaces the last one, even when it fixes one document and breaks another.
            What the old prompt did well is lost.
          </p>
        </div>

        {/* Pareto */}
        <div className="rounded-2xl border border-accent/40 bg-accent/[0.03] p-5">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">Pareto (GEPA)</p>
          <p className="mt-1 font-medium text-foreground">A pool of specialists</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <PromptChip>p1</PromptChip>
            <PromptChip>p2</PromptChip>
            <PromptChip>p3</PromptChip>
            <PromptChip muted>p0</PromptChip>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Every prompt that is best at something stays in the pool. Only prompts beaten everywhere
            are dropped, so nothing that worked is forgotten.
          </p>
        </div>
      </div>

      {/* Real evidence */}
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-medium text-foreground">In our run, the pool kept growing</p>
          <p className="text-xs text-muted">Prompts on the Pareto front, per iteration (6 BMW repair orders)</p>
        </div>
        <ol className="mt-6 grid grid-cols-5 items-end gap-2 sm:gap-4">
          {iterations.map((it) => (
            <li key={it.iteration} className="flex flex-col items-center gap-2">
              <div className="flex max-w-[4.5rem] flex-wrap-reverse justify-center gap-1">
                {Array.from({ length: it.front }).map((_, k) => (
                  <span key={k} className="h-3.5 w-3.5 rounded-full sm:h-4 sm:w-4" style={{ background: BLUE }} />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground tabular-nums">{it.front}</span>
              <span className="text-xs text-muted">Iter {it.iteration}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          By iteration 5, all five candidate prompts were non-dominated. Each one was the best on a
          different mix of documents.
        </p>
      </div>
    </div>
  );
}
