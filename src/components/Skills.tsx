import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/data/site";

export function Skills() {
  return (
    <section id="skills" className="py-[clamp(80px,12vw,128px)]">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Skills" title="What I work with" />
        </Reveal>
        <div className="space-y-10">
          {site.skills.map((group) => (
            <Reveal key={group.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-faint">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
