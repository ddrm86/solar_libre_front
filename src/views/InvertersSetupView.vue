<template>
  <Button
    icon="pi pi-plus"
    :label="t('inverters.add_inverter')"
    @click="invertersStore.addInverterSetup()"
  />
  Inversores añadidos: {{ invertersStore.inverters.length }}
  <StringSetup :idx="1" :available-setups="availableSetups"></StringSetup>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useInvertersSetupStore } from '@/stores/invertersSetup.ts'
import StringSetup from '@/components/inverters_setup/StringSetup.vue'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { computed, ref } from 'vue'
import { type ISolarArray } from '@/models/solar_arrays/solarArray.ts'

const { t } = useI18n()
const invertersStore = useInvertersSetupStore()
const solarArraysStore = useSolarArraysStore()

const solarArrays = ref<ISolarArray[]>(solarArraysStore.arrays)
const availableSetups = computed(() =>
  solarArrays.value.map((array) => ({
    array: array,
    maxPanels: array.array.panelNumber,
  })) as [{ array: ISolarArray; maxPanels: number; }],
)
</script>

<i18n>
{
  "en": {
    "inverters": {
      "add_inverter": "Add inverter"
    }
  },
  "es": {
    "inverters": {
      "add_inverter": "Añadir inversor"
    }
  }
}
</i18n>
