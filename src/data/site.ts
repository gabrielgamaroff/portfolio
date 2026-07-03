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
  /** Short summary shown on the card. */
  description: string;
  /** Longer paragraph shown only in the modal. */
  overview: string;
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
      category: "AI · Agentic",
      description:
        "Autonomous agents compile a plain product vision into a working software project, blueprint through deploy, with a human approving each phase.",
      overview:
        "Skrumrunner is the flagship: a multi-agent system that takes a plain-language product vision and produces a structured software project, agents planning, writing, testing, and verifying while a human approves each phase. I worked across the whole thing, the agent engine and runtime underneath and the React interfaces that drive and observe it. The hard part is never generating code, it is making a long-running agent loop reliable and affordable, and that is where most of my work went.",
      contributions: [
        "Designed the multi-agent pipeline: separate plan, execute, and adversarial-verify agents with tiered model routing.",
        "Built the agent runtime on E2B sandboxes with pause/resume, prompt caching, context compaction, and replay logging.",
        "Built the QA agent that drives Playwright over MCP to test generated code and gate merges.",
        "Built real-time dashboards streaming agent activity and token spend over SSE.",
        "Owned the React UI and phase-approval flow on a strict-TypeScript monorepo.",
      ],
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Anthropic Claude",
        "Multi-agent",
        "MCP",
        "E2B sandboxes",
        "Playwright",
      ],
      image: null,
      links: { note: "Private repo · built at Caqophony" },
    },
    {
      slug: "smartcast",
      name: "smartcast",
      tagline: "AI podcast-script generator with a live, model-powered editor.",
      year: "2023–2024",
      category: "AI product",
      description:
        "An AI app that turns a short brief into a full podcast script, generated live by an LLM and edited paragraph by paragraph by instruction.",
      overview:
        "A production AI writing tool built on Claude. Give it a topic, tone, structure, and length and it streams a complete script back token by token; any paragraph can then be rewritten by the model from a natural-language instruction or improved automatically. The engineering focus was the generation and editing pipeline, all metered by real token usage. It was my first deep build on the applied LLM layer, and the foundation for the agentic work that followed.",
      contributions: [
        "Built the streaming generation pipeline: Claude output over SSE with length-aware, format-specific prompts.",
        "Engineered the prompts and the inline AI editor: rewrite any paragraph by instruction or an auto-improve pass.",
        "Built usage-based token metering with cost estimates, credit billing, and a pre-run affordability gate.",
        "Built the multi-step configuration wizard with persisted draft state.",
        "Shipped on strict TypeScript with Zod-validated APIs and Playwright coverage.",
      ],
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Anthropic Claude",
        "Prompt engineering",
        "SSE streaming",
        "Stripe",
        "Supabase",
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
      category: "Marketplace · AI content",
      description:
        "A UK local-commerce marketplace connecting merchants and shoppers by town, with map discovery, real checkout, and AI-generated content.",
      overview:
        "A marketplace SaaS on Next.js, Supabase, and Stripe: merchant profiles, product listings, reviews, map-based discovery, and checkout, integrated with the Violet POS platform. I led the build end to end. It is where I got my depth on payments and third-party commerce integration, plus an early applied-AI touch for generating onboarding content.",
      contributions: [
        "Led full-stack development on Next.js, Supabase, and Stripe, from schema to deploy.",
        "Built the Violet POS integration abstracting cart, checkout, and orders with token refresh.",
        "Built the Stripe Elements checkout with idempotent async order submission.",
        "Built the map-based discovery surface (Leaflet) and merchant onboarding.",
        "Integrated OpenAI to auto-generate town and merchant descriptions.",
      ],
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "Stripe",
        "Violet POS",
        "Leaflet",
        "OpenAI",
      ],
      image: null,
      links: { note: "Private repo · built at Caqophony" },
    },
    {
      slug: "camperpro",
      name: "CamperPro",
      tagline: "Peer-to-peer marketplace for discovering and booking campsites.",
      year: "2022",
      category: "Marketplace",
      description:
        "A peer-to-peer marketplace where landowners list private campsites and campers discover, filter, and book across many dimensions.",
      overview:
        "One of the first products I owned end to end at Caqophony. Landowners list campsites with rich metadata; campers discover, filter, and book. A classical full-stack build, no AI, where I got deep reps on search, authentication, and media handling that everything since has been built on.",
      contributions: [
        "Built the full React frontend and the API layer behind it, end to end.",
        "Built a dynamic filter engine over on-the-fly CouchDB Mango queries across many dimensions.",
        "Built a virtualized feed (react-virtuoso) handling hundreds of listings smoothly.",
        "Built multi-image upload with client-side compression and server-side references.",
        "Built the auth system: JWT with bcrypt and stateless verification middleware.",
      ],
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "CouchDB",
        "JWT / bcrypt",
        "REST APIs",
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
