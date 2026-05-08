import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contentBlock',
  title: 'Content Section',
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
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image (optional)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Text only', value: 'noImage' },
          { title: 'Image left', value: 'imageLeft' },
          { title: 'Image right', value: 'imageRight' },
          { title: 'Image top', value: 'imageTop' },
        ],
        layout: 'radio',
      },
      initialValue: 'noImage',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Content Section',
        subtitle: 'Rich content',
        media,
      };
    },
  },
});
