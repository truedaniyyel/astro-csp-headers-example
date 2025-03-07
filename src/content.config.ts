import { SITE } from '@consts';
import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = ({ image }: SchemaContext) =>
  z.object({
    draft: z.boolean().optional(),
    title: z.string().min(1).max(100),
    author: z.string().default(SITE.AUTHOR),
    description: z.string().min(1).max(320),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional(),
    image: image()
      .refine(img => img.width >= 1200 && img.height >= 630, {
        message: 'OpenGraph image must be at least 1200 X 630 pixels!',
      })
      .or(z.string())
      .optional(),
    canonicalURL: z.string().url().optional(),
    editPost: z
      .object({
        disabled: z.boolean().optional(),
        url: z.string().optional(),
        text: z.string().optional(),
        appendFilePath: z.boolean().optional(),
      })
      .optional(),
  });

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }: SchemaContext) => baseSchema({ image }),
});

export const collections = { blog };
