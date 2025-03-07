import { SITE } from '@consts';
import type { CollectionEntry } from 'astro:content';

export function filterPosts({ data }: CollectionEntry<'blog'>) {
  const isPublishTimePassed = Date.now() > new Date(data.pubDatetime).getTime();
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
}
