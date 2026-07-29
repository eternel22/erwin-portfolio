import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { awards, interests, languagesSpoken } from "@/content/additionalInfo";

export function AdditionalInfo() {
  return (
    <section id="additional-info" className="scroll-mt-16">
      <Container className="py-20 sm:py-24">
        <SectionHeading eyebrow="More" title="Additional information" />
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
              Awards
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-foreground/90">
              {awards.map((award) => (
                <li key={award.id}>
                  {award.title}
                  {award.year && <span className="text-muted"> · {award.year}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
              Languages
            </h3>
            <ul className="space-y-2 text-sm text-foreground/90">
              {languagesSpoken.map((entry) => (
                <li key={entry.language}>
                  {entry.language} <span className="text-muted">— {entry.level}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
              Interests
            </h3>
            <ul className="space-y-2 text-sm text-foreground/90">
              {interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
