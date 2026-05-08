import type { LogoCloudBlock } from '@/lib/sanity/types';
import { SanityImg } from '@/components/ui/SanityImg';

export function LogoCloud({ block }: { block: LogoCloudBlock }) {
  const { headline, logos = [] } = block;

  return (
    <div className="container-wide py-16 md:py-20">
      {headline && (
        <p className="mb-10 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {headline}
        </p>
      )}
      <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-4 lg:grid-cols-6">
        {logos.map((logo) => {
          const content = logo.image && (
            <SanityImg
              image={logo.image}
              alt={logo.name || ''}
              width={160}
              height={60}
              className="h-12 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          );

          if (logo.link) {
            return (
              <a
                key={logo._key}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.name}
              >
                {content}
              </a>
            );
          }

          return <div key={logo._key}>{content}</div>;
        })}
      </div>
    </div>
  );
}
