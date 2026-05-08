import Link from 'next/link';
import type { SiteSettings } from '@/lib/sanity/types';
import { isExternalLink, resolveCtaHref } from '@/lib/links';

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  if (!settings) return null;

  const year = new Date().getFullYear();
  const copyright =
    settings.footer?.copyrightText ||
    `© ${year} ${settings.siteName}. All rights reserved.`;

  return (
    <footer className="border-t border-border bg-muted">
      <div className="container-wide py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-medium">{settings.siteName}</p>
            {settings.footer?.tagline && (
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                {settings.footer.tagline}
              </p>
            )}
          </div>

          {settings.footer?.navigation && settings.footer.navigation.length > 0 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-wider">
                Navigation
              </p>
              <ul className="mt-4 space-y-2">
                {settings.footer.navigation.map((item, idx) => {
                  const href = resolveCtaHref(item);
                  if (!href || !item.label) return null;
                  const external = isExternalLink(item);
                  return (
                    <li key={idx}>
                      {external ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {settings.contactInfo && (
            <div>
              <p className="text-sm font-medium uppercase tracking-wider">
                Contact
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {settings.contactInfo.email && (
                  <li>
                    <a
                      href={`mailto:${settings.contactInfo.email}`}
                      className="hover:text-foreground"
                    >
                      {settings.contactInfo.email}
                    </a>
                  </li>
                )}
                {settings.contactInfo.phone && (
                  <li>
                    <a
                      href={`tel:${settings.contactInfo.phone}`}
                      className="hover:text-foreground"
                    >
                      {settings.contactInfo.phone}
                    </a>
                  </li>
                )}
                {settings.contactInfo.address && (
                  <li>{settings.contactInfo.address}</li>
                )}
              </ul>
            </div>
          )}

          {settings.footer?.socialLinks && settings.footer.socialLinks.length > 0 && (
            <div>
              <p className="text-sm font-medium uppercase tracking-wider">
                Follow
              </p>
              <ul className="mt-4 space-y-2">
                {settings.footer.socialLinks.map((social, idx) => (
                  <li key={idx}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm capitalize text-muted-foreground hover:text-foreground"
                    >
                      {social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
