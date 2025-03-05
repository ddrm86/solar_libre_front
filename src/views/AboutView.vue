<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>List of panels on the database</h2>
    <h3 v-if="panelsStore.error">😿 There was an error fetching the data from the backend:
      {{ panelsStore.errorDetails?.message }}</h3>
    <p v-else>
      {{ panelsStore.panels }}
    </p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
  import { usePanelsStore } from '@/stores/panels.ts'
  import { onMounted } from 'vue'
  const panelsStore = usePanelsStore()

  onMounted(() => {
    panelsStore.fetchPanels()
  });
</script>
