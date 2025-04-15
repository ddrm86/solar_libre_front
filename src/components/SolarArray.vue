<template>
  <div>
    <h2>{{ t('solar_array.title') }}</h2>
    <Fluid>
      <div class="pb-2">
        <IftaLabel>
          <Select
            id="panel"
            v-model="solarArrayStore.solarArray.panel"
            :options="panelsStore.panels"
            :optionLabel="getPanelLabel"
            :placeholder="t('solar_array.select_panel')"
          />
          <label for="panel">{{ t('solar_array.panel') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2">
        <IftaLabel>
          <InputNumber
            id="panelNumber"
            v-model="solarArrayStore.solarArray.panelNumber"
            :min="1"
          />
          <label for="panelNumber">{{ t('solar_array.panelNumber') }}</label>
        </IftaLabel>
      </div>
      <div class="pb-2">
        <IftaLabel>
          <InputNumber
            id="loss"
            v-model="solarArrayStore.solarArray.loss"
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
            v-model="solarArrayStore.solarArray.angle"
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
            v-model="solarArrayStore.solarArray.azimuth"
            :min="-90"
            :max="90"
            :suffix="'°'"
          />
          <label for="azimuth">{{ t('solar_array.azimuth') }}</label>
        </IftaLabel>
      </div>
    </Fluid>
    <Button
      :label="t('solar_array.consult_pvgis')"
      icon="pi pi-search"
      @click="solarArrayStore.fetchPvgisData"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSolarArrayStore } from '@/stores/solarArray.ts'
import { usePanelsStore } from '@/stores/panels.ts'
import { onMounted, ref } from 'vue'
import type { Panel } from '@/models/panel.ts'

const { t } = useI18n()
const solarArrayStore = useSolarArrayStore()
const panelsStore = usePanelsStore()

const panelFetchingError = ref(false)

const getPanelLabel = (panel: Panel) => panel.maker + ' ' + panel.model

onMounted(() => {
  panelsStore.fetchPanels().then(() => {
    panelFetchingError.value = panelsStore.error
  })
})
</script>

<i18n>
{
  "en": {
    "solar_array": {
      "title": "Solar array configuration",
      "panel": "Panel",
      "panelNumber": "Number of panels",
      "loss": "Loss (%)",
      "angle": "Tilt angle (°)",
      "azimuth": "Azimuth (°)",
      "consult_pvgis": "Consult PVGIS Data",
      "select_panel": "Select a panel model"
    }
  },
  "es": {
    "solar_array": {
      "title": "Configuración de la matriz solar",
      "panel": "Panel",
      "panelNumber": "Número de paneles",
      "loss": "Pérdidas (%)",
      "angle": "Ángulo de inclinación (°)",
      "azimuth": "Azimut (°)",
      "consult_pvgis": "Consultar Datos PVGIS",
      "select_panel": "Selecciona un modelo de panel"
    }
  }
}
</i18n>
