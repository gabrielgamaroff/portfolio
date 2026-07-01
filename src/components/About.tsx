import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="py-[clamp(80px,12vw,128px)]">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="About" title="What I do" />
          <div className="max-w-[720px] space-y-5">
            {site.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
