import type { EducationEntry } from "@/types/content";

export function EducationCard({ entry }: { entry: EducationEntry }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="font-semibold text-foreground">{entry.institution}</h3>
        <p className="text-sm whitespace-nowrap text-muted">{entry.dateRange}</p>
      </div>
      <p className="mt-1 text-sm text-muted">
        {entry.degree} · {entry.location}
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-foreground/90">
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
