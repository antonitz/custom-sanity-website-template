import { groq } from 'next-sanity';

/**
 * GROQ projections for each block type.
 * Add a new projection here when you add a new block.
 */

const ctaProjection = groq`
  label,
  linkType,
  anchor,
  externalUrl,
  internalLink->{
    "slug": slug.current,
    title
  },
  email,
  phone
`;

const imageProjection = groq`
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  hotspot,
  crop
`;

const heroBlockProjection = groq`
  _type == "heroBlock" => {
    _type,
    _key,
    headline,
    subheadline,
    image { ${imageProjection} },
    primaryCta { ${ctaProjection} },
    secondaryCta { ${ctaProjection} },
    variant
  }
`;

const featuresBlockProjection = groq`
  _type == "featuresBlock" => {
    _type,
    _key,
    eyebrow,
    headline,
    description,
    layout,
    features[] {
      _key,
      title,
      description,
      icon,
      image { ${imageProjection} }
    }
  }
`;

const testimonialsBlockProjection = groq`
  _type == "testimonialsBlock" => {
    _type,
    _key,
    eyebrow,
    headline,
    testimonials[] {
      _key,
      quote,
      author,
      role,
      company,
      avatar { ${imageProjection} }
    }
  }
`;

const ctaBlockProjection = groq`
  _type == "ctaBlock" => {
    _type,
    _key,
    headline,
    description,
    primaryCta { ${ctaProjection} },
    secondaryCta { ${ctaProjection} },
    variant
  }
`;

const faqBlockProjection = groq`
  _type == "faqBlock" => {
    _type,
    _key,
    eyebrow,
    headline,
    description,
    faqs[] {
      _key,
      question,
      answer
    }
  }
`;

const contentBlockProjection = groq`
  _type == "contentBlock" => {
    _type,
    _key,
    eyebrow,
    headline,
    body,
    image { ${imageProjection} },
    layout
  }
`;

const contactBlockProjection = groq`
  _type == "contactBlock" => {
    _type,
    _key,
    headline,
    description,
    submitLabel,
    successMessage,
    fields
  }
`;

const logoCloudBlockProjection = groq`
  _type == "logoCloudBlock" => {
    _type,
    _key,
    headline,
    logos[] {
      _key,
      name,
      image { ${imageProjection} },
      link
    }
  }
`;

export const sectionsProjection = groq`
  sections[] {
    ${heroBlockProjection},
    ${featuresBlockProjection},
    ${testimonialsBlockProjection},
    ${ctaBlockProjection},
    ${faqBlockProjection},
    ${contentBlockProjection},
    ${contactBlockProjection},
    ${logoCloudBlockProjection}
  }
`;

const seoFields = groq`
  metaTitle,
  metaDescription,
  ogImage { ${imageProjection} },
  noIndex
`;

const seoProjection = groq`
  seo { ${seoFields} }
`;

/**
 * Site-wide settings (header, footer, default SEO)
 */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    description,
    logo { ${imageProjection} },
    navigation[] { ${ctaProjection} },
    footer {
      tagline,
      copyrightText,
      socialLinks[] {
        platform,
        url
      },
      navigation[] { ${ctaProjection} }
    },
    contactInfo {
      email,
      phone,
      address
    },
    organization {
      legalName,
      foundingDate,
      sameAs
    },
    person {
      name,
      jobTitle,
      personDescription,
      image { ${imageProjection} },
      locationCity,
      locationRegion,
      locationCountry,
      sameAs,
      knowsAbout
    },
    defaultSeo { ${seoFields} }
  }
`;

/**
 * A page by slug. Use "home" as the slug for the homepage.
 */
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    pageType,
    ${sectionsProjection},
    ${seoProjection}
  }
`;

/**
 * All page slugs (for static generation and sitemap)
 */
export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`;

/**
 * A blog post by slug.
 */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    _updatedAt,
    coverImage { ${imageProjection} },
    body,
    author->{
      name,
      role,
      avatar { ${imageProjection} }
    },
    ${seoProjection}
  }
`;

/**
 * Recent posts for blog index.
 */
export const recentPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage { ${imageProjection} },
    author->{ name }
  }
`;

/**
 * All post slugs for sitemap.
 */
export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`;

/**
 * Site-wide FAQ singleton (for AEO JSON-LD + visible FAQ section).
 */
export const sitewideFaqQuery = groq`
  *[_type == "faq"][0] {
    _id,
    headline,
    items[] {
      _key,
      question,
      answer
    },
    showOnHomepage
  }
`;
