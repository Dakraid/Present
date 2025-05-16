<script setup lang="ts">
</script>

<template>
    <div class="w-full flex flex-col items-center justify-center gap-8">
        <LandingHeroIntro />
        <CommonAttentionDrawer :show-text="true" left-text="More content" right-text="found below!" />
        <LandingHeroCarousel />
        <div class="w-full flex flex-col items-stretch justify-center gap-4">
            <h1 class="font-bold text-4xl text-center">Latest Updates</h1>
            <div class="w-full flex flex-row items-stretch justify-center gap-4">
                <LandingGithubUpdates />
                <LandingProjectUpdates />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
