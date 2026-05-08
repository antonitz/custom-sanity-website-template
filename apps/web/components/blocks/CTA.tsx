import type { CTABlock } from '@/lib/sanity/types';
import { Button } from '@/components/ui/Button';

export function CTA({ block }: { block: CTABlock }) {
  const { headline, description, primaryCta, secondaryCta, variant = 'centered' } = block;

  if (variant === 'banner') {
    return (
      <div className="bg-brand py-16 text-brand-foreground md:py-20">
        <div className="container-wide flex flex-col items-center justify-between gap-6 md:flex-row md:gap-12">
          <div className="text-center md:text-left">
            {headline && (
              <h2 className="text-2xl font-medium md:text-3xl">{headline}</h2>
            )}
            {description && (
              <p className="mt-2 opacity-80">{description}</p>
            )}
          </div>
          <div className="flex flex-shrink-0 flex-wrap justify-center gap-3">
            <Button cta={primaryCta} variant="secondary" />
            <Button cta={secondaryCta} variant="ghost" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="container-wide py-20 md:py-28">
        <div className="mx-auto max-w-4xl rounded-3xl bg-brand p-12 text-center text-brand-foreground md:p-20">
          {headline && (
            <h2 className="text-3xl font-medium md:text-4xl">{headline}</h2>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg opacity-80">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button cta={primaryCta} variant="secondary" />
            <Button cta={secondaryCta} variant="ghost" />
          </div>
        </div>
      </div>
    );
  }

  // centered (default)
  return (
    <div className="container-wide py-20 text-center md:py-28">
      <div className="mx-auto max-w-2xl">
        {headline && (
          <h2 className="text-3xl font-medium md:text-4xl">{headline}</h2>
        )}
        {description && (
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button cta={primaryCta} variant="primary" />
          <Button cta={secondaryCta} variant="ghost" />
        </div>
      </div>
    </div>
  );
}
