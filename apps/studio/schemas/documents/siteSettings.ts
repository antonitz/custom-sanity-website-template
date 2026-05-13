import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'organization', title: 'Organization' },
    { name: 'person', title: 'Person (AEO)' },
    { name: 'seo', title: 'Default SEO' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      group: 'general',
      description: 'Brief description of the site/business.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
      description:
        'Square icon shown in browser tabs and bookmarks. Upload a square PNG (512×512 recommended). If left empty, a default is used.',
    }),

    defineField({
      name: 'navigation',
      title: 'Header Navigation',
      type: 'array',
      group: 'navigation',
      description: 'Links shown in the site header.',
      of: [{ type: 'cta' }],
    }),

    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        {
          name: 'tagline',
          title: 'Tagline',
          type: 'text',
          rows: 2,
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description:
            'Leave blank to use "© [year] [Site Name]. All rights reserved."',
        },
        {
          name: 'navigation',
          title: 'Footer Links',
          type: 'array',
          of: [{ type: 'cta' }],
        },
        {
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      'Twitter',
                      'LinkedIn',
                      'Instagram',
                      'Facebook',
                      'YouTube',
                      'TikTok',
                      'GitHub',
                      'Threads',
                      'Bluesky',
                    ],
                  },
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule) =>
                    Rule.uri({ scheme: ['http', 'https'] }),
                },
              ],
              preview: {
                select: {
                  title: 'platform',
                  subtitle: 'url',
                },
              },
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.email() },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'address', title: 'Address', type: 'text', rows: 2 },
      ],
    }),

    defineField({
      name: 'organization',
      title: 'Organization (for SEO/AEO)',
      type: 'object',
      group: 'organization',
      description:
        'Used to generate Schema.org Organization data for search engines and AI crawlers.',
      fields: [
        {
          name: 'legalName',
          title: 'Legal Name',
          type: 'string',
          description: 'Used if different from site name.',
        },
        {
          name: 'foundingDate',
          title: 'Founding Date',
          type: 'date',
        },
        {
          name: 'sameAs',
          title: 'Same As (Social Profiles)',
          type: 'array',
          description:
            'Full URLs of official profiles on other sites (Twitter, LinkedIn, Wikipedia, etc).',
          of: [{ type: 'url' }],
        },
      ],
    }),

    defineField({
      name: 'person',
      title: 'Person (for AI Search)',
      type: 'object',
      group: 'person',
      description:
        'Generates a Person JSON-LD schema for AI search engines. Fill this in if the site represents an individual (founder, consultant, creator).',
      fields: [
        {
          name: 'name',
          title: 'Full Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'jobTitle',
          title: 'Job Title',
          type: 'string',
          description: 'e.g. "Founder and Builder", "CEO", "Consultant"',
        },
        {
          name: 'personDescription',
          title: 'Description',
          type: 'text',
          rows: 3,
          description:
            'One-paragraph bio. AI engines surface this in answers about who you are.',
        },
        {
          name: 'image',
          title: 'Headshot / Photo',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        },
        {
          name: 'locationCity',
          title: 'City',
          type: 'string',
        },
        {
          name: 'locationRegion',
          title: 'Region / State / Province',
          type: 'string',
        },
        {
          name: 'locationCountry',
          title: 'Country Code',
          type: 'string',
          description: 'Two-letter code, e.g. "CA", "US", "UK"',
          validation: (Rule) => Rule.max(2),
        },
        {
          name: 'sameAs',
          title: 'Profile URLs',
          type: 'array',
          description:
            'Full URLs of official profiles (LinkedIn, Instagram, Substack, etc).',
          of: [{ type: 'url' }],
        },
        {
          name: 'knowsAbout',
          title: 'Knows About',
          type: 'array',
          description:
            'Topics and expertise areas. AI engines use these to match queries.',
          of: [{ type: 'string' }],
        },
      ],
    }),

    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      group: 'seo',
      description:
        'Default SEO values used when a page does not specify its own.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
