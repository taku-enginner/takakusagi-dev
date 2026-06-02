import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    techStack: z.array(z.string()).default([]),
    thumbnail: z.string().optional(),
    liveUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    order: z.number().default(999),
    publishedAt: z.string().optional(),
  }),
});

export const collections = { works };
