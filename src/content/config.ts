import { defineCollection, z } from 'astro:content';

// 아주 유연한 스키마 정의 (필수값 없음)
const baseSchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  keywords: z.array(z.string()).optional(),
}).passthrough(); // 정의되지 않은 다른 필드들도 허용

const genericCollection = defineCollection({
  type: 'content',
  schema: baseSchema,
});

export const collections = {
  '00_missions': genericCollection,
  '02_skill_insight': genericCollection,
  '90_analysis': genericCollection,
  '91_proposals': genericCollection,
  '92_status': genericCollection,
};