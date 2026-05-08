/**
 * JSON-LD structured data generators.
 * Used for SEO and AEO (AI/LLM crawlers like Perplexity, ChatGPT).
 *
 * Reference: https://schema.org
 */

import type { FAQBlock, Post, SiteSettings } from './sanity/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function organizationSchema(settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.organization?.legalName || settings.siteName,
    url: SITE_URL,
    logo: settings.logo
      ? `${SITE_URL}/api/og-logo`
      : undefined,
    description: settings.description,
    foundingDate: settings.organization?.foundingDate,
    sameAs: settings.organization?.sameAs || [],
    contactPoint: settings.contactInfo?.email
      ? {
          '@type': 'ContactPoint',
          email: settings.contactInfo.email,
          telephone: settings.contactInfo.phone,
          contactType: 'customer service',
        }
      : undefined,
    address: settings.contactInfo?.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: settings.contactInfo.address,
        }
      : undefined,
  };
}

export function websiteSchema(settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.siteName,
    url: SITE_URL,
    description: settings.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function articleSchema(post: Post, settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage?.asset?.url,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Anonymous',
    },
    publisher: {
      '@type': 'Organization',
      name: settings.siteName,
      logo: {
        '@type': 'ImageObject',
        url: settings.logo?.asset?.url || `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug.current}`,
    },
  };
}

export function faqSchema(block: FAQBlock) {
  if (!block.faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: block.faqs
      .filter((f) => f.question && f.answer)
      .map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
  };
}

/**
 * Render a JSON-LD <script> tag.
 * Use in pages and layouts.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
