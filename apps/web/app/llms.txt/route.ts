/**
 * llms.txt — a proposed standard for AI/LLM discovery.
 * Reference: https://llmstxt.org
 *
 * Helps AI assistants (ChatGPT, Claude, Perplexity, etc.) understand
 * the site's purpose and key content. This is a key piece of AEO
 * (Answer Engine Optimization).
 */

import { sanityFetch } from '@/lib/sanity/fetch';
import {
  allPageSlugsQuery,
  recentPostsQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import type { Post, SiteSettings } from '@/lib/sanity/types';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

type SlugRow = { slug: string; _updatedAt: string };

export async function GET() {
  const [settings, pages, posts] = await Promise.all([
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    }),
    sanityFetch<SlugRow[]>({
      query: allPageSlugsQuery,
      tags: ['page'],
    }),
    sanityFetch<Post[]>({
      query: recentPostsQuery,
      tags: ['post'],
    }),
  ]);

  const lines: string[] = [];

  lines.push(`# ${settings?.siteName || 'Website'}`);
  lines.push('');
  if (settings?.description) {
    lines.push(`> ${settings.description}`);
    lines.push('');
  }

  lines.push('## Pages');
  lines.push('');
  for (const page of pages) {
    const path = page.slug === 'home' ? '/' : `/${page.slug}`;
    lines.push(`- [${humanize(page.slug)}](${SITE_URL}${path})`);
  }
  lines.push('');

  if (posts && posts.length > 0) {
    lines.push('## Recent Articles');
    lines.push('');
    for (const post of posts.slice(0, 20)) {
      const url = `${SITE_URL}/blog/${post.slug.current}`;
      const summary = post.excerpt ? `: ${post.excerpt}` : '';
      lines.push(`- [${post.title}](${url})${summary}`);
    }
    lines.push('');
  }

  if (settings?.contactInfo?.email) {
    lines.push('## Contact');
    lines.push('');
    lines.push(`- Email: ${settings.contactInfo.email}`);
    if (settings.contactInfo.phone) {
      lines.push(`- Phone: ${settings.contactInfo.phone}`);
    }
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

function humanize(slug: string): string {
  if (slug === 'home') return 'Home';
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
