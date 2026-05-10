import type { CTA } from '@/lib/sanity/types';

export function resolveCtaHref(cta?: CTA): string | null {
  if (!cta) return null;
  switch (cta.linkType) {
    case 'internal':
      if (!cta.internalLink?.slug) return null;
      return cta.internalLink.slug === 'home'
        ? '/'
        : `/${cta.internalLink.slug}`;
    case 'anchor':
      return cta.anchor ? `#${cta.anchor}` : null;
    case 'external':
      return cta.externalUrl || null;
    case 'email':
      return cta.email ? `mailto:${cta.email}` : null;
    case 'phone':
      return cta.phone ? `tel:${cta.phone}` : null;
    default:
      return null;
  }
}

export function isExternalLink(cta?: CTA): boolean {
  return cta?.linkType === 'external';
}
