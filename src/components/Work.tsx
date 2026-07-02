import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { site } from "@/data/site";

export function Work() {
  return (
    <section id="work" className="relative min-h-[100dvh] py-28">
      <Container>
        <SectionHeading eyebrow="Work" title="Selected projects" />
        <div className="space-y-8 md:space-y-12">
          {site.projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} reversed={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
