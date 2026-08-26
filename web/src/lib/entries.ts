import { z } from 'astro/zod';
import rawEntries from '../data/entries.json';

const entrySchema = z.object({
  slug: z.string(),
  title: z.string(),
  symptom: z.string(),
  cause: z.string(),
  fix: z.string(),
  tags: z.array(z.string()),
  publishedAt: z.string(),
});

export type AruaruEntry = z.infer<typeof entrySchema>;

const entriesSchema = z.array(entrySchema);

export function getEntries(): AruaruEntry[] {
  return entriesSchema.parse(rawEntries).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getEntryBySlug(slug: string): AruaruEntry | undefined {
  return getEntries().find((entry) => entry.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const entry of getEntries()) {
    for (const tag of entry.tags) {
      tags.add(tag);
    }
  }
  return [...tags].sort();
}

export function getEntriesByTag(tag: string): AruaruEntry[] {
  return getEntries().filter((entry) => entry.tags.includes(tag));
}
