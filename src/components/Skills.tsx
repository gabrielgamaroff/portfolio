import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/data/site";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Skills" title="What I work with" />
      <div className="space-y-10">
        {site.skills.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-faint">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-sm text-muted backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
