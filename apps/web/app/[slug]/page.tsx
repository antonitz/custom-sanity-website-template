import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity/fetch';
import {
  allPageSlugsQuery,
  pageBySlugQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import { buildMetadata } from '@/lib/seo';
import {
  JsonLd,
  breadcrumbSchema,
} from '@/lib/structured-data';
import type { Page, SiteSettings } from '@/lib/sanity/types';
import { BlockRenderer } from '@/components/blocks';

type Params = Promise<{ slug: string }>;
type SlugRow = { slug: string; _updatedAt: string };

export async function generateStaticParams() {
  const pages = await sanityFetch<SlugRow[]>({
    query: allPageSlugsQuery,
    tags: ['page'],
  });
  return pages
    .filter((p) => p.slug !== 'home')
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const [page, settings] = await Promise.all([
    sanityFetch<Page | null>({
      query: pageBySlugQuery,
      params: { slug },
      tags: [`page:${slug}`],
    }),
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    }),
  ]);

  if (!page) return {};

  return buildMetadata({
    pageSeo: page.seo,
    siteSettings: settings,
    title: page.title,
    path: `/${slug}`,
  });
}

export default async function StandardPage({ params }: { params: Params }) {
  const { slug } = await params;

  const page = await sanityFetch<Page | null>({
    query: pageBySlugQuery,
    params: { slug },
    tags: [`page:${slug}`],
  });

  if (!page) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: page.title, url: `/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <BlockRenderer sections={page.sections} pageType={page.pageType} />
    </>
  );
}
