import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
    collections: {
        welcome: defineCollection({
            type: 'page',
            source: 'landing/welcome.md',
            schema: z.object({
                lead: z.string(),
                image: z.string(),
            }),
        }),
        slides: defineCollection({
            source: 'landing/slides/*.md',
            type: 'page',
            schema: z.object({
                lead: z.string(),
                image: z.string(),
                tags: z.array(z.string()).optional(),
            }),
        }),
        blog: defineCollection({
            type: 'page',
            source: 'blog/*.md',
            schema: z.object({
                date: z.string(),
                tags: z.array(z.string()).optional(),
            }),
        }),
    },
});
