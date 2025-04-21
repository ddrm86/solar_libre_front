<template>
  <div class="md:flex md:gap-8">
    <SolarArrayInputData />
    <PvgisResultsVisualization />
  </div>
</template>

<script setup lang="ts">
import SolarArrayInputData from '@/components/SolarArrayInputData.vue'
import PvgisResultsVisualization from '@/components/PvgisResultsVisualization.vue'
</script>
