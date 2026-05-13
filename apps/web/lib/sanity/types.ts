/**
 * Types for Sanity content.
 * For full auto-generated types, run: pnpm sanity:types
 * These are hand-written fallbacks that match the schema structure.
 */

import type { PortableTextBlock } from '@portabletext/react';

export type SanityImage = {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number };
    };
  };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type CTA = {
  label?: string;
  linkType?: 'internal' | 'anchor' | 'external' | 'email' | 'phone';
  internalLink?: { slug: string; title: string };
  anchor?: string;
  externalUrl?: string;
  email?: string;
  phone?: string;
};

export type SEO = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
};

// ── Block types ──────────────────────────────────────────

export type HeroBlock = {
  _type: 'heroBlock';
  _key: string;
  headline?: string;
  subheadline?: string;
  image?: SanityImage;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  variant?: 'centered' | 'split' | 'fullImage';
};

export type FeaturesBlock = {
  _type: 'featuresBlock';
  _key: string;
  eyebrow?: string;
  headline?: string;
  description?: string;
  layout?: 'grid' | 'alternating' | 'list';
  features?: Array<{
    _key: string;
    title?: string;
    description?: string;
    icon?: string;
    image?: SanityImage;
  }>;
};

export type TestimonialsBlock = {
  _type: 'testimonialsBlock';
  _key: string;
  eyebrow?: string;
  headline?: string;
  testimonials?: Array<{
    _key: string;
    quote?: string;
    author?: string;
    role?: string;
    company?: string;
    avatar?: SanityImage;
  }>;
};

export type CTABlock = {
  _type: 'ctaBlock';
  _key: string;
  headline?: string;
  description?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  variant?: 'centered' | 'banner' | 'card';
};

export type FAQBlock = {
  _type: 'faqBlock';
  _key: string;
  eyebrow?: string;
  headline?: string;
  description?: string;
  faqs?: Array<{
    _key: string;
    question?: string;
    answer?: string;
  }>;
};

export type ContentBlock = {
  _type: 'contentBlock';
  _key: string;
  eyebrow?: string;
  headline?: string;
  body?: PortableTextBlock[];
  image?: SanityImage;
  layout?: 'imageLeft' | 'imageRight' | 'imageTop' | 'noImage';
};

export type ContactBlock = {
  _type: 'contactBlock';
  _key: string;
  headline?: string;
  description?: string;
  submitLabel?: string;
  successMessage?: string;
  fields?: Array<'name' | 'email' | 'phone' | 'company' | 'message'>;
};

export type LogoCloudBlock = {
  _type: 'logoCloudBlock';
  _key: string;
  headline?: string;
  logos?: Array<{
    _key: string;
    name?: string;
    image?: SanityImage;
    link?: string;
  }>;
};

export type Block =
  | HeroBlock
  | FeaturesBlock
  | TestimonialsBlock
  | CTABlock
  | FAQBlock
  | ContentBlock
  | ContactBlock
  | LogoCloudBlock;

// ── Documents ────────────────────────────────────────────

export type Page = {
  _id: string;
  _type: 'page';
  title: string;
  slug: { current: string };
  pageType: 'onePager' | 'standard';
  sections?: Block[];
  seo?: SEO;
};

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  _updatedAt: string;
  coverImage?: SanityImage;
  body?: PortableTextBlock[];
  author?: {
    name: string;
    role?: string;
    avatar?: SanityImage;
  };
  seo?: SEO;
};

export type PersonData = {
  name?: string;
  jobTitle?: string;
  personDescription?: string;
  image?: SanityImage;
  locationCity?: string;
  locationRegion?: string;
  locationCountry?: string;
  sameAs?: string[];
  knowsAbout?: string[];
};

export type SitewideFAQ = {
  _id: string;
  headline?: string;
  items?: Array<{
    _key: string;
    question?: string;
    answer?: string;
  }>;
  showOnHomepage?: boolean;
};

export type SiteSettings = {
  siteName: string;
  description?: string;
  logo?: SanityImage;
  favicon?: { asset?: { url?: string } };
  navigation?: CTA[];
  footer?: {
    tagline?: string;
    copyrightText?: string;
    socialLinks?: Array<{ platform: string; url: string }>;
    navigation?: CTA[];
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  organization?: {
    legalName?: string;
    foundingDate?: string;
    sameAs?: string[];
  };
  person?: PersonData;
  defaultSeo?: SEO;
};
