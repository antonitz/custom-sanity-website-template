# Sanity Studio

This is the CMS for the website. Clients log in here to edit content.

## Schema architecture

```
schemas/
├── documents/        # Top-level documents (page, post, author, siteSettings)
└── objects/
    ├── shared/       # Reusable across blocks (cta, seo)
    └── blocks/       # Section blocks for pages (heroBlock, etc.)
```

## Adding a new block (Studio side)

1. Create `schemas/objects/blocks/[name]Block.ts`
2. Use `defineType({ name: 'xBlock', type: 'object', ... })`
3. Always include a `preview` so clients see meaningful labels in the sections array
4. Set sensible character limits (`Rule.max(80)` for headlines, etc.) — this is what protects the design
5. Use `radio` layout for variant fields with 2-4 options
6. Use `hidden` callbacks for conditional fields (see `cta.ts` for an example)
7. Register in `schemas/index.ts`
8. Add to `page.ts` sections array `of: [...]`
9. After updating schemas: from repo root run `pnpm sanity:types` to regenerate web types

## What clients should NOT see

The desk structure in `structure.ts` is a curated client experience. Singletons like `siteSettings` and the home page are pinned to predictable spots. New types added later won't auto-appear in the desk; add them to `structure.ts` explicitly.

## Visual Editing

Visual Editing is enabled via the Presentation tool. The web app is the preview origin. When clients click a section in Presentation, it highlights the matching field in the Studio.

## Environment

Studio has its own `.env` (see `.env.example`). The Studio reads `SANITY_STUDIO_*` vars, while the web app reads `NEXT_PUBLIC_SANITY_*` vars — they point at the same project but use different env name conventions.

## Deploying

```bash
pnpm deploy
# Will prompt for a studio hostname like client-name.sanity.studio
```

The deployed Studio is what the client uses day-to-day.
