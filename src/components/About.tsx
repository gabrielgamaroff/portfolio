import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/data/site";

export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="What I do" />
      <div className="max-w-[720px] space-y-5">
        {site.about.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="text-lg leading-relaxed text-muted"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
