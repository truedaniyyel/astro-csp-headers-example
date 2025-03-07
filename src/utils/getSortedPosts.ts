import { getCollection } from 'astro:content';
import { filterPosts } from './filterPosts';
import { sortByDate } from './sortByDate';

async function getSortedPosts() {
  const posts = await getCollection('blog', filterPosts);
  return sortByDate(posts);
}

export const posts = await getSortedPosts();
