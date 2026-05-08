import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Button',
      type: 'cta',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Button (optional)',
      type: 'cta',
    }),
    defineField({
      name: 'variant',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Split (text + image)', value: 'split' },
          { title: 'Full Image Background', value: 'fullImage' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'variant',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Section',
        subtitle: `Hero · ${subtitle || 'centered'}`,
        media,
      };
    },
  },
});
