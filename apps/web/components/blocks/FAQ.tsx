import type { FAQBlock } from '@/lib/sanity/types';

export function FAQ({ block }: { block: FAQBlock }) {
  const { eyebrow, headline, description, faqs = [] } = block;

  return (
    <div className="container-wide py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        {(eyebrow || headline || description) && (
          <div className="mb-12 text-center">
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
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq._key}
              className="group rounded-xl border border-border bg-background"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-left font-medium [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span className="flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-muted-foreground">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
