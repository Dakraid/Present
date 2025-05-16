<script setup lang="ts">
import type GitHubUpdates from '~/utils/GitHubUpdates';

const updates: GitHubUpdates = await $fetch('/api/github', {
    method: 'POST'
})
</script>

<template>
  <div class="flex flex-col items-center p-4 rounded-xl border bg-background w-full h-auto">
      <div class="flex flex-row items-center justify-center gap-2">
          <Icon name="mdi:github" size="2rem" />
          <h1 class="text-3xl font-bold">GitHub Updates</h1>
      </div>
      <div class="flex flex-col items-center justify-center gap-4 w-full">
          <div v-for="repository in updates.repositories.slice(0, 3)" :key="repository.repo.name" class="w-full flex flex-col items-start">
              <a :href="repository.repo.html_url" class="text-xl font-bold">{{ repository.repo.name }}</a>
              <p class="text-sm font-light text-muted-foreground">{{ repository.repo.description }}</p>
              <div v-for="(event, index) in repository.events" :key="index" class="flex flex-col items-center ml-4">
                  <a :href="event.payload.details[0].html_url" class="text-sm font-light">- {{ event.payload.details[0].message }}</a>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>

</style>
