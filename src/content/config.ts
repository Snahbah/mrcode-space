import { defineCollection, z } from 'astro:content';

const pieces = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    published: z.boolean().default(false),
  }),
});

export const collections = { pieces };
