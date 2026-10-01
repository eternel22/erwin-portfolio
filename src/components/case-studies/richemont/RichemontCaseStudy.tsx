import { Camera, Check, Clock, Scale } from "lucide-react";
import { richemontCaseStudy as cs } from "@/content/caseStudies/richemont";
import type { ProjectEntry } from "@/types/content";
import { CaseStudySection, CaseStudyShell } from "../shared";
import { DeploymentDiagram } from "./DeploymentDiagram";
import { LabelingBottleneck } from "./LabelingBottleneck";
import { MemoryBankCleaner } from "./MemoryBankCleaner";
import { PatchPipeline } from "./PatchPipeline";
import { ThresholdExplorer } from "./ThresholdExplorer";
import { TilingExplorer } from "./TilingExplorer";

const CHIP_ICONS = [Clock, Scale, Camera];

function Section(props: Omit<React.ComponentProps<typeof CaseStudySection>, "sections">) {
  return <CaseStudySection sections={cs.sections} {...props} />;
}

function NamedCards({ items }: { items: { name: string; body: string }[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-3">
      {items.map((c) => (
        <li key={c.name} className="rounded-xl border border-border p-4 text-sm">
          <p className="font-mono text-xs font-semibold text-accent">{c.name}</p>
          <p className="mt-1.5 leading-relaxed text-muted">{c.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function RichemontCaseStudy({ project }: { project: ProjectEntry }) {
  return (
    <CaseStudyShell project={project} tagline={cs.tagline} tldr={cs.tldr} stats={cs.stats} sections={cs.sections}>
      <Section id="problem" title="Every new component meant a new labeled dataset" lead={cs.problem.caption}>
        <LabelingBottleneck supervised={cs.problem.supervised} />
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

      <Section id="idea" title="Learn what normal looks like. Flag what is far from it" lead={cs.idea.caption}>
        <PatchPipeline steps={cs.idea.steps} patches={cs.idea.patches} />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{cs.idea.alternative}</p>
      </Section>

      <Section id="catch" title={"The \"clean\" training set wasn't clean"} lead={cs.catch.caption}>
        <MemoryBankCleaner steps={cs.catch.steps} assumption={cs.catch.assumption} />
      </Section>

      <Section id="results" title="A few dozen images, no labels, clear separation" lead={cs.results.caption}>
        <ThresholdExplorer {...cs.results.threshold} />
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{cs.results.recollection}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {cs.results.achieved.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tradeoff" title="More detail isn't free" lead={cs.tradeoff.caption}>
        <TilingExplorer options={cs.tradeoff.tiling} />
        <NamedCards items={cs.tradeoff.backbones} />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{cs.tradeoff.tracking}</p>
      </Section>

      <Section id="production" title="A small service next to the machine" lead={cs.production.caption}>
        <DeploymentDiagram />
        <NamedCards items={cs.production.chips} />
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
