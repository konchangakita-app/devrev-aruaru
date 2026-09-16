import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import type { AruaruEntry } from './entries';

export const fuseSearchOptions: IFuseOptions<AruaruEntry> = {
  keys: [
    { name: 'title', weight: 0.35 },
    { name: 'tags', weight: 0.25 },
    { name: 'category', weight: 0.15 },
    { name: 'symptom', weight: 0.1 },
    { name: 'cause', weight: 0.08 },
    { name: 'fix', weight: 0.07 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 1,
};

export function fuseSearch(entries: AruaruEntry[], query: string): AruaruEntry[] {
  const q = query.trim();
  if (!q) return [];

  const fuse = new Fuse(entries, fuseSearchOptions);
  return fuse.search(q).map((result) => result.item);
}
