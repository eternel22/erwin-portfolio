import Link from "next/link";
import { ArrowLeft, Check, FileImage, Layers, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { bmwCaseStudy as cs } from "@/content/caseStudies/bmw";
import type { ProjectEntry } from "@/types/content";
import { DocToJson } from "./DocToJson";
import { EvaluatorTrace } from "./EvaluatorTrace";
import { FrontGrowth } from "./FrontGrowth";
import { LoopDiagram } from "./LoopDiagram";
import { ParetoExplorer } from "./ParetoExplorer";
import { ScoreChart } from "./ScoreChart";

const CHIP_ICONS = [FileImage, Layers, Lock];

function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  const index = cs.sections.findIndex((s) => s.id === id);
  return (
    <section id={id} className="scroll-mt-24">
      <p className="mb-2 text-sm font-medium tracking-wide text-accent uppercase">
        {String(index + 1).padStart(2, "0")} · {cs.sections[index].label}
      </p>
      <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      {lead && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function BmwCaseStudy({ project }: { project: ProjectEntry }) {
  return (
    <article>
      {/* Hero */}
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
          <p className="mt-3 text-sm text-muted">{cs.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90 sm:text-xl">{cs.tldr}</p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {cs.stats.map((s) => (
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
        {/* Section index (desktop) */}
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-24 space-y-2 text-sm">
            {cs.sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex gap-2 text-muted transition-colors hover:text-foreground">
                  <span className="text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-24">
          <Section id="problem" title="Scanned PDFs in, structured JSON out" lead={cs.problem.caption}>
            <DocToJson codes={cs.problem.sectionCodes} />
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {cs.problem.chips.map((c, i) => {
                const Icon = CHIP_ICONS[i];
                return (
                  <li key={c} className="flex items-center gap-3 rounded-xl border border-border p-4 text-sm text-foreground">
                    <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                    {c}
                  </li>
                );
              })}
            </ul>
          </Section>

          <Section id="loop" title="The model stays frozen. Only the prompt evolves" lead={cs.loop.caption}>
            <LoopDiagram steps={cs.loop.steps} />
          </Section>

          <Section id="evaluator" title="A score isn't enough. The grader has to explain the mistake" lead={cs.evaluator.caption}>
            <EvaluatorTrace trace={cs.evaluator.trace} diagnosis={cs.evaluator.diagnosis} weights={cs.evaluator.weights} />
          </Section>

          <Section
            id="pareto"
            title="Why keep more than one prompt?"
            lead="Repair orders fail in different ways. A prompt that fixes warranty sections might break customer sections. Instead of crowning a single winner, GEPA keeps a Pareto frontier of prompts."
          >
            <ParetoExplorer {...cs.pareto} />
            <div className="mt-16">
              <h3 className="mb-5 max-w-2xl text-lg font-semibold text-foreground">
                <span className="mr-2 text-sm font-medium text-accent">d</span>
                Greedy replacement vs. a Pareto pool
              </h3>
              <FrontGrowth iterations={cs.iterations} />
            </div>
          </Section>

          <Section id="results" title="From 0.33 to 0.83 in five iterations">
            <ScoreChart data={cs.iterations} />
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{cs.resultsCaveat}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {cs.improved.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="takeaways" title="What I'd tell the next team">
            <div className="grid gap-4 sm:grid-cols-3">
              {cs.takeaways.map((t, i) => (
                <div key={t.title} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-sm font-medium text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-semibold text-foreground">{t.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </Container>
    </article>
  );
}
