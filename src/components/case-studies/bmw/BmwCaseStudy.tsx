import { Check, FileImage, Layers, Lock } from "lucide-react";
import { bmwCaseStudy as cs } from "@/content/caseStudies/bmw";
import type { ProjectEntry } from "@/types/content";
import { CaseStudySection, CaseStudyShell } from "../shared";
import { DocToJson } from "./DocToJson";
import { EvaluatorTrace } from "./EvaluatorTrace";
import { FrontGrowth } from "./FrontGrowth";
import { LoopDiagram } from "./LoopDiagram";
import { ParetoExplorer } from "./ParetoExplorer";
import { ScoreChart } from "./ScoreChart";

const CHIP_ICONS = [FileImage, Layers, Lock];

function Section(props: Omit<React.ComponentProps<typeof CaseStudySection>, "sections">) {
  return <CaseStudySection sections={cs.sections} {...props} />;
}

export function BmwCaseStudy({ project }: { project: ProjectEntry }) {
  return (
    <CaseStudyShell project={project} tagline={cs.tagline} tldr={cs.tldr} stats={cs.stats} sections={cs.sections}>
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
    </CaseStudyShell>
  );
}
