# Global Claude Code Snippet for Website Builds

Append this section to your existing `~/.claude/CLAUDE.md` file.

---

## Website Builds

### Template
All client websites use the Smiling Bowtie template:
https://github.com/[your-username]/smiling-bowtie-website-template

### Starting a new client site
1. Create from template:
   ```bash
   gh repo create [client-name]-website \
     --template=[your-username]/smiling-bowtie-website-template \
     --private
   ```
2. Clone to `~/Dropbox/Cursor Projects/clients/[client-name]-website`
3. Run `pnpm install`
4. Copy `.env.example` to `.env.local` and fill in Sanity project ID + tokens
5. Read the project `CLAUDE.md` before making changes

### Universal rules for website work
- **Block-based architecture is non-negotiable.** Do not add custom one-off page layouts. Use existing blocks or add a new block type via the 7-step recipe in `docs/adding-new-blocks.md`.
- **Sanity is the source of truth for content.** No hardcoded content in page components.
- **Every client gets the same handoff experience:** Visual Editing enabled + Loom video + handoff doc from `docs/client-handoff.md` (customized per client).
- **Stack is fixed:** Next.js 15 (App Router), Sanity v3, Tailwind, Vercel, Resend. Don't swap pieces unless there's a real reason.

### Per-client customization happens in
- `apps/web/app/globals.css` — CSS variables for brand colors
- `packages/config/tailwind.config.ts` — fonts, spacing scale (when applicable)
- `apps/studio/sanity.config.ts` — project ID, dataset, studio title
- Sanity content itself

### Default model
Sonnet for routine work. Reserve Opus for:
- New block types (schema + component + render together)
- Visual Editing or Presentation tool config changes
- Deployment / infrastructure decisions
- Performance debugging

### When the template needs changing
If a client need exposes a gap in the template:
1. Build the solution in the client repo first
2. Verify it works
3. Open a PR back to the template repo to upstream the improvement
4. Future clients get the benefit

This is the discipline that makes the template compound.

### SEO/AEO files (every site has these)
- `app/sitemap.ts` — dynamic sitemap including all pages and blog posts
- `app/robots.ts` — robots.txt allowing GPTBot, ClaudeBot, PerplexityBot, etc.
- `app/llms.txt/route.ts` — llms.txt for AI assistant discovery
- `lib/structured-data.tsx` — Organization, WebSite, Article, BreadcrumbList, FAQPage JSON-LD
- `lib/seo.ts` — `buildMetadata` helper used by every page

When adding a new page type, ALWAYS:
- Add to sitemap if it's not auto-generated from Sanity
- Add appropriate JSON-LD schema
- Use `buildMetadata` for canonical URLs and OG tags
