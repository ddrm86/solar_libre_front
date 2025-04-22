<template>
  <Button
    icon="pi pi-plus"
    label="Add Solar Array"
    class="mb-4"
    @click="solarArraysStore.addSolarArray()"
  />
  <div v-for="(_, idx) in solarArraysStore.arrays" :key="idx">
    <SolarArray :arrayIdx="idx"/>
  </div>
</template>

<script setup lang="ts">
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import SolarArray from '@/components/solar_arrays/SolarArray.vue'

const solarArraysStore = useSolarArraysStore()
</script>
