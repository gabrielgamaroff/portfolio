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
  /** Longer description shown only in the modal, as separate paragraphs. */
  overview: string[];
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
  role: "Agentic Engineer",
  email: "gabriel@caqophony.com",
  github: "https://github.com/gabrielgamaroff",
  // Set a LinkedIn URL to show the link in the nav and contact section; leave empty to hide it.
  linkedin: "",

  hero: {
    tagline: "Agentic engineer building the layer where people and AI meet.",
    sub: "Building multi-agent systems, the harnesses that make their output reliable, and streaming AI interfaces, on Next.js, React, and TypeScript.",
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
      year: "2025–2026",
      category: "AI · Agentic",
      description:
        "Autonomous agents compile a plain product vision into a working software project, blueprint through deploy, with a human approving each phase.",
      overview: [
        "Skrumrunner is the flagship. It takes a plain-language product vision and drives it all the way to executed, verified code: the system breaks the intent into tasks, then a pipeline of specialized agents explores the codebase, plans an approach, writes the change, and adversarially verifies it in a fresh pass, looping back to fix what fails while a human approves each phase before anything merges.",
        "Each phase hands the next a small structured context instead of a full transcript, and steps route to a cheaper or stronger model by difficulty, which is what keeps a long agent loop affordable. Execution runs inside disposable cloud sandboxes that pause between phases and resume for human intervention, with each agent's tools scoped to its role.",
        "Generated code has to clear real gates before it ships: type-checking, linting, the test suite, and visual-parity checks driven by a QA agent that operates a real browser over MCP. I built across the whole thing, the agent engine and runtime underneath and the React interfaces that drive and observe it, with dashboards that stream agent activity, turn counts, and token spend live over SSE.",
        "The hard part was never generating code. It was making a long-running agent loop reliable, observable, and affordable, and that is where most of my work went.",
      ],
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
      gallery: [
        "/work/skrumrunner/01-home.png",
        "/work/skrumrunner/02-generate.png",
        "/work/skrumrunner/03-execution.png",
        "/work/skrumrunner/04-sprint-execute.png",
        "/work/skrumrunner/05-agents.png",
        "/work/skrumrunner/06-cortex.png",
        "/work/skrumrunner/07-costs.png",
        "/work/skrumrunner/08-tasks.png",
        "/work/skrumrunner/09-analytics.png",
      ],
      links: { note: "Private repo · built at Caqophony" },
    },
    {
      slug: "smartcast",
      name: "smartcast",
      tagline: "AI podcast-script generator with a live, model-powered editor.",
      year: "2024–2025",
      category: "AI product",
      description:
        "An AI app that turns a short brief into a full podcast script, generated live by an LLM and edited paragraph by paragraph by instruction.",
      overview: [
        "A production AI writing tool built on Claude. You give it a topic, tone, structure, and target length, and it streams a complete, sectioned script back token by token. From there any paragraph can be rewritten from a plain-language instruction or sharpened by an automatic improve pass, with the model returning only the changed section so the rest of the draft stays intact.",
        "The real engineering was the generation and editing pipeline: prompts that hold format and length coherent across a long document, reliable streaming of partial output over the network, and usage metering tied to real token counts so spend stays predictable and billable, gated by a pre-run affordability check.",
        "It was my first deep build on the applied LLM layer, and its patterns of structured prompting, streaming, and usage accounting became the foundation for the agentic work that followed.",
      ],
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
      gallery: [
        "/work/smartcast/01-hero.png",
        "/work/smartcast/02-configure.png",
        "/work/smartcast/03-topic.png",
        "/work/smartcast/04-steps.png",
        "/work/smartcast/05-detail.png",
        "/work/smartcast/06-sections.png",
        "/work/smartcast/07-features.png",
        "/work/smartcast/08-pricing.png",
      ],
      links: { note: "Private repo · built at Caqophony" },
    },
    {
      slug: "markettown",
      name: "MarketTown",
      tagline:
        "Local-commerce marketplace connecting merchants and shoppers by town.",
      year: "2023–2024",
      category: "Marketplace · AI content",
      description:
        "A UK local-commerce marketplace connecting merchants and shoppers by town, with map discovery, real checkout, and AI-generated content.",
      overview: [
        "A local-commerce marketplace SaaS on Next.js, Supabase, and Stripe that connects merchants and shoppers by town. It carries merchant profiles, product listings and reviews, map-based discovery, and a real checkout, wired into the Violet POS platform so orders flow through to a live commerce backend.",
        "I led the build end to end, from the database schema through the payment flow to deploy. The demanding parts were the third-party commerce integration, abstracting cart, checkout, and order submission over an external API with token refresh and idempotent, asynchronous order handling, and a Stripe Elements checkout that stays consistent when network calls fail or retry.",
        "It also carries an early applied-AI touch, generating town and merchant descriptions with a model at scale, and it is where I got my real depth on payments and commerce plumbing.",
      ],
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
      year: "2022–2023",
      category: "Marketplace",
      description:
        "A peer-to-peer marketplace where landowners list private campsites and campers discover, filter, and book across many dimensions.",
      overview: [
        "One of the first products I owned end to end. Landowners list private campsites with rich metadata, and campers discover, filter, and book across many dimensions at once.",
        "It is a classical full-stack build with no AI, and the value was in the fundamentals done well: a dynamic filter engine that turns many simultaneous constraints into efficient on-the-fly database queries, a virtualized feed that stays smooth across hundreds of listings, multi-image upload with client-side compression and server-side references, and a stateless JWT auth system with hashed credentials and verification middleware.",
        "These are the search, auth, and media foundations that everything I have built since sits on top of.",
      ],
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
      gallery: [
        "/work/campr/01-discover.png",
        "/work/campr/02-booking.png",
        "/work/campr/03-create.png",
      ],
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
