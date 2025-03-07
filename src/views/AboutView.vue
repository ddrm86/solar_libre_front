<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>List of panels on the database</h2>
    <PanelsTable />
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
import PanelsTable from '@/components/inventory/PanelsTable.vue'
</script>
