import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'featuresBlock',
  title: 'Features Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the headline (optional)',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (3 columns)', value: 'grid' },
          { title: 'Alternating (image + text)', value: 'alternating' },
          { title: 'List (text only)', value: 'list' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.max(300),
            },
            {
              name: 'image',
              title: 'Image (optional)',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      count: 'features.length',
    },
    prepare({ title, count }) {
      return {
        title: title || 'Features Section',
        subtitle: `Features · ${count || 0} item${count === 1 ? '' : 's'}`,
      };
    },
  },
});
