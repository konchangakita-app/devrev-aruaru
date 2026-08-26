import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const verifications = defineCollection({
  loader: glob({ base: './src/content/verifications', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = { verifications };
