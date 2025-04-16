<template>
  <div class="md:flex md:gap-8">
    <SolarArray />
    <PvgisResultsVisualization />
  </div>
</template>

<script setup lang="ts">
import SolarArray from '@/components/SolarArray.vue'
import PvgisResultsVisualization from '@/components/PvgisResultsVisualization.vue'
</script>
