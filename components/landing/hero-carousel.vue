<script setup lang="ts">
import type { CarouselApi } from '@/components/ui/carousel';
import { watchOnce } from '@vueuse/core';
import { ref } from 'vue';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '~/lib/utils';

const { data: slides } = await useAsyncData(() => queryCollection('slides').all());

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
    emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
    if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
    emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
    if (!emblaMainApi) return;

    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
});
</script>

<template>
    <div class="flex flex-col flex-nowrap gap-4 w-full px-12">
        <Carousel
            class="relative w-full h-full"
            :plugins="[
                Autoplay({
                    delay: 30000,
                }),
            ]"
            :opts="{
                align: 'start',
                loop: true,
            }"
            @init-api="(val) => (emblaMainApi = val)">
            <CarouselContent>
                <CarouselItem v-for="(slide, index) in slides" :key="index">
                    <div class="flex flex-wrap h-full rounded-xl border bg-background gap-4 md:flex-nowrap">
                        <div class="flex items-center justify-center p-4 rounded-xl bg-accent-foreground/10 w-full md:rounded-r-none md:w-fit">
                            <NuxtImg :src="slide?.image" format="webp" :alt="slide?.lead" width="256" height="256" class="rounded-md max-h-[256px]" quality="100" />
                        </div>
                        <div class="flex flex-col h-full w-full py-4 px-4 gap-2 md:pl-0">
                            <div class="flex flex-col w-full gap-2 md:pl-0">
                                <h1 class="text-4xl font-bold">{{ slide?.lead }}</h1>
                                <div class="flex flex-row flex-wrap w-full gap-1">
                                    <Badge v-for="tag in slide?.tags?.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))" :key="tag" variant="secondary">
                                        {{ tag }}
                                    </Badge>
                                </div>
                            </div>
                            <ContentRenderer :value="slide" :prose="true" class="flex flex-col" />
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

        <Carousel class="relative w-full" @init-api="(val) => (emblaThumbnailApi = val)">
            <CarouselContent class="ml-0 flex justify-center gap-1">
                <CarouselItem
                    v-for="(slide, index) in slides"
                    :key="slide?.lead"
                    :class="cn('p-4 rounded-xl border bg-background cursor-pointer max-h-[98px] max-w-[98px] hover:bg-accent/75 transition-all', index === selectedIndex ? 'bg-accent' : '')"
                    @click="onThumbClick(index)">
                    <NuxtImg
                        :src="slide?.image"
                        format="webp"
                        :alt="slide?.lead"
                        width="64"
                        height="64"
                        :class="cn('rounded-md', index === selectedIndex ? 'opacity-100' : 'opacity-50')"
                        quality="100" />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </div>
</template>

<style scoped></style>
