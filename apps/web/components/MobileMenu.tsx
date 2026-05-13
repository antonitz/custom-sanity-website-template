'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { CTA } from '@/lib/sanity/types';
import { isExternalLink, resolveCtaHref } from '@/lib/links';
import { SocialLinks } from '@/components/ui/SocialIcons';

type SocialLink = {
  platform: string;
  url: string;
};

type Props = {
  navigation?: CTA[];
  socialLinks?: SocialLink[];
};

export function MobileMenu({ navigation, socialLinks }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [open]);

  if (!navigation?.length) return null;

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="md:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>

      {/* Backdrop — below header */}
      <div
        onClick={close}
        className={`md:hidden fixed inset-0 top-16 z-40 bg-black/20 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Dropdown panel — below header, auto height */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 z-50 border-b border-border bg-white shadow-lg transition-all duration-200 ${
          open
            ? 'translate-y-0 opacity-100'
            : '-translate-y-2 opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col px-6 py-2">
          {navigation.map((item, idx) => {
            const href = resolveCtaHref(item);
            if (!href || !item.label) return null;
            const external = isExternalLink(item);

            const className =
              'block py-4 text-lg font-medium text-foreground hover:text-brand border-b border-border';

            return external ? (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className={className}
              >
                {item.label}
              </a>
            ) : (
              <a key={idx} href={href} onClick={close} className={className}>
                {item.label}
              </a>
            );
          })}
          {socialLinks && socialLinks.length > 0 && (
            <div className="py-4">
              <SocialLinks links={socialLinks} />
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
