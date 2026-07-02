import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { SkillsExplorer } from "./SkillsExplorer";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Skills" title="What I work with" />
      <SkillsExplorer />
    </Section>
  );
}
