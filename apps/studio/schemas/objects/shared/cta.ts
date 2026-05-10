import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'Section (anchor)', value: 'anchor' },
          { title: 'External URL', value: 'external' },
          { title: 'Email', value: 'email' },
          { title: 'Phone', value: 'phone' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'anchor',
      title: 'Section ID',
      type: 'string',
      description: 'The section ID to scroll to (e.g. "work", "contact", "faq")',
      hidden: ({ parent }) => parent?.linkType !== 'anchor',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'anchor' && !value) {
            return 'Section ID is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'external' && !value) {
            return 'URL is required';
          }
          return true;
        }),
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.email().custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'email' && !value) {
            return 'Email is required';
          }
          return true;
        }),
      hidden: ({ parent }) => parent?.linkType !== 'email',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'phone',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
    },
    prepare({ label, linkType }) {
      return {
        title: label || '(no label)',
        subtitle: linkType,
      };
    },
  },
});
