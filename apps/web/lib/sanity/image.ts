import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { dataset, projectId } from './env';

const builder = imageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function imageProps(source: SanityImageSource | undefined) {
  if (!source) return null;
  return {
    src: urlFor(source).auto('format').fit('max').url(),
    width: 1920,
    height: 1080,
  };
}
