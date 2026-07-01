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
  links: ProjectLink;
};

export type SkillGroup = {
  title: string;
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
    "I build the software around AI: the interfaces, the pipelines, and the systems that make a model useful to a real person. Over the last four years at Caqophony I shipped four products, working end to end from the React front end down through the APIs and the model layer.",
    "My deepest work is in agentic systems, multi-agent pipelines and the harnesses that keep their output reliable, but the throughline is the same everywhere: turn something powerful and messy into something a person can actually use. I care about shipping, about code that holds up, and about staying current as the tooling keeps changing.",
  ],

  skills: [
    {
      title: "Full-Stack Development",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "React 19 / RSC",
        "HTML / CSS",
        "Tailwind CSS",
        "Framer Motion",
        "Radix UI / a11y",
        "Node.js",
        "REST / SSE",
        "PostgreSQL / Drizzle",
        "Supabase",
        "Stripe",
        "Zod",
        "Playwright",
        "Vercel",
      ],
    },
    {
      title: "AI / Agentic",
      items: [
        "LLM API integration (Anthropic / OpenAI)",
        "Streaming generation",
        "Prompt engineering",
        "Evaluation loops",
        "Multi-agent pipelines",
        "Harness & context design",
        "Model Context Protocol (MCP)",
        "RAG / retrieval",
      ],
    },
  ] satisfies SkillGroup[],

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
