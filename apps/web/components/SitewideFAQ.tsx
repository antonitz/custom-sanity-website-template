import type { SitewideFAQ } from '@/lib/sanity/types';

type Props = {
  faq: SitewideFAQ | null;
};

export function SitewideFAQ({ faq }: Props) {
  if (!faq?.showOnHomepage || !faq.items?.length) return null;

  return (
    <section id="faq" className="bg-slate-50/80">
      <div className="container-wide py-20 md:py-28">
        {faq.headline && (
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mt-3 text-3xl font-medium md:text-4xl">
              {faq.headline}
            </h2>
          </div>
        )}
        <div className="mx-auto max-w-3xl space-y-4">
          {faq.items
            .filter((item) => item.question && item.answer)
            .map((item) => (
              <details
                key={item._key}
                className="group rounded-2xl border border-border/60 bg-white p-6 shadow-sm open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">
                  {item.question}
                  <span className="ml-4 text-brand transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
        </div>
      </div>
    </section>
  );
}
