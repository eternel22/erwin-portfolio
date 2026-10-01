const C = 160;
const R = 112;

export function LoopDiagram({ steps }: { steps: { name: string; body: string }[] }) {
  const angle = (k: number) => ((-90 + (k * 360) / steps.length) * Math.PI) / 180;
  const at = (a: number, r = R) => [C + r * Math.cos(a), C + r * Math.sin(a)];

  return (
    <div className="grid items-center gap-8 rounded-2xl border border-border bg-surface p-4 sm:p-8 md:grid-cols-[minmax(0,20rem)_1fr]">
      <svg viewBox="0 0 320 320" className="mx-auto h-auto w-full max-w-xs" role="img" aria-label="A loop of five steps: Extract, Evaluate, Reflect, Mutate, Select, then back to Extract.">
        <circle cx={C} cy={C} r={R} fill="none" stroke="#d4d4d4" strokeWidth={2} />
        {steps.map((_, k) => {
          const mid = angle(k + 0.5);
          const [x, y] = at(mid);
          const rot = (mid * 180) / Math.PI + 90;
          return <path key={k} d="M -6 -5 L 4 0 L -6 5 Z" fill="#a3a3a3" transform={`translate(${x} ${y}) rotate(${rot})`} />;
        })}
        {steps.map((s, k) => {
          const [x, y] = at(angle(k));
          return (
            <g key={s.name}>
              <rect x={x - 44} y={y - 17} width={88} height={34} rx={17} fill="#ffffff" stroke="#4338ca" strokeWidth={1.5} />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central" className="fill-foreground text-[13px] font-semibold">
                {s.name}
              </text>
            </g>
          );
        })}
        <text x={C} y={C - 8} textAnchor="middle" className="fill-foreground text-[15px] font-semibold">
          Prompt
        </text>
        <text x={C} y={C + 12} textAnchor="middle" className="fill-muted text-[11px]">
          the only thing that changes
        </text>
      </svg>

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
    </div>
  );
}
