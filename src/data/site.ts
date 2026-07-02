export type ProjectLink = {
  live?: string;
  note?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  category: string;
  description: string;
  contributions: string[];
  tech: string[];
  /** Path under /public, e.g. "/work/skrumrunner.png". Null renders a placeholder. */
  image: string | null;
  /** Montage images for the modal (paths under /public). Missing entries render placeholders. */
  gallery?: string[];
  links: ProjectLink;
};

export type SkillArea = {
  id: string;
  label: string;
  blurb: string;
  items: string[];
};

export const site = {
  name: "Gabriel Gamaroff",
  role: "Full-Stack & Agentic Engineer",
  email: "gabriel@caqophony.com",
  github: "https://github.com/gabrielgamaroff",
  // TODO: set your real LinkedIn URL; leave empty to hide the link.
  linkedin: "",

  hero: {
    tagline: "Full-stack engineer building the layer where people and AI meet.",
    sub: "Four years and four shipped products at Caqophony, from multi-agent systems to streaming AI interfaces, on Next.js, React, and TypeScript.",
    status: "Open to remote roles · US, Eastern Time · No sponsorship needed",
  },

  about: [
    "I'm a full-stack and agentic engineer. For the last four years at Caqophony I've shipped four production products end to end, from the React interfaces people touch down through the APIs, the data, and the model layer underneath.",
    "My deepest work is in agentic systems: multi-agent pipelines that turn a plain intent into working software, the harnesses and evaluation loops that keep their output reliable, and the cost-aware model routing that makes them affordable to run. The throughline of that work is a conviction that quality lives in the system around the model, not the model itself. A good harness gets near-perfect output from whatever model is current, by constraining what the model is free to get wrong and treating every derivable decision as engineering rather than guesswork.",
    "The range is real too. I've built streaming AI interfaces, peer-to-peer marketplaces, commerce and payments, mapping and search, all on Next.js, React, and TypeScript with production discipline throughout. I move fast, I care about code that holds up under its own tests, and I stay close to where the tooling is heading, since most of what I reach for now is newer than a year old.",
  ],

  skillAreas: [
    {
      id: "frontend",
      label: "Frontend",
      blurb:
        "Where most of my time has gone. I build fast, accessible React interfaces, from streaming UIs that render a model's output live to complex filtering, search, maps, and motion. I'm comfortable owning the entire front end, from architecture and state management through to the finished, responsive production screen.",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Server Components",
        "Tailwind CSS",
        "Framer Motion",
        "Accessibility",
        "Virtualized lists",
      ],
    },
    {
      id: "backend",
      label: "Backend & Data",
      blurb:
        "The APIs, data, and integrations that sit behind the interface. I build REST and streaming endpoints, model both relational and document databases, and wire up authentication, payments, and third-party services, with strict runtime validation enforced at every boundary so bad data never gets far.",
      items: [
        "Node.js",
        "REST / SSE",
        "PostgreSQL",
        "Drizzle ORM",
        "Supabase",
        "Auth (JWT/OAuth)",
        "Stripe",
        "Zod",
      ],
    },
    {
      id: "ai",
      label: "AI & Agentic Systems",
      blurb:
        "My deepest area. I build multi-agent pipelines, the harnesses and evaluation loops that keep their output reliable, prompt and context engineering, tool use over MCP, and sandboxed execution with cost-aware routing. The point is to build the system around the model, so quality never depends on the one you run.",
      items: [
        "Multi-agent",
        "Harnesses",
        "Prompt engineering",
        "Evals",
        "Claude / OpenAI",
        "MCP",
        "E2B sandboxes",
        "Cost routing",
      ],
    },
    {
      id: "practice",
      label: "Engineering Practice",
      blurb:
        "How I actually ship. Strict TypeScript with validation at every boundary, end-to-end tests that run the real product instead of mocks, monorepos, CI/CD, and observability once it is live. I work production-first, owning features from architecture and tickets through to deploy and the debugging afterward.",
      items: [
        "TypeScript strict",
        "Zod boundaries",
        "Playwright",
        "Turborepo",
        "CI/CD",
        "Vercel",
        "Sentry",
        "Preview envs",
      ],
    },
  ] satisfies SkillArea[],

  projects: [
    {
      slug: "skrumrunner",
      name: "Skrumrunner",
      tagline:
        "Multi-agent platform that turns a product vision into a working software project.",
      year: "2024–2025",
      category: "AI product",
      description:
        "Autonomous agents plan, build, test, and verify a full software project from a plain product vision, with a human approving each stage. I worked across both the agent engine and the React interfaces that drive and observe it.",
      contributions: [
        "Built the multi-agent execution pipeline (plan, execute, adversarial verification) and the runtime it runs on.",
        "Built real-time React dashboards that stream agent activity, plus the review interface for approving each phase.",
        "Set up the component library, strict TypeScript, and a large end-to-end test suite across the monorepo.",
      ],
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Postgres / Drizzle",
        "Anthropic Claude",
        "MCP",
        "E2B",
        "Playwright",
        "Tailwind",
      ],
      image: null,
      links: { note: "Private repo · built at Caqophony" },
    },
    {
      slug: "smartcast",
      name: "smartcast",
      tagline: "AI podcast-script generator with a live streaming editor.",
      year: "2023–2024",
      category: "AI product",
      description:
        "Users configure topic, tone, structure, and length, and a script streams in token by token. Any paragraph can be rewritten with a plain instruction or sent through an auto-improve pass. Billed on a credit model tied to real usage.",
      contributions: [
        "Built the streaming generation UI over server-sent events and the paragraph-level inline editor.",
        "Built the multi-step configuration wizard, the credit and metering UI, and Stripe billing.",
        "Shipped it end to end on strict TypeScript with Zod-validated APIs and Playwright coverage.",
      ],
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind",
        "Drizzle / Neon",
        "Stripe",
        "Supabase",
        "Anthropic Claude",
        "SSE",
      ],
      image: null,
      links: { note: "Private repo · built at Caqophony" },
    },
    {
      slug: "markettown",
      name: "MarketTown",
      tagline:
        "Local-commerce marketplace connecting merchants and shoppers by town.",
      year: "2022–2023",
      category: "Marketplace SaaS",
      description:
        "A UK marketplace with merchant profiles, product listings, reviews, map-based discovery, and checkout, integrated with a POS platform and Stripe.",
      contributions: [
        "Led full-stack development on Next.js, Supabase, and Stripe.",
        "Built the map-based discovery interface (Leaflet) and the merchant-onboarding flow.",
        "Built the POS integration and an idempotent Stripe Elements checkout.",
      ],
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "Stripe",
        "Leaflet",
        "OpenAI",
      ],
      image: null,
      links: { note: "Private repo · built at Caqophony" },
    },
    {
      slug: "camperpro",
      name: "CamperPro",
      tagline: "Peer-to-peer marketplace for booking private campsites.",
      year: "2022",
      category: "Marketplace",
      description:
        "Landowners list campsites with rich metadata; campers discover, filter, and book. One of the first products I owned end to end.",
      contributions: [
        "Built the full React frontend and the API layer behind it.",
        "Built a virtualized listing feed, multi-image upload with client-side compression, and Framer Motion interactions.",
        "Built a dynamic filter UI over on-the-fly CouchDB queries, plus a JWT and bcrypt auth system.",
      ],
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "CouchDB",
        "JWT",
        "Framer Motion",
        "react-virtuoso",
      ],
      image: null,
      links: { note: "Private repo · built at Caqophony" },
    },
  ] satisfies Project[],

  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ],
};
