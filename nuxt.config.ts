import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            title: 'Present - Kristian Schlikow',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [{ name: 'description', content: 'Project homepage and portfolio of Kristian Schlikow.' }],
        },
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
    },
    devtools: { enabled: true },
    sourcemap: true,
    modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/scripts', 'shadcn-nuxt', '@nuxtjs/color-mode', '@nuxtjs/robots', 'dayjs-nuxt'],
    css: ['~/assets/css/tailwind.css'],
    vite: {
        plugins: [tailwindcss()],
    },
    nitro: {
        compressPublicAssets: {
            gzip: true,
            brotli: true,
        },
    },
    experimental: {
        asyncContext: true,
        asyncEntry: true,
        buildCache: true,
        crossOriginPrefetch: true,
        restoreState: true,
        sharedPrerenderData: true,
        viewTransition: true,
        watcher: 'parcel',
        writeEarlyHints: true,
    },
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
    colorMode: {
        classSuffix: '',
    },
    robots: {
        blockNonSeoBots: true,
        blockAiBots: true,
    },
    runtimeConfig: {
        githubToken: '',
    },
});
