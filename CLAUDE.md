# Smiling Bowtie Website Template

## Project Type
Client website built from the Smiling Bowtie template.
**Stack:** Next.js 15 (App Router) + Sanity v3 + Tailwind CSS + Vercel + Resend

## North Star
Build sites fast, hand them off cleanly. Clients edit content without breaking design.

## Architecture Rules

### Block-based content system (non-negotiable)
- All page content renders from a `sections` array in Sanity
- Each section is a typed block (`heroBlock`, `featuresBlock`, etc.)
- Pages do NOT contain hardcoded content
- Pages do NOT have one-off layouts; use existing blocks or add a new block type

### Adding a new block (do this in order)
1. Create schema in `apps/studio/schemas/objects/blocks/[name]Block.ts`
2. Register in `apps/studio/schemas/index.ts`
3. Add to `page` schema's `sections` array `of: []`
4. Create component in `apps/web/components/blocks/[Name].tsx`
5. Register in `apps/web/components/blocks/index.ts` block map
6. Add GROQ projection in `apps/web/lib/sanity/queries.ts`
7. Run `pnpm sanity:types` to regenerate TypeScript types

### What NOT to do
- Do NOT add hardcoded content to page components
- Do NOT bypass Sanity for content; everything content-related lives in CMS
- Do NOT modify the schema without updating GROQ queries and TypeScript types
- Do NOT customize per-client by adding new components if an existing block can be styled to fit
- Do NOT use `<form>` tags without proper Server Actions or API routes
- Do NOT inline styles; Tailwind only

## Default model usage
Default to **Sonnet** for routine work. Reserve **Opus** for:
- Adding new block types (schema + component + render logic together)
- Visual Editing configuration changes
- Deployment or infrastructure decisions
- Performance debugging

## Per-client customization
Client-specific changes go in:
- `apps/web/app/globals.css` — CSS variables for brand colors
- `packages/config/tailwind.config.ts` — fonts, spacing scale, brand tokens
- `apps/studio/sanity.config.ts` — project ID, dataset name, studio title
- Content in Sanity itself

## Code style
- TypeScript strict mode, no `any`
- Functional components only
- Server Components by default; `"use client"` only when needed (forms, interactive UI)
- Co-locate types with components for blocks
- Tailwind only, no CSS modules or styled-components
- Component files use PascalCase; utility files use camelCase

## SEO & AEO
This template ships with:
- Dynamic sitemap (`app/sitemap.ts`)
- robots.txt (`app/robots.ts`)
- JSON-LD structured data (Organization, WebSite, BreadcrumbList, Article, FAQPage)
- Canonical URLs on every page
- Open Graph + Twitter cards
- llms.txt for AI/LLM crawlers (AEO)

When adding new page types, ALWAYS:
- Add to sitemap generator
- Add appropriate JSON-LD schema
- Set canonical URL
- Set OG image (default falls back to site default)

## Common commands
```bash
pnpm dev              # run web + studio together
pnpm build            # production build
pnpm sanity:types     # regenerate TypeScript types from Sanity schema
pnpm lint             # lint all packages
pnpm type-check       # type-check all packages
```

## Deployment
- Web app deploys to Vercel
- Sanity Studio deploys via `pnpm sanity deploy` from `apps/studio`
- Set all env vars from `.env.example` in Vercel dashboard
- Add Sanity webhook pointing to `/api/revalidate` with the `SANITY_REVALIDATE_SECRET`

## Client handoff
See `docs/client-handoff.md` for the handoff checklist and template doc.

## When the template needs changing
If a client need exposes a gap in the template:
1. Build the solution in the client repo first
2. Verify it works
3. Open a PR back to the template repo to upstream the improvement
4. Future clients get the benefit

This is the discipline that makes the template compound.
