<template>
  <ProjectSelection />
  <Divider />
  <article class="xl:w-1/2">
    <QuickStartGuide />
  </article>
</template>

<script setup lang="ts">
import ProjectSelection from '@/components/project_persistence/ProjectSelection.vue'
import QuickStartGuide from '@/components/QuickStartGuide.vue'
</script>
