<template>
<div>
  <img alt="SolarLibre logo" class="logo" src="@/assets/solar_libre_logo.jpeg" width="800" height="800" />
</div>
</template>

<script setup lang="ts">
import { useProjectListStore } from '@/stores/project_persistence/projectList.ts'

const projectListStore = useProjectListStore()
projectListStore.fetchProjects().then(() => console.log(projectListStore.availableProjects))
</script>
