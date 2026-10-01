import { ArrowDown, ArrowRight } from "lucide-react";

export function FineTuneFlow({ flow }: { flow: { title: string; body: string }[] }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8 md:flex-row md:items-stretch md:justify-center md:gap-5">
      {flow.map((f, i) => (
        <div key={f.title} className="contents">
          {i > 0 && (
            <div className="flex shrink-0 items-center">
              <ArrowRight className="hidden h-6 w-6 text-accent md:block" aria-hidden />
              <ArrowDown className="h-6 w-6 text-accent md:hidden" aria-hidden />
            </div>
          )}
          <div className="w-full max-w-[15rem] rounded-xl border border-border bg-white p-4">
            <p className="text-sm font-medium text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 font-semibold text-foreground">{f.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
