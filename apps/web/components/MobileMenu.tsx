'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { CTA } from '@/lib/sanity/types';
import { isExternalLink, resolveCtaHref } from '@/lib/links';

type Props = {
  navigation?: CTA[];
};

export function MobileMenu({ navigation }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
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

  // Close on Escape key
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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted"
        aria-label="Open menu"
        aria-expanded={open}
      >
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
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm transform bg-white shadow-xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex h-16 items-center justify-end border-b border-border px-6">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted"
            aria-label="Close menu"
          >
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
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6">
          {navigation.map((item, idx) => {
            const href = resolveCtaHref(item);
            if (!href || !item.label) return null;
            const external = isExternalLink(item);

            const className =
              'block py-4 text-lg font-medium text-foreground hover:text-brand border-b border-border last:border-0';

            return external ? (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {item.label}
              </a>
            ) : (
              <Link key={idx} href={href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
