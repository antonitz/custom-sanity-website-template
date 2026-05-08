import 'server-only';
import { draftMode } from 'next/headers';
import type { QueryParams } from 'next-sanity';
import { client, draftClient } from './client';

/**
 * Server-side fetch with cache tags for revalidation.
 * Use `tags` to mark queries that should refresh when content changes.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  const isDraftMode = (await draftMode()).isEnabled;
  const activeClient = isDraftMode ? draftClient : client;

  return activeClient.fetch<T>(query, params, {
    cache: isDraftMode ? 'no-store' : 'force-cache',
    next: {
      revalidate: isDraftMode ? 0 : revalidate,
      tags,
    },
  });
}
