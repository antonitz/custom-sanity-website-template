import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity/fetch';
import { pageBySlugQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import { buildMetadata } from '@/lib/seo';
import type { Page, SiteSettings } from '@/lib/sanity/types';
import { BlockRenderer } from '@/components/blocks';

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    sanityFetch<Page | null>({
      query: pageBySlugQuery,
      params: { slug: 'home' },
      tags: ['page:home'],
    }),
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    }),
  ]);

  return buildMetadata({
    pageSeo: page?.seo,
    siteSettings: settings,
    title: page?.title,
    path: '/',
  });
}

export default async function HomePage() {
  const page = await sanityFetch<Page | null>({
    query: pageBySlugQuery,
    params: { slug: 'home' },
    tags: ['page:home'],
  });

  if (!page) notFound();

  return <BlockRenderer sections={page.sections} pageType={page.pageType} />;
}
