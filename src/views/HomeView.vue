<template>
  <div class="flex gap-4 items-start">
    <img
      alt="SolarLibre logo"
      class="logo"
      src="@/assets/solar_libre_logo.jpeg"
      width="800"
      height="800"
    />
    <ProjectSelection />
  </div>
</template>

<script setup lang="ts">
import ProjectSelection from '@/components/project_persistence/ProjectSelection.vue'
</script>
