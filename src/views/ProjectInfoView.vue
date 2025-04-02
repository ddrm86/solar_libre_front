<template>
<div>
  <MapSearch @location-selected="args => console.log(args)" />
</div>
</template>

<script setup lang="ts">
import MapSearch from '@/components/MapSearch.vue'
</script>
