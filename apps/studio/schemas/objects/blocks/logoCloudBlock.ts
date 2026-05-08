import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'logoCloudBlock',
  title: 'Logo Cloud Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'e.g. "Trusted by leading companies"',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
              fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
            },
            {
              name: 'link',
              title: 'Link (optional)',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      count: 'logos.length',
    },
    prepare({ title, count }) {
      return {
        title: title || 'Logo Cloud',
        subtitle: `Logos · ${count || 0} item${count === 1 ? '' : 's'}`,
      };
    },
  },
});
