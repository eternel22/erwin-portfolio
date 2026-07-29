import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-b border-border">
      <Container className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          subtitle="Research and industry roles applying ML and analytics to real operational problems."
        />
        <div>
          {experience.map((entry) => (
            <ExperienceCard key={entry.id} entry={entry} />
          ))}
        </div>
      </Container>
    </section>
  );
}
