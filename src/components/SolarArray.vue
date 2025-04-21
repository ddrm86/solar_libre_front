<template>
  <Panel :header="headerText" toggleable @update:collapsed="onPanelToggle">
    <div class="md:flex md:gap-8">
      <SolarArrayInputData />
      <PvgisResultsVisualization />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import SolarArrayInputData from '@/components/SolarArrayInputData.vue'
import PvgisResultsVisualization from '@/components/PvgisResultsVisualization.vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSolarArrayStore } from '@/stores/solarArray.ts'

const { t } = useI18n()
const solarArrayStore = useSolarArrayStore()

const isCollapsed = ref(false)

const headerText = computed(() => {
  if (!isCollapsed.value) {
    return t('solar_array.title')
  }

  const panelSelected = Object.keys(solarArrayStore.solarArray.panel).length !== 0

  const panelCount = solarArrayStore.solarArray.panelNumber || 0
  const panelName = panelSelected
    ? `${solarArrayStore.solarArray.panel.maker} ${solarArrayStore.solarArray.panel.model}`
    : t('solar_array.no_panel_selected')
  const loss = solarArrayStore.solarArray.loss || 0
  const angle = solarArrayStore.solarArray.angle || 0
  const azimuth = solarArrayStore.solarArray.azimuth || 0
  const annualProduction = solarArrayStore.pvgisData?.response?.totals.E_y || 0

  return `${panelCount} x ${panelName} (📉${loss}% 📐${angle}º 🧭${azimuth}º)
  ⚡${annualProduction} kWh ${t('solar_array.annual')} -
  ${t(solarArrayStore.isDirty || !panelSelected ? 'solar_array.not_updated' : 'solar_array.updated')}`
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
