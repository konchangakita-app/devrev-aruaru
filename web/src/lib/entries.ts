import { z } from 'astro/zod';
import rawEntries from '../data/entries.json';

const entrySchema = z.object({
  slug: z.string(),
  title: z.string(),
  symptom: z.string(),
  cause: z.string(),
  fix: z.string(),
  category: z.string(),
  frequency: z.number().int().min(1).max(3),
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

export function getCategories(): string[] {
  const categories = new Set<string>();
  for (const entry of getEntries()) {
    categories.add(entry.category);
  }
  return [...categories].sort();
}

export function getEntriesByCategory(category: string): AruaruEntry[] {
  return getEntries().filter((entry) => entry.category === category);
}

export function getAdjacentEntries(slug: string): {
  prev?: AruaruEntry;
  next?: AruaruEntry;
} {
  const entries = getEntries();
  const index = entries.findIndex((entry) => entry.slug === slug);
  if (index === -1) return {};
  return {
    prev: index < entries.length - 1 ? entries[index + 1] : undefined,
    next: index > 0 ? entries[index - 1] : undefined,
  };
}

export function getRelatedEntries(entry: AruaruEntry, limit = 2): AruaruEntry[] {
  const sameCategory = getEntries().filter(
    (item) => item.slug !== entry.slug && item.category === entry.category,
  );
  const others = getEntries().filter(
    (item) => item.slug !== entry.slug && item.category !== entry.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategoryGroups(): { category: string; entries: AruaruEntry[] }[] {
  return getCategories().map((category) => ({
    category,
    entries: getEntriesByCategory(category),
  }));
}

export function searchEntries(query: string): AruaruEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return getEntries().filter((entry) => {
    const haystack = [
      entry.title,
      entry.symptom,
      entry.cause,
      entry.fix,
      entry.category,
      ...entry.tags,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}
