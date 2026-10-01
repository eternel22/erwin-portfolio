import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import type { ProjectEntry } from "@/types/content";

type SectionRef = { id: string; label: string };

export function IllustrativeBadge() {
  return (
    <span className="rounded-full border border-dashed border-border px-2.5 py-0.5 text-xs text-muted">
      Illustrative example
    </span>
  );
}

export function CaseStudySection({
  sections,
  id,
  title,
  lead,
  children,
}: {
  sections: SectionRef[];
  id: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  const index = sections.findIndex((s) => s.id === id);
  return (
    <section id={id} className="scroll-mt-24">
      <p className="mb-2 text-sm font-medium tracking-wide text-accent uppercase">
        {String(index + 1).padStart(2, "0")} · {sections[index].label}
      </p>
      <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      {lead && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

// Hero, sticky section index and the column that holds the sections.
export function CaseStudyShell({
  project,
  tagline,
  tldr,
  stats,
  sections,
  children,
}: {
  project: ProjectEntry;
  tagline: string;
  tldr: string;
  stats: { value: string; label: string }[];
  sections: SectionRef[];
  children: React.ReactNode;
}) {
  return (
    <article>
      <div className="border-b border-border">
        <Container className="py-16 sm:py-20">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to projects
          </Link>
          {project.org && (
            <p className="mb-2 text-sm font-medium tracking-wide text-accent uppercase">{project.org}</p>
          )}
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 text-sm text-muted">{tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90 sm:text-xl">{tldr}</p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-surface p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">{s.value}</dd>
                <dd className="mt-1 text-sm leading-relaxed text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Container>
      </div>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[9rem_minmax(0,1fr)]">
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-24 space-y-2 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex gap-2 text-muted transition-colors hover:text-foreground">
                  <span className="text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-24">{children}</div>
      </Container>
    </article>
  );
}
