import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      description:
        'The path for this page. Use "home" for the homepage. Use lowercase, hyphens between words.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'content',
      description:
        'One-pager: nav links scroll to sections. Standard: nav links go to other pages.',
      options: {
        list: [
          { title: 'One-Pager (anchor scroll)', value: 'onePager' },
          { title: 'Standard Page', value: 'standard' },
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      description:
        'Drag to reorder. Click + to add a new section. Click on a section to edit it.',
      of: [
        { type: 'heroBlock' },
        { type: 'featuresBlock' },
        { type: 'testimonialsBlock' },
        { type: 'ctaBlock' },
        { type: 'faqBlock' },
        { type: 'contentBlock' },
        { type: 'contactBlock' },
        { type: 'logoCloudBlock' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      sections: 'sections',
    },
    prepare({ title, slug, sections }) {
      const count = sections?.length || 0;
      return {
        title: title || 'Untitled',
        subtitle: `/${slug || ''} · ${count} section${count === 1 ? '' : 's'}`,
      };
    },
  },
});
