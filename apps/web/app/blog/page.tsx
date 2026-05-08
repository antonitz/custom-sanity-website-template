import Link from 'next/link';
import type { Metadata } from 'next';
import { sanityFetch } from '@/lib/sanity/fetch';
import { recentPostsQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import { buildMetadata } from '@/lib/seo';
import type { Post, SiteSettings } from '@/lib/sanity/types';
import { SanityImg } from '@/components/ui/SanityImg';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  });
  return buildMetadata({
    siteSettings: settings,
    title: 'Blog',
    description: 'Latest articles and insights',
    path: '/blog',
  });
}

export default async function BlogIndex() {
  const posts = await sanityFetch<Post[]>({
    query: recentPostsQuery,
    tags: ['post'],
  });

  return (
    <div className="container-wide py-20 md:py-28">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="text-4xl font-medium md:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Articles, ideas, and insights.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block"
            >
              {post.coverImage && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <SanityImg
                    image={post.coverImage}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition group-hover:scale-105"
                  />
                </div>
              )}
              <h2 className="mt-4 text-xl font-medium group-hover:text-brand">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              )}
              <p className="mt-3 text-sm text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {post.author?.name && ` · ${post.author.name}`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
