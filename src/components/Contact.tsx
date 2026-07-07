import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { ContactDialog } from "./ContactDialog";
import { site } from "@/data/site";

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading eyebrow="Contact" title="Get in touch" />
      <p className="max-w-[640px] text-lg leading-relaxed text-muted">
        The fastest way to reach me is email. I&apos;m open to remote roles, US
        based on Eastern time, and available from early August.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <ContactDialog>
          <button className="cursor-pointer rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-2">
            Email me
          </button>
        </ContactDialog>
        {site.linkedin && (
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            LinkedIn →
          </a>
        )}
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          GitHub →
        </a>
      </div>
    </Section>
  );
}
