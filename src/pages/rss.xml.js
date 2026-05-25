import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { sortByDate } from '../lib/utils';

export async function GET(context) {
  const posts = sortByDate(
    (await getCollection('posts')).filter(p => !p.data.draft)
  );
  const tils = sortByDate(
    (await getCollection('til')).filter(t => !t.data.draft)
  );

  const all = [...posts.map(p => ({
    title: p.data.title,
    description: p.data.description,
    pubDate: p.data.date,
    link: `/posts/${p.slug}/`,
    categories: p.data.tags,
  })), ...tils.map(t => ({
    title: `TIL: ${t.data.title}`,
    description: t.data.title,
    pubDate: t.data.date,
    link: `/til/${t.slug}/`,
    categories: t.data.tags,
  }))].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'TK — research archive',
    description: 'Software engineer exploring cyber risk, probabilistic systems, simulation, and decision-making under uncertainty.',
    site: context.site,
    items: all,
  });
}
