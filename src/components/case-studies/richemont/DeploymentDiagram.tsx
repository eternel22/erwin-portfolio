import { ArrowDown, ArrowRight, Camera, Cpu } from "lucide-react";

const JSON_LINES: [number, string, string?][] = [
  [0, "{"],
  [1, '"anomaly_score": ', "0.82,"],
  [1, '"prediction": ', '"KO"'],
  [0, "}"],
];

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1 text-xs text-muted">
      {label}
      <ArrowRight className="hidden h-6 w-6 text-accent md:block" aria-hidden />
      <ArrowDown className="h-6 w-6 text-accent md:hidden" aria-hidden />
    </div>
  );
}

export function DeploymentDiagram() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8 md:flex-row md:justify-center md:gap-5">
      <div className="w-full max-w-[13rem] rounded-xl border border-border bg-white p-4 text-center">
        <Camera className="mx-auto h-6 w-6 text-accent" aria-hidden />
        <p className="mt-2 text-sm font-medium text-foreground">Acquisition machine</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">Takes aligned, evenly lit images of each piece</p>
      </div>

      <Arrow label="image" />

      <div className="w-full max-w-[15rem] rounded-xl border border-border bg-white p-4">
        <p className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
          <Cpu className="h-5 w-5 text-accent" aria-hidden />
          GPU computer
        </p>
        <div className="mt-3 rounded-lg border border-dashed border-border p-3">
          <p className="text-center text-[11px] tracking-wide text-muted uppercase">Docker container</p>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {["FastAPI", "Pydantic", "Model"].map((c) => (
              <span key={c} className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                {c}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-xs leading-relaxed text-muted">Inference runs locally, next to the line</p>
      </div>

      <Arrow label="reply" />

      <div className="flex w-full max-w-[15rem] flex-col items-center gap-3">
        <pre className="w-full overflow-x-auto rounded-xl bg-neutral-900 p-4 font-mono text-[11px] leading-5 text-neutral-300">
          {JSON_LINES.map(([indent, key, val], i) => (
            <div key={i} style={{ paddingLeft: `${indent * 14}px` }}>
              {key}
              {val && <span className="text-sky-300">{val}</span>}
            </div>
          ))}
        </pre>
        <p className="text-center text-xs text-muted">Score and decision in a validated, structured format (illustrative)</p>
      </div>
    </div>
  );
}
