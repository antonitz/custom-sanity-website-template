# Web App (Next.js)

The public website. Renders content fetched from Sanity.

## Architecture

```
app/
├── layout.tsx              # Root layout, Header, Footer, JSON-LD
├── page.tsx                # Home (slug "home" in Sanity)
├── [slug]/page.tsx         # All other top-level pages
├── blog/
│   ├── page.tsx            # Blog index
│   └── [slug]/page.tsx     # Individual posts
├── api/
│   ├── revalidate/         # Sanity webhook handler
│   └── draft-mode/         # Visual Editing toggle
├── sitemap.ts              # Dynamic sitemap.xml
├── robots.ts               # robots.txt (allows AI crawlers)
└── llms.txt/               # llms.txt for AEO

components/
├── blocks/                 # Section blocks (one per Sanity block type)
├── ui/                     # Reusable UI primitives
├── Header.tsx
└── Footer.tsx

lib/
├── sanity/                 # Client, queries, types, fetch wrapper
├── seo.ts                  # buildMetadata helper
├── structured-data.tsx     # JSON-LD generators
└── links.ts                # CTA link resolver
```

## Adding a new block (web side)

1. Create `components/blocks/[Name].tsx` — keep server-rendered unless interactive
2. Import block type from `@/lib/sanity/types`
3. Register in `components/blocks/index.tsx` block map
4. Add GROQ projection in `lib/sanity/queries.ts`
5. If interactive, mark with `'use client'` and keep it minimal

## Server vs Client components

Default: Server Components. Reach for `'use client'` only when you need:
- `useState`, `useEffect`, event handlers
- Browser-only APIs
- A library that requires client (e.g., interactive form state)

## Caching & revalidation

Content is fetched via `sanityFetch()` which uses tag-based caching. When content changes in Sanity, a webhook hits `/api/revalidate` and revalidates the matching tag.

Tags follow the pattern: `[type]` (all of a type) and `[type]:[slug]` (one specific document).

## SEO checklist for new pages

When adding a new route:
- [ ] Implement `generateMetadata` using `buildMetadata` helper
- [ ] Add to `app/sitemap.ts` if not auto-generated from Sanity
- [ ] Add appropriate JSON-LD (BreadcrumbList at minimum)
- [ ] Set canonical via metadata `alternates.canonical`

## Common gotchas

- `Image` from `next/image` requires `width`/`height` OR `fill`. Use the `SanityImg` wrapper.
- Server Components can't use `onClick` etc. Move interactive bits into a child Client Component.
- When you change Sanity schema, run `pnpm sanity:types` from repo root to regenerate types.
