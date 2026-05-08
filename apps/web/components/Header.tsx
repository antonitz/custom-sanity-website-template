import Link from 'next/link';
import type { SiteSettings } from '@/lib/sanity/types';
import { resolveCtaHref, isExternalLink } from '@/lib/links';
import { SanityImg } from '@/components/ui/SanityImg';

export function Header({ settings }: { settings?: SiteSettings | null }) {
  if (!settings) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {settings.logo ? (
            <SanityImg
              image={settings.logo}
              alt={settings.siteName}
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-lg font-medium">{settings.siteName}</span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {settings.navigation?.map((item, idx) => {
            const href = resolveCtaHref(item);
            if (!href || !item.label) return null;
            const external = isExternalLink(item);
            return external ? (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-brand"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={idx}
                href={href}
                className="text-sm hover:text-brand"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
