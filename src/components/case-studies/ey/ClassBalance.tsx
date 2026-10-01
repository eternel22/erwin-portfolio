type Row = { label: string; train: number; val: number; color: string };

export function ClassBalance({ rows, note }: { rows: Row[]; note: string }) {
  const max = Math.max(...rows.map((r) => r.train));

  return (
    <figure className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">Annotated buildings per class</span>
        <span className="text-xs text-muted">Bars: training set</span>
      </figcaption>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.label} className="grid items-center gap-x-3 gap-y-1 text-sm sm:grid-cols-[11rem_1fr]">
            <span className="text-muted">{r.label}</span>
            <div className="flex items-center gap-2">
              <div
                className="h-5 shrink-0 rounded-r-md"
                style={{ width: `${(r.train / max) * 78}%`, minWidth: 3, background: r.color }}
              />
              <span className="font-medium whitespace-nowrap text-foreground tabular-nums">
                {r.train.toLocaleString("en-US")}
                <span className="ml-1.5 font-normal text-muted">+ {r.val} val.</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted">{note}</p>
    </figure>
  );
}
