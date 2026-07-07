import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/data/site";

export function About() {
  const [lead, ...rest] = site.about;
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="What I do" />
      <div className="max-w-[720px] space-y-5">
        <p className="text-lg leading-relaxed text-ink/90 sm:text-xl">{lead}</p>
        {rest.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="text-base leading-relaxed text-muted sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
