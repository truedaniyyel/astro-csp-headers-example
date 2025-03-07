import rss from '@astrojs/rss';
import { SITE } from '@consts';
import { posts } from '@utils/getSortedPosts';

type Context = {
  site: string;
};

export async function GET(context: Context) {
  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: posts.map(({ data, id, collection }) => ({
      link: `/${collection}/${id}`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      author: data.author || SITE.AUTHOR,
      enclosure: {
        url: new URL(`/${collection}/${id}.webp`, context.site).href,
        type: 'image/webp',
        length: 0,
      },
    })),
  });
}
