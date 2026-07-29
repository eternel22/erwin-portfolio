import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EducationCard } from "@/components/ui/EducationCard";
import { education } from "@/content/education";

export function Education() {
  return (
    <section id="education" className="scroll-mt-16 border-b border-border">
      <Container className="py-20 sm:py-24">
        <SectionHeading eyebrow="Education" title="Academic background" />
        <div className="space-y-6">
          {education.map((entry) => (
            <EducationCard key={entry.id} entry={entry} />
          ))}
        </div>
      </Container>
    </section>
  );
}
