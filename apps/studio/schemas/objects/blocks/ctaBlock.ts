import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(240),
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
          { title: 'Banner (full-width)', value: 'banner' },
          { title: 'Card (boxed)', value: 'card' },
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
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'CTA Section',
        subtitle: `Call to Action · ${subtitle || 'centered'}`,
      };
    },
  },
});
