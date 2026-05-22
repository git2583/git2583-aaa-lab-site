import { defineCollection, z } from 'astro:content';
const insightCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});
export const collections = { '02_skill_insight': insightCollection };