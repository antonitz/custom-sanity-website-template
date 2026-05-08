import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactBlock',
  title: 'Contact Form Section',
  type: 'object',
  fields: [
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
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      description: 'Choose which fields to show. Name, email, and message are recommended.',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Name', value: 'name' },
              { title: 'Email', value: 'email' },
              { title: 'Phone', value: 'phone' },
              { title: 'Company', value: 'company' },
              { title: 'Message', value: 'message' },
            ],
          },
        },
      ],
      initialValue: ['name', 'email', 'message'],
      validation: (Rule) => Rule.min(1).unique(),
    }),
    defineField({
      name: 'submitLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Send message',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: 'Thanks! We will be in touch soon.',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Form',
        subtitle: 'Contact Form',
      };
    },
  },
});
