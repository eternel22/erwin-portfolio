import { ArrowUpRight, Check } from "lucide-react";
import { eyCaseStudy as cs } from "@/content/caseStudies/ey";
import type { ProjectEntry } from "@/types/content";
import { LoopDiagram } from "../LoopDiagram";
import { CaseStudySection, CaseStudyShell } from "../shared";
import { ClassBalance } from "./ClassBalance";
import { ConfusionMatrix } from "./ConfusionMatrix";
import { FineTuneFlow } from "./FineTuneFlow";
import { NeighborPicker } from "./NeighborPicker";
import { PatchStride } from "./PatchStride";
import { SatelliteScene } from "./SatelliteScene";

function Section(props: Omit<React.ComponentProps<typeof CaseStudySection>, "sections">) {
  return <CaseStudySection sections={cs.sections} {...props} />;
}

function SubHeading({ letter, title, children }: { letter: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 max-w-2xl">
      <h3 className="flex items-baseline gap-2 text-lg font-semibold text-foreground">
        <span className="text-sm font-medium text-accent">{letter}</span>
        {title}
      </h3>
      <p className="mt-1.5 leading-relaxed text-muted">{children}</p>
    </div>
  );
}

export function EyCaseStudy({ project }: { project: ProjectEntry }) {
  return (
    <CaseStudyShell project={project} tagline={cs.tagline} tldr={cs.tldr} stats={cs.stats} sections={cs.sections}>
      <Section id="problem" title="After a hurricane, find the damaged buildings fast" lead={cs.problem.caption}>
        <SatelliteScene classes={cs.problem.classes} />
      </Section>

      <Section id="dataset" title="Choosing which patches are worth labeling" lead={cs.dataset.caption}>
        <div className="space-y-16">
          <div>
            <SubHeading letter="a" title={cs.dataset.stride.title}>
              {cs.dataset.stride.body}
            </SubHeading>
            <PatchStride modes={cs.dataset.stride.modes} />
          </div>
          <div>
            <SubHeading letter="b" title={cs.dataset.neighbors.title}>
              {cs.dataset.neighbors.body}
            </SubHeading>
            <NeighborPicker k={cs.dataset.neighbors.k} features={cs.dataset.neighbors.features} />
          </div>
        </div>
      </Section>

      <Section id="annotation" title="Let a small model do the first pass" lead={cs.annotation.caption}>
        <LoopDiagram steps={cs.annotation.steps} centerTitle="Labels" centerNote="more with every round" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {cs.annotation.hints.map((h) => (
            <div key={h.title} className="rounded-2xl border border-border p-5">
              <p className="font-medium text-foreground">{h.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="model" title="Fine-tuning Co-DETR" lead={cs.model.caption}>
        <FineTuneFlow flow={cs.model.flow} />
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {cs.model.chips.map((c) => (
            <li key={c} className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="results" title="Good at finding buildings, weaker on rare classes" lead={cs.results.caption}>
        <div className="space-y-6">
          <ConfusionMatrix {...cs.results.confusion} />
          <ClassBalance rows={cs.results.balance} note={cs.results.balanceNote} />
        </div>
      </Section>

      <Section id="takeaways" title="What I learned">
        <div className="grid gap-4 sm:grid-cols-3">
          {cs.takeaways.map((t, i) => (
            <div key={t.title} className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm font-medium text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-semibold text-foreground">{t.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-border p-5">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Publication</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">{cs.paper.citation}</p>
          <a
            href={cs.paper.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
          >
            Read the paper on IEEE Xplore
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </Section>
    </CaseStudyShell>
  );
}
