# Adding a New Block Type

A block is one of the section types clients can drag into a page. Adding a new one touches both the Studio (schema) and the web app (component + projection + register).

## The 7-step recipe

### 1. Create the Studio schema

`apps/studio/schemas/objects/blocks/[name]Block.ts`

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pricingBlock',
  title: 'Pricing Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    // ... more fields
  ],
  preview: {
    select: { title: 'headline' },
    prepare: ({ title }) => ({
      title: title || 'Pricing Section',
      subtitle: 'Pricing',
    }),
  },
});
```

### 2. Register in the schema index

`apps/studio/schemas/index.ts`

```ts
import pricingBlock from './objects/blocks/pricingBlock';

export const schemaTypes = [
  // ...
  pricingBlock,
];
```

### 3. Add to the page schema's sections array

`apps/studio/schemas/documents/page.ts`

```ts
sections: [
  // ...
  { type: 'pricingBlock' },
];
```

### 4. Add the GROQ projection

`apps/web/lib/sanity/queries.ts`

```ts
const pricingBlockProjection = groq`
  _type == "pricingBlock" => {
    _type,
    _key,
    headline,
    // ...
  }
`;
```

Then add it to `sectionsProjection`:

```ts
export const sectionsProjection = groq`
  sections[] {
    ${heroBlockProjection},
    // ...
    ${pricingBlockProjection},
  }
`;
```

### 5. Add the TypeScript type

`apps/web/lib/sanity/types.ts`

```ts
export type PricingBlock = {
  _type: 'pricingBlock';
  _key: string;
  headline?: string;
  // ...
};

export type Block =
  | HeroBlock
  // ...
  | PricingBlock;
```

### 6. Build the React component

`apps/web/components/blocks/Pricing.tsx`

```tsx
import type { PricingBlock } from '@/lib/sanity/types';

export function Pricing({ block }: { block: PricingBlock }) {
  return (
    <div className="container-wide py-20 md:py-28">
      {/* render */}
    </div>
  );
}
```

### 7. Register in the block map

`apps/web/components/blocks/index.tsx`

```tsx
import { Pricing } from './Pricing';

const blockComponents = {
  // ...
  pricingBlock: Pricing,
};
```

Also export it from the file.

## Done

That's it. The new block now appears in the Studio's section picker and renders correctly on the site.

## Tips

- **Set character limits** on text fields. Rule.max(80) for headlines, Rule.max(240) for descriptions. This is what stops clients from writing content that breaks the design.
- **Use `radio` layout** for variant fields with 2-4 options. It makes the choice obvious.
- **Use `hidden` callbacks** for conditional fields. See `cta.ts` for an example.
- **Always include a `preview`**. Without it, the block shows up as "(no title)" in the sections list.
- **Test on a fresh page**. Create a test page in the Studio, add the block, verify it renders correctly with empty fields, partial fields, and full fields.
