import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { sanityFetch } from '@/lib/sanity/fetch';
import { siteSettingsQuery, sitewideFaqQuery } from '@/lib/sanity/queries';
import { buildMetadata } from '@/lib/seo';
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
  personSchema,
  sitewideFaqSchema,
} from '@/lib/structured-data';
import type { SiteSettings, SitewideFAQ } from '@/lib/sanity/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  });
  return buildMetadata({ siteSettings: settings });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, faq] = await Promise.all([
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    }),
    sanityFetch<SitewideFAQ | null>({
      query: sitewideFaqQuery,
      tags: ['faq'],
    }),
  ]);
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <head>
        {settings && (
          <>
            <JsonLd data={organizationSchema(settings)} />
            <JsonLd data={websiteSchema(settings)} />
            <JsonLd data={personSchema(settings)} />
          </>
        )}
        <JsonLd data={sitewideFaqSchema(faq)} />
      </head>
      <body>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        {isDraft && <VisualEditing />}
      </body>
    </html>
  );
}
