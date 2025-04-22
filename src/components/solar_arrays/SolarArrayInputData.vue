<template>
  <div>
    <Fluid>
      <div class="pb-2">
        <IftaLabel>
          <Select
            id="panel"
            v-model="solarArraysStore.arrays[arrayIdx].array.panel"
            filter
            :options="panelsStore.panels"
            :optionLabel="getPanelLabel"
            :placeholder="t('solar_array.select_panel')"
          />
          <label for="panel">{{ t('solar_array.panel') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2 flex">
        <IftaLabel>
          <InputNumber
            id="panelNumber"
            showButtons
            v-model="solarArraysStore.arrays[arrayIdx].array.panelNumber"
            :min="1"
          />
          <label for="panelNumber">{{ t('solar_array.panelNumber') }}</label>
        </IftaLabel>
        <label for="panelNumber" class="pl-2 text-xs text-gray-500 flex items-end">
          {{ getTotalPowerText }}
        </label>
      </div>
      <div class="pb-2">
        <IftaLabel>
          <InputNumber
            id="loss"
            showButtons
            v-model="solarArraysStore.arrays[arrayIdx].array.loss"
            :min="0"
            :max="100"
            :suffix="'%'"
          />
          <label for="loss">{{ t('solar_array.loss') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2">
        <IftaLabel>
          <InputNumber
            id="angle"
            showButtons
            v-model="solarArraysStore.arrays[arrayIdx].array.angle"
            :min="0"
            :max="90"
            :suffix="'°'"
          />
          <label for="angle">{{ t('solar_array.angle') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2">
        <IftaLabel>
          <InputNumber
            id="azimuth"
            showButtons
            v-model="solarArraysStore.arrays[arrayIdx].array.azimuth"
            :min="-90"
            :max="90"
            :suffix="'°'"
          />
          <label for="azimuth">{{ t('solar_array.azimuth') }}</label>
        </IftaLabel>
      </div>
    </Fluid>
    <PvgisButton :arrayIdx="arrayIdx"/>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSolarArraysStore } from '@/stores/solarArrays.ts'
import { usePanelsStore } from '@/stores/panels.ts'
import { computed, onMounted, ref, watch } from 'vue'
import type { Panel } from '@/models/panel.ts'
import { useToast } from 'primevue/usetoast'
import PvgisButton from '@/components/solar_arrays/PvgisButton.vue'

const { t } = useI18n()
const toast = useToast()
const solarArraysStore = useSolarArraysStore()
const panelsStore = usePanelsStore()

const { arrayIdx } = defineProps<{ arrayIdx: number }>()

const panelFetchingError = ref(false)

const getPanelLabel = (panel: Panel) => panel.maker + ' ' + panel.model
  + ' (' + panel.nominal_power + 'W)'

onMounted(() => {
  panelsStore.fetchPanels().then(() => {
    panelFetchingError.value = panelsStore.error
    if (panelFetchingError.value) {
      toast.add({
        severity: 'error',
        summary: t('toast_messages.error'),
        detail: t('toast_messages.error_fetching_panels') + ': ' + panelsStore.errorDetails,
        life: 3000,
      })
    }
  })
})

const getTotalPowerText = computed(() => {
  const peakPowerKw = solarArraysStore.arrays[arrayIdx].array.calcPeakPowerKw()
  return isNaN(peakPowerKw) ? '' : `(${peakPowerKw} kW)`
})


watch (
  () => solarArraysStore.arrays[arrayIdx].pvgisData?.error,
  (newValue) => {
    if (newValue) {
      toast.add({
        severity: 'error',
        summary: t('toast_messages.error'),
        detail: t('toast_messages.error_querying_pvgis') + ': '
          + solarArraysStore.arrays[arrayIdx].pvgisData?.errorDetails,
        life: 3000,
      })
    }
  }
)
</script>

<i18n>
{
  "en": {
    "toast_messages": {
      "error": "Error",
      "error_fetching_panels": "Error loading the list of solar panels",
      "error_querying_pvgis": "Error querying PVGIS"
    },
    "solar_array": {
      "title": "Solar array configuration",
      "panel": "Panel",
      "panelNumber": "Number of panels",
      "loss": "Loss (%)",
      "angle": "Tilt angle (°)",
      "azimuth": "Azimuth (°)",
      "select_panel": "Select a panel model"
    }
  },
  "es": {
    "toast_messages": {
      "error": "Error",
      "error_fetching_panels": "Error al cargar la lista de paneles solares",
      "error_querying_pvgis": "Error consultando PVGIS"
    },
    "solar_array": {
      "title": "Configuración de la matriz solar",
      "panel": "Panel",
      "panelNumber": "Número de paneles",
      "loss": "Pérdidas (%)",
      "angle": "Ángulo de inclinación (°)",
      "azimuth": "Azimut (°)",
      "select_panel": "Selecciona un modelo de panel"
    }
  }
}
</i18n>
