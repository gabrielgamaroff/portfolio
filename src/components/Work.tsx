import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { site } from "@/data/site";

export function Work() {
  return (
    <section id="work" className="py-[clamp(80px,12vw,128px)]">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Work" title="Selected projects" />
        </Reveal>
        <div className="space-y-6 md:space-y-8">
          {site.projects.map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} reversed={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
