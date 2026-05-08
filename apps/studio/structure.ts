import type { StructureResolver } from 'sanity/structure';
import {
  CogIcon,
  DocumentIcon,
  EditIcon,
  HomeIcon,
  ComposeIcon,
  UserIcon,
} from '@sanity/icons';

/**
 * Desk structure for the Studio.
 * This is what clients see when they log in.
 * Keep it simple: pages, blog, settings.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Home page (singleton)
      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('page')
            .documentId('home')
            .title('Home Page')
        ),

      S.divider(),

      // All other pages
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.documentList()
            .title('Pages')
            .filter('_type == "page" && _id != "home" && !(_id in path("drafts.**"))')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
            .apiVersion('2024-10-01')
        ),

      S.divider(),

      // Blog
      S.listItem()
        .title('Blog Posts')
        .icon(ComposeIcon)
        .child(
          S.documentList()
            .title('Blog Posts')
            .filter('_type == "post"')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
            .apiVersion('2024-10-01')
        ),

      S.listItem()
        .title('Authors')
        .icon(UserIcon)
        .child(
          S.documentList()
            .title('Authors')
            .filter('_type == "author"')
            .apiVersion('2024-10-01')
        ),

      S.divider(),

      // Site settings (singleton)
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
    ]);
