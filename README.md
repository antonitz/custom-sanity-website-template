# Custom Sanity Website Template

A production-ready template for building client websites fast. Hand off cleanly. Clients edit content without breaking design.

**Stack:** Next.js 15 · Sanity v3 · Tailwind CSS · Vercel · Resend

## What's in the box

- Block-based content system (drag, drop, reorder sections)
- Sanity Studio with Visual Editing (clients click on the live site to edit)
- Two layout modes baked in: one-pager (anchor scroll) and multi-page
- 8 polished section blocks ready to use
- SEO + AEO setup: sitemap, robots, JSON-LD, llms.txt, OG images
- AI search optimization: Person + FAQPage schemas, semantic HTML, all editable from Studio
- Contact form wired through Resend
- Type-safe end to end (Sanity schema → GROQ → React)

## Quick start

```bash
# 1. Create your repo from this template (GitHub UI or CLI)
gh repo create client-name-website --template=YOUR_USER/smiling-bowtie-website-template --private

# 2. Clone and install
git clone <your-new-repo>
cd <your-new-repo>
pnpm install

# 3. Set up Sanity
# Create a project at https://www.sanity.io/manage
# Copy the project ID

# 4. Configure env
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and other vars

# 5. Run dev
pnpm dev
# Web: http://localhost:3000
# Studio: http://localhost:3333
```

## Project structure

```
.
├── apps/
│   ├── web/           Next.js site (the public website)
│   └── studio/        Sanity Studio (the CMS)
├── packages/
│   ├── ui/            Shared component primitives
│   └── config/        Shared Tailwind, ESLint, TS configs
├── docs/              Handoff docs, deployment guide, internal runbooks
├── CLAUDE.md          Instructions for Claude Code
└── .env.example       All required env vars documented
```

## Adding a new block

See `docs/adding-new-blocks.md` or `CLAUDE.md` for the full step-by-step.

## Deployment

See `docs/deployment.md`.

## AI search optimization (AEO)

This template is built to surface correctly in AI-powered search (ChatGPT, Perplexity, Google AI Overviews). All AEO content is managed from Sanity Studio — no code deploys needed.

### Setup for a new site

1. **Person schema** — Go to Site Settings → Person (AEO) tab. Fill in name, title, bio, location, profile URLs, and expertise. This generates a Person JSON-LD schema on every page so AI engines can answer "who is [person]" queries.

2. **FAQ** — Create a new FAQ document in the Studio. Add questions and answers. Toggle "Show on Homepage" to render a visible accordion section. The JSON-LD schema is always included regardless of visibility.

3. **Anchor navigation** — When setting up nav links, use the "Section (anchor)" link type to scroll to page sections by ID (e.g. `work`, `contact`, `faq`).

### What renders automatically

| Schema | Source | Where |
|--------|--------|-------|
| Organization | Site Settings → Organization | Every page |
| WebSite | Site Settings → General | Every page |
| Person | Site Settings → Person (AEO) | Every page (when filled in) |
| FAQPage | FAQ document | Every page (when items exist) |
| Article | Blog post data | Individual blog posts |
| BreadcrumbList | Page hierarchy | Sub-pages |

Content blocks use semantic `<article>` tags so AI crawlers correctly identify standalone prose.

## Client handoff

See `docs/client-handoff.md`.

---

Built by Antoni Tzavelas · Smiling Bowtie
