import type { FeaturesBlock } from '@/lib/sanity/types';
import { SanityImg } from '@/components/ui/SanityImg';

export function Features({ block }: { block: FeaturesBlock }) {
  const { eyebrow, headline, description, features = [], layout = 'grid' } = block;

  return (
    <div className="container-wide py-20 md:py-28">
      {(eyebrow || headline || description) && (
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
          {description && (
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {layout === 'grid' && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature._key}
              className="rounded-2xl border border-border bg-background p-8"
            >
              {feature.image && (
                <div className="mb-4 h-12 w-12 overflow-hidden rounded-lg">
                  <SanityImg
                    image={feature.image}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              {feature.title && (
                <h3 className="text-xl font-medium">{feature.title}</h3>
              )}
              {feature.description && (
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {layout === 'alternating' && (
        <div className="space-y-20">
          {features.map((feature, idx) => (
            <div
              key={feature._key}
              className={`grid items-center gap-12 md:grid-cols-2 ${
                idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              {feature.image && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <SanityImg
                    image={feature.image}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                {feature.title && (
                  <h3 className="text-2xl font-medium md:text-3xl">
                    {feature.title}
                  </h3>
                )}
                {feature.description && (
                  <p className="mt-4 text-lg text-muted-foreground">
                    {feature.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {layout === 'list' && (
        <div className="mx-auto max-w-3xl space-y-8">
          {features.map((feature) => (
            <div
              key={feature._key}
              className="border-b border-border pb-8 last:border-0"
            >
              {feature.title && (
                <h3 className="text-xl font-medium">{feature.title}</h3>
              )}
              {feature.description && (
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
