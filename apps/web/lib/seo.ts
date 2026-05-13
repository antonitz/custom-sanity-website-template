import type { Metadata } from 'next';
import { urlFor } from './sanity/image';
import type { SEO, SiteSettings } from './sanity/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

type MetadataInput = {
  pageSeo?: SEO;
  siteSettings?: SiteSettings;
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  modifiedAt?: string;
};

export function buildMetadata({
  pageSeo,
  siteSettings,
  title,
  description,
  path = '/',
  type = 'website',
  publishedAt,
  modifiedAt,
}: MetadataInput): Metadata {
  const siteName = siteSettings?.siteName || 'Website';
  const defaultDescription =
    siteSettings?.defaultSeo?.metaDescription ||
    siteSettings?.description ||
    '';

  const finalTitle =
    pageSeo?.metaTitle ||
    title ||
    siteSettings?.defaultSeo?.metaTitle ||
    siteName;

  const finalDescription =
    pageSeo?.metaDescription || description || defaultDescription;

  const ogImage = pageSeo?.ogImage || siteSettings?.defaultSeo?.ogImage;
  const ogImageUrl = ogImage
    ? urlFor(ogImage).width(1200).height(630).fit('crop').url()
    : `${SITE_URL}/og-default.png`;

  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: finalTitle,
    description: finalDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !pageSeo?.noIndex,
      follow: !pageSeo?.noIndex,
    },
    openGraph: {
      type,
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      ...(type === 'article' && {
        publishedTime: publishedAt,
        modifiedTime: modifiedAt,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [ogImageUrl],
    },
    ...(siteSettings?.favicon?.asset?.url && {
      icons: {
        icon: siteSettings.favicon.asset.url,
        apple: siteSettings.favicon.asset.url,
      },
    }),
  };
}
