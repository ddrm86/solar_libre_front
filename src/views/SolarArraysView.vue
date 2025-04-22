<template>
  <Button
    icon="pi pi-plus"
    :label="t('solar_array.add_array')"
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const solarArraysStore = useSolarArraysStore()
</script>

<i18n>
{
  "en": {
    "solar_array": {
      "add_array": "Add solar array"
    }
  },
  "es": {
    "solar_array": {
      "add_array": "Añadir matriz solar"
    }
  }
}
</i18n>
