import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    studioUrl: '/studio',
  },
});

/**
 * Authenticated client for draft mode and Visual Editing.
 * Uses a token with read permissions to access drafts.
 */
export const draftClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token,
  stega: {
    studioUrl: '/studio',
  },
});

export function getClient(preview = false) {
  return preview ? draftClient : client;
}
