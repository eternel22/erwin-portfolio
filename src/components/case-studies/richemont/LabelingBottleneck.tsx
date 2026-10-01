import { ArrowRight, Repeat } from "lucide-react";

function StepChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center rounded-md border border-border bg-white px-2 text-xs text-foreground">
      {children}
    </span>
  );
}

export function LabelingBottleneck({ supervised }: { supervised: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-border p-5">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">Supervised classifier</p>
        <p className="mt-1 font-medium text-foreground">A new dataset for every part</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {supervised.map((s, i) => (
            <span key={s} className="inline-flex items-center gap-2">
              {i > 0 && <ArrowRight className="h-4 w-4 text-muted" aria-hidden />}
              <StepChip>{s}</StepChip>
            </span>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <Repeat className="h-4 w-4 text-muted" aria-hidden />
          Repeat for each component. Months every time
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Defects are rare and hard to label consistently. When the model underperforms, data scientists
          and factory staff have to dig through the labels together.
        </p>
      </div>

      <div className="rounded-2xl border border-accent/40 bg-accent/[0.03] p-5">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">Anomaly detection</p>
        <p className="mt-1 font-medium text-foreground">One recipe for any part</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <StepChip>A few dozen images</StepChip>
          <ArrowRight className="h-4 w-4 text-muted" aria-hidden />
          <StepChip>Detector</StepChip>
        </div>
        <p className="mt-4 text-sm font-medium text-foreground">No defect labels. Much faster to start</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          The model learns what normal looks like, mostly from acceptable pieces. The factory can set it
          up on a new component without a data science team in the loop.
        </p>
      </div>
    </div>
  );
}
