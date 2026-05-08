import { PortableText } from '@portabletext/react';
import type { ContentBlock } from '@/lib/sanity/types';
import { SanityImg } from '@/components/ui/SanityImg';

export function Content({ block }: { block: ContentBlock }) {
  const { eyebrow, headline, body, image, layout = 'noImage' } = block;

  const textPart = (
    <div className="max-w-prose">
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-wider text-brand">
          {eyebrow}
        </p>
      )}
      {headline && (
        <h2 className="mt-3 text-3xl font-medium md:text-4xl">{headline}</h2>
      )}
      {body && (
        <div className="prose prose-lg mt-6 max-w-none [&_a]:text-brand [&_a]:underline [&_h2]:mt-12 [&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:text-xl">
          <PortableText value={body} />
        </div>
      )}
    </div>
  );

  const imagePart = image && (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      <SanityImg
        image={image}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  if (layout === 'noImage' || !image) {
    return (
      <div className="container-prose py-20 md:py-28">{textPart}</div>
    );
  }

  if (layout === 'imageTop') {
    return (
      <div className="container-wide py-20 md:py-28">
        <div className="mx-auto max-w-4xl space-y-12">
          {imagePart}
          {textPart}
        </div>
      </div>
    );
  }

  // imageLeft / imageRight
  return (
    <div className="container-wide py-20 md:py-28">
      <div
        className={`grid items-center gap-12 md:grid-cols-2 ${
          layout === 'imageRight' ? '' : '[&>*:first-child]:order-2'
        }`}
      >
        {imagePart}
        {textPart}
      </div>
    </div>
  );
}
