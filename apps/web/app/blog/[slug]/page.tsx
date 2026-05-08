import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity/fetch';
import {
  allPostSlugsQuery,
  postBySlugQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import { buildMetadata } from '@/lib/seo';
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
} from '@/lib/structured-data';
import type { Post, SiteSettings } from '@/lib/sanity/types';
import { SanityImg } from '@/components/ui/SanityImg';

type Params = Promise<{ slug: string }>;
type SlugRow = { slug: string; _updatedAt: string };

export async function generateStaticParams() {
  const posts = await sanityFetch<SlugRow[]>({
    query: allPostSlugsQuery,
    tags: ['post'],
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    sanityFetch<Post | null>({
      query: postBySlugQuery,
      params: { slug },
      tags: [`post:${slug}`],
    }),
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    }),
  ]);

  if (!post) return {};

  return buildMetadata({
    pageSeo: post.seo,
    siteSettings: settings,
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: 'article',
    publishedAt: post.publishedAt,
    modifiedAt: post._updatedAt,
  });
}

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    sanityFetch<Post | null>({
      query: postBySlugQuery,
      params: { slug },
      tags: [`post:${slug}`],
    }),
    sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    }),
  ]);

  if (!post) notFound();

  return (
    <>
      <JsonLd data={articleSchema(post, settings)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${slug}` },
        ])}
      />

      <article className="py-20 md:py-28">
        <div className="container-prose">
          <header>
            <h1 className="text-4xl font-medium md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {post.author?.name && ` · ${post.author.name}`}
            </p>
          </header>

          {post.coverImage && (
            <div className="relative my-10 aspect-[16/9] overflow-hidden rounded-2xl">
              <SanityImg
                image={post.coverImage}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {post.body && (
            <div className="prose prose-lg max-w-none [&_a]:text-brand [&_a]:underline [&_h2]:mt-12 [&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:text-xl">
              <PortableText value={post.body} />
            </div>
          )}
        </div>
      </article>
    </>
  );
}
