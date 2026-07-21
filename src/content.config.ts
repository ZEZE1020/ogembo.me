import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const talksCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/talks" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    event: z.string().optional(),
    slidesUrl: z.string().optional(),
    videoUrl: z.string().optional(),
  }),
});

const seriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/series" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'talks': talksCollection,
  'series': seriesCollection,
};