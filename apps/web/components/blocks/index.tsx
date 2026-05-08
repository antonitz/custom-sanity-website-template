import type { Block } from '@/lib/sanity/types';
import { JsonLd, faqSchema } from '@/lib/structured-data';

import { Hero } from './Hero';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { CTA } from './CTA';
import { FAQ } from './FAQ';
import { Content } from './Content';
import { Contact } from './Contact';
import { LogoCloud } from './LogoCloud';

/**
 * Block component map.
 * When you add a new block type:
 * 1. Import the component above
 * 2. Register it here
 */
const blockComponents = {
  heroBlock: Hero,
  featuresBlock: Features,
  testimonialsBlock: Testimonials,
  ctaBlock: CTA,
  faqBlock: FAQ,
  contentBlock: Content,
  contactBlock: Contact,
  logoCloudBlock: LogoCloud,
} as const;

type Props = {
  sections?: Block[];
  pageType?: 'onePager' | 'standard';
};

export function BlockRenderer({ sections, pageType = 'standard' }: Props) {
  if (!sections?.length) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        const Component = blockComponents[
          section._type as keyof typeof blockComponents
        ] as React.ComponentType<{ block: Block; pageType?: string }>;

        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`No component registered for block type: ${section._type}`);
          }
          return null;
        }

        return (
          <section key={section._key} id={section._key}>
            <Component block={section} pageType={pageType} />
            {section._type === 'faqBlock' && (
              <JsonLd data={faqSchema(section)} />
            )}
          </section>
        );
      })}
    </>
  );
}

export {
  Hero,
  Features,
  Testimonials,
  CTA,
  FAQ,
  Content,
  Contact,
  LogoCloud,
};
