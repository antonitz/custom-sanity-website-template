# Deployment Guide

Step-by-step deployment for a new client site.

## Prerequisites

- GitHub account with the template repo access
- Sanity account
- Vercel account
- Resend account (for the contact form)
- Domain (or use a Vercel subdomain to start)

## 1. Create the repo

```bash
gh repo create [client-name]-website \
  --template=[your-org]/smiling-bowtie-website-template \
  --private
git clone git@github.com:[your-org]/[client-name]-website.git
cd [client-name]-website
pnpm install
```

## 2. Create the Sanity project

1. Go to https://www.sanity.io/manage
2. Click **Create new project**
3. Name it (e.g., `Client Name Website`)
4. Choose a dataset name (use `production`)
5. Copy the **Project ID**

## 3. Configure local environment

```bash
cp .env.example .env.local
cp apps/studio/.env.example apps/studio/.env
```

Fill in:

**Root `.env.local`:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — from step 2
- `NEXT_PUBLIC_SANITY_DATASET` — `production`
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` for now
- `SANITY_API_READ_TOKEN` — create in Sanity Manage > API > Tokens (Viewer role)
- `SANITY_REVALIDATE_SECRET` — generate with `openssl rand -base64 32`
- `RESEND_API_KEY` — from https://resend.com/api-keys
- `RESEND_FROM_EMAIL` — must be a verified domain in Resend
- `RESEND_TO_EMAIL` — where contact form submissions go

**`apps/studio/.env`:**
- `SANITY_STUDIO_PROJECT_ID` — same as above
- `SANITY_STUDIO_DATASET` — `production`
- `SANITY_STUDIO_PREVIEW_URL` — `http://localhost:3000` for dev

## 4. Run locally

```bash
pnpm dev
```

- Web: http://localhost:3000
- Studio: http://localhost:3333

Create the Home page first (`slug: home`), Site Settings, and any other pages.

## 5. Deploy the Studio

```bash
cd apps/studio
pnpm deploy
# Choose a hostname like client-name.sanity.studio
```

## 6. Deploy the web app to Vercel

```bash
# From repo root
vercel --prod
```

Or via the Vercel dashboard:

1. **Add New Project** → import the GitHub repo
2. **Root directory:** `apps/web`
3. **Framework preset:** Next.js
4. **Build command:** `cd ../.. && pnpm turbo build --filter=@smiling-bowtie/web`
5. **Install command:** `pnpm install`
6. Add all env vars from `.env.local`
7. Update `NEXT_PUBLIC_SITE_URL` to the production URL
8. Deploy

## 7. Add the Sanity webhook

In Sanity Manage > API > Webhooks:

- **URL:** `https://[your-domain]/api/revalidate`
- **Trigger on:** Create, Update, Delete
- **Filter:** `_type in ["page", "post", "siteSettings", "author"]`
- **Projection:** `{ _type, slug }`
- **Secret:** the `SANITY_REVALIDATE_SECRET` you set

This makes content changes appear on the live site within seconds.

## 8. Update the Studio's preview URL

Go back to the Studio's `.env` file (or Sanity Studio environment vars if deployed) and set:

```
SANITY_STUDIO_PREVIEW_URL=https://[your-production-domain]
```

Redeploy the Studio. Now the Presentation/Visual Editing inside the deployed Studio shows the live site.

## 9. Custom domain

In Vercel > Project > Settings > Domains:

1. Add your domain
2. Follow the DNS instructions
3. Wait for propagation

## 10. Final checks

- [ ] `https://[domain]/sitemap.xml` returns valid XML
- [ ] `https://[domain]/robots.txt` returns the right robots rules
- [ ] `https://[domain]/llms.txt` returns the AEO content
- [ ] Submit a test contact form; confirm email arrives
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

## Troubleshooting

**Contact form silently fails:**
Check Vercel logs. Most common cause: `RESEND_FROM_EMAIL` is not a verified domain.

**Visual Editing doesn't work:**
Make sure `SANITY_API_READ_TOKEN` is set in Vercel env vars, and `SANITY_STUDIO_PREVIEW_URL` matches the production URL.

**Webhook isn't revalidating:**
Verify the secret matches. Check the webhook log in Sanity Manage for response codes.
