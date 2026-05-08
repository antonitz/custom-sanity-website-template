import Link from 'next/link';
import type { CTA } from '@/lib/sanity/types';
import { isExternalLink, resolveCtaHref } from '@/lib/links';

type Props = {
  cta?: CTA;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

const variantClasses = {
  primary:
    'bg-brand text-brand-foreground hover:opacity-90 transition-opacity',
  secondary:
    'bg-accent text-accent-foreground hover:opacity-90 transition-opacity',
  ghost:
    'border border-border text-foreground hover:bg-muted transition-colors',
} as const;

export function Button({ cta, variant = 'primary', className = '' }: Props) {
  const href = resolveCtaHref(cta);
  if (!href || !cta?.label) return null;

  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium ${variantClasses[variant]} ${className}`;

  if (isExternalLink(cta)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {cta.label}
    </Link>
  );
}
