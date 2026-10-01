import { ArrowDown, ArrowRight } from "lucide-react";

function ScannedPage({ code, className }: { code: string; className?: string }) {
  return (
    <div className={`w-36 rounded-md border border-border bg-white p-3 shadow-sm ${className ?? ""}`}>
      <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent">{code}</span>
      <div className="mt-3 space-y-1.5">
        {[90, 70, 80, 55].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-neutral-200" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-1.5 rounded-sm bg-neutral-200" />
        ))}
      </div>
    </div>
  );
}

const JSON_LINES: [number, string, string?][] = [
  [0, "{"],
  [1, '"prefix": ', '"CSI",'],
  [1, '"header": { "vin": ', '"WBA…", "ro_number": 629903 },'],
  [1, '"content": {'],
  [2, '"labor": ', "[ {…}, {…}, {…} ],"],
  [2, '"parts": ', "[ {…}, {…} ]"],
  [1, "},"],
  [1, '"footer": { "total_charges": ', "1284.6 }"],
  [0, "}"],
];

export function DocToJson({ codes }: { codes: string[] }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8 md:flex-row md:justify-center md:gap-8">
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-44 w-48">
          <ScannedPage code={codes[2]} className="absolute top-0 left-0 -rotate-6 opacity-70" />
          <ScannedPage code={codes[1]} className="absolute top-2 left-5 rotate-2 opacity-90" />
          <ScannedPage code={codes[0]} className="absolute top-4 left-10 -rotate-1" />
        </div>
        <div className="flex flex-wrap justify-center gap-1">
          {codes.map((c) => (
            <span key={c} className="rounded border border-border bg-white px-1.5 py-0.5 font-mono text-[10px] text-muted">
              {c}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted">Multi-page scanned PDF</p>
      </div>

      <ArrowRight className="hidden h-6 w-6 shrink-0 text-accent md:block" aria-hidden />
      <ArrowDown className="h-6 w-6 shrink-0 text-accent md:hidden" aria-hidden />

      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <pre className="w-full overflow-x-auto rounded-xl bg-neutral-900 p-4 font-mono text-[11px] leading-5 text-neutral-300">
          {JSON_LINES.map(([indent, key, val], i) => (
            <div key={i} style={{ paddingLeft: `${indent * 14}px` }}>
              {key}
              {val && <span className="text-sky-300">{val}</span>}
            </div>
          ))}
        </pre>
        <p className="text-xs text-muted">Structured JSON, one object per section</p>
      </div>
    </div>
  );
}
