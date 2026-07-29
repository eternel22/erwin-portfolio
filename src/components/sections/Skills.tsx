import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsGrid } from "@/components/ui/SkillsGrid";
import { skills } from "@/content/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 border-b border-border">
      <Container className="py-20 sm:py-24">
        <SectionHeading eyebrow="Skills" title="Technical toolkit" />
        <SkillsGrid groups={skills} />
      </Container>
    </section>
  );
}
