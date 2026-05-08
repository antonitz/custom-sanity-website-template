import type { TestimonialsBlock } from '@/lib/sanity/types';
import { SanityImg } from '@/components/ui/SanityImg';

export function Testimonials({ block }: { block: TestimonialsBlock }) {
  const { eyebrow, headline, testimonials = [] } = block;

  return (
    <div className="bg-muted py-20 md:py-28">
      <div className="container-wide">
        {(eyebrow || headline) && (
          <div className="mx-auto mb-16 max-w-2xl text-center">
            {eyebrow && (
              <p className="text-sm font-medium uppercase tracking-wider text-brand">
                {eyebrow}
              </p>
            )}
            {headline && (
              <h2 className="mt-3 text-3xl font-medium md:text-4xl">
                {headline}
              </h2>
            )}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t._key}
              className="flex flex-col rounded-2xl bg-background p-8"
            >
              {t.quote && (
                <blockquote className="flex-1 text-lg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              )}
              <figcaption className="mt-6 flex items-center gap-3">
                {t.avatar && (
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <SanityImg
                      image={t.avatar}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  {t.author && (
                    <div className="font-medium">{t.author}</div>
                  )}
                  {(t.role || t.company) && (
                    <div className="text-sm text-muted-foreground">
                      {[t.role, t.company].filter(Boolean).join(', ')}
                    </div>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
