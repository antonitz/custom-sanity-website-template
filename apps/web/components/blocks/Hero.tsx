import type { HeroBlock } from '@/lib/sanity/types';
import { Button } from '@/components/ui/Button';
import { SanityImg } from '@/components/ui/SanityImg';

export function Hero({ block }: { block: HeroBlock }) {
  const { headline, subheadline, image, primaryCta, secondaryCta, variant = 'centered' } = block;

  if (variant === 'fullImage') {
    return (
      <div className="relative isolate min-h-[80vh] overflow-hidden">
        {image && (
          <div className="absolute inset-0 -z-10">
            <SanityImg
              image={image}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}
        <div className="container-wide flex min-h-[80vh] items-center py-20 text-white">
          <div className="max-w-2xl">
            {headline && (
              <h1 className="text-5xl font-medium leading-tight md:text-6xl">
                {headline}
              </h1>
            )}
            {subheadline && (
              <p className="mt-6 text-lg text-white/80 md:text-xl">
                {subheadline}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button cta={primaryCta} variant="primary" />
              <Button cta={secondaryCta} variant="ghost" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div className="container-wide grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          {headline && (
            <h1 className="text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
              {headline}
            </h1>
          )}
          {subheadline && (
            <p className="mt-6 text-lg text-muted-foreground">
              {subheadline}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button cta={primaryCta} variant="primary" />
            <Button cta={secondaryCta} variant="ghost" />
          </div>
        </div>
        {image && (
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <SanityImg
              image={image}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    );
  }

  // centered (default)
  return (
    <div className="container-wide py-20 text-center md:py-28">
      <div className="mx-auto max-w-3xl">
        {headline && (
          <h1 className="text-4xl font-medium leading-tight md:text-6xl">
            {headline}
          </h1>
        )}
        {subheadline && (
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            {subheadline}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button cta={primaryCta} variant="primary" />
          <Button cta={secondaryCta} variant="ghost" />
        </div>
      </div>
      {image && (
        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl">
          <SanityImg
            image={image}
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
