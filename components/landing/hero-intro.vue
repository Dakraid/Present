<script setup lang="ts">
const { data: welcome } = await useAsyncData(() => queryCollection('welcome').first());
</script>

<template>
    <div class="flex w-full flex-col gap-4">
        <ClientOnly>
            <BlurReveal :delay="0.5" :duration="0.75">
                <h1 class="text-center text-4xl font-bold mb-4">{{ welcome?.lead }}</h1>
            </BlurReveal>
        </ClientOnly>
        <div class="flex justify-center items-center gap-4 flex-wrap md:flex-nowrap">
            <NuxtImg :src="welcome?.image" format="webp" alt="hero-avatar" width="256" height="256" class="max-h-[256px] rounded-full" quality="100" />
            <div class="flex flex-col justify-center rounded-xl border bg-background md:max-h-intro">
                <template v-if="welcome">
                    <ContentRenderer :value="welcome" :prose="true" class="w-full flex flex-col p-4" />
                </template>
                <template v-else>
                    <div class="empty-page">
                        <h1>Content Not Found</h1>
                        <p>Oops! The content you're looking for doesn't exist.</p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
