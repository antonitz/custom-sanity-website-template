import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import type { SanityImage } from '@/lib/sanity/types';

type Props = {
  image?: SanityImage;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
};

export function SanityImg({
  image,
  alt,
  width = 1200,
  height = 800,
  priority = false,
  className = '',
  sizes,
  fill = false,
}: Props) {
  if (!image?.asset) return null;

  const src = urlFor(image)
    .width(fill ? 1920 : width)
    .height(fill ? 1080 : height)
    .auto('format')
    .fit('max')
    .url();

  const altText = alt ?? image.alt ?? '';
  const blurDataURL = image.asset.metadata?.lqip;

  if (fill) {
    return (
      <Image
        src={src}
        alt={altText}
        fill
        priority={priority}
        sizes={sizes || '100vw'}
        className={className}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={altText}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
    />
  );
}
