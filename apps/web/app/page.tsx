import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity/fetch';
import { pageBySlugQuery, siteSettingsQuery, sitewideFaqQuery } from '@/lib/sanity/queries';
import { buildMetadata } from '@/lib/seo';
import type { Page, SiteSettings, SitewideFAQ as SitewideFAQType } from '@/lib/sanity/types';
import { BlockRenderer } from '@/components/blocks';
import { SitewideFAQ } from '@/components/SitewideFAQ';

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
  const [page, faq] = await Promise.all([
    sanityFetch<Page | null>({
      query: pageBySlugQuery,
      params: { slug: 'home' },
      tags: ['page:home'],
    }),
    sanityFetch<SitewideFAQType | null>({
      query: sitewideFaqQuery,
      tags: ['faq'],
    }),
  ]);

  if (!page) notFound();

  const sections = page.sections || [];
  const contactIdx = sections.findIndex((s) => s._type === 'contactBlock');
  const beforeContact = contactIdx >= 0 ? sections.slice(0, contactIdx) : sections;
  const contactAndAfter = contactIdx >= 0 ? sections.slice(contactIdx) : [];

  return (
    <>
      <BlockRenderer sections={beforeContact} pageType={page.pageType} />
      <SitewideFAQ faq={faq} />
      <BlockRenderer sections={contactAndAfter} pageType={page.pageType} />
    </>
  );
}
