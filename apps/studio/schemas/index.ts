// Documents
import page from './documents/page';
import post from './documents/post';
import author from './documents/author';
import siteSettings from './documents/siteSettings';
import faq from './documents/faq';

// Shared objects
import cta from './objects/shared/cta';
import seo from './objects/shared/seo';

// Block objects
import heroBlock from './objects/blocks/heroBlock';
import featuresBlock from './objects/blocks/featuresBlock';
import testimonialsBlock from './objects/blocks/testimonialsBlock';
import ctaBlock from './objects/blocks/ctaBlock';
import faqBlock from './objects/blocks/faqBlock';
import contentBlock from './objects/blocks/contentBlock';
import contactBlock from './objects/blocks/contactBlock';
import logoCloudBlock from './objects/blocks/logoCloudBlock';

export const schemaTypes = [
  // Documents
  page,
  post,
  author,
  siteSettings,
  faq,

  // Shared objects
  cta,
  seo,

  // Blocks
  heroBlock,
  featuresBlock,
  testimonialsBlock,
  ctaBlock,
  faqBlock,
  contentBlock,
  contactBlock,
  logoCloudBlock,
];
