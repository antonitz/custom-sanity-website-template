import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required().max(400),
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role / Title',
              type: 'string',
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
            },
            {
              name: 'avatar',
              title: 'Photo (optional)',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
            },
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'role',
              media: 'avatar',
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
      count: 'testimonials.length',
    },
    prepare({ title, count }) {
      return {
        title: title || 'Testimonials',
        subtitle: `Testimonials · ${count || 0} item${count === 1 ? '' : 's'}`,
      };
    },
  },
});
