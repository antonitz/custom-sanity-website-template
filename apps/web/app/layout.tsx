import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { sanityFetch } from '@/lib/sanity/fetch';
import { siteSettingsQuery } from '@/lib/sanity/queries';
import { buildMetadata } from '@/lib/seo';
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from '@/lib/structured-data';
import type { SiteSettings } from '@/lib/sanity/types';
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
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  });
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <head>
        {settings && (
          <>
            <JsonLd data={organizationSchema(settings)} />
            <JsonLd data={websiteSchema(settings)} />
          </>
        )}
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
