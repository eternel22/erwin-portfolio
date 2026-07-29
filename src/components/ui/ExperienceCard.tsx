import type { ExperienceEntry } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

export function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="relative border-l border-border pb-10 pl-6 last:pb-0 sm:pl-8">
      <div className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-accent" />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div>
          <h3 className="font-semibold text-foreground">{entry.org}</h3>
          <p className="text-sm text-muted">
            {entry.role} · {entry.location}
          </p>
        </div>
        <p className="text-sm whitespace-nowrap text-muted">{entry.dateRange}</p>
      </div>
      <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-foreground/90">
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {entry.tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </div>
  );
}
