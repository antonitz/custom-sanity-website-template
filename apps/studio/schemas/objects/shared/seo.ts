import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'Title shown in search results and browser tabs. Aim for 50-60 characters.',
      validation: (Rule) =>
        Rule.max(70).warning('Long titles may be truncated in search results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Brief description shown in search results. Aim for 150-160 characters.',
      validation: (Rule) =>
        Rule.max(170).warning(
          'Long descriptions may be truncated in search results'
        ),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description:
        'Image shown when this page is shared on social media. Recommended: 1200x630px.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description:
        'When enabled, this page will not appear in Google or other search results.',
      initialValue: false,
    }),
  ],
});
