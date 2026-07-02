import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { site } from "@/data/site";

export function Work() {
  return (
    <section id="work" className="relative min-h-[100dvh] py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Work" title="Selected projects" />
        </Reveal>
        <div className="space-y-6 md:space-y-8">
          {site.projects.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
