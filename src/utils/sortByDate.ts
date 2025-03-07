import { type CollectionEntry } from 'astro:content';

export function sortByDate(entries: Array<CollectionEntry<'blog'>>) {
  return entries.sort(
    (a, b) =>
      new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() -
      new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime()
  );
}
