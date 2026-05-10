import { defineField, defineType } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons';

export default defineType({
  name: 'faq',
  title: 'FAQ (Site-wide)',
  type: 'document',
  icon: HelpCircleIcon,
  description:
    'Site-wide FAQ used for AI search engine visibility (JSON-LD schema) and the visible FAQ section. Editable without code deploys.',
  fields: [
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      description: 'Displayed above the FAQ section on the homepage.',
      initialValue: 'Frequently asked',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required().max(160),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              description:
                'Write in your own voice. AI engines cross-check this against visible content — keep it consistent and honest.',
              validation: (Rule) => Rule.required().max(800),
            },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description:
        'When enabled, renders a visible FAQ accordion on the homepage. The JSON-LD schema is always included regardless of this setting.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { count: 'items.length' },
    prepare({ count }) {
      return {
        title: 'FAQ (Site-wide)',
        subtitle: `${count || 0} question${count === 1 ? '' : 's'}`,
      };
    },
  },
});
