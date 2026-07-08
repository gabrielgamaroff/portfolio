# gabrielgamaroff.com

Personal portfolio for Gabriel Gamaroff, a full-stack and agentic engineer. A
single-page site with a hero, about, interactive skills explorer, project case
studies with image galleries, and a contact form.

Live at [gabrielgamaroff.com](https://gabrielgamaroff.com).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- TypeScript in `strict` mode
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) for animation
- [Radix UI](https://www.radix-ui.com) dialogs for modals and the lightbox
- [Embla Carousel](https://www.embla-carousel.com) for project galleries
- [Playwright](https://playwright.dev) for end-to-end smoke tests
- [Web3Forms](https://web3forms.com) for the contact form (no backend)
- Deployed on [Vercel](https://vercel.com)

## Getting started

Requires Node 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start the dev server                 |
| `pnpm build`    | Production build                     |
| `pnpm start`    | Serve the production build           |
| `pnpm lint`     | Run ESLint                           |
| `pnpm test:e2e` | Run the Playwright smoke suite       |

## Structure

```
src/
  app/            Root layout, metadata, OG image, global styles
  components/     UI components (sections, nav, modals, gallery, scroll pager)
  data/site.ts   Single source of truth for all site content
public/work/     Project screenshots
tests/           Playwright smoke tests
```

All copy, skills, and project data live in `src/data/site.ts`, so content
changes never require touching components.

### Notable pieces

- **`ScrollPager`** turns each vertical gesture into a single section change
  (one gesture, one page) on top of native scrolling, while letting sections
  taller than the viewport scroll normally. It respects `prefers-reduced-motion`.
- **`ProjectCard` / `ProjectGallery`** render each project as a case-study modal
  with an Embla carousel and a click-to-expand lightbox.
- **`ContactDialog`** posts to Web3Forms with a honeypot and a `mailto` fallback.

## Configuration

The contact form uses a public Web3Forms access key with a default baked in.
To use your own, set it in the environment (see `.env.example`):

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key
```

## Accessibility and motion

Every animation is gated behind `prefers-reduced-motion`, and the site renders
its full content with animation disabled. The Playwright suite verifies this,
along with no console errors and no horizontal overflow, on desktop and mobile
viewports.
