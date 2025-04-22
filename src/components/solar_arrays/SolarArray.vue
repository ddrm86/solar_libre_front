<template>
  <Panel :header="headerText" toggleable @update:collapsed="onPanelToggle">
    <div class="md:flex md:gap-8">
      <SolarArrayInputData :arrayIdx="arrayIdx"/>
      <PvgisResultsVisualization :arrayIdx="arrayIdx"/>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import SolarArrayInputData from '@/components/solar_arrays/SolarArrayInputData.vue'
import PvgisResultsVisualization from '@/components/solar_arrays/PvgisResultsVisualization.vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'

const { t } = useI18n()
const solarArraysStore = useSolarArraysStore()

const { arrayIdx } = defineProps<{ arrayIdx: number }>()

const isCollapsed = ref(false)

const headerText = computed(() => {
  if (!isCollapsed.value) {
    return t('solar_array.title')
  }

  const panelSelected = Object.keys(solarArraysStore.arrays[arrayIdx].array.panel).length !== 0

  const panelCount = solarArraysStore.arrays[arrayIdx].array.panelNumber || 0
  const panelName = panelSelected
    ? `${solarArraysStore.arrays[arrayIdx].array.panel.maker} ${solarArraysStore.arrays[arrayIdx].array.panel.model}`
    : t('solar_array.no_panel_selected')
  const loss = solarArraysStore.arrays[arrayIdx].array.loss || 0
  const angle = solarArraysStore.arrays[arrayIdx].array.angle || 0
  const azimuth = solarArraysStore.arrays[arrayIdx].array.azimuth || 0
  const annualProduction = solarArraysStore.arrays[arrayIdx].pvgisData?.response?.totals.E_y || 0

  return `${panelCount} x ${panelName} (📉${loss}% 📐${angle}º 🧭${azimuth}º)
  ⚡${annualProduction} kWh ${t('solar_array.annual')} -
  ${t(solarArraysStore.arrays[arrayIdx].isDirty || !panelSelected ? 'solar_array.not_updated' : 'solar_array.updated')}`
})

const onPanelToggle = (value: boolean) => {
  isCollapsed.value = value
}
</script>

<i18n>
{
  "en": {
    "solar_array": {
      "title": "Solar Array",
      "annual": "yearly",
      "updated": "Updated",
      "not_updated": "NOT UPDATED",
      "no_panel_selected": "(no panel selected)"
    }
  },
  "es": {
    "solar_array": {
      "title": "Matriz solar",
      "annual": "anual",
      "updated": "Actualizado",
      "not_updated": "NO ACTUALIZADO",
      "no_panel_selected": "(ningún panel seleccionado)"
    }
  }
}
</i18n>
