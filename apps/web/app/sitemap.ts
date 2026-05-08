import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/lib/sanity/fetch';
import {
  allPageSlugsQuery,
  allPostSlugsQuery,
} from '@/lib/sanity/queries';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

type SlugRow = { slug: string; _updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([
    sanityFetch<SlugRow[]>({
      query: allPageSlugsQuery,
      tags: ['page'],
    }),
    sanityFetch<SlugRow[]>({
      query: allPostSlugsQuery,
      tags: ['post'],
    }),
  ]);

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => {
    const path = page.slug === 'home' ? '' : `/${page.slug}`;
    return {
      url: `${SITE_URL}${path}`,
      lastModified: page._updatedAt,
      changeFrequency: 'weekly',
      priority: page.slug === 'home' ? 1.0 : 0.8,
    };
  });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Static routes
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return [...pageEntries, ...postEntries, ...staticEntries];
}
