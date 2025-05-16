<script setup lang="ts">
const updates = [{
    name: "Test",
    version: "1.0.0",
    description: "Test description",
    date: "2021-10-10",
    link: "https://github.com/test/test",
    changes: [
        {
            type: "added",
            description: "Added test feature 1"
        },
        {
            type: "added",
            description: "Added test feature 2"
        },
        {
            type: "fixed",
            description: "Fixed test bug 1"
        },
        {
            type: "fixed",
            description: "Fixed test bug 2"
        }
    ]
}]
</script>

<template>
  <div class="flex flex-col items-center p-4 rounded-xl border bg-background w-full h-auto">
      <div class="flex flex-row items-center justify-center gap-2">
          <Icon name="mdi:github" size="2rem" />
          <h1 class="text-3xl font-bold">Project Updates</h1>
      </div>
      <div class="flex flex-col items-center justify-center gap-4 w-full">
          <div v-for="update in updates" :key="update.name" class="w-full flex flex-col items-start">
              <a :href="update.link" class="text-xl font-bold">{{ update.name }}</a>
              <p class="text-sm font-light text-muted-foreground">{{ update.version }} - {{$dayjs(update.date).fromNow()}}</p>
              <p class="text-lg my-1">{{ update.description }}</p>
              <p class="text-sm mb-1">Changes:</p>
              <div class="flex flex-col items-start ml-4 gap-1">
                  <div v-for="(change, index) in update.changes" :key="index" class="flex flex-row items-center gap-2">
                      <Icon v-if="change.type === 'fixed'" name="mdi:auto-fix" size="1.5rem" />
                      <Icon v-else-if="change.type === 'added'" name="mdi:pencil-add" size="1.5rem" />
                      <p class="text-sm font-light">{{ change.description }}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>

</style>
