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
        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:gap-8">
          {site.projects.map((project) => (
            <Reveal key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
