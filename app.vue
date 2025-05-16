<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();

const colorMode = useColorMode();
colorMode.preference = 'dark';
</script>

<template>
    <div class="fixed inset-0 z-0 h-screen w-screen px-4 bg-background">
        <ClientOnly>
            <FlickeringGrid
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 column-mask"
                :square-size="16"
                :grid-gap="8"
                color="#FFFFFF"
                :max-opacity="0.125"
                :flicker-chance="0.05"
                :width="width"
                :height="height" />
        </ClientOnly>
    </div>
    <main class="flex flex-col items-center justify-center max-w-7xl mx-auto py-24">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </main>
    <header class="fixed top-4 w-full z-20">
        <CommonNavigation />
    </header>
    <footer class="relative flex flex-col w-full border-t p-2 bg-background z-20">
        <p class="mb-2 text-center text-sm font-light text-muted-foreground">Copyright © 2025 - {{ new Date().getFullYear() }} Kristian "Dakraid" Schlikow</p>
        <div class="flex items-center justify-center gap-4">
            <p class="text-center text-xs font-light text-muted-foreground">All content on this site is licensed under</p>
            <a
                href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
                rel="license noopener noreferrer"
                class="text-center text-xs font-medium underline underline-offset-4 text-muted-foreground"
                target="_blank"
                >CC BY-NC-ND 4.0</a
            >
            <div class="flex gap-1">
                <img alt="CC" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" style="height: 16px !important" />
                <img alt="BY" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" style="height: 16px !important" />
                <img alt="NC" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" style="height: 16px !important" />
                <img alt="ND" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" style="height: 16px !important" />
            </div>
        </div>
    </footer>
</template>

<style scoped>
.column-mask {
    mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
}
</style>
