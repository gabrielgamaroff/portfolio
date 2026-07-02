import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/data/site";

export function About() {
  const [lead, ...rest] = site.about;
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="What I do" />
      <div className="max-w-[720px] space-y-5">
        <p className="text-xl leading-relaxed text-ink/90">{lead}</p>
        {rest.map((paragraph) => (
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
