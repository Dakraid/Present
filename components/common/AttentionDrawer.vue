<script setup lang="ts">
import { cn } from '~/lib/utils';

const props = defineProps({
    showText: {
        type: Boolean,
        default: true
    },
    leftText: {
        type: String,
        default: ''
    },
    rightText: {
        type: String,
        default: ''
    },
    class: {
        type: [String, Array, Object],
        default: ''
    }
})
</script>

<template>
    <div :class="cn('w-full grid', showText ? 'grid-cols-[1fr_min-content_1fr]' : 'grid-cols-1', props.class)">
        <h2 v-if="showText" class="font-bold text-2xl self-center justify-self-end">{{ leftText }}</h2>
        <div class="Chevron self-center justify-self-center">
            <Icon name="mdi:chevron-down" size="6rem" class="icon" />
            <Icon name="mdi:chevron-down" size="6rem" class="icon" />
            <Icon name="mdi:chevron-down" size="6rem" class="icon" />
        </div>
        <h2 v-if="showText" class="font-bold text-2xl self-center justify-self-start">{{ rightText }}</h2>
    </div>
</template>

<style scoped>
.Chevron {
    position: relative;
    width: 6rem;
    height: 5rem;
    transform: translateY(-0.5rem);
}

.Chevron :deep(.icon) {
    position: absolute;
    left: 0;
    top: 0;
    animation: chevronDrop 3s ease-in-out infinite;
}

.Chevron :deep(.icon):nth-child(1) {
    z-index: 3;
    top: -2rem;
    left: 0;
    animation-delay: 0s;
}
.Chevron :deep(.icon):nth-child(2) {
    z-index: 2;
    top: -0.5rem;
    left: 0;
    animation-delay: 0.4s;
}
.Chevron :deep(.icon):nth-child(3) {
    z-index: 1;
    top: 1rem;
    left: 0;
    animation-delay: 0.8s;
}

@keyframes chevronDrop {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(1rem);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
